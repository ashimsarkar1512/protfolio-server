import "dotenv/config";
import dns from "node:dns";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { server_config } from "./app/config/server.config";

let server: Server;

async function main() {
  try {
    const databaseUrl = server_config.database_url;

    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is not defined in .env. Please add your MongoDB connection string."
      );
    }

    if (databaseUrl.startsWith("mongodb+srv://")) {
      const dnsServers =
        server_config.mongodb_dns_servers
          ?.split(",")
          .map((server) => server.trim())
          .filter(Boolean) ?? ["8.8.8.8", "1.1.1.1"];

      dns.setServers(dnsServers);
    }

    await mongoose.connect(databaseUrl, {
      serverSelectionTimeoutMS: 10_000,
    });

    const port = server_config.port || 5000;
    server = app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection detected, shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
    return;
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception detected, shutting down...", err);
  process.exit(1);
});
