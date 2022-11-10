import { Outlet, useParams } from "react-router-dom";
import { getImageById } from "../assets/images";
import { useCTX } from "../components/context";

const BlogIndex = () => {
  const { articles } = useCTX();
  const { postid } = useParams();
  return (
    <>
    <div className="hero relative overflow-hidden h-[210px]">
      <div className="hero-overlay">
        <img
          src={getImageById('victoria-falls').img}
          alt="Vic Falls"
          className="w-full"
        />
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
        <div className="flex justify-center items-center h-full">
          <div className="text-center text-white px-6 md:px-12">
            {postid 
            ? articles.filter(x => x.blog_title.split(" ").map(x => x).join("-").toLowerCase() === postid).map((art) => (
              <div key={art.blog_title}>
              <h1 className="text-5xl font-bold mt-0 mb-6">
                {art.blog_title}
              </h1>
              <h5 className="text-3xl font-bold mb-8"> 
                {art.author || `${art.first_name} ${art.last_name}` || null}
              </h5>
              </div>
            )) 
            : (
              <>
              <h1 className="text-5xl font-bold mt-0 mb-6">
                Kubuka Spotlight 
              </h1>
              <p className="max-w-2xl text-xl lg:mx-auto mb-8">
                Make believe the expectations and you will make the day shine brighter.   
              </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="hero min-h-screen" style={{backgroundColor: 'blog-pattern-bg', backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%232e436e' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default BlogIndex;
