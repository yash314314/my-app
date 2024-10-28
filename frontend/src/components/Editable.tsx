import EditorJSRenderer from "./EditorRend";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteConfirmation from "./Del";
import axios from "axios";
import { BACKEND_URL } from "../config";
import EditableEditor from "./Renderer2";
export function EditLooks({ author, title, content, publishdate, id }) {
  const [dlt, setdlt] = useState(false);
  const [edit, setedit] = useState(false);

  async function sendreq(id:string) {  // Accepts id directly
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}` , {
        headers: {
            Authorization: localStorage.getItem("token"),
        }
      });
      console.log("returned response", res);
      setdlt(false)
    } catch (e) {
      console.log(e);
    }
  }

  if (dlt) {
    return (
      <DeleteConfirmation
        onCancel={() => setdlt(false)}
        onConfirm={() => sendreq(id)}  // Passes id directly to sendreq
      />
    );
  }
//   if (edit) {
//     return (
//         <EditableEditor
//         id={id}
//             init={content} // pass initial content
//             onSave={(updatedData) => {
//                 console.log("Saved data:", updatedData);
//                 setedit(false); // close editor after saving
//             }}
//             editorId={`editorjs-${id}`} // unique editor ID for each instance
//         />
//     );
// }

  // Calculate the total text length from the content blocks
  const totalTextLength = content.blocks.reduce((total, block) => {
    if (block.type === "paragraph" || block.type === "header" || block.type === "quote") {
      return total + (block.data.text?.length || 0);
    }
    return total;
  }, 0);
  const wordsPerMinute = 200;
  const estimatedReadTime = Math.ceil(totalTextLength / 5 / wordsPerMinute);

  function pp() {
    setdlt(true);
  }
 function pp2(){
    alert("we will deploy this feature in next version , rn i am too tired ");
 }
  return (
    <div className="border-b-2 flex flex-col justify-center ml-80 max-w-3xl cursor-pointer">
      <Link to={`/blog/${id}`}>
        <Avatar author={author} publish={publishdate} />
        <div className="text-2xl font-bold">{title}</div>
      </Link>
      <div>
        <EditorJSRenderer data={content} id={id} />
      </div>
      <div className="mt-8 text-zinc-400 font-bold">
        {`${estimatedReadTime} min read`}
      </div>
      <div className="flex flex-row justify-end">
        <div className="hover:bg-red-200 p-1 rounded-3xl hover:animate-ping">
          <svg onClick={pp} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
        <div className="p-1 hover:bg-blue-400 rounded-3xl hover:animate-ping">{/* this is edit button */}
          <svg onClick={pp2} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Avatar({ author, publish }) {
  return (
    <div className="flex mt-5 mb-2">
      <div className="h-9 w-9 bg-slate-600 rounded-full flex justify-center items-center text-yellow-50">
        {author[0]}
      </div>
      <div className="flex justify-center items-center font-semibold ml-3 mr-3">
        {author}
      </div>
      <div className="font-normal flex justify-center items-center text-zinc-400">
        {publish}
      </div>
    </div>
  );
}
