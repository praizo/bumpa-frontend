# Bumpa Loyalty Rewards – Frontend

A responsive customer-facing dashboard for Bumpa's loyalty rewards program, built with **React**, **TypeScript**, and **Vite**.

Customers can view their unlocked achievements, current badge, and track progress toward the next tier.

## Tech Stack

| Layer       | Technology                      |
| :---------- | :------------------------------ |
| Framework   | React 19 + TypeScript           |
| Build       | Vite 7                          |
| Styling     | Tailwind CSS 4                  |
| UI Library  | shadcn/ui (Radix UI primitives) |
| HTTP Client | Axios                           |
| Routing     | React Router v7                 |
| Toasts      | Sonner                          |
| Icons       | Lucide React                    |

## Features

- **Authentication** – Token-based login with persistent sessions via `localStorage`.
- **Loyalty Dashboard** – Displays current badge, achievements (unlocked & in-progress), and spending progress.
- **Purchase Simulation** – Modal to simulate purchases and trigger achievement/badge unlocks.
- **Level Unlock Modal** – Celebratory popup when a new badge tier is reached, showing cashback earned.
- **Auto-Logout** – Axios interceptor automatically clears the session and redirects on `401 Unauthorized`.
- **Toast Notifications** – User-facing success/error feedback via Sonner.
- **Responsive Design** – Fully responsive grid layout for mobile, tablet, and desktop.

## Project Structure

```
src/
├── components/
│   ├── loyalty/          # AchievementCard, AchievementsList, LoyaltyCard, utils
│   ├── ui/               # shadcn/ui components (Button, Dialog, Tabs, etc.)
│   ├── app-sidebar.tsx   # Sidebar navigation
│   └── nav-user.tsx      # User menu with logout
├── context/
│   └── AuthContext.tsx    # Auth state management
├── layouts/
│   └── DashboardLayout.tsx
├── pages/
│   ├── Login.tsx
│   └── LoyaltyRewards.tsx
├── services/
│   ├── api.ts            # Axios instance + interceptors
│   ├── AuthService.ts    # Login/logout API calls
│   └── LoyaltyService.ts # Loyalty data + purchase API calls
├── types/
│   ├── auth.ts
│   └── loyalty.ts
└── App.tsx               # Routes + Toaster
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (Laravel)

### Installation

```bash
git clone <repository-url>
cd bumpa-frontend
npm install
```

### Configuration

Copy the example env file and set your API URL:

```bash
cp .env-example .env
```

```env
VITE_API_BASE_URL=http://bumpa-new.test
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default. API requests to `/api/*` are proxied to your backend.

### Build

```bash
npm run build
```

## API Endpoint

The frontend consumes a single primary endpoint:

```
GET /api/users/{user}/achievements
```

**Response:**

```json
{
  "unlocked_achievements": ["First Purchase", "Big Spender"],
  "next_available_achievements": [
    {
      "name": "Premium Buyer",
      "required_spend": 50000,
      "remaining_spend": 12000
    }
  ],
  "current_badge": "Silver",
  "next_badge": "Gold",
  "remaining_to_unlock_next_badge": 3,
  "next_achievement_progress": {
    "name": "...",
    "required_spend": 0,
    "remaining_spend": 0
  }
}
```
