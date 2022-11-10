import { BookmarkAltIcon, BookOpenIcon, CalendarIcon, ShieldCheckIcon, SupportIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Blog',
    description: 'Read articles from other writers and get inspired',
    href: '/blog/posts',
    icon: BookOpenIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">404 Error</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The page you are looking for could not be found
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Check the URL again, or maybe come back latter.
          </p>
        </div>
      </div>
    </div>
    <section className="relative block py-24 lg:pt-0 bg-white">
      <div className="container mx-auto px-64">
                  <div className="flex-auto rounded-lg w-50 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="text-justify">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">Popular Pages</h3>
                        {resources.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 border-b-2 border-gray-100"
                          >
                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">{item.name}</p>
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            </div>
                          </a>
                        ))}
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => navigate("/")}
                        >
                          Go to home
                        </button>
                      </div>
                    </div>
                  </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;