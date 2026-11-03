import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

/**
 * Server side BetterAuth setup.
 *  - users, sessions and accounts live in MongoDB (MongoDB adapter)
 *  - email + password and Google sign in
 *  - the JWT plugin signs short lived tokens that the Express server verifies
 */

if (!process.env.MONGODB_URI) {
  console.warn("MONGODB_URI is not set. Login will not work until you add it.");
}

// Reuse one connection while Next.js reloads files in development
const globalForMongo = globalThis as unknown as { __kcMongo?: MongoClient };
const client =
  globalForMongo.__kcMongo ??
  new MongoClient(process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017");
if (process.env.NODE_ENV !== "production") globalForMongo.__kcMongo = client;

const db = client.db(process.env.AUTH_DB_NAME || "kindcircle_auth");

const siteUrl = (process.env.BETTER_AUTH_URL || "http://localhost:3000").replace(/\/+$/, "");

export const auth = betterAuth({
  baseURL: siteUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    jwt({
      jwt: {
        issuer: siteUrl,
        audience: siteUrl,
        expirationTime: "15m",
        // Only put what the API needs inside the token
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? "",
        }),
      },
    }),
    nextCookies(),
  ],
});
