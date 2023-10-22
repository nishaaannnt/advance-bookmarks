/*global chrome*/
export const connectToServiceWorker = ()=>{
  return chrome.runtime.connect({name:"popup"});
}
export const fetchAddBookmarks = (port)=>{
  return new Promise((resolve,reject)=>{
    try{
      port.postMessage({action:"createdBookmark"});
      port.onMessage.addListener(resolve);
    } catch(err){
      reject(err);
    }
  })
}
export const fetchRemoveBookmarks = (port)=>{
  return new Promise((resolve,reject)=>{
    try{
      port.postMessage({action:"removeBookmark"});
      port.onMessage.addListener(resolve);
    } catch(err){
      reject(err);
    }
  })
}
export const disconnectFromServiceWorker = (port)=>{
  return port.disconnect();
}