'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/AnimatedSection';
import { InteractiveMap } from '@/components/InteractiveMap';
import {
  Sprout,
  BarChart3,
  Droplets,
  Sun,
  ArrowRight,
  CheckCircle2,
  Camera,
  Wifi,
  LineChart,
} from 'lucide-react';

const features = [
  { icon: Camera,    title: 'Disease Detection',   description: 'Photograph a leaf and get a diagnosis. Built around a Hugging Face plant-disease classifier.' },
  { icon: Droplets,  title: 'Moisture Sensors',    description: 'Field-level soil moisture dashboard with status filtering and battery tracking.' },
  { icon: Sun,       title: 'Weather Integration', description: 'Region-specific forecasts to plan irrigation and field work. (Planned)' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Trends over time across all fields and sensors. (Planned)' },
];

const benefits = [
  'Catches diseases early, before they spread across a field',
  'Surfaces under-watered zones in one glance',
  'Works on a phone — no specialist hardware required',
  'Open architecture: any sensor or model can be plugged in',
];

export default function Home() {
  const heroBlobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroBlobRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const animation = anime({
      targets: heroBlobRef.current,
      translateX: [
        { value: 30,  duration: 5000 },
        { value: -20, duration: 5000 },
        { value: 0,   duration: 5000 },
      ],
      translateY: [
        { value: -20, duration: 4500 },
        { value: 25,  duration: 4500 },
        { value: 0,   duration: 4500 },
      ],
      scale: [
        { value: 1.08, duration: 6000 },
        { value: 0.96, duration: 6000 },
        { value: 1,    duration: 6000 },
      ],
      easing: 'easeInOutSine',
      loop: true,
    });

    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
        {/* Anime.js-driven ambient blob */}
        <div
          ref={heroBlobRef}
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-green-300/40 to-emerald-400/30 blur-3xl"
        />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-emerald-200/40 to-green-300/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-green-700 text-sm font-medium border border-green-200 mb-6"
              >
                <Sprout className="h-3.5 w-3.5" />
                Smart farming, accessible
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
              >
                Healthier crops,{' '}
                <span className="text-green-600 block lg:inline">smarter decisions.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-xl text-gray-600 mb-8 max-w-2xl"
              >
                Crop Care brings disease detection, soil-moisture monitoring, and
                weather data into one place — built so a smallholder farmer
                with a phone can use it.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3 shadow-lg shadow-green-600/20">
                  <Link href="/camera">
                    Try the leaf scanner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-green-600 text-green-700 hover:bg-green-50 text-lg px-8 py-3">
                  <Link href="/services">What we built</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 shadow-2xl shadow-green-900/20 p-1">
                <div className="w-full h-full rounded-[1.4rem] bg-gradient-to-br from-green-500/80 to-emerald-600/90 flex items-center justify-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
                  <div className="text-center relative z-10 px-6">
                    <Sprout className="h-24 w-24 mx-auto mb-4 drop-shadow-lg" />
                    <h3 className="text-2xl font-bold mb-2">Built for the field</h3>
                    <p className="text-green-50">Technology where it matters.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              What&apos;s inside
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Two features ship today; two more are scaffolded and on the roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <Card className="group h-full border-green-100 hover:border-green-300 hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-7">
                    <div className="inline-flex p-3 rounded-xl bg-green-50 group-hover:bg-green-100 transition-colors mb-4">
                      <feature.icon className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits */}
      <AnimatedSection className="py-20 bg-green-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Why this approach?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Most farm-tech assumes expensive hardware and dedicated staff.
                Crop Care assumes a phone and a network.
              </p>

              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/about">
                    The story behind it
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15} className="grid grid-cols-2 gap-4">
              {[
                { icon: Camera,    label: 'Disease Detection', sub: 'Vision-based',     accent: 'from-green-500 to-emerald-500' },
                { icon: Droplets,  label: 'Moisture Sensors',  sub: 'Field-level',      accent: 'from-emerald-500 to-teal-500' },
                { icon: Wifi,      label: 'Sensor Network',    sub: 'Pluggable',        accent: 'from-teal-500 to-cyan-500' },
                { icon: LineChart, label: 'Analytics',         sub: 'Trends over time', accent: 'from-cyan-500 to-blue-500' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-white border-green-100 hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${s.accent} text-white mb-3 shadow`}>
                        <s.icon className="h-5 w-5" />
                      </div>
                      <p className="font-semibold text-gray-900">{s.label}</p>
                      <p className="text-sm text-gray-500">{s.sub}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Interactive Map */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Your farm, at a glance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An interactive map of fields and sensors. Click around — every
              card and marker is live.
            </p>
          </div>

          <AnimatedSection>
            <InteractiveMap />
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
            Want to see it in action?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Scan a leaf, browse the sensor dashboard, or read about why we built it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-3 shadow-lg">
              <Link href="/camera">
                Try the scanner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-2 border-white text-lg px-8 py-3">
              <Link href="/about">About the project</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
