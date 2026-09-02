import "server-only";

import dns from "node:dns";
import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached = globalForMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalForMongoose.mongooseCache = cached;

const DATABASE_CONNECT_TIMEOUT_MS = Number(
  process.env.MONGODB_CONNECT_TIMEOUT_MS || 5000,
);
const DEFAULT_DNS_SERVERS = ["8.8.8.8", "1.1.1.1"];

function configureMongoSrvDns(uri: string) {
  if (!uri.startsWith("mongodb+srv://")) {
    return;
  }

  const dnsServers = (process.env.MONGODB_DNS_SERVERS || DEFAULT_DNS_SERVERS.join(","))
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers.length) {
    dns.setServers(dnsServers);
  }
}

function withConnectionTimeout(promise: Promise<typeof mongoose>) {
  let timeout: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<typeof mongoose>((_, reject) => {
    timeout = setTimeout(() => {
      reject(new Error("Database connection timed out."));
    }, DATABASE_CONNECT_TIMEOUT_MS);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeout);
  });
}

export async function connectToDatabase() {
  if (cached.connection) {
    return cached.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  configureMongoSrvDns(uri);

  cached.promise ??= mongoose
    .connect(uri, {
      bufferCommands: false,
      connectTimeoutMS: DATABASE_CONNECT_TIMEOUT_MS,
      serverSelectionTimeoutMS: DATABASE_CONNECT_TIMEOUT_MS,
      socketTimeoutMS: 10000,
    })
    .catch((error) => {
      cached.promise = null;
      throw error;
    });

  try {
    cached.connection = await withConnectionTimeout(cached.promise);
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
}
