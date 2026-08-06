// KushComics Admin Panel

const publishBtn = document.getElementById("publishBtn");

publishBtn.addEventListener("click", () => {
    alert("🚀 Comic Publish feature is coming soon!");
});// Comic Form Fields

const titleInput = document.querySelector('input[type="text"]');
const categorySelect = document.querySelector("select");
const descriptionInput = document.querySelector("textarea");

publishBtn.addEventListener("click", () => {

    const title = titleInput.value.trim();

    if (title === "") {
        alert("❌ Please enter a comic title.");
        return;
    }

    alert("✅ Comic '" + title + "' is ready to publish!");

});// Future Firebase Upload

function uploadComic() {

    console.log("Preparing Firebase Upload...");

    alert("📚 Firebase upload will be connected in the next step.");

}

publishBtn.addEventListener("dblclick", () => {

    uploadComic();

});
