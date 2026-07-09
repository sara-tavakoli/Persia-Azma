# Persia Azma System

Website for Persia Azma System — a Shiraz-based calibration and quality-control
consultancy for medical, imaging, and industrial/laboratory equipment.

Bilingual (Persian/English, RTL/LTR), built on Next.js + Firestore, deployed on Vercel.

## Stack

- Next.js 16 (App Router) + TypeScript
- next-intl for i18n/RTL routing (`/fa`, `/en`)
- Tailwind CSS v4 + shadcn/ui (Base UI)
- Firebase: Firestore, Auth, Storage
- react-hook-form + zod for forms

## Development

```bash
npm install
npm run dev
```

Requires `.env.local` with Firebase client + Admin SDK credentials (not committed —
see `.gitignore`). Firestore/Auth/Storage are provisioned under the `persia-azma`
Firebase project.
