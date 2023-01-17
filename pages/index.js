import clientPromise from '../lib/mongodb'
import BootList from './components/BootList';
import Header from './components/header';
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Flicker from './components/flicker';

export default function Index({posts,cats}){
  const masterPosts = [...posts]
  const masterCats = cats[0].categories;
  const [filtPosts,setFiltPosts] = useState(posts);
  const [cat,setCat] = useState('');
  const [filtText,setFiltText] = useState('SORT POSTS');


  
  function changeCat(filt){
    if(filt == 0){
      setFiltPosts(masterPosts);
      setFiltText('SORT POSTS');
    }else{
    setFiltText("RESET FILTER")
    setFiltPosts(masterPosts.filter(post => post.categories.includes(filt)))
    }
  }



  return(
  <div>
    <Header/>
    <div style={{marginRight:"3%",marginLeft:"3%"}}>
        <p/>
        <h1 style={{textAlign:"center",textDecoration:'underline '}}>TOP STORIES</h1>
      <Flicker posts={masterPosts} className={'flickerWidth'}/>
    </div>

<div className={'postMargin'}>
        <hr/>
        <h3 style={{textAlign:'center',textDecoration:'underline'}}> ALL POSTS</h3>
  <div className={'sortButton'}>
   <Dropdown as={ButtonGroup} >
      <Button variant="dark" onClick={() => changeCat(0)}>{filtText}</Button>

      <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

      <Dropdown.Menu>
          {cats[0].categories.map((category) =>(
          <Dropdown.Item onClick={(() => changeCat(category))}> {category} </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
    </div>
        <p>  </p>
      <div className={"indexPosts"}>
        <div>
          <BootList posts ={filtPosts}/>

        </div>





    </div>
    </div>
  </div>
  )

}





export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("blog");
        const posts = await db
            .collection("posts")
            .find({})
            .sort({order:1})
            .toArray();
    const cat = await db
            .collection('categories')
            .find({})
            .toArray();

        return {
            props: { posts: JSON.parse(JSON.stringify(posts)),cats: JSON.parse(JSON.stringify(cat)) },
        };
    } catch (e) {
        console.error(e);
    }
}








