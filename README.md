# EyeQ-DR-G: AI-Powered Eye Disease Detection System

An AI-powered retinal image analysis system designed to detect eye diseases from retinal images and assist in early screening.

## Overview

EyeQ-DR-G is an AI-based retinal image analysis system that analyzes retinal images and detects eye diseases.

The system helps users:

- Analyze retinal images
- Detect retinal diseases
- Classify disease conditions
- Support early disease screening

## Problem Statement

Eye diseases such as Diabetic Retinopathy and Glaucoma can lead to serious vision problems when they are not detected early.

Traditional screening can be:

- Time-consuming
- Dependent on specialist availability
- Difficult to scale for large populations

There is a need for an automated system that can assist in analyzing retinal images efficiently.

## Solution

EyeQ-DR-G uses deep learning-based image analysis to identify eye diseases from retinal images.

The system:

- Accepts retinal images as input
- Preprocesses the images
- Uses trained deep learning models for analysis
- Detects potential eye diseases
- Provides prediction results to support screening

## Features

- Retinal image preprocessing
- Image resizing and normalization
- Deep learning-based disease detection
- Diabetic Retinopathy detection
- Glaucoma detection
- Prediction results
- Early screening support
- Web-based interface

## Tech Stack

- **Programming:** Python
- **Backend:** Flask / FastAPI
- **Deep Learning:** PyTorch
- **Model:** ResNet50
- **Image Processing:** OpenCV / Pillow
- **Data Handling:** NumPy, Pandas
- **Machine Learning:** Scikit-learn
- **Frontend:** React / TypeScript
- **Deployment:** Vercel / Render

## Prerequisites

- Python 3.8+
- pip
- Git
- Node.js
- Optional CUDA-enabled GPU

## Installation

```bash
git clone https://github.com/<your-org>/eyeq-dr-g.git
cd eyeq-dr-g

python -m venv .venv
````

### Windows

```bash
.venv\Scripts\activate
```

### macOS / Linux

```bash
source .venv/bin/activate
```

### Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## Workflow

```text
Retinal Image
      |
      v
Image Preprocessing
      |
      v
Deep Learning Model
      |
      v
Disease Detection
      |
      v
Prediction Result
```

## Objective

The primary objective of EyeQ-DR-G is to provide an automated retinal image screening system that can assist in the early identification of eye diseases using deep learning.



