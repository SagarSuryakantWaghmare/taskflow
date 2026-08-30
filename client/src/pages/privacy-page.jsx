import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-6 sm:py-10">
      <section className="container mx-auto px-2 sm:px-4">
        <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-4 sm:p-8 md:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center">
            Privacy <span className="text-blue-400">Policy</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 text-center">
            Your privacy is important to us. TaskFlow is committed to protecting your personal information and ensuring transparency in how your data is handled.
          </p>
          <div className="divide-y divide-gray-800">
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Information Collection</h2>
              <p className="text-gray-300 text-sm sm:text-base">We collect only the information necessary to provide our services, such as your email address and tasks. We do not sell or share your data with third parties.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Data Security</h2>
              <p className="text-gray-300 text-sm sm:text-base">Your data is stored securely using modern encryption and security practices. Only you have access to your tasks and account information.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Cookies</h2>
              <p className="text-gray-300 text-sm sm:text-base">We use cookies for authentication and session management. These cookies are never used for tracking or advertising purposes.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">User Control</h2>
              <p className="text-gray-300 text-sm sm:text-base">You can update or delete your account and data at any time from your profile settings.</p>
            </div>
            <div className="py-4 sm:py-6">
              <h2 className="font-bold text-white mb-2 text-base sm:text-lg">Contact</h2>
              <p className="text-gray-300 text-sm sm:text-base">If you have any questions about privacy, contact us at <a href="mailto:sagarwaghmare1384@gmail.com" className="text-blue-400 underline">sagarwaghmare1384@gmail.com</a>.</p>
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
