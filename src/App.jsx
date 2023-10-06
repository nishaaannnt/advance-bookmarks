/*global chrome*/
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { info, close, GoSun, FaMoon, AiOutlineClose, FaInfo, SlOptionsVertical } from './assets';
import About from './pages/About';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [about, setAbout] = useState(false);
  const [darkMode, setDarkMode] = useState(null)

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

  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setDarkMode('dark');
    }
    else {
      setDarkMode('light');
    }
  }, [])

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const  toggleDarkMode = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
  };



  return (
    <div className="App dark:text-white w-96 h-auto min-h-[600px] dark:bg-black bg-white text-black  p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Advanced Bookmarks</h1>
        {darkMode === 'dark' ? (
          <button className="bg-black-700 hover: bg-black  rounded-3x1 p-4  " onClick={toggleDarkMode}>
            {''}
            <GoSun size={20}/>
          </button>
        ): 
          <button className=" bg-grey-100 hover: bg-grey-300 rounded-3x1 p-4 " onClick={toggleDarkMode}>
            {''}
            <FaMoon size={20} />
        </button>
      }
      {darkMode === 'dark' ? (
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
        ): 
        <button
          onClick={handleAbout}
          className="hover:cursor-pointer"
          target="_blank">
            {about ? (
                <AiOutlineClose size={20}  />
              ) : (
                <FaInfo size={20}/>
                )}
        </button>
      }
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
                        className="dark:bg-[#333] bg-[#b6b4b4] p-2 rounded-md mb-2 flex items-center dark:hover:bg-[#444]  hover:bg-[#9d9d9dde] transition-colors relative" // Added relative positioning
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <img
                          src={bookmark.thumbnailUrl}
                          alt="Bookmark Icon"
                          className="w-6 h-6 mr-2"
                        />
                        <span
                          className="truncate max-w-[70%] cursor-pointer"
                          onClick={() => window.open(bookmark.url, '_blank')}
                        >
                          {bookmark.title.length > 30
                            ? `${bookmark.title.substring(0, 30)}...`
                            : bookmark.title}
                        </span>
                        <div
                          {...provided.dragHandleProps}
                          className="w-4 h-4 cursor-grab absolute top-0 right-0 m-2" // Positioned to the extreme right
                        >
                          {/* Replaced the icon with a vertical dots icon */}
                          <SlOptionsVertical/>
                            {/* <path d="M9 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM9 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /> */}
                          
                        </div>
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
