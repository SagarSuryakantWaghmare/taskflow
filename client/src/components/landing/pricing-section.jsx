import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Unlimited Tasks",
    description: "Create as many tasks as you need without any restrictions"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with JWT authentication and user isolation"
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Access your tasks from any device with our responsive design"
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
        <h2 className="text-center text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl text-white">
          Completely Free Forever
        </h2>
        <p className="max-w-[85%] text-center text-gray-400 sm:text-lg">
          No hidden costs, no limitations, no credit card required. Everything you need to organize your tasks is completely free.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Card className="relative border-blue-600 bg-blue-600/10 backdrop-blur-sm">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="flex items-center gap-1 bg-blue-600 text-white">
              <Star className="h-3 w-3" />
              Free Forever
            </Badge>
          </div>
          
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white">TaskFlow</CardTitle>
            <CardDescription className="text-gray-300">Everything you need to stay organized</CardDescription>
            <div className="flex items-baseline justify-center gap-1 pt-4">
              <span className="text-5xl font-bold text-white">$0</span>
              <span className="text-gray-300 text-xl">/forever</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center p-4 rounded-lg bg-gray-900/50">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white text-center mb-4">What's Included:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Unlimited tasks and categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Kanban board and list views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Priority levels and due dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Task archiving and filtering</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Dashboard analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Mobile responsive design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Real-time notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Secure user authentication</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button 
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700" 
              size="lg"
              onClick={() => {
                window.history.pushState({}, '', '/signup');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              Get Started Free
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mx-auto max-w-[980px] text-center">
        <p className="text-sm text-gray-400">
          No credit card required • No hidden fees • No limitations • Free forever
        </p>
      </div>
    </section>
  );
}
