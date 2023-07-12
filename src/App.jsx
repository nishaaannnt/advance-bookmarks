/*global chrome*/
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { github } from "./assets";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

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

  return (
    <div className="App text-white w-96 h-auto bg-[#1f1f1f]">
      <div className="flex justify-between py-4 px-4 items-center">
        <h1 className="text-lg font-semibold ">Advanced Bookmarks</h1>
        <a href="https://github.com/nishaaannnt/advance-bookmarks" target="_blank">
          <img className="w-[30px]" src={github} alt="github" />
        </a>
      </div>
      <div>{loading ? <>fetching</> : <Card bookmark={bookmarks} />}</div>
    </div>
  );
};

export default App;
