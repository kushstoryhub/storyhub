// KushComics v2

document.addEventListener("DOMContentLoaded",()=>{

console.log("KushComics Loaded");

const buttons=document.querySelectorAll("button");

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

btn.style.transform="scale(.95)";

setTimeout(()=>{

btn.style.transform="scale(1)";

},150);

});

});

});// Smooth Scroll for Navigation

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});// Read Buttons

const readButtons=document.querySelectorAll(".comic-info button");

readButtons.forEach(button=>{

button.addEventListener("click",()=>{

alert("📖 Comic Reader will be available soon!");

});

});


// Hero Buttons

const heroButtons=document.querySelectorAll(".hero button");

heroButtons.forEach(button=>{

button.addEventListener("click",()=>{

window.scrollTo({

top:700,

behavior:"smooth"

});

});

});// Premium Button

const premiumBtn=document.querySelector(".premium-btn");

if(premiumBtn){

premiumBtn.addEventListener("click",()=>{

alert("💎 Premium Comics feature is coming soon!");

});

}

// Newsletter

const subscribeBtn=document.querySelector(".newsletter-box button");

if(subscribeBtn){

subscribeBtn.addEventListener("click",()=>{

const email=document.querySelector(".newsletter-box input");

if(email.value.trim()===""){

alert("Please enter your email.");

}else{

alert("✅ Thanks for subscribing!");

email.value="";

}

});

}// Social Links

const socialLinks=document.querySelectorAll(".social-links a");

socialLinks.forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

alert("🚀 Social links will be added soon!");

});

});


// Category Cards

const categories=document.querySelectorAll(".category-card");

categories.forEach(card=>{

card.addEventListener("click",()=>{

const name=card.querySelector("h3").innerText;

alert("📚 Opening "+name+" Comics");

});

});// Search Feature

const searchInput=document.querySelector(".search input");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

const comics=document.querySelectorAll(".comic-card");

comics.forEach(card=>{

const title=card.querySelector("h3").innerText.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}// Welcome Message

setTimeout(()=>{

console.log("Welcome to KushComics 🚀");

},1000);


// Comic Card Animation

const comicCards=document.querySelectorAll(".comic-card");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

comicCards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition="0.6s";

observer.observe(card);

});// Navbar Active Effect

const navLinks=document.querySelectorAll(".nav-links a");

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

navLinks.forEach(item=>item.classList.remove("active"));

link.classList.add("active");

});

});


// Loading Animation

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});

document.body.style.opacity="0";

document.body.style.transition="opacity .6s ease";// Premium Hover Effects

document.querySelectorAll(".comic-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});


// Footer Year

const year=document.querySelector(".footer p");

if(year){

year.innerHTML="© 2026 KushComics • All Rights Reserved";

}// KushComics Final Setup

window.addEventListener("load",()=>{

console.log("🚀 KushComics Ready");

});

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",()=>{

navigator.vibrate?.(30);

});

});

// Future Features Placeholder
const app={
version:"1.0",
name:"KushComics"
};

console.log(app);
