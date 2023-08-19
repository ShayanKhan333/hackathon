// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore , setDoc , doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzrC4vdgrzKIdoM_wdEml6_eMz8Su6Igw",
    authDomain: "hackathon2-8dceb.firebaseapp.com",
    projectId: "hackathon2-8dceb",
    storageBucket: "hackathon2-8dceb.appspot.com",
    messagingSenderId: "212323014228",
    appId: "1:212323014228:web:5d4ec03bf0ce3eda367fc1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click" , signUp)
async function signUp() {
    try {
        
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const repeatPassword = document.getElementById("repeatPassword").value
    console.log(firstName,
        lastName,
    email,
    password,
    repeatPassword,)
     if (!firstName || !lastName || !email || !password || !repeatPassword ) { alert("Please fill the requirements")
        return
     }
    const userAuth = await createUserWithEmailAndPassword (auth , email , password)
    console.log(userAuth.user.uid)
    const uid = userAuth.user.uid
    const obj = {
        firstName,
lastName,
repeatPassword,
        email,
        password,
        uid,
        accountActivate: true,
    }
    console.log(obj ,"userobj")
    const userRef = doc(db , "users" , uid)
    const userData = await setDoc(userRef, obj)
    console.log("userData" , userData)
    window.location.assign("/login.html")
    } catch (error) {
        console.log("error.message")
        alert("error")
        
    }
    

}


