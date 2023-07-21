/*global chrome*/
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { info,close } from "./assets";
import { AiFillInstagram,AiFillGithub,AiFillLinkedin } from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";

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
        <div className=" p-4 flex-col text-base justify-between bg-[#222222] rounded-lg mx-3">
          <div className="mx-3">
          <a href="#" className="card w-auto  h-auto py-2 text-lg px-3 hover:bg-[#0c0c0c] bg-[#2c2c2c] border-white border-2 rounded-md m-1 flex items-center gap-1">Buy me a coffee <BiCoffeeTogo/></a>
          <p className="mt-5">Access your extension without switching tabs.</p>
          <p className="font-bold mb-2">Pin the extension for more productivity!</p>
          </div>
          <div className="py-2 mt-5">
            <ul className="flex items-center w-full justify-between bottom-0">
              <li className="px-3"><a href="" className="flex items-center gap-1" ><AiFillInstagram/>Instagram</a></li>
              <li className="px-3"><a href="" className="flex items-center gap-1" ><AiFillGithub/>Github</a></li>
              <li className="px-3"><a href="" className="flex items-center gap-1" ><AiFillLinkedin/>LinkedIn</a></li>
            </ul>
          </div>
        </div>
      ) : (
        <div>{loading ? <>fetching...</> : <Card bookmark={bookmarks} />}</div>
      )}
    </div>
  );
};

export default App;
