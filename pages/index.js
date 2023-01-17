import clientPromise from '../lib/mongodb'
import BootList from './components/BootList';
import Header from './components/header';
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Index({posts,cats}){
  console.log(cats[0].categories)
  const masterPosts = [...posts]
  const masterCats = cats[0].categories;
  const [filtPosts,setFiltPosts] = useState(posts);
  const [cat,setCat] = useState('');
  const [filtText,setFiltText] = useState('SORT');

  
  function changeCat(filt){
    if(filt == 0){
      setFiltPosts(masterPosts);
      setFiltText('SORT');
    }else{
    setFiltText("RESET")
    setFiltPosts(masterPosts.filter(post => post.categories.includes(filt)))
    }
  }



  return(
  <div>
    <Header/>
<div className={'postMargin'}>
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
            .sort({order:-1})
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








