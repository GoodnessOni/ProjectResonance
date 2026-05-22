export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <a
              href="#predict"
              className="block text-gray-400 text-sm hover:text-white mb-2 transition"
            >
              Predict
            </a>
            <a
              href="#audience"
              className="block text-gray-400 text-sm hover:text-white transition"
            >
              Find Audience
            </a>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <a
              href="#about"
              className="block text-gray-400 text-sm hover:text-white mb-2 transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-400 text-sm hover:text-white transition"
            >
              Contact
            </a>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <a
              href="#docs"
              className="block text-gray-400 text-sm hover:text-white mb-2 transition"
            >
              Docs
            </a>
            <a
              href="#blog"
              className="block text-gray-400 text-sm hover:text-white transition"
            >
              Blog
            </a>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <a
              href="#github"
              className="block text-gray-400 text-sm hover:text-white mb-2 transition"
            >
              GitHub
            </a>
            <a
              href="#twitter"
              className="block text-gray-400 text-sm hover:text-white transition"
            >
              Twitter
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-600 text-sm text-center">
            © 2026 ProjectResonance. Built by Team Squadnovate.
          </p>
        </div>
      </div>
    </footer>
  );
}
