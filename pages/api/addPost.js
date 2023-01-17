import {MongoClient} from "mongodb";



const uri = "mongodb+srv://loudcast:123@cluster0.kanbnsh.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run(postBody) {
  try {
    const database = client.db("blog");
    const movies = database.collection("posts");
    // create a filter for a movie to update
    // this option instructs the method to create a document if no documents match the filter
    // create a document that sets the plot of the movie
    var id = "id" + Math.random().toString(16).slice(2)
    const updateDoc = {
        pid: id,
        body: postBody
    };
    const result = await movies.insertOne(updateDoc);
    console.log(
      'hello'
    )

  } finally {
    await client.close();
  }
}


export default async function addPost(body){
  run(body).catch(console.dir);
}
