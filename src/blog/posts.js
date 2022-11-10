import { useNavigate } from "react-router-dom";
import { useCTX } from "../components/context";

export default function BlogPosts() {
  const navigate = useNavigate();

  const { articles, user } = useCTX();

  return (
    <div className="grid grid-cols-3 gap-4 mb-16">
      {
        articles ?
        articles.map((ar) => (
          <div className="card w-96 bg-base-100 shadow-xl image-full" key={ar.ir}>
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title text-left">
                {ar.blog_title}
              </h2>
              <p>
                {
                  ar.description && ar.description
                }
              </p>
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate(`/blog/${ar.blog_title.split(' ').join('-').toLowerCase()}`)}
                >Read more</button>
              </div>
            </div>
          </div>
        )) : (<>
        
      <h2 className="text-2xl font-medium">
        There's nothing here...
      </h2>

      <p className="mt-4 text-sm">
        Created posts will appear here, try creating one!
      </p>

      <button
        onClick={() => navigate(user ? '/blog/write-blog'  : "/account/signin")}
        className="inline-flex items-center px-5 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
      >
        Create a post

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="flex-shrink-0 w-4 h-4 ml-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
      </>)
      }
    </div>
  );
};
