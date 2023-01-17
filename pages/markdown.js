import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);



export default function Markdown(){

  return(
  <div>
      <SimpleMdeEditor value={"Hello World"}/>
  </div>)
}
