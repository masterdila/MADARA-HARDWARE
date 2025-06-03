// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {}; // <--- Check this line
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

console.log("Firebase App ID:", appId);
console.log("Firebase Config:", firebaseConfig); // ADD THIS LINE
console.log("Initial Auth Token:", initialAuthToken);

let db;
let auth;
let currentUserId = null;
let isAuthReady = false;

// ... rest of your code