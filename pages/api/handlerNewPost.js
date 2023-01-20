// import nextConnect from 'next-connect';
import {MongoClient} from "mongodb"
import {ObjectId} from "mongodb"
import clientPromise from '../../lib/mongodb'


let n = 0;


export default async(req,res) => {
  //weird counter stuff
  //
  n = n+1; 
const client = await clientPromise
  const database = client.db("blog");
  const posts = database.collection("posts")
  let parsed = JSON.parse(req.body)
  const postDate = parsed.date;
  const postBody = parsed.body
  const postTitle= parsed.title;
  const postAuthor = parsed.author;
  const postCats = parsed.categories;

  const result = await posts.insertOne({"title":postTitle,"author":postAuthor,"body":postBody,"categories":postCats,"order":Number(n),"date":postDate})



  res.json({message:'ok'})

}

