'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Upload,
  ImageIcon,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Camera,
} from 'lucide-react';

type Status =
  | { kind: 'idle' }
  | { kind: 'preview'; url: string; file: File }
  | { kind: 'classifying'; url: string }
  | { kind: 'result'; url: string; predictions: Array<{ label: string; score: number }> }
  | { kind: 'pending'; url: string; detail: string }
  | { kind: 'error'; message: string };

const ACCEPT = 'image/jpeg,image/png,image/webp';
const MAX_MB = 4;

export default function CameraPage() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setStatus({ kind: 'error', message: 'Please upload a JPEG, PNG, or WebP image.' });
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus({ kind: 'error', message: `Image is larger than ${MAX_MB} MB.` });
      return;
    }
    const url = URL.createObjectURL(file);
    setStatus({ kind: 'preview', url, file });
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const reset = () => {
    if (status.kind !== 'idle' && status.kind !== 'error' && 'url' in status) {
      URL.revokeObjectURL(status.url);
    }
    setStatus({ kind: 'idle' });
    if (inputRef.current) inputRef.current.value = '';
  };

  const classify = async () => {
    if (status.kind !== 'preview') return;
    const url = status.url;
    setStatus({ kind: 'classifying', url });

    try {
      const body = new FormData();
      body.append('image', status.file);
      const res = await fetch('/api/classify', { method: 'POST', body });
      const data = await res.json();

      if (res.status === 501) {
        setStatus({
          kind: 'pending',
          url,
          detail: data.detail ?? 'Model integration is on the roadmap.',
        });
        return;
      }

      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? `Request failed (${res.status})` });
        return;
      }

      setStatus({ kind: 'result', url, predictions: data.predictions ?? [] });
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/50">
      {/* Hero */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Disease Detection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Scan a leaf, get a diagnosis
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Upload a photo of a crop leaf and our model identifies the disease
            and severity. Built for smallholder farmers who need answers fast.
          </motion.p>
        </div>
      </section>

      {/* Upload / Result Surface */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <Card className="border-green-100 shadow-xl shadow-green-900/5 overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                {status.kind === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-8"
                  >
                    <label
                      htmlFor="leaf-upload"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={onDrop}
                      className={`
                        flex flex-col items-center justify-center
                        rounded-xl border-2 border-dashed
                        py-16 px-6 cursor-pointer transition-all
                        ${isDragging
                          ? 'border-green-500 bg-green-50 scale-[1.01]'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50/40'}
                      `}
                    >
                      <div className={`
                        p-4 rounded-full mb-4 transition-colors
                        ${isDragging ? 'bg-green-200' : 'bg-green-100'}
                      `}>
                        <Upload className="h-8 w-8 text-green-700" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-1">
                        Drop a leaf image here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        or click to browse — JPEG, PNG, WebP up to {MAX_MB} MB
                      </p>
                      <input
                        ref={inputRef}
                        id="leaf-upload"
                        type="file"
                        accept={ACCEPT}
                        className="sr-only"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFile(f);
                        }}
                      />
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                        <ImageIcon className="h-4 w-4" />
                        Choose file
                      </span>
                    </label>
                  </motion.div>
                )}

                {(status.kind === 'preview' || status.kind === 'classifying' || status.kind === 'pending' || status.kind === 'result') && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 md:p-8"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-gray-50 aspect-video">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={status.url}
                        alt="Uploaded leaf"
                        className="w-full h-full object-contain"
                      />
                      {status.kind === 'classifying' && (
                        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                          <Loader2 className="h-10 w-10 animate-spin mb-3" />
                          <p className="font-medium">Analyzing leaf…</p>
                        </div>
                      )}
                      <button
                        onClick={reset}
                        aria-label="Remove image"
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md transition"
                      >
                        <X className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>

                    <div className="mt-6">
                      {status.kind === 'preview' && (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            onClick={classify}
                            className="flex-1 bg-green-600 hover:bg-green-700 py-6 text-base"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Analyze leaf
                          </Button>
                          <Button onClick={reset} variant="outline" className="sm:w-auto py-6">
                            Choose another
                          </Button>
                        </div>
                      )}

                      {status.kind === 'classifying' && (
                        <p className="text-center text-gray-500 text-sm">
                          Sending to model…
                        </p>
                      )}

                      {status.kind === 'pending' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border border-amber-200 bg-amber-50 p-4"
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-amber-900 mb-1">
                                Model integration in progress
                              </p>
                              <p className="text-sm text-amber-800 mb-3">
                                {status.detail} The upload pipeline is fully
                                wired &mdash; only the inference call is pending.
                              </p>
                              <Button
                                onClick={reset}
                                variant="outline"
                                size="sm"
                                className="border-amber-300 text-amber-900 hover:bg-amber-100"
                              >
                                Try another image
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {status.kind === 'result' && status.predictions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="h-5 w-5" />
                            <p className="font-semibold">Analysis complete</p>
                          </div>
                          {status.predictions.slice(0, 3).map((p, i) => (
                            <div key={p.label} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-900">{p.label}</span>
                                <span className="text-gray-500">
                                  {(p.score * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${p.score * 100}%` }}
                                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                                  className={i === 0 ? 'h-full bg-green-600' : 'h-full bg-green-300'}
                                />
                              </div>
                            </div>
                          ))}
                          <Button onClick={reset} variant="outline" className="mt-4 w-full">
                            Scan another leaf
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {status.kind === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-red-900 mb-1">Couldn&apos;t process that image</p>
                        <p className="text-sm text-red-800 mb-3">{status.message}</p>
                        <Button onClick={reset} variant="outline" size="sm" className="border-red-300 text-red-900 hover:bg-red-100">
                          Try again
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Helper grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Camera, title: 'Clear, well-lit photos', body: 'Daylight, one leaf, plain background.' },
              { icon: ImageIcon, title: 'Top side of the leaf', body: 'Capture both healthy and affected areas.' },
              { icon: Sparkles, title: 'Instant feedback', body: 'Results appear in seconds with confidence scores.' },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                className="rounded-xl border border-green-100 bg-white p-4"
              >
                <tip.icon className="h-5 w-5 text-green-600 mb-2" />
                <p className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</p>
                <p className="text-sm text-gray-600">{tip.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
