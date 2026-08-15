import { auth, googleProvider } from "./firebase.js";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const publishBtn = document.getElementById("publishBtn");

// ================= ADMIN LOGIN =================

const ADMIN_EMAIL = "kushkumar921417@gmail.com";

async function adminLogin() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        if (user.email !== ADMIN_EMAIL) {
            alert("❌ You are not authorized as Admin.");
            await signOut(auth);
            return;
        }

        alert("✅ Admin Login Successful!");
    } catch (error) {
        console.error(error);
        alert("❌ Login failed. Please try again.");
    }
}

// ================= AUTH CHECK =================

onAuthStateChanged(auth, (user) => {

    if (user) {

        if (user.email !== ADMIN_EMAIL) {
            alert("❌ Admin access required.");
            signOut(auth);
            return;
        }

        console.log("🛡 Admin:", user.email);

    } else {

        console.log("Admin is not logged in.");

    }

});

// ================= PUBLISH BUTTON =================

if (publishBtn) {

    publishBtn.addEventListener("click", () => {

        const titleInput =
            document.querySelector('input[type="text"]');

        const title = titleInput
            ? titleInput.value.trim()
            : "";

        if (title === "") {
            alert("❌ Please enter a comic title.");
            return;
        }

        alert(
            "📚 Comic '" +
            title +
            "' is ready for Firebase upload."
        );

    });

}

// ================= GOOGLE LOGIN =================

// Login button will be added in the next step.

const googleLoginBtn = document.getElementById("googleLoginBtn");

if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () => {
        adminLogin();
    });
}
window.adminLogin = adminLogin;
