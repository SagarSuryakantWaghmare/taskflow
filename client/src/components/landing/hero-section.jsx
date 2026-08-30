import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Star } from "lucide-react";
import image from "@/assets/image.png";
import { MacbookScroll } from "@/components/landing/macbook-scroll";
import { CheckSquare } from "lucide-react";
export function HeroSection() {
  // Simple navigation function
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="container z-1 relative bg-black">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-6 sm:py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 px-2 sm:px-0">
        {/* Badge */}
        <Badge variant="outline" className="mb-4 bg-blue-600 border-blue-600 text-white text-xs sm:text-sm px-3 py-1">
          <Star className="mr-1 h-3 w-3" />
          Completely Free Forever
        </Badge>

        {/* Heading */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-6xl font-bold leading-tight tracking-tighter lg:leading-[1.1] text-white">
          Organize your tasks.{" "}
          <span className="text-blue-400">Boost productivity.</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-[750px] text-center text-base sm:text-lg text-gray-400 sm:text-xl px-1">
          TaskFlow helps you manage your daily tasks, set priorities, and achieve your goals 
          with a beautiful and intuitive interface. No hidden costs, no limitations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-3 sm:space-x-4 py-4 md:pb-10">
          <Button size="lg" className="h-11 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/signup')}>
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-11 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => navigate('/about')}>
            <Heart className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400 mt-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">10K+</span>
            <span>Active Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">1M+</span>
            <span>Tasks Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">100%</span>
            <span>Free Forever</span>
          </div>
        </div>
      </div>
      {/* Macbook Scroll Section */}
      <div className="w-full rounded-lg overflow-hidden bg-white dark:bg-[#0B0B0F] mt-6 sm:mt-10">
      <MacbookScroll
        title={
          <span>
            TaskFlow: Modern Task Management for Everyone.<br />
            Built with ❤️ using Tailwind CSS.
          </span>
        }
        badge={
          <div className="h-10 w-10 -rotate-12 transform flex items-center justify-center bg-blue-600 rounded-full shadow-lg border-4 border-white">
             <CheckSquare className="text-blue-500 mr-3 transition-all duration-300 group-hover:text-blue-400 w-7 h-7" size={28} />
          </div>
        }
        src={image}
        showGradient={false}
      />
      </div>
    </section>
  );
}
