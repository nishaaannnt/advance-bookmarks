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
  createdBookmarks = createdBookmarks.filter(item=>item.id !== id);
  removedBookmarksIds.push(id);
});

chrome.runtime.onConnect.addListener((port)=>{
  
});