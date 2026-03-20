import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { server_config } from "./app/config/server.config";
import 'dotenv/config';

let server: Server;

async function main() {
  try {
    const databaseUrl = server_config.database_url;
    if (!databaseUrl) {
      throw new Error(
        'DATABASE_URL is not defined in .env. Please add your MongoDB connection string.'
      );
    }

    await mongoose.connect(databaseUrl);

    const port = server_config.port || 5000;
    server = app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
