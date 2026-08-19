// ===============================
// KushComics Admin Panel
// Firestore Publish System
// ===============================

import { auth, googleProvider, db } from "./firebase.js";

import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const ADMIN_EMAIL = "kushkumar921417@gmail.com";

const googleLoginBtn = document.getElementById("googleLoginBtn");
const publishBtn = document.getElementById("publishBtn");

let currentUser = null;


// ===============================
// GOOGLE ADMIN LOGIN
// ===============================

async function adminLogin() {

    try {

        const result = await signInWithPopup(auth, googleProvider);

        const user = result.user;

        if (user.email !== ADMIN_EMAIL) {

            alert("❌ You are not authorized as Admin.");

            await signOut(auth);

            return;
        }

        currentUser = user;

        alert("✅ Admin Login Successful!");

    } catch (error) {

        console.error("Login Error:", error);

        alert("❌ Login failed. Please try again.");

    }
}


// ===============================
// LOGIN BUTTON
// ===============================

if (googleLoginBtn) {

    googleLoginBtn.addEventListener("click", adminLogin);

}


// ===============================
// AUTH CHECK
// ===============================

onAuthStateChanged(auth, (user) => {

    if (user && user.email === ADMIN_EMAIL) {

        currentUser = user;

        console.log("🛡 Admin:", user.email);

    } else {

        currentUser = null;

        console.log("Admin is not logged in.");

    }

});


// ===============================
// PUBLISH FREE / PREMIUM COMIC
// ===============================

if (publishBtn) {

    publishBtn.addEventListener("click", async () => {

        // Check login
        if (!currentUser) {

            alert("🔐 पहले Google से Admin Login करें।");

            return;
        }


        // Get form fields
        const titleInput =
            document.querySelector('input[type="text"]');

        const categorySelect =
            document.querySelector("select");

        const descriptionInput =
            document.querySelector("textarea");


        const title =
            titleInput ? titleInput.value.trim() : "";

        const category =
            categorySelect ? categorySelect.value : "";

        const description =
            descriptionInput
                ? descriptionInput.value.trim()
                : "";


        // Check title
        if (title === "") {

            alert("❌ Please enter a comic title.");

            return;
        }


        // Get comic type
        const selects =
            document.querySelectorAll("select");

        let comicType = "Free";

        if (selects.length > 1) {

            comicType = selects[1].value;

        }


        try {

            publishBtn.disabled = true;

            publishBtn.innerText = "⏳ Publishing...";


            // Save comic information in Firestore
            const docRef = await addDoc(
                collection(db, "comics"),
                {

                    title: title,

                    category: category,

                    description: description,

                    type: comicType,

                    published: true,

                    createdAt: serverTimestamp(),

                    createdBy: currentUser.email

                }
            );


            console.log(
                "Comic published:",
                docRef.id
            );


            alert(
                "✅ Comic Published Successfully!\n\n" +
                "Title: " + title + "\n" +
                "Type: " + comicType
            );


            // Clear form
            if (titleInput) {
                titleInput.value = "";
            }

            if (descriptionInput) {
                descriptionInput.value = "";
            }


        } catch (error) {

            console.error(
                "Firestore Error:",
                error
            );

            alert(
                "❌ Comic publish नहीं हुआ।\n\n" +
                error.message
            );

        } finally {

            publishBtn.disabled = false;

            publishBtn.innerText =
                "🚀 Publish Comic";

        }

    });

}
