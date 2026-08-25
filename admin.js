// ===============================
// KushComics Admin Panel
// Firebase + Google Redirect Login
// ===============================

import { auth, googleProvider, db } from "./firebase.js";

import {
    signInWithRedirect,
    getRedirectResult,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const ADMIN_EMAIL = "kushkumar921417@gmail.com";

const googleLoginBtn =
    document.getElementById("googleLoginBtn");

const publishBtn =
    document.getElementById("publishBtn");

let currentUser = null;


// ===============================
// GOOGLE ADMIN LOGIN
// ===============================

async function adminLogin() {

    try {

        await signInWithRedirect(
            auth,
            googleProvider
        );

    } catch (error) {

        console.error("Login Error:", error);

        alert(
            "❌ Login failed!\n\n" +
            "Error Code: " + error.code + "\n\n" +
            "Error Message: " + error.message
        );

    }

}


// ===============================
// LOGIN BUTTON
// ===============================

if (googleLoginBtn) {

    googleLoginBtn.addEventListener(
        "click",
        adminLogin
    );

}


// ===============================
// CHECK REDIRECT LOGIN RESULT
// ===============================

getRedirectResult(auth)
    .then((result) => {

        if (result && result.user) {

            const user = result.user;

            console.log(
                "Google Login User:",
                user.email
            );

            if (user.email !== ADMIN_EMAIL) {

                alert(
                    "❌ यह Google account Admin नहीं है.\n\n" +
                    "Admin Email:\n" +
                    ADMIN_EMAIL
                );

                signOut(auth);

                return;
            }

            currentUser = user;

            alert(
                "✅ Admin Login Successful!\n\n" +
                user.email
            );

        }

    })
    .catch((error) => {

        console.error(
            "Redirect Login Error:",
            error
        );

        alert(
            "❌ Google Login Failed!\n\n" +
            "Error Code: " + error.code + "\n\n" +
            "Error Message: " + error.message
        );

    });


// ===============================
// AUTH CHECK
// ===============================

onAuthStateChanged(auth, (user) => {

    if (user && user.email === ADMIN_EMAIL) {

        currentUser = user;

        console.log(
            "🛡 Admin:",
            user.email
        );

    } else {

        currentUser = null;

        console.log(
            "Admin is not logged in."
        );

    }

});


// ===============================
// PUBLISH COMIC
// ===============================

if (publishBtn) {

    publishBtn.addEventListener(
        "click",
        async () => {

            // Check login
            if (!currentUser) {

                alert(
                    "🔐 पहले Google से Admin Login करें।"
                );

                return;
            }


            // ===============================
            // GET FORM FIELDS
            // ===============================

            const titleInput =
                document.getElementById("comicTitle");

            const categorySelect =
                document.getElementById("categorySelect");

            const coverUrlInput =
                document.getElementById("coverUrl");

            const comicUrlInput =
                document.getElementById("comicUrl");

            const comicTypeSelect =
                document.getElementById("comicType");

            const descriptionInput =
                document.getElementById("descriptionInput");


            const title =
                titleInput
                    ? titleInput.value.trim()
                    : "";

            const category =
                categorySelect
                    ? categorySelect.value
                    : "";

            const coverUrl =
                coverUrlInput
                    ? coverUrlInput.value.trim()
                    : "";

            const comicUrl =
                comicUrlInput
                    ? comicUrlInput.value.trim()
                    : "";

            const comicType =
                comicTypeSelect
                    ? comicTypeSelect.value
                    : "Free";

            const description =
                descriptionInput
                    ? descriptionInput.value.trim()
                    : "";


            // ===============================
            // VALIDATION
            // ===============================

            if (title === "") {

                alert(
                    "❌ Please enter a comic title."
                );

                return;
            }

            if (coverUrl === "") {

                alert(
                    "❌ Please enter Cover Image URL."
                );

                return;
            }

            if (comicUrl === "") {

                alert(
                    "❌ Please enter Comic PDF / ZIP URL."
                );

                return;
            }


            // ===============================
            // SAVE TO FIRESTORE
            // ===============================

            try {

                publishBtn.disabled = true;

                publishBtn.innerText =
                    "⏳ Publishing...";


                const docRef =
                    await addDoc(
                        collection(db, "comics"),
                        {

                            title: title,

                            category: category,

                            coverUrl: coverUrl,

                            comicUrl: comicUrl,

                            type: comicType,

                            description: description,

                            published: true,

                            createdAt:
                                serverTimestamp(),

                            createdBy:
                                currentUser.email

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

                if (coverUrlInput) {

                    coverUrlInput.value = "";

                }

                if (comicUrlInput) {

                    comicUrlInput.value = "";

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

        }
    );

}
