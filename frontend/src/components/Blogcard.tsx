import { Link } from "react-router-dom";

interface Bloginput {
  id: string;
  author: string;
  title: string;
  content: string | any; // Content may be a string or an object (from EditorJS)
  publishdate: string;
}

export function Blogcard({ author, title, content, publishdate, id }: Bloginput) {
  // Function to extract plain text from content (if it's an object from EditorJS)
  const getPlainText = (contentObj: any) => {
    if (typeof contentObj === "object" && contentObj.blocks) {
      return contentObj.blocks.map((block: any) => block.data.text || "").join(" ");
    }
    return contentObj; // If it's already a plain string
  };

  const displayedContent = getPlainText(content);

  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 flex flex-col justify-center ml-80 max-w-3xl cursor-pointer">
        <Avatar author={author} publish={publishdate} />
        <div className="text-2xl font-bold">{title}</div>

        <div>
          {displayedContent.length > 100 ? (
            <div>{displayedContent.slice(0, 100)}...</div>
          ) : (
            <div>{displayedContent}</div>
          )}
        </div>

        <div className="mt-8 text-zinc-400 font-bold">
          {`${Math.ceil(displayedContent.length / 100)} min read`}
        </div>
      </div>
    </Link>
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
