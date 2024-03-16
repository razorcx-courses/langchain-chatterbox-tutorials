import { Redis } from "@upstash/redis";
import { createClient } from "redis";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RedisVectorStore } from "@langchain/redis";
import { Document } from "@langchain/core/documents";

const VITE_APP_UPSTASH_REDIS_REST_URL="http://us1-evolved-snail-42121.upstash.io"
const VITE_APP_UPSTASH_REDIS_REST_TOKEN="AaSJACQgZDM4YTJjNjAtMDg5ZS00NWY5LWI0ZGMtYzI2NGIwOThhYmNiY2YwZTQ1ZGNjZDllNGM3NDkwODViMjBiNzM5NDY2NDg="

const getRedisClient = () => {
  if (
    !VITE_APP_UPSTASH_REDIS_REST_URL ||
    !VITE_APP_UPSTASH_REDIS_REST_TOKEN
  ) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set in the environment"
    );
  }
  const client = new Redis({
    url: VITE_APP_UPSTASH_REDIS_REST_URL,
    token: VITE_APP_UPSTASH_REDIS_REST_TOKEN,
  });
  return client;
};

// const redisClient = getRedisClient();




