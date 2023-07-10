import React, { useState } from 'react';

const Bookmark = ({ book }) => {
  const [title, setTitle] = useState("");

  const handleSetTitle = () => {
    const s = book.title;
    if (s.length > 50) {
      setTitle(s.substring(0, 50) + " ...");
    } else {
      setTitle(s);
    }
  };

  // Call handleSetTitle when component mounts
  React.useEffect(() => {
    handleSetTitle();
  }, []);

  return (
    <div>
      <div className="card w-auto h-auto py-2 px-1 bg-[#2c2c2c] rounded-md m-1">
        <a href={book.url} target="_blank" className="flex">
          <img className="px-2 w-10" src={book.thumbnailUrl} alt="" />
          <h1 className="">{title}</h1>
        </a>
      </div>
    </div>
  );
};

export default Bookmark;
