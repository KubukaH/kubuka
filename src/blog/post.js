import { useCTX } from "../components/context";
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { fromUnixTime, formatDistanceToNow } from "date-fns";

const Post = () => {
  const { articles } = useCTX();

  const editor = useMemo(() => withReact(createEditor()), []);

  const { postid } = useParams();

  return (
    <section className="my-16">
      {articles.filter(x => x.blog_title.split(" ").map(x => x).join("-").toLowerCase() === postid).map((post)=> {
        const distance = formatDistanceToNow(
          new Date(fromUnixTime(post.posted_on)),
          { includeSeconds: true, addSuffix: true }
        )
        return (
        <article className="p-6 bg-white sm:p-8 min-w-full rounded-xl ring ring-indigo-500" key={post.blog_title}>
          <div className="flex items-start">
            <div
              className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
              aria-hidden="true"
            >
              <div className="flex items-center gap-1">
                <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
              </div>
            </div>
        
            <div className="sm:ml-8">
              <strong
                className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium"
              >
                {post.category}
              </strong>
        
              <h2 className="mt-4 text-lg font-medium sm:text-xl">
                <a href="" className="hover:underline">
                  {post.blog_title}
                </a>
              </h2>
              <Slate editor={editor} value={post.blog_content}>
                <Editable readOnly placeholder="Something went wrong, check your network!" />
              </Slate>
        
              <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="ml-1 text-xs font-medium">
                    {distance}
                  </p>
                </div>
        
                <span className="hidden sm:block" aria-hidden="true">&middot;</span>
        
                <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                  Written by <a href="" className="underline hover:text-gray-700">{
                    post.author || post.first_name +' '+ post.last_name
                  }</a>
                </p>
              </div>
            </div>
          </div>
        </article>
        )
      })}
    </section>
  );
};

export default Post;
