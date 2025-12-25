import { Button } from "../components/ui/button";
import heroImage from "../assets/hero-retina.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Retinal scan background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Dual Detection of{" "}
            <span className="text-white font-semibold">Diabetic Retinopathy</span> &{" "}
            <span className="text-white font-semibold">Glaucoma</span> with Explainable AI
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8 leading-relaxed">
            Accurate, fast, and transparent retinal disease diagnosis powered by deep learning and Grad-CAM visualization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gradient-hero text-white hover:opacity-90 transition-opacity text-lg px-8"
              onClick={() => scrollToSection("#demo")}
            >
              Try Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8"
              onClick={() => scrollToSection("#about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade (optional, can remove if you want) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
