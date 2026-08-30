
import { CheckSquare, Github, Linkedin, Mail, ExternalLink, Heart, Zap, Code, Database, Smartphone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sagar from "@/assets/sagar.jpg";

export default function AboutPage() {
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
            <span className="font-bold text-3xl ml-4">TaskFlow</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-blue-400">TaskFlow</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A modern task management application designed to help you stay organized, 
            boost productivity, and achieve your goals with a beautiful and intuitive interface.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the <span className="text-blue-400">Developer</span>
            </h2>
            <p className="text-lg text-gray-300">
              TaskFlow is crafted with passion and dedication by a skilled developer
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center mx-auto md:mx-0 mb-6 border-4 border-blue-500/40 shadow-lg">
                  <img
                    src={Sagar}
                    alt="Sagar Waghmare"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Sagar Suryakant Waghmare</h3>
                <p className="text-blue-400 mb-4">Full Stack Developer</p>
                <p className="text-gray-300 mb-6">
                  A passionate developer with expertise in modern web technologies. 
                  Specializing in React, Node.js, and MongoDB to create seamless user experiences.
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a 
                    href="https://github.com/SagarSuryakantWaghmare" 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/sagarwaghmare44" 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="mailto:sagarwaghmare1384@gmail.com" 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-400" />
                    Frontend Development
                  </h4>
                  <p className="text-gray-300 text-sm">
                    React.js, Tailwind CSS, Modern UI/UX Design, Responsive Web Development
                  </p>
                </div>

                <div className="bg-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-400" />
                    Backend Development
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Node.js, Express.js, MongoDB, RESTful APIs, Authentication & Security
                  </p>
                </div>

                <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-700/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-green-400" />
                    Mobile & Responsive
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Mobile-First Design, Progressive Web Apps, Cross-Platform Development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why <span className="text-blue-400">TaskFlow</span>?
            </h2>
            <p className="text-lg text-gray-300">
              Built with modern technologies and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Fast & Responsive</h3>
              <p className="text-gray-300 text-sm">
                Optimized for speed with modern React and efficient state management
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-300 text-sm">
                JWT authentication and user isolation ensure your data stays private
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Mobile Ready</h3>
              <p className="text-gray-300 text-sm">
                Fully responsive design that works perfectly on all devices
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="font-semibold mb-2">Modern Stack</h3>
              <p className="text-gray-300 text-sm">
                Built with React, Node.js, MongoDB, and Tailwind CSS
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="font-semibold mb-2">Open Source</h3>
              <p className="text-gray-300 text-sm">
                Available on GitHub for community contributions and learning
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Free Forever</h3>
              <p className="text-gray-300 text-sm">
                Completely free with no hidden costs or limitations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-700/30 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-6">
              Join thousands of users who have transformed their task management with TaskFlow
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 