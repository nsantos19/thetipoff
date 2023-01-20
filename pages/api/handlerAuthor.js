
import clientPromise from '../../lib/mongodb'
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


export default async(req,res) => {
try{
	let client = await clientPromise;
  let database = client.db("blog");
  let posts = database.collection("posts")
  let parsed = JSON.parse(req.body)
  let oid = ObjectId(parsed.oid);
  let postAuthor= parsed.author;
	console.log(oid);
  let result = await posts.updateOne({"_id":oid},{$set:{"author":postAuthor}})
	console.log(result)
  res.json({message:'ok'})
}
catch(e){
console.log(e);

}}

// export default handler;
