# 🌱 Crop Care

> Plant disease detection and soil-moisture monitoring for smallholder farmers — built so a farmer with a phone can use it.

Crop Care is a precision-agriculture web app that brings vision-based plant disease detection, field-level soil-moisture monitoring, and an interactive farm map into one place. It started as a **Smart India Hackathon** prototype and has been rebuilt as a clean, production-oriented Next.js application.

<!-- Replace the line below with your deployed URL once it's live on Vercel -->
**🔗 Live demo:** _coming soon_

<!--
  Add screenshots here once deployed. Suggested:
  ![Home](./screenshots/home.png)
  ![Disease Detection](./screenshots/camera.png)
  ![Sensor Dashboard](./screenshots/sensors.png)
-->

---

## ✨ Features

| Feature | Status | Description |
| --- | --- | --- |
| 🔬 **Disease Detection** | ✅ Available | Drag-and-drop a leaf photo and get a diagnosis. Upload pipeline is fully wired with validation, preview, and confidence-scored results. |
| 💧 **Moisture Sensors** | ✅ Available | Field-level soil-moisture dashboard with status filtering (Active / Warning / Inactive), search, and battery tracking. |
| 🗺️ **Interactive Farm Map** | ✅ Available | Click any field or sensor to inspect it. Live-data mode with animated sensor pulses. |
| ☀️ **Weather Integration** | 🚧 Planned | Region-specific forecasts to inform irrigation and field-work scheduling. |
| 📊 **Analytics Dashboard** | 🚧 Planned | Trends over time across fields and sensors. |
| 🌾 **Crop Advisory** | 🚧 Planned | Stage-aware recommendations: when to irrigate, spray, and harvest. |

The app is honest about what's real: features still in development clearly say so in the UI, and demo data is labelled as demo data.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) + [Anime.js](https://animejs.com/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Maps:** [Google Maps](https://developers.google.com/maps) via `@googlemaps/react-wrapper`
- **Disease model (planned):** [Hugging Face Inference API](https://huggingface.co/inference-api)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/TheMEGALODON55681/crop-care.git
cd crop-care

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# then open .env.local and add your keys (see below)

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# Required for the contact-page map
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Planned — enables the /api/classify disease model
HUGGINGFACE_API_TOKEN=your_token_here
```

> The app runs fine without any keys — only the contact-page map needs the Google Maps key.

---

## 📁 Project Structure

```
crop-care/
├── app/
│   ├── api/classify/      # Disease-detection API route (scaffolded)
│   ├── camera/            # Leaf-scan disease detection UI
│   ├── moisture-sensors/  # Soil-moisture dashboard
│   ├── about/             # Project background
│   ├── services/          # Feature overview
│   ├── contact/           # Contact form + map
│   ├── login/ signup/     # Auth UI (backend planned)
│   ├── layout.tsx         # Root layout, metadata
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── InteractiveMap.tsx # Farm map (hook + subcomponents)
│   ├── Navbar.tsx
│   └── Footer.tsx
└── lib/                   # Utilities
```

---

## 🗺️ Roadmap

- [ ] Wire the Hugging Face plant-disease classifier into `/api/classify`
- [ ] Real authentication (the login/signup UI is ready for a backend)
- [ ] Live sensor ingestion via the NASA POWER agro API
- [ ] Weather integration (OpenWeather / NASA POWER)
- [ ] Analytics dashboard with per-field health timelines
- [ ] Crop advisory recommendations

---

## 📝 About

Crop Care was built for the **Smart India Hackathon** as a demonstration of accessible precision-agriculture tooling. The goal: put modern farm-tech in the hands of smallholder farmers without requiring expensive hardware or specialist training — just a phone and a network connection.

It's a learning project built like a product. What works ships; what doesn't is clearly labelled as a work in progress.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
