import { stringify } from "querystring";
import clientPromise from "../lib/mongodb";
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client';

let objPosts;
let objDatePosts;


//
  // const removePost = async ()=>{
  //   const res = await fetch('http://localhost:3000/api/handlerRemove',{
  //     method: 'post',
  //     body: JSON.stringify({
  //       oid: oid
  //     })
  //   })
  //   router.back()
  // }

export default function ChangeOrder({posts,datePosts}){
  const {user,error,isLoading} = useUser();
  const router = useRouter();
function updateOrder(order,oid){

  for(let i = 0; i < objPosts.length; i++){

    if(oid  == objPosts[i]._id){
        objPosts[i].order = order;
    }

  }
}
function orderByDate(){
  objPosts = objDatePosts
  for(let i = 0; i < objPosts.length; i++){
  objPosts[i].order = i+1; 
  }
  sendChangeOrder();

}

const sendChangeOrder = async()=>{
  const res = await fetch('http://localhost:3000/api/handlerChangeOrder',{
    method:'post',
    body: JSON.stringify({
      objs:objPosts,
    })
  })
  router.replace('editor')
}


  objPosts = posts;
  objDatePosts = datePosts;

  if(!user){
    return(
    <p>404 NOT FOUND </p>
    )
  }

  return(
  <div className={"centerFlex"}>
      <button onClick={orderByDate} className={'orderSubmitAllButton'}>Order By Date </button>
      <button onClick={sendChangeOrder} className={'orderSubmitAllButton'}> submit all </button>
      {posts.map((post) => {



        return(
        <div className={"orderFlexbox"}>
            <p>{post.title}</p>
            <input defaultValue={post.order} onInput={ e => updateOrder(e.target.value,post._id)}/>




        </div>
        )
      })}



  </div>
  )
}




export async function getServerSideProps(context) {
    try {
        console.log(context.params)
          
        const client = await clientPromise;
        const db = client.db("blog");
        const posts = await db
            .collection("posts")
            .find({}).sort({order:1}).toArray();
        const datePosts = await db.collection('posts').find({}).sort({date:-1}).toArray();

        return {
      props: { posts: JSON.parse(JSON.stringify(posts)), datePosts:JSON.parse(JSON.stringify(datePosts)) },
        };
    } catch (e) {
        console.error(e);
    }
}


