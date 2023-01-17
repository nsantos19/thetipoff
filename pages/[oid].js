
import React,{useState} from "react";
import clientPromise from "../lib/mongodb";
import dynamic from "next/dynamic";
import { useCallback } from 'react';
import {ObjectId} from 'mongodb'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '../pages/components/header.js'
export default function ViewPost({post,cat}){
  const postContents = {post}.post[0] 
  const masterCats = cat[0].categories;

  return(
  <div>
      <Header/>
      <div className={'postContents'}>
  <div className={'postTitle'}>
  <h1>{postContents.title}</h1>
  <h5>tags: {masterCats.toString()}</h5>
          </div>
 <hr style={{borderWidth:"1px",borderColor:"black",borderStyle:"solid",width:"50%"}}/> 
<div className="markdownContents">
  <ReactMarkdown children={postContents.body} remarkPlugins={[remarkGfm]}/>
  </div>
  </div>


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



