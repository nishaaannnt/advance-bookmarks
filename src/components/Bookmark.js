import React from "react";

const Bookmark = ({book}) => {
  return (
    <div>
      <div className="card w-16 ">
        <h1>{book.title}</h1>
        <a href={book.url}>
          <img src={book.thumbnailUrl} alt={book.title} />
        </a>
      </div>
    </div>
  );
};

export default Bookmark;
