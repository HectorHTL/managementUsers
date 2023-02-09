  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDTBCC-O_yiWZ619AcaqOjiXM9agjLWxSg",
    authDomain: "gestionusuarios-6fc91.firebaseapp.com",
    projectId: "gestionusuarios-6fc91",
    storageBucket: "gestionusuarios-6fc91.appspot.com",
    messagingSenderId: "142606284562",
    appId: "1:142606284562:web:3af8ca52f99cc8f672e5cb",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export{
    app
  }