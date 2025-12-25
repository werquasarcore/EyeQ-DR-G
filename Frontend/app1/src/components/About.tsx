import dualDetectionImage from "../assets/dual-detection.png";

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              About EyeQ-DR-G
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing early detection of vision-threatening diseases
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  The Problem
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Diabetic Retinopathy (DR) and Glaucoma are leading causes of irreversible vision loss worldwide.
                  Early detection is critical, but manual screening is time-consuming and requires specialized expertise.
                  Many cases go undiagnosed until vision loss becomes severe.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Our Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  EyeQ-DR-G uses advanced deep learning to simultaneously detect both Diabetic Retinopathy and Glaucoma
                  from retinal images. Our Explainable AI approach with Grad-CAM visualization provides transparent,
                  interpretable results that medical professionals can trust and understand.
                </p>
              </div>
            </div>

            <div className="animate-scale-in">
              <div className="gradient-card rounded-2xl p-8 shadow-card">
                <img
                  src={dualDetectionImage}
                  alt="Dual detection process visualization"
                  className="w-full h-auto rounded-lg object-contain"
                />
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Simultaneous detection process for DR and Glaucoma
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
