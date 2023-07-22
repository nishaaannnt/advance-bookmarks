/*global chrome*/
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { info,close } from "./assets";
import About from "./pages/About";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [about, setAbout] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch bookmarks from the browser's bookmarks API
    try {
      chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        const bookmarks = [];
        function traverseBookmarks(bookmarkNodes) {
          for (let node of bookmarkNodes) {
            if (node.children) {
              traverseBookmarks(node.children);
            } else {
              bookmarks.push({
                id: node.id,
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
      console.log(bookmarks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAbout = () => {
    setAbout(!about);
  }

  return (
    <div className="App text-white w-96 h-auto min-h-[600px] bg-[#1f1f1f]">
      <div className="flex justify-between py-4 px-4 items-center">
        <h1 className="text-lg font-semibold ">Advanced Bookmarks</h1>
        <a
          onClick={handleAbout}
          className="hover:cursor-pointer"
          target="_blank"
        >{
          about ? <img src={close} alt="x" className="w-[15px]" />:<img src={info} alt="i" className="w-[25px]" />
        }
        </a>
      </div>
      {about ? (
        <About/>
      ) : (
        <div>{loading ? <>fetching...</> : <Card bookmark={bookmarks} />}</div>
      )}
    </div>
  );
};

export default App;
