# McPrime Digital website

Next.js 16 (App Router, Turbopack) site for [mcprimedigital.com](https://www.mcprimedigital.com), deployed on Vercel. Films live in a Cloudflare R2 bucket.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the values from Vercel → Settings → Environment Variables
npm run dev
```

`npm run check` runs the TypeScript compiler and ESLint; `npm run build` runs it automatically first, so a lint or type error fails the Vercel build on purpose.

## Environment variables

See `.env.example`. The admin area refuses to start without `JWT_SECRET`; it never falls back to a built-in secret. `R2_PUBLIC_BASE_URL` switches film delivery from 2-hour presigned URLs to long-lived CDN URLs and should point at the bucket's custom domain or `r2.dev` URL once public access is enabled in Cloudflare.

## Media pipeline

Objects in the bucket follow one layout:

| Prefix | Purpose |
|---|---|
| `videos/<category>/<name>.mp4` | 1080p H.264 web deliverable, what the theaters play |
| `previews/<category>/<name>.mp4` | short muted loop for card thumbnails (1–2 MB) |
| `posters/<category>/<name>.jpg` | still frame shown before any video bytes load |
| `masters/<category>/<name>.mp4` | original upload, archived, never served |

Categories in use: `home-hero`, `filmmaking-portfolio`, `addons-creations`.

Card thumbnails render the poster and only stream the preview clip while on screen (`components/media/InViewVideo.tsx`). The full film loads only when a theater opens. Never autoplay full films or download them into memory; that was the cause of 500 MB page loads.

### Publishing new films

1. Export the master, then encode web assets with ffmpeg (adjust the preview window to the best 10–12 seconds):

   ```bash
   ffmpeg -i master.mp4 -vf "scale='min(1920,iw)':-2,fps=30" -c:v libx264 -preset slow -crf 23 -maxrate 6M -bufsize 12M -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart encoded/videos/<category>/<name>.mp4
   ffmpeg -ss 0 -t 12 -i master.mp4 -vf "scale='min(1280,iw)':-2,fps=24" -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart encoded/previews/<category>/<name>.mp4
   ffmpeg -ss 2 -i master.mp4 -frames:v 1 -vf "scale='min(1280,iw)':-2" -q:v 3 encoded/posters/<category>/<name>.jpg
   ```

2. Publish everything in one go (uses the R2 keys if present, otherwise logs into the site with the admin credentials):

   ```bash
   node --env-file=.env.local scripts/media-sync.mjs encoded --dry-run
   node --env-file=.env.local scripts/media-sync.mjs encoded
   ```

   When a deliverable key already exists with a different size, the remote object is copied to `masters/` before it is replaced.

Single files can also be uploaded from `/admin/upload` (web encodes only, 300 MB cap); run the sync script afterwards to add their preview and poster.

## Routes of note

- `proxy.ts` redirects the `*.vercel.app` alias and the bare apex to `www` in production and guards `/admin` and the mutating media APIs.
- `/api/videos` is the public, CDN-cached catalogue; `?fresh=1` bypasses the cache for admins.
- `/api/contact` and `/api/auth/login` are rate limited; the contact form carries a honeypot field.
- `app/robots.ts`, `app/sitemap.ts` and `app/opengraph-image.tsx` generate the SEO files; every page exports its own metadata from a server `page.tsx` that renders the `*Client.tsx` component.
