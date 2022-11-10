import { getImageById } from "../../assets/images";

const owners = [
  {
    name: "Mulumbe Chaliyanika",
    position: "Co-Founder - Managing Director",
    phone: '+263 77 640 3338', 
    email: 'chaliyanikamm@gmail.com',
    image: "mulumbe",
    imgDescription: "Mulumbe C",
    bio: "General accountant, Tech enthusaiast, Small Business Start-up and Business mentorship trainer. Business financing and outsourcing, general staff managemenet techniques, organisational visioning, and identifying talent.",
    children: [
      {
        name: "facebook",
        icon: <i className="flex fab fa-facebook-square group-hover:stroke-white"></i>,
        url: "https://www.facebook.com/mulumbe.chaliyanika",
      }, 
      {
        name: "twitter",
        icon: <i className="flex fab fa-twitter group-hover:stroke-white"></i>,
        url: "https://twitter.com/mulumbechaliyanika",
      }, 
      {
        name: "instagram",
        icon: <i className="flex fab fa-dribbble group-hover:stroke-white"></i>,
        url: "https://instagram.com/mulumbechaliyanika",
      }
    ]
  },
  {
    name: "Busongo Mweembe",
    position: "Co-Founder",
    phone: '+263 77 662 5192', 
    email: 'info@kubukaspace.com',
    image: "busongo",
    imgDescription: "Busongo",
    bio: "Electrical engineer, web developer and all things between. CNC Progammer, small projects management techniques and business development start-ups. Also does hardware projects in Robotics, IoT, AI, and home electronics.",
    children: [
      {
        name: "facebook",
        icon: <i className="flex fab fa-facebook-square group-hover:stroke-white"></i>,
        url: "https://www.facebook.com/busongo.mweembe",
      }, 
      {
        name: "twitter",
        icon: <i className="flex fab fa-twitter group-hover:stroke-white"></i>,
        url: "https://twitter.com/busongomweembe",
      }, 
      {
        name: "instagram",
        icon: <i className="flex fab fa-dribbble group-hover:stroke-white"></i>,
        url: "https://instagram.com/busongomweembe",
      }
    ]
  },
  {
    name: "Mapenzi Mudimba",
    position: "Co-Founder - Web Master",
    image: "mapenzi",
    phone: '+263 77 715 1673', 
    email: 'hazelman@live.com',
    imgDescription: "Mapenzi",
    bio: "Trained in informatics, data science and metadata algorithms. Business start-uper, Strategic thinker and go getter. This site's design, coding, and implementation in his mandate. Web frameworks, IoT, Cloud Computing, Coding, and hobbying.",
    children: [
      {
        name: "facebook",
        icon: <i className="flex fab fa-facebook-square group-hover:stroke-white"></i>,
        url: "https://www.facebook.com/mapenzi.mudimba",
      }, 
      {
        name: "twitter",
        icon: <i className="flex fab fa-twitter group-hover:stroke-white"></i>,
        url: "https://twitter.com/mapenzimudimba",
      }, 
      {
        name: "instagram",
        icon: <i className="flex fab fa-dribbble group-hover:stroke-white"></i>,
        url: "https://instagram.com/mapenzimudimba",
      },
      {
        name: "github",
        icon: <i className="flex fab fa-github group-hover:stroke-white"></i>,
        url: "https://github.com/HilmaM",
      }
    ]
  },
];

const OwnersCard = () => {
  return (
    <section className="px-4 py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-24">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold">
              This company is owned by
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap">
          {owners.map((owner) => {
            const image = getImageById(owner.image);
            return (
              <div 
                className="flex-1 card card-compact group w-96 md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 p-4 hover:bg-gray-700 hover:ring-sky-500 hover:rounded-md overflow-hidden"
                key={owner.name}
              >
                <figure>
                  <img
                    alt="..."
                    src={image.img}
                    className="shadow-lg rounded-full max-w-full mx-auto"
                    style={{ maxWidth: "120px" }}
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h5 className="card-title text-xl font-bold group-hover:text-white">
                    {owner.name}
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold group-hover:text-white">
                    {owner.position}
                  </p>
                  <p className="mt-1 text-gray-500 group-hover:text-white">
                    {owner.phone}
                  </p>
                  <p className="mt-1 text-gray-500 group-hover:text-white">
                    {owner.email}
                  </p>
                  <p className="mt-1 text-gray-500 group-hover:text-white">
                    {owner.bio}
                  </p>
                  <div className="card-actions">
                      {owner.children.map((it) => (
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1"
                          type="button"
                          key={it.name}
                        >
                          {it.icon}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OwnersCard;
