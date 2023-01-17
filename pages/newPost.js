import React,{useState} from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';


const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);
import clientPromise from '../lib/mongodb'
import { useRouter } from 'next/router'



export default function NewPost({post}){
  const router = useRouter()
  const [title,setTitle] = useState("ENTER HERE");
  const [body,setBody] = useState("ENTER HERE")
  const [categories,setCategories] = useState([])
  const [author,setAuthor] = useState("ENTER HERE");

  const {user,error,isLoading} = useUser();
  const onChangeBody = useCallback((value) => {
  setBody(value);
  },[]);

  const onChangeTitle= useCallback((value) => {
  setTitle(value);
  },[]);
  
  const onChangeAuthor = useCallback ((value) =>{
    setAuthor(value);
  },[])
  const onChangeCategories = useCallback((value) =>{
    let input = value.target.defaultValue;
    if(categories.includes(input)){
      let newArr = categories.filter(item => item!=input)
    setCategories(newArr);
    }else{
      categories.push(input)
      setCategories(categories);
    }
  },[])

  const savePost= async ()=>{
    const res = await fetch('http://localhost:3000/api/handlerNewPost',{
      method: 'post',
      body: JSON.stringify({
        title: title,
        body:body,
        categories:categories,
        date:Date.now(),
        author:author
      })
    })
    router.replace("editor")
  }
  if(!user){
    return(
    <p>404 NOT FOUND </p>
    )
  }
  return(
  <div>
  
  <h1>SAVE POST</h1>

  <button onClick={savePost}>SavePost</button>
  <h1> click to add categories</h1>
  {post[0].categories.map(cat =>{

        return(
        <div className= "form-check">  
        <input className="form-check-input" defaultChecked= {false} type="checkbox" value={cat} id={"flexcheck" + cat} onChange ={onChangeCategories}/>
        <label className="form-check-label" for={"flexcheck"+ cat}>
            {cat}
        </label>
            </div>
        )
      }
      
  )} 

  <h1> CHANGE TITLE </h1>
  <SimpleMdeEditor  onChange={onChangeTitle}/>

  <h1> CHANGE AUTHOR </h1>
  <SimpleMdeEditor  onChange={onChangeAuthor}/>

  <h1>Change Body</h1>
  <SimpleMdeEditor  onChange={onChangeBody}/>
  
  </div>
  )
}





export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("blog");
        const posts = await db
            .collection('categories')
            .find({})
            .toArray();
        return {
            props: { post: JSON.parse(JSON.stringify(posts)) },
        };
    } catch (e) {
        console.error(e);
    }
}

