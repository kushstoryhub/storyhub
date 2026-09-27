// ===============================
// KushComics - Firebase Comics
// ===============================

import { collection, getDocs, query, where }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { db }
from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 KushComics Loaded");

    loadComics();

    // Search
    const searchInput = document.querySelector(".search input");

    if (searchInput) {
        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            document.querySelectorAll(".comic-card").forEach(card => {

                const title =
                    card.querySelector("h3")?.innerText.toLowerCase() || "";

                card.style.display =
                    title.includes(value) ? "" : "none";

            });
        });
    }

});


// ===============================
// LOAD COMICS FROM FIRESTORE
// ===============================

async function loadComics() {

    try {

        const comicsRef = collection(db, "comics");

        const q = query(
            comicsRef,
            where("published", "==", true)
        );

        const snapshot = await getDocs(q);

        console.log("Firebase comics:", snapshot.size);

        const grids = document.querySelectorAll(".comic-grid");

        if (!grids.length) {
            console.error("Comic grid not found.");
            return;
        }

        // Existing demo comics हटाओ
        grids.forEach(grid => {
            grid.innerHTML = "";
        });

        if (snapshot.empty) {

            grids[0].innerHTML = `
                <p style="text-align:center;">
                    अभी कोई comic उपलब्ध नहीं है।
                </p>
            `;

            return;
        }

        snapshot.forEach(doc => {

            const comic = doc.data();

            const card = createComicCard(comic);

            // Latest और Trending दोनों में दिखाएँ
            grids.forEach(grid => {
                grid.appendChild(card.cloneNode(true));
            });

        });

        addReadButtons();

    } catch (error) {

        console.error("Firebase Error:", error);

    }

}


// ===============================
// CREATE COMIC CARD
// ===============================

function createComicCard(comic) {

    const card = document.createElement("div");

    card.className = "comic-card";

    const title = comic.title || "Untitled Comic";
    const category = comic.category || "Comic";
    const cover = comic.coverUrl || "https://picsum.photos/300/420";
    const type = comic.type || "Free";

    card.innerHTML = `
        <img
            src="${cover}"
            alt="${title} Comic Cover"
            onerror="this.src='https://picsum.photos/300/420'"
        >

        <div class="comic-info">

            <h3>${title}</h3>

            <p>${category} • ${type}</p>

            <button type="button"
                    class="read-comic-btn">
                ${type === "Premium" ? "Read Premium" : "Read Now"}
            </button>

        </div>
    `;

    card.dataset.comicUrl = comic.comicUrl || "";

    return card;
}


// ===============================
// READ BUTTON
// ===============================

function addReadButtons() {

    document.querySelectorAll(".read-comic-btn").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".comic-card");

            const url = card?.dataset.comicUrl;

            if (url) {
                window.open(url, "_blank");
            } else {
                alert("Comic file उपलब्ध नहीं है।");
            }

        });

    });

}
