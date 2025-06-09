# API Rate Limiter (Node.js + Upstash Redis)

This is a simple backend project that implements an **API Rate Limiter** using **Node.js** and **Upstash Redis**. The goal is to prevent too many requests from the same IP address within a short time (rate limiting).

### Goal
Limit each IP to **10 requests per minute** using a **sliding time window** logic.

---

## Tech Stack

- **Node.js** – Server and REST API
- **Express.js** – Routing
- **Upstash Redis** – Used to store request timestamps per IP
- **@upstash/redis** – Redis client for Node.js
- **dotenv** – Manage environment variables

---

## How It Works

- For every request, the server:
  1. Gets the client’s IP address.
  2. Stores the request timestamp in Redis (as a sorted set).
  3. Filters out old timestamps beyond 60 seconds.
  4. If the number of recent requests exceeds the limit (10), it blocks the request with `429 Too Many Requests`.

---

## Project Structure

Akto-Internship-Option-1-API-Rate-Limiter/
│
├── limiter.js # Rate limiting logic
├── upstashRedisClient.js # Upstash Redis connection
├── server.js # Main Express server
├── .env # Environment variables
└── package.json


---

## ⚙️ How to Run the Project

Follow these steps to set up and run the API Rate Limiter:

### Step 1: Clone the Repository

Clone the project from GitHub using the command below:

git clone https://github.com/KMRSKPHALGUN/Akto-Internship-Option-1-API-Rate-Limiter.git
cd Akto-Internship-Option-1-API-Rate-Limiter


---

### Step 2: Install Dependencies

Install the required Node.js packages:

npm install


---

### ✅ Step 3: Configure Environment Variables

Create a `.env` file in the root directory and add the following content:

UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
PORT=5000


Make sure you replace `your-upstash-url` and `your-upstash-token` with actual values from the [Upstash Console](https://console.upstash.com/).

---

### Step 4: Start the Server

Start the server using:

node server.js


Optional: Use `npx nodemon server.js` if you want the server to auto-restart on changes (and you have `nodemon` installed).

---

### Step 5: Test the Endpoint

You can now send requests to the `/ping` endpoint:

GET http://localhost:3000/ping


#### Successful Request:
Returns:
```json
{
  "message": "Pong!"
}

After 10 requests within a minute, it returns:

{
  "message": "Rate limit exceeded. Try again later."
}