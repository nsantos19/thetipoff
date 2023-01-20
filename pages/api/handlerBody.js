// import nextConnect from 'next-connect';
import {MongoClient} from "mongodb"
import {ObjectId} from "mongodb"
import clientPromise from '../../lib/mongodb'
// import middleware from '../../middleware/database';

// const handler = nextConnect();

// handler.use(middleware);

// handler.get(async (req, res) => {
//     const pid = req.query
//     // console.log(pid)
//     let doc = await req.db.collection('posts').findOne({pid:pid})
//     res.json(doc);
// });

export default async(req,res) => {
const client = await clientPromise
  const database = client.db("blog");
  const posts = database.collection("posts")
  let parsed = JSON.parse(req.body)
  const oid = ObjectId(parsed.oid);
  const postBody = parsed.body;
  console.log(postBody)
  const result = await posts.updateOne({"_id":oid},{$set:{"body":postBody}})


  res.json({message:'ok'})

}

// export default handler;
