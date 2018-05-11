/**
 * PWA Kit
 * 2018
 * https://github.com/andresitodeguzman/pwa-kit
 * 
 * Service Worker
 *
 */

'use strict';

let cn = '1';
let cacheWhiteList = ['1'];
let assetsList = [];

// Install Event
self.addEventListener('install', event=>{
    // Open the cache
    event.waitUntil(caches.open(cn)
        .then(cache=>{
            // Fetch all the assets from the array
            return cache.addAll(assetsList);
        }).then(()=>{
            console.log("done caching");
        })
    );
});

/*
// Fetch Event
self.addEventListener('fetch',event=>{
    event.respondWith(
        caches.open(cn).then(cache=>{
            return cache.match(event.request).then(response=>{
                return response || fetch(event.request);
            });
        })
    );
});
*/

self.addEventListener('fetch', event=>{
    event.respondWith(
        caches.match(event.request)
            .then(response=>{
                //Fallback to network
                return response || fetch(event.request);
            })
            .catch(r=>{
                console.log(r);
            })
    );
});

// Remove Old Caches
self.addEventListener('activate', (event)=>{
    event.waitUntil(
        caches.keys().then((keyList)=>{
            return Promise.all(keyList.map((key)=>{
                if(cacheWhiteList.indexOf(key) === -1){
                    return caches.delete(key);
                }
            }));
        })
    );
});