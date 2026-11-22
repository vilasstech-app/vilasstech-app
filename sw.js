const CACHE="vilasstech-pwa-v22";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(SHELL);
    await self.skipWaiting();
  })());
});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith("vilasstech-pwa-")&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",event=>{
  const req=event.request;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin||req.method!=="GET")return;
  if(req.mode==="navigate"){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:"no-store"});
        if(fresh.ok){
          const cache=await caches.open(CACHE);
          await cache.put("./index.html",fresh.clone());
        }
        return fresh;
      }catch(e){
        return (await caches.match("./index.html"))||Response.error();
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    if(cached)return cached;
    try{
      const fresh=await fetch(req);
      if(fresh.ok)await (await caches.open(CACHE)).put(req,fresh.clone());
      return fresh;
    }catch(e){return Response.error();}
  })());
});
