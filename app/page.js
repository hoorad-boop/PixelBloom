import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100">
      {/* Header */}
      <header className="p-4 sm:p-6 bg-gradient-to-r from-blue-200/90 via-pink-200/90 to-orange-200/90 shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/white-flower.png" 
              alt="white flower" 
              width={40} 
              height={40}
              className="w-8 sm:w-10"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              PixelBloom
            </span>
          </div>
          <UserButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-orange-400 to-pink-400 
              bg-clip-text text-transparent">
              Design For Fun
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mt-4">
            Create beautiful designs with ease using our tools and templates.
          </p>
          <Link 
            href="/workspace"
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-blue-400 
              hover:bg-blue-500 text-white rounded-full font-medium 
              transition-all duration-200 border-2 border-blue-500 
              hover:border-blue-600 hover:scale-105"
          >
            Start Creating
          </Link>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-white/80 shadow-md border border-blue-200 
                hover:shadow-lg transition-all duration-200 group"
            >
              <div className="p-3 rounded-xl bg-orange-200 w-fit group-hover:bg-orange-300
                transition-colors">
                <feature.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r 
            from-blue-200 via-orange-200 to-pink-200 shadow-lg text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto">
              Join thousands of creators who trust PixelBloom for their design ideas.
            </p>
            <Link 
              href="/workspace"
              className="inline-flex items-center gap-2 px-6 py-3
                bg-gray-900 hover:bg-gray-800 text-white rounded-full 
                font-medium transition-all duration-200 hover:scale-105"
            >
              Get Started Now
            </Link>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="space-y-4">
            <p className="text-gray-600">
              Made with 💖 by creative minds for creative minds
            </p>
            <a
              href="https://github.com/hoorad-boop/PixleBloom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 
                bg-gray-800 hover:bg-gray-700 text-white rounded-full 
                font-medium transition-all duration-200 text-sm hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Join us on GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
 
// TODO: Replace with actual icons
const features = [
  {
    icon: () => <div className="w-6 h-6 bg-blue-400 rounded-full" />,
    title: "Templates for Everyone",
    description: "Choose from a variety of templates to get started quickly."
  },
  {
    icon: () => <div className="w-6 h-6 bg-orange-400 rounded-full" />,
    title: "Simple Tools",
    description: "Easy-to-use tools that make designing fun and stress-free."
  },
  {
    icon: () => <div className="w-6 h-6 bg-pink-400 rounded-full" />,
    title: "Export in Seconds",
    description: "Download your designs instantly."
  }
];
