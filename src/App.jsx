/*global chrome*/
import React, { useState, useEffect } from "react";
import Card from "./components/Card";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Fetch bookmarks from the browser's bookmarks API
    try {

      chrome.bookmarks.getTree(function(bookmarkTreeNodes) {    
        const bookmarks=[];
        function traverseBookmarks(bookmarkNodes) {
          for (let node of bookmarkNodes) {
            if (node.children) {
              traverseBookmarks(node.children);
            } else {
              bookmarks.push({
                  id:node.id,
                  title: node.title,
                  url: node.url,
                  thumbnailUrl: `https://www.google.com/s2/favicons?domain=${node.url}`,
              });

            }
          }
        }
        traverseBookmarks(bookmarkTreeNodes);
        setBookmarks(bookmarks);
      });
      console.log(bookmarks)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="App text-white w-96 h-auto bg-[#1f1f1f]">
      <h1 className="text-center  py-4">Bookmarks</h1>
      <div>
        {loading?<>fetching</>:
            <Card bookmark={bookmarks}/>
       }
      </div>
    </div>
  );
};

export default App;
