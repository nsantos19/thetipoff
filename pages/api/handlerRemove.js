// import nextConnect from 'next-connect';
import {MongoClient} from "mongodb"
import {ObjectId} from "mongodb"
// import middleware from '../../middleware/database';

// const handler = nextConnect();

// handler.use(middleware);

// handler.get(async (req, res) => {
//     const pid = req.query
//     // console.log(pid)
//     let doc = await req.db.collection('posts').findOne({pid:pid})
//     res.json(doc);
// });
const uri = "mongodb+srv://loudcast:123@cluster0.kanbnsh.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async(req,res) => {
  const database = client.db("blog");
  const posts = database.collection("posts")
  let parsed = JSON.parse(req.body)
  const oid = ObjectId(parsed.oid);
  const result = await posts.deleteOne({"_id":oid});


  res.json({message:'ok'})

}

// export default handler;
