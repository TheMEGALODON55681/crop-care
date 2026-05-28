import Link from 'next/link';
import { Leaf, Github, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-green-950 text-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-7 w-7 text-green-400" />
              <span className="text-xl font-bold">Crop Care</span>
            </div>
            <p className="text-green-200 mb-5 max-w-md text-sm leading-relaxed">
              A precision-agriculture prototype: vision-based plant disease
              detection, soil-moisture monitoring, and an interactive farm map.
              Built as a Smart India Hackathon project.
            </p>
            <Link
              href="https://github.com/TheMEGALODON55681/crop-care"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-200 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              View source on GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-green-300 mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/"                  className="text-green-200 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/about"             className="text-green-200 hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link href="/services"          className="text-green-200 hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link href="/contact"           className="text-green-200 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-green-300 mb-4 text-sm uppercase tracking-wider">Try it</h3>
            <ul className="space-y-2">
              <li><Link href="/camera"            className="text-green-200 hover:text-white transition-colors text-sm">Disease Detection</Link></li>
              <li><Link href="/moisture-sensors"  className="text-green-200 hover:text-white transition-colors text-sm">Moisture Sensors</Link></li>
              <li><Link href="/"                  className="text-green-200 hover:text-white transition-colors text-sm">Interactive Map</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-green-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-green-400 text-xs">
              © {new Date().getFullYear()} Crop Care · Built for Smart India Hackathon
            </p>
            <p className="text-green-400 text-xs">
              Demo project — not for production use without further engineering
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
