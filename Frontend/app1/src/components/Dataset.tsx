import { Database, ExternalLink, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";

const Dataset = () => {
  return (
    <section id="dataset" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Training Dataset
            </h2>
            <p className="text-lg text-muted-foreground">
              Powered by comprehensive medical imaging data
            </p>
          </div>

          <div className="gradient-card rounded-2xl p-8 shadow-card animate-scale-in">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  ODIR-5K Dataset
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our model is trained on the ODIR-5K (Ocular Disease Intelligent Recognition) dataset, 
                  a comprehensive collection of annotated fundus photographs covering various retinal conditions 
                  including Diabetic Retinopathy and Glaucoma.
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open("https://www.kaggle.com/datasets/andrewmvd/ocular-disease-recognition-odir5k", "_blank")}
                >
                  View on Kaggle
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-background/50 rounded-xl">
                <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">5,000+</div>
                <div className="text-sm text-muted-foreground">Retinal Images</div>
              </div>
              <div className="text-center p-6 bg-background/50 rounded-xl">
                <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">8</div>
                <div className="text-sm text-muted-foreground">Disease Classes</div>
              </div>
              <div className="text-center p-6 bg-background/50 rounded-xl">
                <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">10,000+</div>
                <div className="text-sm text-muted-foreground">Annotations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dataset;
