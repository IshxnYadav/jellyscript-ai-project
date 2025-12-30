
# Deploying JellyScript AI to Cloudflare Pages

To make this app fully functional and live on the internet using Cloudflare, follow these exact steps:

### 1. Prepare for Deployment
- Ensure you have a GitHub repository for your code.
- Ensure your `API_KEY` is ready from Google AI Studio (ai.google.dev).

### 2. Connect to Cloudflare Pages
1. Log in to your **Cloudflare Dashboard**.
2. Go to **Workers & Pages** -> **Create application** -> **Pages**.
3. Select **Connect to Git** and pick your repository.

### 3. Build Settings
- **Framework Preset:** `Create React App` (or `None` if configuring manually).
- **Build command:** `npm run build`
- **Build output directory:** `dist` or `build` (depending on your build tool, usually `dist` for Vite-based setups).

### 4. Environment Variables (CRITICAL)
- In the Cloudflare Pages settings for your project, go to **Settings** -> **Environment variables**.
- Add a new variable:
  - **Key:** `API_KEY`
  - **Value:** [Your Gemini API Key]
- Save and redeploy.

### 5. Finalize
- Cloudflare will provide a `*.pages.dev` URL. 
- Your app is now live with high-end AI capabilities running securely!

### Tips for "Professional" Appearance
- **Custom Domain:** Connect a domain like `jellyscript.ai` via Cloudflare DNS for a truly premium feel.
- **Analytics:** Enable Cloudflare Web Analytics (free) to track user engagement.
