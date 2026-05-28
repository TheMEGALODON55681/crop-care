import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedSection } from '@/components/AnimatedSection';
import {
  Camera,
  Droplets,
  Sun,
  BarChart3,
  Sprout,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';

type Status = 'ready' | 'planned';

const services: Array<{
  icon: typeof Camera;
  title: string;
  description: string;
  status: Status;
  href?: string;
  features: string[];
}> = [
  {
    icon: Camera,
    title: 'Disease Detection',
    description: 'Photograph a leaf, get a diagnosis. Powered by a Hugging Face plant-disease classifier.',
    status: 'ready',
    href: '/camera',
    features: ['Drag-and-drop or browse upload', 'Top-3 predictions with confidence scores', 'Works with phone-camera photos', 'Validated upload pipeline'],
  },
  {
    icon: Droplets,
    title: 'Moisture Sensors',
    description: 'Field-level soil moisture dashboard with status filtering and battery tracking.',
    status: 'ready',
    href: '/moisture-sensors',
    features: ['Real-time status (Active / Warning / Inactive)', 'Search and filter by location or status', 'Battery level monitoring', 'Animated value bars'],
  },
  {
    icon: MapPin,
    title: 'Interactive Farm Map',
    description: 'Visualize fields, crops, and sensors on a single canvas. Click any element to inspect.',
    status: 'ready',
    href: '/',
    features: ['Field health states', 'Live sensor pulse animation', 'Toggleable live-data mode', 'Clean side-panel details'],
  },
  {
    icon: Sun,
    title: 'Weather Integration',
    description: 'Region-specific forecasts to inform irrigation and field-work scheduling.',
    status: 'planned',
    features: ['7-day forecasts via OpenWeather/NASA POWER', 'Frost and storm alerts', 'Historical climate baselines', 'Per-field weather pinning'],
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Trends over time across fields and sensors — moisture, weather, and disease incidents.',
    status: 'planned',
    features: ['Per-field health timelines', 'Anomaly detection', 'Exportable reports', 'Customizable date ranges'],
  },
  {
    icon: Sprout,
    title: 'Crop Advisory',
    description: 'Stage-aware recommendations: when to irrigate, when to spray, when to harvest.',
    status: 'planned',
    features: ['Growth-stage tracking', 'Treatment recommendations', 'Localized to crop and region', 'Push notifications'],
  },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === 'ready') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
        <CheckCircle2 className="h-3 w-3" />
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
      <Clock className="h-3 w-3" />
      Planned
    </span>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/40">
      {/* Hero */}
      <AnimatedSection className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <Sprout className="h-3.5 w-3.5" />
            What we built
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Tools, not promises
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Three features ship today. Three more are on the roadmap with the
            UI already scaffolded — you can see exactly where we&apos;re going.
          </p>
        </div>
      </AnimatedSection>

      {/* Service grid */}
      <AnimatedSection className="py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.05}>
                <Card className="h-full border-green-100 hover:border-green-300 hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex p-3 rounded-xl bg-green-50">
                        <s.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <StatusBadge status={s.status} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                      {s.description}
                    </p>
                    <ul className="space-y-1.5 mb-5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {s.status === 'ready' && s.href ? (
                      <Button asChild variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 w-full">
                        <Link href={s.href}>
                          Open
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="text-xs text-center text-gray-400 py-2 border border-dashed border-gray-200 rounded-md">
                        Roadmap
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            See it for yourself
          </h2>
          <p className="text-lg text-green-50 mb-6">
            Two minutes with the leaf scanner is more useful than this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
              <Link href="/camera">
                Disease Detection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-2 border-white">
              <Link href="/moisture-sensors">
                Sensor Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
