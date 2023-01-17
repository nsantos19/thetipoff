import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const uri = "mongodb+srv://loudcast:123@cluster0.kanbnsh.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient("mongodb+srv://loudcast:123@cluster0.kanbnsh.mongodb.net/sample_mflix?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected) await client.connect();
  req.dbClient = client;
  req.db = client.db('blog');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
