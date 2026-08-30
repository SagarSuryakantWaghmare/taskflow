import { Button } from "@/components/ui/button";

export default function TermsPage() {
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-6 sm:py-10">
      <section className="container mx-auto px-2 sm:px-4">
        <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-4 sm:p-8 md:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center">
            Terms <span className="text-blue-400">of Service</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 text-center">
            By using TaskFlow, you agree to the following terms. Please read them carefully.
          </p>
          <div className="divide-y divide-gray-800">
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Use of Service</h2>
              <p className="text-gray-300 text-sm sm:text-base">TaskFlow is provided for personal and professional task management. You agree not to misuse the service or attempt to disrupt its operation.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Account Responsibility</h2>
              <p className="text-gray-300 text-sm sm:text-base">You are responsible for maintaining the confidentiality of your account and password. You agree to notify us of any unauthorized use.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Content Ownership</h2>
              <p className="text-gray-300 text-sm sm:text-base">You retain ownership of your tasks and data. TaskFlow does not claim any rights over your content.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Limitation of Liability</h2>
              <p className="text-gray-300 text-sm sm:text-base">TaskFlow is provided "as is" without warranties. We are not liable for any damages resulting from the use of the service.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Changes to Terms</h2>
              <p className="text-gray-300 text-sm sm:text-base">We may update these terms from time to time. Continued use of TaskFlow means you accept any changes.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Contact</h2>
              <p className="text-gray-300 text-sm sm:text-base">If you have any questions about these terms, contact us at <a href="mailto:sagarwaghmare1384@gmail.com" className="text-blue-400 underline">sagarwaghmare1384@gmail.com</a>.</p>
            </div>
          </div>
          <div className="flex justify-center mt-8 sm:mt-10">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow w-full sm:w-auto"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
