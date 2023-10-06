import React from "react";
import { AiFillTwitterCircle, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";

const About = () => {

  return (
    <div>
      <div className=" p-4 flex-col text-base justify-between dark:bg-[#222222] bg-[#b3b2b2] rounded-lg mx-3">
        <div className="mx-3">
          <button
            
            className="card w-auto  hover:cursor-pointer h-auto py-2 text-lg px-3 dark:hover:bg-[#0c0c0c] dark:bg-[#2c2c2c] dark:border-white  hover:bg-[#9c9b9b] bg-[#b2b0b0] border-black border-2 rounded-md m-1 r flex items-center gap-1"
          >
            Buy me a coffee <BiCoffeeTogo />
          </button>
          <p className=" text-sm my-2 dark:text-red-400 text-[#ee4b2b]">Payment Gateway will be added soon, till then enjoy using the extension :D</p>
          <p className="mt-5">Access all your extension in a list without switching tabs.</p>
          <p className="font-bold mb-2">
            Pin the extension for more productivity!
          </p>
          <p className="mt-5 text-lg font-bold mb-2 dark:text-white text-black " >Note</p>
          <hr />
          <ul className="list-disc my-2">
            <li>Bookmarks are fetched from Browser itself</li>
            <li>Bookmark a page in the browser to access it from the extension</li>
            <li>If you can't access a url or icon maybe the url is not working</li>
            <li>Ctrl+Shift+Q to open the extension </li>
          </ul>
        </div>
        <div className="py-2 mt-5">
          <ul className="flex items-center w-full justify-between bottom-0">
            <li className="px-3">
              <a href="https://twitter.com/xdiziz" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                <AiFillTwitterCircle />
                Twitter
              </a>
            </li>
            <li className="px-3">
              <a href="https://github.com/nishaaannnt/advance-bookmarks" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                <AiFillGithub />
                Github
              </a>
            </li>
            <li className="px-3">
              <a href="https://www.linkedin.com/in/nishantdixitt/" rel="noreferrer" target="_blank" className="flex items-center gap-1">
                <AiFillLinkedin />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
