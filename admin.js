// ===============================
// KushComics Admin Panel
// Firebase + Google Admin Login
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


// ===============================
// ADMIN EMAIL
// ===============================

const ADMIN_EMAIL = "kushkumar921417@gmail.com";


// ===============================
// BUTTONS
// ===============================

const googleLoginBtn =
    document.getElementById("googleLoginBtn");

const publishBtn =
    document.getElementById("publishBtn");


// Current logged-in user
let currentUser = null;


// ===============================
// GOOGLE ADMIN LOGIN
// ===============================

async function adminLogin() {

    try {

        const result =
            await signInWithPopup(
                auth,
                googleProvider
            );

        const user = result.user;

        console.log(
            "Google Login:",
            user.email
        );


        // Check Admin Email
        if (user.email !== ADMIN_EMAIL) {

            alert(
                "❌ You are not authorized as Admin.\n\n" +
                "Admin Email:\n" +
                ADMIN_EMAIL
            );

            await signOut(auth);

            currentUser = null;

            return;
        }


        // Admin Login Successful
        currentUser = user;

        alert(
            "✅ Admin Login Successful!\n\n" +
            user.email
        );


    } catch (error) {

        console.error(
            "Google Login Error:",
            error
        );


        alert(
            "❌ Login failed!\n\n" +
            "Error Code:\n" +
            error.code +
            "\n\n" +
            "Error Message:\n" +
            error.message
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
// AUTH STATE CHECK
// ===============================

onAuthStateChanged(
    auth,
    (user) => {

        if (
            user &&
            user.email === ADMIN_EMAIL
        ) {

            currentUser = user;

            console.log(
                "🛡 Admin Logged In:",
                user.email
            );

        } else {

            currentUser = null;

            console.log(
                "Admin is not logged in."
            );

        }

    }
);


// ===============================
// PUBLISH COMIC
// ===============================

if (publishBtn) {

    publishBtn.addEventListener(
        "click",
        async () => {


            // ===============================
            // CHECK ADMIN LOGIN
            // ===============================

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
                document.getElementById(
                    "comicTitle"
                );

            const categorySelect =
                document.getElementById(
                    "categorySelect"
                );

            const coverUrlInput =
                document.getElementById(
                    "coverUrl"
                );

            const comicUrlInput =
                document.getElementById(
                    "comicUrl"
                );

            const comicTypeSelect =
                document.getElementById(
                    "comicType"
                );

            const descriptionInput =
                document.getElementById(
                    "descriptionInput"
                );


            // ===============================
            // GET VALUES
            // ===============================

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
            // PUBLISH
            // ===============================

            try {

                publishBtn.disabled = true;

                publishBtn.innerText =
                    "⏳ Publishing...";


                const docRef =
                    await addDoc(
                        collection(
                            db,
                            "comics"
                        ),
                        {

                            title:
                                title,

                            category:
                                category,

                            coverUrl:
                                coverUrl,

                            comicUrl:
                                comicUrl,

                            type:
                                comicType,

                            description:
                                description,

                            published:
                                true,

                            createdAt:
                                serverTimestamp(),

                            createdBy:
                                currentUser.email

                        }
                    );


                console.log(
                    "Comic Published:",
                    docRef.id
                );


                // ===============================
                // SUCCESS MESSAGE
                // ===============================

                alert(
                    "✅ Comic Published Successfully!\n\n" +
                    "Title: " +
                    title +
                    "\n\n" +
                    "Type: " +
                    comicType
                );


                // ===============================
                // CLEAR FORM
                // ===============================

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
