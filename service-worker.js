// Use a versioned cache name to ensure caches are updated with each new version
const CACHE_NAME = 'offline-cache-v4.2.10'  // Change the version number whenever there's an update
const OFFLINE_URL = 'index.html';      // The file to display when offline
const CACHE_ASSETS = [
  '/',
  'index.html',
  'styles.css',
  'questions.js',
  'cycle2/index.html',
  'cycle2/styles2.css',
  'cycle2/questions2.js',
  // 'cycle4/index.html',
  // 'cycle4/enumerator.js'

  'fasa3(test)/index.html',
  'fasa2(test)/styles2.css',
  'fasa2(test)/questions2.js',


  // 'cycle4/index.html',
  // 'cycle4/enumerator.js',
  // 'cycle4/survey.js',
  // 'cycle4/listOfQuestions.js',
  // 'cycle4/index.css',

  // 'cycle4/index.html',
  // 'cycle4/main.html',
  // 'cycle4/enumerator.js',
  // 'cycle4/survey.js',
  // 'cycle4/listOfQuestions.js',
  // 'cycle4/index.css'

  'cycle4/index.html',
  'cycle4/enumerator_history_respondents.html',
  'cycle4/enumerator.js',
  'cycle4/index.css',
  'cycle4/listOfQuestions.js',
  'cycle4/login.css',
  'cycle4/logout.html',
  'cycle4/main.html',
  'cycle4/survey.js',
  'cycle4/user_profile.css',
  'cycle4/user_profile.html',
  'cycle4/person-in-charge/enumerator_history_respondents_pic.html',
  'cycle4/person-in-charge/enumerator_history_respondents_pic.css',
  'cycle4/person-in-charge/enumerator.js',
  'cycle4/person-in-charge/index.css',
  'cycle4/person-in-charge/main.html',
  'cycle4/person-in-charge/listOfQuestions.js',
  'cycle4/person-in-charge/survey.js',
  'cycle4/person-in-charge/user_profile_pic.css',
  'cycle4/person-in-charge/user_profile_pic.html',
  'cycle4/admin/index.html',
  'cycle4/admin/index.css',
  'cycle4/admin/responses_records_v2.css',
  'cycle4/admin/responses_records_v2.html',
  'cycle4/admin/user_management_2.html',
  'cycle4/admin/user_management_2.css',
  'cycle4/admin/user_profile_admin.html',
  'cycle4/admin/user_profile_admin.css'
];
// Install event - add assets to cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    }).then(() => {
      // Force waiting service worker to become active immediately
      self.skipWaiting();
    })
  );
});
// Activate event - remove old caches and ensure the service worker is updated
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);  // Delete old cache versions
          }
        })
      );
    }).then(() => {
      // Take control immediately after activation
      return self.clients.claim();
    })
  );
});
// Fetch event - serve content from cache first, then network fallback
self.addEventListener('fetch', (event) => {
  // For navigation requests (HTML pages), try to fetch from the network first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If network fails, return cached offline page
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    // For non-navigation requests (e.g., JS, CSS, images), try to fetch from cache first
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
// Optional: Notify the user to refresh the page when a new service worker is activated
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    alert('A new version of the app is available. Please refresh to use the latest version!');
  });
}

// const CACHE_NAME = 'offline-cache';
// const OFFLINE_URL = 'index.html'; // The file to display when offline
// const CACHE_ASSETS = [
//   '/',
//   'index.html',
//   'styles.css', 
//   'questions.js',
//   'cycle2/index.html',  // for cycle 2 pages
//   'cycle2/styles2.css',
//   'cycle2/questions2.js'
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(CACHE_ASSETS);
//     })
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(
//         keyList.map((key) => {
//           if (key !== CACHE_NAME) {
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   if (event.request.mode === 'navigate') {
//     event.respondWith(
//       fetch(event.request).catch(() => {
//         return caches.match(OFFLINE_URL);
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });
