import React from "react";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";

const About = () => {

  return (
    <div>
      <div className=" p-4 flex-col text-base justify-between bg-[#222222] rounded-lg mx-3">
        <div className="mx-3">
          <a
            
            className="card w-auto  hover:cursor-pointer h-auto py-2 text-lg px-3 hover:bg-[#0c0c0c] bg-[#2c2c2c] border-white border-2 rounded-md m-1 flex items-center gap-1"
          >
            Buy me a coffee <BiCoffeeTogo />
          </a>
          <p className=" text-sm my-2 text-red-400">Payment Gateway will be added soon, till then enjoy using the extension :D</p>
          <p className="mt-5">Access all your extension in a list without switching tabs.</p>
          <p className="font-bold mb-2">
            Pin the extension for more productivity!
          </p>
          <p className="mt-5 text-lg font-bold mb-2">Note</p>
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
              <a href="" className="flex items-center gap-1">
                <AiFillInstagram />
                Instagram
              </a>
            </li>
            <li className="px-3">
              <a href="https://github.com/nishaaannnt/advance-bookmarks" className="flex items-center gap-1">
                <AiFillGithub />
                Github
              </a>
            </li>
            <li className="px-3">
              <a href="https://www.linkedin.com/in/nishantdixitt/" className="flex items-center gap-1">
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
