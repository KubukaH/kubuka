import { useRoutes } from "react-router-dom";

import NotFound from "./404";
import AccountIndex from "./account";
import SignUp from "./account/signup";
import BlogIndex from "./blog";
import Post from "./blog/post";
import BlogPosts from "./blog/posts";
import WriterIndex from "./blog/writer";
import { ContextProvider } from "./components/context";
import Landing from "./components/Landing";
import MainLayout from "./components/layout/mainLayout";
import NavigationScroll from "./components/scroll";
import ProfileCard from "./components/profile";
import SignIn from "./account/signin";
import PrivateRoute from "./components/routes/private";
import ForgotPassword from "./account/forgot-password";

const routes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {index: true, element: <Landing />},
      {
        path: "/account/*",
        element: <AccountIndex />,
        children: [
          {
            index: true, path: "signin", element: <SignIn />,
          },
          {
            path: "forgot-password", element: <ForgotPassword />
          },
          {
            path: 'signup', element: <SignUp />
          }
        ]
      },
      {path: 'profile', element: <PrivateRoute><ProfileCard /></PrivateRoute>},
      {
        path: "blog/*", 
        element: <BlogIndex />,
        children: [
          {index: true, path: "posts", element: <BlogPosts />},
          {path: ":postid", element: <Post />},
          {path: "write-blog", element: <PrivateRoute><WriterIndex /></PrivateRoute>}
        ],
      },
      {path: '*', element: <NotFound />}
    ]
  }
];

function App() {
  const element = useRoutes(routes);
  const url = "https://kubuka-space.netlify.app";
  return (
    <ContextProvider>
      <NavigationScroll>
        {element}
      </NavigationScroll>
    </ContextProvider>
  );
}

export default App;
