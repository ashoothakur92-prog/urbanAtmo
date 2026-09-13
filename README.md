# UrbanAtmo 🌿💨
> **“Breathe Better. Live Greener.”**  
> *A Clean & Green Urban Sustainability & Civic Platform for Smart India Hackathon*

---

## 🌟 Overview

**UrbanAtmo** is a citizen-first, mobile-responsive civic sustainability web application designed to combat urban environmental degradation. It empowers residents of Indian metropolitan corridors (such as Gurugram, Delhi NCR, Bengaluru, Mumbai, and Jaipur) to monitor real-time air quality, report environmental infractions directly to municipal wards, segregate household waste using national CPCB guidelines, sell recyclables to verified local scrap dealers (Kabadiwalas), and earn **GreenPoints™** for verified civic actions.

---

## 🚀 Key Features

1. **Interactive AQI Dashboard (0–500 CPCB Standard)**
   - Live color-coded air quality cards with real-time pollutant readings (PM2.5, PM10, O₃, NO₂).
   - Multi-city switcher (Gurugram, New Delhi, Noida, Bengaluru, Mumbai, Jaipur).
   - Demographic-specific outdoor health advisories (for students, athletes, asthmatics, and seniors).

2. **Civic Environmental Issue Reporting**
   - Direct reporting for garbage dumping, open waste burning, construction dust, sewage overflow, and vehicular pollution.
   - GPS coordinate capture and photo upload simulation.
   - Status tracking pipeline: `Submitted` ➔ `Under Review` ➔ `Dispatched` ➔ `Resolved` with official municipal ticket IDs.
   - Citizen incentive: +50 GreenPoints upon submission.

3. **Live Waste Segregation & AI Vision Assistant**
   - 5-bin Swachh Bharat standard guide: **Wet Waste (Green)**, **Dry Waste (Blue)**, **E-Waste (Orange)**, **Hazardous Waste (Red)**, and **Sanitary Waste (Yellow)**.
   - Real-time search bar for common household items (e.g. *banana peel*, *plastic bottle*, *medicine strip*, *milk pouch*).
   - Simulated neural computer vision camera scan with confidence metrics and bin assignment.
   - 3-question interactive segregation quiz to earn +30 GreenPoints.

4. **Sell Junk / Recyclables (Doorstep Kabadiwala)**
   - Transparent price-per-kilogram calculator across 8 scrap materials (Paper, Cardboard, PET Plastic, Metals, E-Waste).
   - Live weight stepper with instant estimated payout calculation in ₹ INR.
   - Doorstep pickup scheduling or self hub drop-off (with an extra ₹2/kg bonus).
   - Instant booking confirmation with appointment ID.

5. **Nearby Verified Scrap Dealers & Eco-Hub Directory**
   - Interactive local eco-map of Gurugram Ward 14.
   - Distance radius, rating, and accepted material filters.
   - Interactive **Direct Dealer Calling** and **Turn-by-Turn Route Navigation** previews.

6. **GreenPoints™ Gamification & Rewards**
   - Tiered user leveling system (*Level 3: Waste Warrior* with progress toward *Eco Hero*).
   - 6 unlockable civic badges (*Green Starter*, *Waste Warrior*, *Clean City Champion*, *Eco Hero*, *Compost Master*, *Air Guardian*).
   - Community leaderboards for local citizens, colleges (IIT Delhi, DU), and municipal wards.
   - Redeemable rewards catalog (organic store vouchers, Aravalli tree plantation in citizen's name, Clean Air Summit passes).

7. **Bilingual Citizen Support**
   - One-click language switcher supporting both **English** and **Hindi (`हिन्दी`)**.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/urbanatmo.git
   cd urbanatmo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Create a production build:**
   ```bash
   npm run build
   ```

---

## 🚢 How to Deploy to GitHub Pages

This project comes pre-configured with **GitHub Actions** (`.github/workflows/deploy.yml`) for 100% automated deployment on push.

### Step 1: Push code to your GitHub Repository

If you haven't initialized git yet:
```bash
git init
git add .
git commit -m "Initial commit: UrbanAtmo platform"
git branch -M main
git remote add origin https://github.com/<your-username>/urbanatmo.git
git push -u origin main
```

*(Or use **Export to GitHub** from the top-right Settings menu in AI Studio).*

### Step 2: Enable GitHub Pages in Repository Settings

1. Open your repository on GitHub: `https://github.com/<your-username>/urbanatmo`
2. Click on **Settings** (top tab).
3. In the left sidebar, under **Code and automation**, click **Pages**.
4. Under **Build and deployment** > **Source**, choose **GitHub Actions** from the dropdown.
5. That's it! The workflow in `.github/workflows/deploy.yml` will automatically build and publish the site.
6. Within 1-2 minutes, your live URL will appear at:
   ```
   https://<your-username>.github.io/urbanatmo/
   ```

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD workflow
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── AQICard.tsx       # Interactive live AQI display card
│   │   ├── AQIScaleVisual.tsx# 0-500 scale educational guide visual
│   │   ├── BottomNav.tsx     # Mobile floating capsule navigation
│   │   ├── Navbar.tsx        # Desktop responsive top navigation
│   │   └── NotificationToast.tsx # Action & points feedback toast
│   ├── data/
│   │   └── mockData.ts       # Comprehensive civic datasets & seed data
│   ├── pages/
│   │   ├── AQIGuidePage.tsx  # CPCB standard 0-500 guide & diagnostic tool
│   │   ├── Dashboard.tsx     # Primary home dashboard
│   │   ├── ProfilePage.tsx   # Citizen profile, stats & impact tracker
│   │   ├── ReportIssuePage.tsx # Civic hazard reporting & tracker
│   │   ├── RewardsPage.tsx   # GreenPoints, badges, catalog & leaderboard
│   │   ├── ScrapDealersPage.tsx # Verified dealers map & directory
│   │   ├── SellJunkPage.tsx  # Doorstep Kabadiwala scrap booking
│   │   └── WasteSegregationPage.tsx # 5-bin guide & AI classifier
│   ├── types.ts              # Core TypeScript interfaces & definitions
│   ├── App.tsx               # Root application router & state manager
│   ├── main.tsx              # React DOM entry point
│   └── index.css             # Tailwind CSS imports
├── index.html                # HTML entry point with metadata
├── package.json              # Project dependencies & scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite bundler configuration (with base: './')
```

---

## 📜 License

This project is created for the **Smart India Hackathon (SIH)**. Distributed under the MIT License.
