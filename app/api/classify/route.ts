import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/classify
 *
 * Plant-disease classification endpoint.
 *
 * Status: scaffolded. The route accepts a multipart upload and validates it,
 * but the actual model call is intentionally not wired yet (see README →
 * Roadmap). When you're ready to enable it, drop a Hugging Face Inference
 * API call into the marked TODO block and set HUGGINGFACE_API_TOKEN.
 *
 * Why this exists as a stub: it lets the /camera UI ship a real
 * upload-and-handle flow today, so wiring the model later is one diff
 * instead of a refactor.
 */

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Expected multipart/form-data' },
      { status: 400 }
    );
  }

  const file = formData.get('image');
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'Missing "image" file field' },
      { status: 400 }
    );
  }

  if (!ACCEPTED.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type ${file.type}. Use JPEG, PNG, or WebP.` },
      { status: 415 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${file.size} bytes). Max ${MAX_BYTES}.` },
      { status: 413 }
    );
  }

  // -------------------------------------------------------------------
  // TODO: model integration (planned)
  //
  // Example (commented) Hugging Face Inference API call:
  //
  //   const token = process.env.HUGGINGFACE_API_TOKEN;
  //   if (!token) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  //
  //   const buf = Buffer.from(await file.arrayBuffer());
  //   const hf = await fetch(
  //     'https://api-inference.huggingface.co/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification',
  //     { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: buf }
  //   );
  //   if (!hf.ok) return NextResponse.json({ error: 'Model unavailable' }, { status: 502 });
  //   const predictions = await hf.json();
  //   return NextResponse.json({ predictions });
  // -------------------------------------------------------------------

  return NextResponse.json(
    {
      error: 'Classifier not yet enabled',
      detail:
        'The disease-detection model is on the roadmap. The upload pipeline ' +
        'is wired and validated; only the model call is pending.',
    },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json({
    name: 'crop-care classifier',
    status: 'scaffolded',
    accepts: ACCEPTED,
    maxBytes: MAX_BYTES,
  });
}
