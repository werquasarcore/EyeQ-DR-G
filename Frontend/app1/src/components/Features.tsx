import { Eye, Brain, Activity, Zap, Network, Target } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Dual Detection",
      description: "Simultaneous detection of both Diabetic Retinopathy and Glaucoma using multi-label CNN architecture.",
    },
    {
      icon: Brain,
      title: "Explainable AI",
      description: "Grad-CAM heatmaps provide visual explanations showing exactly which retinal regions influenced the diagnosis.",
    },
    {
      icon: Activity,
      title: "Medical Insight",
      description: "Prioritizes high-risk patients and provides actionable insights for healthcare professionals.",
    },
    {
      icon: Zap,
      title: "GPU Training",
      description: "Fast and efficient model training leveraging modern GPU acceleration for rapid deployment.",
    },
    {
      icon: Network,
      title: "Transfer Learning",
      description: "Built on EfficientNetB0 pre-trained model for superior accuracy with limited medical imaging data.",
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "Trained on thousands of retinal images to achieve reliable and consistent diagnostic performance.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology for reliable and transparent retinal disease detection
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
