import { useCTX } from "../components/context";
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { articles } = useCTX();

  const editor = useMemo(() => withReact(createEditor()), []);

  const { postid } = useParams();

  return (
    <section className="my-16">
      {articles.filter(x => x.blog_title.split(" ").map(x => x).join("-").toLowerCase() === postid).map((post)=> {
        return (
        <article class="p-6 bg-white sm:p-8 w-full rounded-xl ring ring-indigo-500" key={post.blog_title}>
          <div class="flex items-start">
            <div
              class="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
              aria-hidden="true"
            >
              <div class="flex items-center gap-1">
                <span class="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                <span class="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                <span class="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                <span class="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                <span class="h-8 w-0.5 rounded-full bg-indigo-500"></span>
              </div>
            </div>
        
            <div class="sm:ml-8">
              <strong
                class="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium"
              >
                {post.category}
              </strong>
        
              <h2 class="mt-4 text-lg font-medium sm:text-xl">
                <a href="" class="hover:underline">
                  {post.blog_title}
                </a>
              </h2>
              <Slate editor={editor} value={post.blog_content}>
                <Editable readOnly placeholder="Something went wrong, check your network!" />
              </Slate>
        
              <div class="mt-4 sm:flex sm:items-center sm:gap-2">
                <div class="flex items-center text-gray-500">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p class="ml-1 text-xs font-medium">
                    {post.ts}
                  </p>
                </div>
        
                <span class="hidden sm:block" aria-hidden="true">&middot;</span>
        
                <p class="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                  Written by <a href="" class="underline hover:text-gray-700">{post.first_name || post.author}</a>
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
