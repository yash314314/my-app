import AppBar from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import EditorJSRenderer from "../components/EditorRend";
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";
import { Looks } from "../components/Looks";
import { Link } from "react-router-dom";
export function Blogs() {
    const { blogs, loading } = useBlogs();

    if (loading) {
        return <div className="flex flex-col justify-center items-center h-screen w-screen">
            
            <Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton>
            </div>;  // Add a loading state
    }


    return (
        <><div className="border shadow-xl">
            <AppBar />
            {blogs && blogs.length > 0 ? (
                blogs.map((b, index) => (
                    <Looks
                        id={b .id}
                        title={b.title || "null"}
                        publishdate={b.timestamp}
                        author={b.author?.name || "Anonymous"} // Ensure author name is handled
                        content={b.content || "null"}
                    />
                ))
            ) : (
                <div className="m-3">No blogs found</div> // Handle the case where blogs might be empty
            )}</div>
        </>
    );
}
