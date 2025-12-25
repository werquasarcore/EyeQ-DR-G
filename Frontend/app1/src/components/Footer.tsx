const Footer = () => {
  return (
    <footer className="bg-card py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-primary mb-2">EyeQ-DR-G</div>
              <p className="text-sm text-muted-foreground">
                Advancing retinal disease detection with Explainable AI
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} EyeQ-DR-G Project</p>
              <p className="mt-1">Built for medical innovation and transparency</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
