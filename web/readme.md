# DevStage - Event Referral System Application

DevStage is the frontend application for the **event referral system**. It allows users to sign up for an event, view their referral stats, and track leaderboard rankings — all through a responsive and modern UI built with Next.js.

---

## 🎯 Features

- **Landing Page** (`/`):

  - Displays event information
  - Contains a subscription form for users to join the event, with validation and real-time errors using zod and react-hook-form
  - Redirects users to their personalized referral page after successful sign-up

- **Invite Page** (`/invite/[subscriberId]`):

  - Shows user's unique referral link with copy-to-clipboard support

  - Displays real-time referral statistics:
    - Total link clicks
    - Total successful referrals
    - Current ranking position

  - Displays the ranking leaderboard highlighting the top 3 referrers

- DevStage backend API integration auto-generated from the OpenAPI schema using Orval

---

## 🚀 Getting Started

### 1. Use the correct Node.js version

This project requires **Node.js v22.13.1**. Use [`nvm`](https://github.com/nvm-sh/nvm) to set the correct version:

```sh
nvm use v22.13.1
```

### 2. Install the project dependencies

```sh
npm ci
```

### 3. Build the project

```sh
npm run build
```

### 4. Start the application

```sh
npm start
```

> The application will start on the host and port defined in your `.env` file (e.g., `http://localhost:3000`).

---

## 📜 License

This project is licensed under the **BSD 3-Clause License**.

---

## 👤 Author

[**@th92rodr**](https://github.com/th92rodr)
