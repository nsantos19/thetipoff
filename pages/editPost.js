
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useCallback } from 'react';
const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);



export default function EditPost({post}){
  const pid = {post}.post[0].pid;
  const [body,setBody] = useState({post}.post[0].body)


  const onChange = useCallback((value) => {
  setBody(value);
  },[]);

  const save = ()=>{
    updatePost(pid,body);
  }

  return(
  <div>
  <button onClick={save}/>
  <SimpleMdeEditor value = {{post}.post[0].body} onChange={onChange}/>
  </div>
  )
}


export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/handler");
  const json = await res.json();
  return {
    props: {
      post: json,
    },
  };
}
