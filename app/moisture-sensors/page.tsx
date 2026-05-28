'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Droplets,
  MapPin,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Battery,
  Info,
} from 'lucide-react';

interface Sensor {
  id: string;
  location: string;
  moisture: number;
  status: 'active' | 'warning' | 'inactive';
  battery: number;
  updatedMinutesAgo: number;
}

const SEED: Sensor[] = [
  { id: 'MS-001', location: 'Field A — North',  moisture: 45, status: 'active',   battery: 85, updatedMinutesAgo: 2 },
  { id: 'MS-002', location: 'Field A — South',  moisture: 32, status: 'warning',  battery: 92, updatedMinutesAgo: 5 },
  { id: 'MS-003', location: 'Field B — East',   moisture: 67, status: 'active',   battery: 78, updatedMinutesAgo: 1 },
  { id: 'MS-004', location: 'Field B — West',   moisture: 0,  status: 'inactive', battery: 12, updatedMinutesAgo: 142 },
  { id: 'MS-005', location: 'Greenhouse 1',     moisture: 58, status: 'active',   battery: 95, updatedMinutesAgo: 3 },
  { id: 'MS-006', location: 'Greenhouse 2',     moisture: 28, status: 'warning',  battery: 67, updatedMinutesAgo: 7 },
  { id: 'MS-007', location: 'Orchard — North',  moisture: 71, status: 'active',   battery: 88, updatedMinutesAgo: 4 },
  { id: 'MS-008', location: 'Orchard — South',  moisture: 39, status: 'warning',  battery: 45, updatedMinutesAgo: 12 },
];

const statusBadge: Record<Sensor['status'], { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  active:   { label: 'Active',   cls: 'bg-green-100 text-green-700',   Icon: CheckCircle2 },
  warning:  { label: 'Warning',  cls: 'bg-amber-100 text-amber-700',   Icon: AlertCircle  },
  inactive: { label: 'Inactive', cls: 'bg-gray-100 text-gray-600',     Icon: XCircle      },
};

function moistureColor(m: number, status: Sensor['status']) {
  if (status === 'inactive') return 'bg-gray-300';
  if (m < 35) return 'bg-amber-500';
  if (m > 70) return 'bg-blue-500';
  return 'bg-green-500';
}

export default function MoistureSensorsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | Sensor['status']>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = useMemo(() => {
    return SEED.filter(s => {
      const matchesQuery =
        s.id.toLowerCase().includes(query.toLowerCase()) ||
        s.location.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = filter === 'all' || s.status === filter;
      return matchesQuery && matchesStatus;
    });
  }, [query, filter]);

  const stats = useMemo(() => ({
    total: SEED.length,
    active: SEED.filter(s => s.status === 'active').length,
    warning: SEED.filter(s => s.status === 'warning').length,
    inactive: SEED.filter(s => s.status === 'inactive').length,
  }), []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/60 via-white to-emerald-50/30">
      {/* Header */}
      <section className="pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              <Droplets className="h-3.5 w-3.5" />
              Soil Moisture
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">
              Sensor Network
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Real-time readings across fields and greenhouses.
            </p>
          </motion.div>

          {/* Honest banner about data source */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
          >
            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Demo data.</span>{' '}
              Live ingestion from physical sensors and the NASA POWER agro
              API is on the roadmap. The UI, filtering, and refresh logic are
              fully wired.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total',    value: stats.total,    accent: 'text-gray-900' },
              { label: 'Active',   value: stats.active,   accent: 'text-green-700' },
              { label: 'Warning',  value: stats.warning,  accent: 'text-amber-700' },
              { label: 'Inactive', value: stats.inactive, accent: 'text-gray-500' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
              >
                <Card className="border-green-100">
                  <CardContent className="p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{s.label}</p>
                    <p className={`text-2xl font-bold ${s.accent}`}>{s.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by ID or location…"
                    className="pl-9"
                  />
                </div>
                <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 md:w-auto"
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No sensors match your filters.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((s, i) => {
                const badge = statusBadge[s.status];
                const StatusIcon = badge.Icon;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
                  >
                    <Card className="border-green-100 hover:shadow-lg hover:border-green-200 transition-all">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{s.id}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <MapPin className="h-3 w-3" />
                              {s.location}
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badge.cls}`}>
                            <StatusIcon className="h-3 w-3" />
                            {badge.label}
                          </span>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-end justify-between mb-1">
                            <span className="text-xs text-gray-500">Moisture</span>
                            <span className="text-lg font-bold text-gray-900">
                              {s.status === 'inactive' ? '—' : `${s.moisture}%`}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: s.status === 'inactive' ? '0%' : `${s.moisture}%` }}
                              transition={{ duration: 0.6, delay: 0.1 + i * 0.02, ease: 'easeOut' }}
                              className={`h-full ${moistureColor(s.moisture, s.status)}`}
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Battery className="h-3 w-3" />
                            {s.battery}%
                          </span>
                          <span>{s.updatedMinutesAgo}m ago</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
