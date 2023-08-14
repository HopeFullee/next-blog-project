import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
    var _mongo: Promise<MongoClient> | undefined;
  }
}
