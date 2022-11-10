import { useEffect, useState, createContext, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import client, { allItems, getSetRef } from '../../function/operations';
import userAuth from '../../function/db';

// RegExp
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const KBHApiContext = createContext();

export const ContextProvider = ({ children }) => {
  const user = userAuth.currentUser();
  // Blog Components
  const [articles, setArticles] = useState([]);
  const [bValue, setBValue] = useState('');

  const { postid } = useParams();
  
  const itemSetRef = getSetRef("Blog");
  const streamOptions = { fields: [
    {type: 'paragraph', children: [{text: ''}]}
  ] };

  const streamItem = client.stream(itemSetRef, streamOptions).on("start", start => {
    console.log('start', start);
  }).on("set", (set) => {
    if(set.action === 'remove') {
      console.log('remove', set.document.ref.value.id);
      setArticles(
        articles.filter((item) => item.id !== set.document.ref.value.id)
      );
    }
    if(set.action === 'add') { 
      console.log('add', set.document);
      setArticles([...articles, {
        id: set.document.ref.value.id,
        status: 'Pending',
      }]);
    }
  });
  
  useEffect(() => {
    getAllBlogItems();
  },[]);
 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // streamItem.start();
    return function cleanUp() {
      streamItem.close();
    }
  }, [streamItem]);
 
  const getAllBlogItems = async () => { 
    const transactions = await allItems("Blog");
 
    const allBlogs = [];
    transactions.data.forEach(element => {
      allBlogs.push({
        id: element.ref.id,
        ...element.data
      });
    });
    setArticles(allBlogs);
  };

  /**
   * GOTRUE JS Functions
   */

  /**
   * Value Object
   */
  let value = {
    articles,
    bValue,
    setBValue,
    user
  };

  return (
    <KBHApiContext.Provider value={value}>
    {children}
    </KBHApiContext.Provider>
  );
};

export const useCTX = () => {
  return useContext(KBHApiContext);
};
