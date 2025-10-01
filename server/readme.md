# DevStage - Event Referral System API

DevStage is a backend API designed to handle **event subscriptions with a referral system**. It allows users to subscribe to an event, track invite-based clicks, and rank top referrers.  
This project includes built-in Swagger documentation and is containerized with Docker.

---

## 🎯 Features

- Subscribe users to an event with duplicate email handling (returns existing ID if already subscribed)

- Track and rank user referrals by:
  - Total successful invitations (tracked in Redis sorted set)
  - Invite link clicks (tracked in Redis hash)
  - Ranking position among referrers

- Auto-generated Swagger documentation available at `/docs`

- **Redis** integration for:
  - Tracking invite link access counts using a Redis hash (`referral:access-count`)
  - Maintaining real-time referral rankings with a Redis sorted set (`referral:ranking`)

- **PostgreSQL** database via **Drizzle ORM** for:
  - Persisting subscriber data such as name and email
  - Ensuring reliable and queryable records of event participants
  - Enforcing email uniqueness and tracking creation timestamps

- Combines real-time performance from Redis with long-term data storage in PostgreSQL

---

## <img src="https://skillicons.dev/icons?i=redis" alt="redis" height="40" /> Redis Usage Overview

### 🔹 `referral:access-count` (Redis Hash)

- **Purpose**: Track the number of times a user's invite link was clicked.
- **Key**: `subscriberId`
- **Value**: Integer representing click count

### 🔹 `referral:ranking` (Redis Sorted Set)

- **Purpose**: Track number of successful referrals per user.
- **Member**: `subscriberId`
- **Score**: Integer representing number of people successfully invited
- **Used For**:
  - Determining a user's position in the ranking
  - Displaying the top referrers

---

## <img src="https://skillicons.dev/icons?i=postgres" alt="postgresql" height="40" /> PostgreSQL Schema

The project uses a single table, `subscriptions`, to store subscriber data:

- `id`: Unique identifier generated via UUID
- `name`: Subscriber's name
- `email`: Unique email address (used for deduplication)
- `created_at`: Timestamp of when the subscription was created

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

### 3. Start the infrastructure (PostgreSQL + Redis)

```sh
npm run docker:up
```

### 4. Run database migrations

```sh
npm run db:migrate
```

### 5. Build the project

```sh
npm run build
```

### 6. Start the server

```sh
npm start
```

> The server will start on the host and port defined in your `.env` file (e.g., `http://localhost:3333`).

---

## 📖 API Documentation

Once the server is running, you can explore and test all API routes via:

👉 [**Swagger API Documentation**](http://localhost:3333/docs)  
Auto-generated documentation using Fastify + Swagger.

---

## 🪖 Development & Testing

You can test endpoints using the [REST Client extension for VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).  
A sample `requests.http` file is available for quick testing.

### 💪 Example API Requests

- Subscribe a user:

  ```http
  POST http://localhost:3333/subscriptions
  Content-Type: application/json

  {
    "name": "Jane Doe",
    "email": "janedoe@mail.com",
    "referrer": "SUBSCRIBER_ID"
  }
  ```

- Access invite link:

  ```http
  GET http://localhost:3333/invites/SUBSCRIBER_ID
  ```

- Get subscriber stats:

  ```http
  GET http://localhost:3333/subscribers/SUBSCRIBER_ID/ranking/clicks
  GET http://localhost:3333/subscribers/SUBSCRIBER_ID/ranking/count
  GET http://localhost:3333/subscribers/SUBSCRIBER_ID/ranking/position
  ```

- Get leaderboard:

  ```http
  GET http://localhost:3333/ranking
  ```

---

## 📜 License

This project is licensed under the **BSD 3-Clause License**.

---

## 👤 Author

[**@th92rodr**](https://github.com/th92rodr)
