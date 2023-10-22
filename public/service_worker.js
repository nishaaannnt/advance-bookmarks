/*global chrome*/

let createdBookmarks = [];
let removedBookmarksIds = [];

chrome.bookmarks.onCreated.addListener((id, bookmark)=>{
  const node = {
    id: id,
    title: bookmark.title,
    url: bookmark.url,
    thumbnailUrl: `https://www.google.com/s2/favicons?domain=${bookmark.url}`,
  }
  createdBookmarks.push(node);
});

chrome.bookmarks.onRemoved.addListener((id)=>{
  const indexRemovedBookmark = createdBookmarks.findIndex(item=>item.id === id);
  if(indexRemovedBookmark !== -1){
    createdBookmarks.splice(indexRemovedBookmark,1);
  }else {
    removedBookmarksIds.push(id);
  }
});

chrome.runtime.onConnect.addListener((port)=>{
  port.onMessage.addListener((message)=>{
    if(message.action === "createdBookmark"){
      port.postMessage(createdBookmarks);
      createdBookmarks = [];
    }
    if(message.action === "removeBookmark"){
      port.postMessage(removedBookmarksIds);
      removedBookmarksIds = [];
    }
  });
});