import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Target, Eye, Heart, Leaf, ArrowRight, Sprout } from 'lucide-react';

const values = [
  { icon: Leaf,   title: 'Accessible',    description: 'Built so any farmer with a phone can use it — no specialist hardware.' },
  { icon: Target, title: 'Focused',       description: 'We pick a few problems and solve them well rather than promising everything.' },
  { icon: Eye,    title: 'Transparent',   description: 'What works ships; what doesn\u2019t is clearly labelled as work-in-progress.' },
  { icon: Heart,  title: 'Practical',     description: 'Designed around what a smallholder actually needs in the field, not a demo reel.' },
];

const principles = [
  'A leaf scanner that runs on a phone camera, no app install needed',
  'Sensor data accessible from any browser, in any language',
  'Open architecture: bring your own sensor, model, or backend',
  'Honest UX: tell the user what\u2019s real data and what\u2019s a placeholder',
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/40">
      {/* Hero */}
      <AnimatedSection className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <Sprout className="h-3.5 w-3.5" />
            About the project
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            A student project, built like a product.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crop Care started as a Smart India Hackathon submission and grew into
            a working prototype for accessible farm monitoring. It&apos;s not a SaaS
            yet — it&apos;s a demonstration of how the pieces fit together.
          </p>
        </div>
      </AnimatedSection>

      {/* Mission / Vision */}
      <AnimatedSection className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-100">
              <CardContent className="p-8">
                <div className="inline-flex p-3 rounded-xl bg-green-50 mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Put modern precision-agriculture tools into the hands of
                  smallholder farmers, without requiring expensive equipment or
                  specialist training.
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-100">
              <CardContent className="p-8">
                <div className="inline-flex p-3 rounded-xl bg-green-50 mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Approach</h2>
                <p className="text-gray-600 leading-relaxed">
                  Start with two features that genuinely help — vision-based
                  disease detection and soil-moisture monitoring — then expand
                  the platform around them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className="py-16 bg-green-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              What we care about
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.08}>
                <Card className="h-full border-green-100 hover:border-green-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex p-2.5 rounded-lg bg-green-100 mb-3">
                      <v.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-600">{v.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Principles */}
      <AnimatedSection className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Design principles
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Crop Care is opinionated about a few things. These principles
                guide what gets built and what gets cut.
              </p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/services">
                  See what we built
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <ul className="space-y-3">
              {principles.map((p, i) => (
                <AnimatedSection key={p} delay={i * 0.08}>
                  <li className="flex items-start gap-3 p-4 rounded-lg bg-white border border-green-100">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-700 text-sm font-semibold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{p}</span>
                  </li>
                </AnimatedSection>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            Curious what it actually does?
          </h2>
          <p className="text-lg text-green-50 mb-6">
            The leaf scanner is the most fun place to start.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
            <Link href="/camera">
              Try the scanner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
