// import nextConnect from 'next-connect';
import {MongoClient} from "mongodb"
import {ObjectId} from "mongodb"


const uri = "mongodb+srv://loudcast:123@cluster0.kanbnsh.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async(req,res) => {

  const database = client.db("blog");
  const posts = database.collection("posts")
  let parsed = JSON.parse(req.body);
  let objs = parsed.objs
  for(let i = 0; i < objs.length; i++){
    let result = await posts.updateOne({_id:new ObjectId(objs[i]._id)},{$set:{order:Number(objs[i].order)}})
  }
  // const result = await posts.updateOne({_id:_id},{order:order});


  res.json({message:'ok'})

}

