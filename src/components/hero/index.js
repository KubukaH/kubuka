import { getVideoById } from "../../assets/vids";

const HomeHero = () => {

  return (
    <div className="hero w-full h-full top-0 bottom-0 absolute overflow-hidden bg-center bg-cover">
      <div className="hero-overlay">
        <video className="w-full h-full" autoPlay muted loop>
          <source src={getVideoById('background-main').vid} type="video/mp4" />
        </video>
      </div>
      <div className="hero-content text-neutral-content">
        <div className="max-w-md text-center flex flex-wrap">
          <h1 className="mb-5 text-5xl font-bold">Kubuka Space PBC</h1>
          <p className="mb-5">Scouting the hidden genius. We can give your business or idea some energy to reach the stratosphere.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;