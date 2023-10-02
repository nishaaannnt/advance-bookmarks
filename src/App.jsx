/*global chrome*/
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { info, close } from './assets';
import About from './pages/About';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [about, setAbout] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const storedBookmarks = localStorage.getItem('bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      } else {
        // Fetch bookmarks from the browser's bookmarks API as you did before
        chrome.bookmarks?.getTree(function (bookmarkTreeNodes) {
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
          // Save the initial bookmarks to local storage
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAbout = () => {
    setAbout(!about);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedBookmarks = [...bookmarks];
    const [reorderedBookmark] = reorderedBookmarks.splice(
      result.source.index,
      1
    );
    reorderedBookmarks.splice(result.destination.index, 0, reorderedBookmark);

    // Save the reordered bookmarks to local storage
    localStorage.setItem('bookmarks', JSON.stringify(reorderedBookmarks));

    setBookmarks(reorderedBookmarks);
  };

  return (
    <div className="App text-white w-96 h-auto min-h-[600px] bg-[#1f1f1f] p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Advanced Bookmarks</h1>
        <button
          onClick={handleAbout}
          className="hover:cursor-pointer"
          target="_blank"
        >
          {about ? (
            <img src={close} alt="x" className="w-5 h-5" />
          ) : (
            <img src={info} alt="i" className="w-6 h-6" />
          )}
        </button>
      </div>
      {about ? (
        <About />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="bookmarkList">
            {(provided) => (
              <ul
                className="list-none p-0"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {bookmarks.map((bookmark, index) => (
                  <Draggable
                    key={bookmark.id}
                    draggableId={bookmark.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className="bg-[#333] p-2 rounded-md mb-2 flex items-center hover:bg-[#444] transition-colors"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={bookmark.thumbnailUrl}
                          alt="Bookmark Icon"
                          className="w-6 h-6 mr-2"
                        />
                        {bookmark.title}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default App;
