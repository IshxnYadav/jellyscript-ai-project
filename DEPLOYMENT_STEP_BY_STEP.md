
# 🚀 The Ultimate Deployment Guide: JellyScript AI

Follow these steps exactly to move your site from your computer to a live URL for the world to see.

---

## 📂 Phase 1: Understanding Your Folder Structure
Your project folder MUST look exactly like this. Do not put files into a `src` folder; keep them in the "Root" (the main folder):

```text
/jellyscript-ai-project
├── components/           # Navbar.tsx, AdUnit.tsx, etc.
├── App.tsx               # Main Application logic
├── constants.tsx         # Frameworks & UI text
├── geminiService.ts      # AI connection logic
├── types.ts              # TypeScript definitions
├── index.tsx             # Entry point
├── index.html            # Main HTML file
├── package.json          # Dependency list (Crucial!)
├── vite.config.ts        # Build instructions (Crucial!)
└── metadata.json         # Project metadata
```

---

## 🐙 Phase 2: Pushing to GitHub (The "Storage" Step)

### Option A: Using the Command Line (Fastest)
1. Open your terminal inside your project folder.
2. Run these commands one by one:
   ```bash
   git init
   git add .
   git commit -m "First live build"
   ```
3. Go to [GitHub.com](https://github.com), create a new **Public** repository named `jellyscript-ai`.
4. Copy the "Remote URL" GitHub gives you and run:
   ```bash
   git remote add origin YOUR_GITHUB_URL_HERE
   git branch -M main
   git push -u origin main
   ```

### Option B: GitHub Desktop (Easiest)
1. Download [GitHub Desktop](https://desktop.github.com/).
2. Select **Add Existing Repository** and point it to your project folder.
3. Click **Publish Repository** to send it to GitHub.

---

## ☁️ Phase 3: Launching on Cloudflare Pages (The "Live" Step)

1. Sign up for a free [Cloudflare](https://dash.cloudflare.com/) account.
2. In the sidebar, click **Workers & Pages**.
3. Click **Create Application** -> **Pages** -> **Connect to Git**.
4. Select the `jellyscript-ai` repository you just uploaded.
5. **Configure Build Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
6. **Environment Variables (The Secret Sauce)**:
   - Click **Environment Variables** (before clicking Deploy).
   - Add a variable: 
     - **Key**: `API_KEY`
     - **Value**: Paste your Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
7. Click **Save and Deploy**.

---

## ✅ Phase 4: Verification
1. Cloudflare will give you a link like `jellyscript-ai.pages.dev`.
2. Open it.
3. **Test the AI**: Type "Give me a prompt for a sci-fi novel cover" and click **Synthesize**.
4. If it generates text, your deployment is 100% successful!

---

## 🛠 Troubleshooting
- **White Screen?** Check the Browser Console (Right-click > Inspect > Console). Usually means a missing dependency.
- **AI not responding?** Go back to Cloudflare Settings > Environment Variables and make sure `API_KEY` is saved correctly in both "Production" and "Preview" environments.
