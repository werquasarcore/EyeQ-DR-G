import os
from pathlib import Path
import torch
import torch.nn as nn
from flask import Flask, jsonify, request
from PIL import Image
import torchvision.transforms as transforms
import torchvision.models as models

app = Flask(__name__)


class EyeQDRGModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = models.resnet50(weights=None)
        self.backbone.fc = nn.Identity()
        self.shared_fc = nn.Sequential(
            nn.Linear(2048, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
        )
        self.dr_classifier = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 2),
        )
        self.glaucoma_classifier = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 2),
        )

    def forward(self, x):
        features = self.backbone(x)
        shared = self.shared_fc(features)
        dr_output = self.dr_classifier(shared)
        glaucoma_output = self.glaucoma_classifier(shared)
        return dr_output, glaucoma_output


MODEL_CACHE = {}


def _find_model_path():
    candidates = [
        Path(__file__).resolve().parents[3] / "Backend" / "best_dual_detection_model.pth",
        Path(__file__).resolve().parents[2] / "Backend" / "best_dual_detection_model.pth",
        Path(__file__).resolve().parents[1] / "Backend" / "best_dual_detection_model.pth",
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("Could not find the trained model file")


def _get_model_and_transform():
    if "model" in MODEL_CACHE and "transform" in MODEL_CACHE:
        return MODEL_CACHE["model"], MODEL_CACHE["transform"]

    model = EyeQDRGModel()
    model_path = _find_model_path()
    checkpoint = torch.load(model_path, map_location=torch.device("cpu"), weights_only=False)
    if isinstance(checkpoint, dict) and "state_dict" in checkpoint:
        state_dict = checkpoint["state_dict"]
    elif isinstance(checkpoint, dict):
        state_dict = checkpoint
    else:
        raise ValueError("Unsupported checkpoint format")

    model.load_state_dict(state_dict, strict=True)
    model.eval()

    transform = transforms.Compose([
        transforms.Resize((160, 160)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    MODEL_CACHE["model"] = model
    MODEL_CACHE["transform"] = transform
    return model, transform


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]
        image = Image.open(file.stream).convert("RGB")
        model, transform = _get_model_and_transform()
        tensor = transform(image).unsqueeze(0)

        with torch.inference_mode():
            dr_output, glaucoma_output = model(tensor)
            dr_probs = torch.softmax(dr_output, dim=1)
            glaucoma_probs = torch.softmax(glaucoma_output, dim=1)
            dr_prob = dr_probs[0][1].item()
            glaucoma_prob = glaucoma_probs[0][1].item()
            dr_class = torch.argmax(dr_probs, dim=1).item()
            glaucoma_class = torch.argmax(glaucoma_probs, dim=1).item()

        return jsonify({
            "diabetic_retinopathy": {
                "probability": round(dr_prob * 100, 2),
                "detected": bool(dr_class),
                "severity": "Positive" if dr_class == 1 else "Negative",
                "confidence": round(max(dr_probs[0]).item() * 100, 2),
            },
            "glaucoma": {
                "probability": round(glaucoma_prob * 100, 2),
                "detected": bool(glaucoma_class),
                "severity": "Positive" if glaucoma_class == 1 else "Negative",
                "confidence": round(max(glaucoma_probs[0]).item() * 100, 2),
            },
        }), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "Backend is running!", "model": "EyeQ-DR-G loaded"}), 200
