import io
import os
import torch
import torch.nn as nn
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torchvision.transforms as transforms
import torchvision.models as models
from pathlib import Path

# Use a small, stable thread count for predictable CPU inference speed.
try:
    torch.set_num_threads(max(1, min(4, os.cpu_count() or 1)))
    torch.set_num_interop_threads(1)
except RuntimeError:
    pass

if hasattr(torch.backends, "mkldnn"):
    torch.backends.mkldnn.enabled = True

# Step 1: Define the EXACT model architecture from your training
class EyeQDRGModel(nn.Module):
    def __init__(self):
        super(EyeQDRGModel, self).__init__()
        # Use complete ResNet50 as backbone (do NOT remove layers)
        self.backbone = models.resnet50(weights=None)
        # Remove only the final FC layer
        self.backbone.fc = nn.Identity()
        
        # Shared fully connected layers
        self.shared_fc = nn.Sequential(
            nn.Linear(2048, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.5)
        )
        
        # DR classifier head (2 classes: No DR, Has DR)
        self.dr_classifier = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 2)  # 2 classes output
        )
        
        # Glaucoma classifier head (2 classes: No Glaucoma, Has Glaucoma)
        self.glaucoma_classifier = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 2)  # 2 classes output
        )
    
    def forward(self, x):
        # Extract features using backbone
        features = self.backbone(x)
        
        # Shared processing
        shared = self.shared_fc(features)
        
        # Separate predictions
        dr_output = self.dr_classifier(shared)
        glaucoma_output = self.glaucoma_classifier(shared)
        
        return dr_output, glaucoma_output

# Step 2: Initialize Flask app
app = Flask(__name__)
CORS(app)

# Step 3: Load the trained model
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "best_dual_detection_model.pth"

print(f"Loading model from {MODEL_PATH}...")
model = EyeQDRGModel()
try:
    checkpoint = torch.load(MODEL_PATH, map_location=torch.device('cpu'), weights_only=False)
    if isinstance(checkpoint, dict) and 'state_dict' in checkpoint:
        state_dict = checkpoint['state_dict']
    elif isinstance(checkpoint, dict):
        state_dict = checkpoint
    else:
        raise ValueError('Unsupported checkpoint format')

    model.load_state_dict(state_dict, strict=True)
    model.eval()
    print("✓ Model loaded successfully!")
except Exception as exc:
    raise RuntimeError(f"Failed to load model from {MODEL_PATH}: {exc}") from exc

# Step 4: Define image preprocessing
transform = transforms.Compose([
    transforms.Resize((160, 160)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Step 5: API endpoint for prediction

def _predict_impl():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        # Preprocess image
        img_tensor = transform(img).unsqueeze(0)
        
        # Make prediction
        with torch.inference_mode():
            dr_output, glaucoma_output = model(img_tensor)
            
            # Apply softmax to get probabilities
            dr_probs = torch.softmax(dr_output, dim=1)
            glaucoma_probs = torch.softmax(glaucoma_output, dim=1)
            
            # Get probability of positive class (index 1)
            dr_prob = dr_probs[0][1].item()
            glaucoma_prob = glaucoma_probs[0][1].item()
            
            # Get predicted classes
            dr_class = torch.argmax(dr_probs, dim=1).item()
            glaucoma_class = torch.argmax(glaucoma_probs, dim=1).item()
        
        # Prepare response
        result = {
            'diabetic_retinopathy': {
                'probability': round(dr_prob * 100, 2),
                'detected': bool(dr_class),
                'severity': 'Positive' if dr_class == 1 else 'Negative',
                'confidence': round(max(dr_probs[0]).item() * 100, 2)
            },
            'glaucoma': {
                'probability': round(glaucoma_prob * 100, 2),
                'detected': bool(glaucoma_class),
                'severity': 'Positive' if glaucoma_class == 1 else 'Negative',
                'confidence': round(max(glaucoma_probs[0]).item() * 100, 2)
            }
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    return _predict_impl()

@app.route('/api/predict', methods=['POST'])
def api_predict():
    return _predict_impl()

# Step 6: Health check endpoint
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'status': 'Backend is running!',
        'model': 'EyeQ-DR-G loaded',
        'endpoints': ['/predict', '/health']
    }), 200

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'Backend is running!', 'model': 'EyeQ-DR-G loaded'}), 200

@app.route('/api/health', methods=['GET'])
def api_health():
    return jsonify({'status': 'Backend is running!', 'model': 'EyeQ-DR-G loaded'}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Route not found', 'available_endpoints': ['/predict', '/health']}), 404

# Step 7: Run the app
if __name__ == '__main__':
    print("Starting Flask server on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=False)