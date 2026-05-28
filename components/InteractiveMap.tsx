'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  RefreshCw,
  Eye,
} from 'lucide-react';

/* ----------------------------- Types & seed data ----------------------------- */

type SensorType = 'moisture' | 'temperature' | 'humidity' | 'wind';
type SensorStatus = 'good' | 'warning' | 'critical';
type FieldStatus = 'healthy' | 'needs-attention' | 'critical';

interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  value: number;
  unit: string;
  status: SensorStatus;
  position: { x: number; y: number }; // % of map
}

interface Field {
  id: string;
  name: string;
  crop: string;
  area: number; // hectares
  status: FieldStatus;
  position: { x: number; y: number };
  size:     { w: number; h: number };
}

const FIELDS: Field[] = [
  { id: 'f-A', name: 'Field A', crop: 'Wheat',    area: 4.2, status: 'healthy',         position: { x: 8,  y: 18 }, size: { w: 32, h: 24 } },
  { id: 'f-B', name: 'Field B', crop: 'Rice',     area: 3.1, status: 'needs-attention', position: { x: 48, y: 12 }, size: { w: 26, h: 28 } },
  { id: 'f-C', name: 'Field C', crop: 'Tomato',   area: 1.4, status: 'healthy',         position: { x: 12, y: 56 }, size: { w: 22, h: 28 } },
  { id: 'f-D', name: 'Field D', crop: 'Soybean',  area: 2.6, status: 'critical',        position: { x: 50, y: 56 }, size: { w: 30, h: 26 } },
];

const SENSORS: Sensor[] = [
  { id: 's-1', name: 'Moisture A',    type: 'moisture',    value: 78, unit: '%', status: 'good',     position: { x: 18, y: 28 } },
  { id: 's-2', name: 'Temp B',        type: 'temperature', value: 24, unit: '°C', status: 'good',    position: { x: 58, y: 22 } },
  { id: 's-3', name: 'Humidity C',    type: 'humidity',    value: 62, unit: '%', status: 'warning',  position: { x: 22, y: 68 } },
  { id: 's-4', name: 'Wind D',        type: 'wind',        value: 14, unit: 'km/h', status: 'good',  position: { x: 62, y: 68 } },
];

const SENSOR_ICON: Record<SensorType, typeof Droplets> = {
  moisture: Droplets,
  temperature: Thermometer,
  humidity: Sun,
  wind: Wind,
};

const FIELD_STYLE: Record<FieldStatus, { fill: string; ring: string; label: string }> = {
  healthy:           { fill: 'bg-green-200/70',  ring: 'ring-green-400',  label: 'Healthy'         },
  'needs-attention': { fill: 'bg-amber-200/70',  ring: 'ring-amber-400',  label: 'Needs attention' },
  critical:          { fill: 'bg-red-200/70',    ring: 'ring-red-400',    label: 'Critical'        },
};

const SENSOR_DOT: Record<SensorStatus, string> = {
  good:     'bg-green-500',
  warning:  'bg-amber-500',
  critical: 'bg-red-500',
};

/* ------------------------------- Live data hook ------------------------------ */

function useLiveSensorData(initial: Sensor[], live: boolean) {
  const [sensors, setSensors] = useState(initial);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setLastUpdate(new Date()); // initialize on client only to avoid SSR mismatch
  }, []);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setSensors(prev =>
        prev.map(s => {
          const jitter = (Math.random() - 0.5) * 4;
          const next = Math.max(0, +(s.value + jitter).toFixed(1));
          return { ...s, value: next };
        })
      );
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(id);
  }, [live]);

  return { sensors, lastUpdate };
}

/* ------------------------------- Subcomponents ------------------------------- */

function FieldShape({ field, selected, onSelect }: { field: Field; selected: boolean; onSelect: () => void }) {
  const style = FIELD_STYLE[field.status];
  return (
    <button
      onClick={onSelect}
      aria-label={`${field.name} — ${style.label}`}
      style={{
        left:  `${field.position.x}%`,
        top:   `${field.position.y}%`,
        width: `${field.size.w}%`,
        height:`${field.size.h}%`,
      }}
      className={`
        absolute rounded-lg border-2 border-white/60
        ${style.fill}
        ${selected ? `ring-4 ${style.ring}` : 'hover:ring-2 hover:ring-white/70'}
        transition-all duration-200
      `}
    >
      <span className="absolute top-1 left-2 text-xs font-semibold text-gray-800/90 drop-shadow-sm">
        {field.name}
      </span>
    </button>
  );
}

