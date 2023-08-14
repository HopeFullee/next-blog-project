import { MongoClient, MongoClientOptions } from "mongodb";

const url: string =
  "mongodb+srv://admin:qwer1234@cluster0.jowkjuj.mongodb.net/?retryWrites=true&w=majority";
const options = { useNewUrlParser: true } as MongoClientOptions;
let connectDB: Promise<MongoClient>;
let uri: string = "";

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
