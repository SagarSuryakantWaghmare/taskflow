import { Button } from "@/components/ui/button";
import { ArrowRight, CheckSquare } from "lucide-react";

export function CTASection() {
  // Simple navigation function
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="border-t bg-muted/40">
      <div className="container flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CheckSquare className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Ready to boost your productivity?
          </h2>
          
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Join thousands of users who have transformed their task management with TaskFlow. 
            Start your free trial today and experience the difference.
          </p>
          
          <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
            <Button size="lg" className="h-12 px-8" onClick={() => navigate('/signup')}>
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8">
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
