// if (navigator.serviceWorker) {
//     navigator.serviceWorker.register("./sw.js");
// }

import { getAllUsersFire, createUserFire,deleteUserFire } from "/js/firebase-functions.js";
import {getStorage,ref, uploadBytes,getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { app } from "/js/firebase.js";
const storage = getStorage(app);
const getAllUsers = () => {
  getAllUsersFire();
};



const textModal = document.getElementById("textModal");



const saveUser = async () => {
  
  const file = document.querySelector("#image").files[0];
  const name = file.name;
  const storageRef  = ref(storage, "images/"+name);
  var img = "";
  const metadata = {
    contentType : file.type
  }
  const task = uploadBytes(storageRef, file, metadata);
 
  getDownloadURL(storageRef)
  .then(async (url) =>  {
    console.log("Entra crear usuario")
  const user = {
    name: "",
    lastName : "",
    position : "",
    address : "",
    city : "",
    state : "",
    phone : "",
    mail : "",
    image : "",
    created_at: new Date(),
  };

  const txtName = document.getElementById("txtName");
  const lastName = document.getElementById("lastNameNew");
  const position = document.getElementById("positionNew");
  const address = document.getElementById("addressNew");
  const city = document.getElementById("cityNew");
  const state = document.getElementById("stateNew");
  const phone = document.getElementById("phoneNew");
  const mail = document.getElementById("mailNew");
  
  img=url;

  console.log(img);
  user.name = txtName.value;
  user.lastName = lastName.value,
  user.position = position.value,
  user.address = address.value,
  user.city = city.value,
  user.state = state.value,
  user.phone = phone.value,
  user.mail = mail.value,
  user.image = img

  
  const generatedId = await createUserFire(user);
  if (generatedId != "no-created") {
    txtName.value = "";
    Toastify({
      text: "Usuario creado exitosamente!",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    alert("Usuario no creado");
  }

  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });

  


setTimeout(() => {location.reload() }, 3000);

};


const btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", saveUser);


getAllUsers();
