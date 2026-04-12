# 🧠 EyeQ-DR-G: AI Clinical Documentation Agent with Memory

An AI-powered clinical documentation agent for eye care that not only analyzes retinal images but also **remembers patient history, tracks disease progression, and improves over time using Hindsight memory**.

---

## 🚀 Overview

EyeQ-DR-G is no longer just an image analysis tool — it is a **smart AI agent for clinical documentation**.

It helps doctors:
- Automatically generate clinical notes 📄
- Track patient history across visits 🧠
- Detect disease progression 📈
- Provide personalized recommendations 💡

Unlike traditional AI models, this system uses **persistent memory (Hindsight)** to learn from past patient interactions and continuously improve its outputs.

---

## 🎯 Problem Statement

Clinical documentation is:
- Time-consuming ⏳
- Repetitive 🔁
- Error-prone ⚠️

Doctors often struggle to:
- Recall past patient history
- Compare previous reports
- Track disease progression efficiently

---

## 💡 Solution

We built an **AI Clinical Documentation Agent** that:

✅ Generates structured clinical notes automatically  
✅ Remembers past patient interactions using Hindsight  
✅ Compares current and previous diagnoses  
✅ Tracks disease progression over time  
✅ Provides intelligent, personalized recommendations  

---

## 🧠 Hindsight Memory Integration (Core Feature)

This project uses **Hindsight memory** to store and retrieve:

- 📄 Previous clinical notes  
- 👁️ Past eye scan results  
- 💊 Treatment history  
- 📊 Disease progression patterns  

### 🔥 Example:

**Visit 1:**
> Mild Diabetic Retinopathy detected

**Visit 2:**
> Condition worsened → Moderate DR

**Visit 3:**
> High-risk progression → Immediate attention suggested

👉 The agent **learns and adapts** with each interaction.

---

## ⚙️ Features

- 🖼️ Eye image preprocessing (resize, normalize, augment)
- 🤖 Disease detection using ML models
- 📄 Auto clinical note generation
- 🧠 Patient memory tracking (Hindsight)
- 📈 Progression comparison engine
- ⚠️ Risk prediction based on history
- 💬 Intelligent recommendations

---

## 🏗️ Tech Stack

- **Backend:** Python (Flask / FastAPI)
- **AI Models:** PyTorch / TensorFlow
- **Memory Layer:** Hindsight (Vectorize)
- **LLM:** Groq / OpenAI-compatible models
- **Image Processing:** OpenCV / Pillow
- **Data Handling:** NumPy, Pandas, Scikit-learn

---

## 📦 Prerequisites

- Python 3.8+
- pip
- (Optional) CUDA-enabled GPU

---

## ⚡ Installation

```bash
git clone https://github.com/<your-org>/miniproject-eyeq.git
cd miniproject-eyeq

python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows
.venv\Scripts\activate

pip install --upgrade pip
pip install -r requirements.txt
