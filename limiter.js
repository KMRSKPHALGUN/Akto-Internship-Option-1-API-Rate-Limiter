const redis = require('./upstashRedisClient');

const WINDOW_SIZE = 60; // in seconds
const MAX_REQUESTS = 10;

async function rateLimiter(req, res, next) {
  const ip = req.ip;
  const key = `ratelimit:${ip}`;
  const now = Math.floor(Date.now() / 1000); // in seconds
  const windowStart = now - WINDOW_SIZE;

  try {
    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count remaining entries in the window
    const reqCount = await redis.zcard(key);

    if (reqCount >= MAX_REQUESTS) {
      return res.status(429).json({ message: "Rate limit exceeded. Try again later." });
    }

    // Add new request
    await redis.zadd(key, {
      score: now,
      member: `${now}-${Math.random()}` // unique member to avoid overwrite
    });

    // Set expiry just in case
    await redis.expire(key, WINDOW_SIZE);

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = rateLimiter;