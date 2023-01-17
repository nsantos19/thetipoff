import {MongoClient} from "mongodb";



const uri = "mongodb+srv://loudcast:123@cluster0.kanbnsh.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run(pid,postBody) {
  try {
    const database = client.db("blog");
    const posts = database.collection("posts")



    const result = await posts.updateOne({"pid":pid},{"body":postBody})

  } finally {
    await client.close();
  }
}


export default async function updatePost(pid,postBody){
  run(body).catch(console.dir);
}
