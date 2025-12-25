import { Upload, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import gradcamSample from "../assets/gradcam-sample.jpg";
import { useState } from "react";

const Demo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setError("");
    }
  };

  // Handle file upload and prediction
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("Failed to analyze image. Make sure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Interactive Demo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our AI interprets retinal images with explainable analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Upload Section */}
            <div className="animate-slide-in">
              <div className="gradient-card rounded-2xl p-8 shadow-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Upload Retinal Image
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upload a fundus photograph to test the model's detection capabilities. 
                  The AI will analyze for signs of Diabetic Retinopathy and Glaucoma.
                </p>

                {/* File Upload Area */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      {selectedFile ? selectedFile.name : "Drag and drop or click to upload"}
                    </p>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </label>

                {/* Preview Image */}
                {previewUrl && (
                  <div className="mt-6">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}

                {/* Analyze Button */}
                {selectedFile && (
                  <Button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full mt-6 bg-primary hover:bg-primary/90"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                )}

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-500 mt-4 text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="animate-scale-in">
              <div className="gradient-card rounded-2xl p-8 shadow-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {results ? "Analysis Results" : "Sample Grad-CAM Heatmap"}
                </h3>
                
                {results ? (
                  <>
                    <p className="text-muted-foreground mb-6">
                      AI analysis complete. Results show detection probabilities for both conditions.
                    </p>
                    
                    <div className="space-y-6">
                      {/* DR Results */}
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-3">
                          Diabetic Retinopathy
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <span className={`font-semibold ${results.diabetic_retinopathy.detected ? 'text-red-500' : 'text-green-500'}`}>
                              {results.diabetic_retinopathy.severity}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Probability:</span>
                            <span className="font-semibold text-foreground">
                              {results.diabetic_retinopathy.probability}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Confidence:</span>
                            <span className="font-semibold text-foreground">
                              {results.diabetic_retinopathy.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Glaucoma Results */}
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-3">
                          Glaucoma
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <span className={`font-semibold ${results.glaucoma.detected ? 'text-red-500' : 'text-green-500'}`}>
                              {results.glaucoma.severity}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Probability:</span>
                            <span className="font-semibold text-foreground">
                              {results.glaucoma.probability}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Confidence:</span>
                            <span className="font-semibold text-foreground">
                              {results.glaucoma.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground mt-4">
                        ⚠️ This is an AI-assisted tool and should not replace professional medical diagnosis.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-6">
                      Our Grad-CAM visualization highlights the regions of interest that the model 
                      focuses on when making predictions, providing transparency and trust.
                    </p>
                    <img
                      src={gradcamSample}
                      alt="Grad-CAM heatmap visualization"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">DR Detection:</span>
                        <span className="font-semibold text-primary">Positive</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Glaucoma Detection:</span>
                        <span className="font-semibold text-accent">Negative</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Heatmap intensity indicates areas of highest concern for diagnosis.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;