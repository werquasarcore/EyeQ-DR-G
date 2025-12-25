import Navigation from "./components/Navigation";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer"; 
import FeatureCard from "./components/FeatureCard";
import Dataset from "./components/Dataset";
import Features from "./components/Features";
import Hero from "./components/Hero";
import { Star } from "lucide-react";
import Demo from "./components/Demo";
function App() {
  return (
    <div className="App">
      <Hero />
      <Navigation />
      <main>
        <About />
        <FeatureCard
          icon={Star}
          title="Sample Feature"
          description="This is a sample feature description."
        />
        <Dataset />
        <Features />
        <Demo />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
