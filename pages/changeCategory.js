import clientPromise from "../lib/mongodb";
import React,{useState} from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useCallback } from 'react';
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client';

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);



export default function EditPost({cat}){
  const router = useRouter()
  const [newCat,setNewCat] = useState('');
  const [categories,setCategories] = useState([...cat[0].categories])
  const [masterCat,setMasterCat] = useState([...cat[0].categories])
  const {user,error,isLoading} = useUser();


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


  const onChangeNewCat = useCallback((value) =>{
    setNewCat(value)
  })

  function addCategory(){
    if(!(categories.includes(newCat))){
      categories.push(newCat);
      masterCat.push(newCat)
      let newArr = [...masterCat]
      setNewCat('')
      setMasterCat(newArr)
      setCategories(categories)
    }
  }

  const saveCategories= async ()=>{
    const res = await fetch('http://localhost:3000/api/handlerNewCat',{
      method: 'post',
      body: JSON.stringify({
        categories: categories,
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

  <h1>Change Categories</h1>

  <button onClick={saveCategories}> Save Categories</button>

  <button onClick={addCategory}>Add Category</button>

  <SimpleMdeEditor value = {newCat} onChange={onChangeNewCat}/>

  <h3> click to add categories</h3>
  {console.log(categories)}
  {masterCat.map(cat =>{

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


  
  </div>
  )
}

export async function getServerSideProps(context) {
    try {
        const client = await clientPromise;
        const db = client.db("blog");
        const cat = await db
            .collection('categories')
            .find({})
            .toArray();
        return {
      props: {cat: JSON.parse(JSON.stringify(cat)) },
        };
    } catch (e) {
        console.error(e);
    }
}




