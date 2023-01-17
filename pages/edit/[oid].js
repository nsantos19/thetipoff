import clientPromise from "../../lib/mongodb"
import React,{useState} from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useCallback } from 'react';
import {ObjectId} from 'mongodb'
import {useRouter} from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client';

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);



export default function EditPost({post,cat}){
  const masterCats = cat[0].categories;
  const router = useRouter();
  const oid = {post}.post[0]._id;
  const [title,setTitle] = useState({post}.post[0].title);
  const [categories,setCategories] = useState({post}.post[0].categories)
  const [body,setBody] = useState({post}.post[0].body)
  const {user,error,isLoading} = useUser();
  const [author,setAuthor] = useState({post}.post[0].author)

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



  const onChangeBody = useCallback((value) => {
  setBody(value);
  },[]);

  const onChangeTitle= useCallback((value) => {
  setTitle(value);
  },[]);

  const onChangeAuthor = useCallback((value) =>{
    setAuthor(value)
  })

  const removePost = async ()=>{
    const res = await fetch('http://localhost:3000/api/handlerRemove',{
      method: 'post',
      body: JSON.stringify({
        oid: oid
      })
    })
    router.back()
  }
  const saveBody = async ()=>{
    const res = await fetch('http://localhost:3000/api/handlerBody',{
      method: 'post',
      body: JSON.stringify({
        body: body,
        oid: oid
      })
    })
  }

  const saveTitle= async ()=>{
    const res = await fetch('http://localhost:3000/api/handlerTitle',{
      method: 'post',
      body: JSON.stringify({
        title: title,
        oid: oid
      })
    })
  }
  const saveAuthor= async ()=>{
    const res = await fetch('http://localhost:3000/api/handlerAuthor',{
      method: 'post',
      body: JSON.stringify({
        author: author,
        oid: oid
      })
    })
  }
  const saveCategories= async ()=>{
    const res = await fetch('http://localhost:3000/api/handlerCategories',{
      method: 'post',
      body: JSON.stringify({
        categories: categories,
        oid: oid
      })
    })
  }
  if(!user){
    return(
    <p>404 NOT FOUND </p>
    )
  }
  return(
  <div>
  <h1>Remove Post</h1>

  <button onClick={removePost}> removePost</button>
  <h1>Save New Categories</h1>
  <button onClick={saveCategories}> Save Categories</button>
  <h3> click to add categories</h3>

  {cat[0].categories.map(cat =>{

        return(
        <div className= "form-check">  
        <input className="form-check-input" defaultChecked= {categories.includes(cat)} type="checkbox" value={cat} id={"flexcheck" + cat} onChange ={onChangeCategories}/>
        <label className="form-check-label" for={"flexcheck"+ cat}>
            {cat}
        </label>
            </div>
        )
      }
      
  )} 
  <h1>Change Title</h1>
  <button onClick={saveTitle}> SAVE TITLE</button>
  <SimpleMdeEditor value = {{post}.post[0].title} onChange={onChangeTitle}/>

  <h1>Change Author</h1>
  <button onClick={saveAuthor}> Save Author</button>
  <SimpleMdeEditor value = {{post}.post[0].author} onChange={onChangeAuthor}/>

  <h1>Change Body</h1>
  <button onClick={saveBody}> SAVE BODY </button>
  <SimpleMdeEditor value = {{post}.post[0].body} onChange={onChangeBody}/>
  
  </div>
  )
}

export async function getServerSideProps(context) {
    try {
          
        let objInstance = ObjectId(context.params.oid)
        const client = await clientPromise;
        const db = client.db("blog");
        const post = await db
            .collection("posts")
            .find({"_id":objInstance})
            .toArray();
        const cat = await db
            .collection('categories')
            .find({})
            .toArray();
        return {
      props: { post: JSON.parse(JSON.stringify(post)),cat: JSON.parse(JSON.stringify(cat)) },
        };
    } catch (e) {
        console.error(e);
    }
}