function SensorMarker({ sensor, selected, onSelect }: { sensor: Sensor; selected: boolean; onSelect: () => void }) {
  const Icon = SENSOR_ICON[sensor.type];
  return (
    <button
      onClick={onSelect}
      aria-label={sensor.name}
      style={{ left: `${sensor.position.x}%`, top: `${sensor.position.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
    >
      <span className={`absolute inset-0 rounded-full ${SENSOR_DOT[sensor.status]} opacity-40 animate-ping`} />
      <span className={`
        relative inline-flex items-center justify-center
        h-8 w-8 rounded-full ${SENSOR_DOT[sensor.status]} text-white shadow-lg
        ${selected ? 'ring-4 ring-white scale-110' : 'group-hover:scale-110'}
        transition-transform
      `}>
        <Icon className="h-4 w-4" />
      </span>
    </button>
  );
}

/* ---------------------------------- Main ----------------------------------- */

export function InteractiveMap() {
  const [selectedField, setSelectedField] = useState<string | null>('f-A');
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  const { sensors, lastUpdate } = useLiveSensorData(SENSORS, live);

  const activeField  = useMemo(() => FIELDS.find(f => f.id === selectedField)  ?? null, [selectedField]);
  const activeSensor = useMemo(() => sensors.find(s => s.id === selectedSensor) ?? null, [sensors, selectedSensor]);

  return (
    <Card className="overflow-hidden border-green-100 shadow-xl shadow-green-900/5">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
          {/* Map surface */}
          <div className="relative aspect-[5/4] lg:aspect-auto lg:min-h-[460px] bg-gradient-to-br from-emerald-50 via-lime-50 to-green-100 overflow-hidden">
            {/* subtle grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,100,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,0,0.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {FIELDS.map(f => (
              <FieldShape
                key={f.id}
                field={f}
                selected={selectedField === f.id}
                onSelect={() => { setSelectedField(f.id); setSelectedSensor(null); }}
              />
            ))}
            {sensors.map(s => (
              <SensorMarker
                key={s.id}
                sensor={s}
                selected={selectedSensor === s.id}
                onSelect={() => { setSelectedSensor(s.id); setSelectedField(null); }}
              />
            ))}

            {/* Top-left chip */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-green-200 text-xs text-gray-700">
              <span className={`h-2 w-2 rounded-full ${live ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              {live ? 'Live' : 'Paused'}
              {lastUpdate && (
                <span className="text-gray-500">
                  · {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Side panel */}
          <div className="border-t lg:border-t-0 lg:border-l border-green-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Details</h3>
              <Button
                size="sm"
                variant={live ? 'default' : 'outline'}
                onClick={() => setLive(v => !v)}
                className={live ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 text-green-700 hover:bg-green-50'}
              >
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${live ? 'animate-spin' : ''}`} />
                {live ? 'Live' : 'Go live'}
              </Button>
            </div>

            <motion.div
              key={selectedField ?? selectedSensor ?? 'empty'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {activeField && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Field</p>
                  <p className="text-xl font-bold text-gray-900">{activeField.name}</p>
                  <p className="text-sm text-gray-600">
                    {activeField.crop} · {activeField.area} ha
                  </p>
                  <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full
                    ${activeField.status === 'healthy' ? 'bg-green-100 text-green-700' :
                      activeField.status === 'needs-attention' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'}`}>
                    {FIELD_STYLE[activeField.status].label}
                  </span>
                </div>
              )}

              {activeSensor && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Sensor</p>
                  <p className="text-xl font-bold text-gray-900">{activeSensor.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{activeSensor.type}</p>
                  <p className="mt-2 text-3xl font-bold text-green-700">
                    {activeSensor.value}
                    <span className="text-base text-gray-500 ml-1">{activeSensor.unit}</span>
                  </p>
                </div>
              )}

              {!activeField && !activeSensor && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Eye className="h-4 w-4 text-green-600 mt-0.5" />
                  <p>Tap a field or sensor on the map to see details.</p>
                </div>
              )}
            </motion.div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
              Map data is illustrative. Live ingestion is part of the roadmap.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
