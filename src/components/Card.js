import React from "react";
import Bookmark from "./Bookmark";

const Card = ({ bookmark }) => {
  return (
    <>
      {bookmark.map((book) => (<>
        <Bookmark key={book.id} book={book}/></>
      ))}
    </>
  );
};

export default Card;
