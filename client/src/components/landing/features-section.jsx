import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  Calendar, 
  User, 
  BarChart3, 
  Smartphone, 
  Shield,
  Zap,
  Folder,
  Bell,
  Grid,
  List,
  Archive,
  Target,
  Lock
} from "lucide-react";

const features = [
  {
    icon: CheckSquare,
    title: "Smart Task Management",
    description: "Create, edit, and organize tasks with priorities, categories, and due dates. Complete tasks with one click.",
    badge: "Core"
  },
  {
    icon: Grid,
    title: "Kanban Board View",
    description: "Visualize your tasks in a modern Kanban board with drag-and-drop functionality and status tracking.",
    badge: "Popular"
  },
  {
    icon: List,
    title: "List View",
    description: "Traditional list view with comprehensive task details, filters, and quick actions.",
    badge: "Core"
  },
  {
    icon: BarChart3,
    title: "Dashboard Analytics",
    description: "Track your productivity with real-time statistics - total, completed, overdue, and archived tasks.",
    badge: "Analytics"
  },
  {
    icon: Folder,
    title: "Category Management",
    description: "Organize tasks with custom categories and colors. Includes 4 default categories plus your own.",
    badge: "Core"
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Fully responsive design that works perfectly on mobile devices with touch-friendly interface.",
    badge: "Mobile"
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "JWT-based authentication with user isolation. Your data is private and secure.",
    badge: "Security"
  },
  {
    icon: Archive,
    title: "Task Archiving",
    description: "Archive completed tasks to keep your workspace clean while preserving important data.",
    badge: "Core"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Real-time notifications for task operations with success and error feedback.",
    badge: "Core"
  },
  {
    icon: Target,
    title: "Priority System",
    description: "Set task priorities (low, medium, high) with color-coded indicators for better organization.",
    badge: "Core"
  },
  {
    icon: Calendar,
    title: "Due Date Tracking",
    description: "Set and track due dates with calendar integration and overdue task highlighting.",
    badge: "Core"
  },
  {
    icon: Lock,
    title: "User Isolation",
    description: "Each user has their own private workspace with isolated tasks and categories.",
    badge: "Security"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className=" container space-y-6 bg-black py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
        <h2 className="text-center text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl text-white">
          Everything you need to stay <span className="text-blue-400">organized</span>
        </h2>
        <p className="max-w-[85%] text-center text-gray-400 sm:text-lg">
          TaskFlow comes with all the features you need to manage your tasks efficiently 
          and boost your productivity.
        </p>
      </div>
      
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
