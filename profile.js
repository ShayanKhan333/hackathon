// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore , setDoc , doc ,collection ,getDocs,addDoc ,query,where,getDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, getStorage, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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
const storage = getStorage(app);


const imageInput = document.getElementById("imageInput");
const uploadButton = document.getElementById("uploadButton");

// Listen for file selection
imageInput.addEventListener("change", handleImageUpload);

            async function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const user = auth.currentUser;

    if (!user) {
        return;
    }

    const userId = user.uid;
    const storageRef = ref(storage, `profilePictures/${userId}`);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);

        // Update user's profile data with the image URL
        await updateProfile(user, { photoURL: imageUrl });

        // You might also want to update the image URL in Firestore if needed

        // Display the profile picture in your UI
        const profileImage = document.getElementById("profileImage");
        profileImage.src = imageUrl;

        console.log("Profile picture uploaded and updated.");
    } catch (error) {
        console.error("Error uploading profile picture: ", error);
    }
}
