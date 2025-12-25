import torch
import torch.nn as nn
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torchvision.transforms as transforms
import torchvision.models as models

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
print("Loading model...")
model = EyeQDRGModel()
model.load_state_dict(torch.load('best_dual_detection_model.pth', map_location=torch.device('cpu')))
model.eval()
print("✓ Model loaded successfully!")

# Step 4: Define image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Step 5: API endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        img = Image.open(file.stream).convert('RGB')
        
        # Preprocess image
        img_tensor = transform(img).unsqueeze(0)
        
        # Make prediction
        with torch.no_grad():
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

# Step 6: Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'Backend is running!', 'model': 'EyeQ-DR-G loaded'}), 200

# Step 7: Run the app
if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    app.run(debug=True, port=5000)