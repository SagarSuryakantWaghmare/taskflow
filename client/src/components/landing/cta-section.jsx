import { Button } from "@/components/ui/button";
import { ArrowRight, CheckSquare } from "lucide-react";

export function CTASection() {
  // Simple navigation function
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="border-t border-gray-800 bg-black">
      <div className="container flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 mb-4">
            <CheckSquare className="h-8 w-8 text-blue-400" />
          </div>
          
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-white">
            Ready to boost your <span className="text-blue-400">productivity</span>?
          </h2>
          
          <p className="max-w-[85%] text-gray-400 sm:text-lg">
            Join thousands of users who have transformed their task management with TaskFlow. 
            Start organizing your tasks today - completely free, no strings attached.
          </p>
          
          <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
            <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/signup')}>
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              Learn More
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            No credit card required • No hidden fees • No limitations • Free forever
          </p>
        </div>
      </div>
    </section>
  );
}
