import {
  collection,query,where,getDocs,getFirestore,addDoc,doc,updateDoc,limit,startAfter, startAt,orderBy, deleteDoc
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { app } from "/users/js/firebase.js";

const db = getFirestore(app);

const q = query(collection(db, "users"), orderBy("created_at"));
var text = document.getElementById("text");
var users = document.getElementById("users");

var idUser = "";


const getAllUsersFire = async () => {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const newUser= document.createElement("div");
    newUser.className = "col col-lg-4";
    newUser.innerHTML += `

    <br>
    <br>
    <div class="card" style="width: 18rem;" data-bs-toggle='modal' data-bs-target='#exampleModal'>
    <img src="${doc.data().image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${doc.data().name} ${doc.data().lastName}  </h5>
      <h6 class="card-subtitle mb-2 text-muted">${doc.data().position} </h6>
    </div>
    </div>


    
    `;
  newUser.addEventListener("click", () => {
        console.log(doc.data().name);
        idUser= doc.id;
        document.getElementById("textModal").value = doc.data().name;
        document.getElementById("lastName").value = doc.data().lastName;
        document.getElementById("position").value = doc.data().position;
        document.getElementById("address").value = doc.data().address;
        document.getElementById("city").value = doc.data().city;
        document.getElementById("state").value = doc.data().state;
        document.getElementById("phone").value = doc.data().phone;
        document.getElementById("mail").value = doc.data().mail;
        document.getElementById("imageUser").src = doc.data().image;



        console.log(idUser);
      });
  
      users.append(newUser);
  });
};




const createUserFire = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return docRef.id;
  } catch (error) {
    return "no-created";
  }
};

function updateUser() {
  const docRef = doc(db, "users", idUser);
  var textModal = document.getElementById("textModal");
  var lastName = document.getElementById("lastName");
  var position = document.getElementById("position");
  var address = document.getElementById("address");
  var city = document.getElementById("city");
  var state = document.getElementById("state");
  var phone = document.getElementById("phone");
  var mail = document.getElementById("mail");
  var image = document.getElementById("imageUser").src;

  console.log(image);


  const data = {
    name: textModal.value,
    lastName : lastName.value,
    position : position.value,
    address : address.value,
    city : city.value,
    state : state.value,
    phone : phone.value,
    mail : mail.value,
    image : image
  };

  updateDoc(docRef, data)
    .then((docRef) => {
      location.reload();
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}



const edit = document.getElementById("edit");
edit.addEventListener("click", () => {
  updateUser();
  if (updateUser) {
    Toastify({
      text: "Usuario actualizado exitosamente",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
});


const deleteUserFire = async (idUser) => {
  try {
    await deleteDoc(doc(db, "users", idUser));
    return  "deleted";
  } catch (error) {
    return "no-deleted";
  }
};

const deleteUser = async () => {
 

  const generatedId = await  deleteUserFire(idUser);
  if (generatedId != "no-deleted") {
    txtName.value = "";
    Toastify({
      text: "Usuario eliminado exitosamente!",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    alert("Usuario no eliminado");
  }

  setTimeout(() => {location.reload() }, 3000);

}
const btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", deleteUser);






export { getAllUsersFire, createUserFire,deleteUserFire };
