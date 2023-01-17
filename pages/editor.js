import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import clientPromise from "../lib/mongodb"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Editor({posts,cats}){
  const masterPosts = [...posts]
  const [filtPosts,setFiltPosts] = useState(posts);
  const [cat,setCat] = useState('');

  const {user,error,isLoading} = useUser();


  function changeCat(filt){
    if(filt == 0){
      setFiltPosts(masterPosts);
    }else{
    setFiltPosts(masterPosts.filter(post => post.categories.includes(filt)))
    }
  }

  if(!user){
    return(
    <p>404 NOT FOUND </p>
    )
  }


return(
<div>
  <div className={"headerEditor"}>
  <a href={"changeOrder"} class={"linkButton"}>ChangeOrder</a>
  <a href={"changeCategory"} class={"linkButton"}>ChangeCategories</a>
  <a href={"newPost"} class={"linkButton"}> New Post</a>
  </div>
    <hr/>
  <div className={"centerEditor"}>


   <Dropdown as={ButtonGroup}>
      <Button variant="success" onClick={() => changeCat(0)}>SHOW ALL</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
          {cats[0].categories.map((category) =>(
          <Dropdown.Item onClick={(() => changeCat(category))}> {category} </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>


    <hr/>



  <ul>
    <div className="editorPosts">
    {filtPosts.map((post) => (
          <ul>

            <h1>{post.title}</h1>
            <p>Categories: {post.categories.join(' | ')}</p>
            <p>By: {post.author} </p>
            <a href={"/edit/"+post._id} class={"linkButton"}> Edit Post</a>
          </ul>
        ))}
    </div>
    <hr/>
  </ul>
  

</div>


</div>
)
}



export async function getServerSideProps(){
  try{
    const client = await clientPromise; 
    const db = client.db("blog");
    const posts = await db
    .collection("posts")
    .find({})
    .toArray();
    const cat = await db
            .collection('categories')
            .find({})
            .toArray();
    return{
      props:{posts: JSON.parse(JSON.stringify(posts)),cats:JSON.parse(JSON.stringify(cat))}
    }
  }catch(e){
    console.log(e)
  }
}
