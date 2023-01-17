import clientPromise from "../../lib/mongodb";
import addPost from "../api/addPost.js"

export default async (req, res) =>{
  try {
    const client = await clientPromise;
    const db = client.db("blog");
    // const movies = await db
    //   .collection("movies")
    //   .find({})
    //   .sort({metacritic: -1})
    //   .limit(10)
    //   .toArray();
    //
    //
      const posts = await db
    .collection("posts")
    .find({})
    .toArray();
    addPost("heehee haa haa");


      res.json(posts);

  }
  catch(e){
  console.log(e)
}};
