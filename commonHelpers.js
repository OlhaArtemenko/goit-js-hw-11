import{i as f,S as m}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(o){if(o.ep)return;o.ep=!0;const t=e(o);fetch(o.href,t)}})();function p(){const r=h.value.trim().split(",").join("+"),s=new URLSearchParams({key:"42959666-b225ac6c9c40b570269fe0b4e",q:[r],image_type:"photo",orientation:"horizontal",safesearch:!0});return y(),fetch(`https://pixabay.com/api/?${s}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}function d(r){if(r.length==0)f.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",progressBarColor:"#FFFFFF",icon:null,backgroundColor:"#ef4040",titleColor:"#fff",messageColor:"#fff",close:!1});else{const s=r.map(e=>`<li class="image-item">
          <a class="image-link" href="${e.largeImageURL}">
          <img class="image" src="${e.webformatURL}" alt="${e.tags}" />
          </a>
          <ul class="image-information-box">
          <li class="item-information"><p><span class="info-title">Likes</span></br>${e.likes}</p></li>
          <li class="item-information"><p><span class="info-title">Views</span></br>${e.views}</p></li>
          <li class="item-information"><p><span class="info-title">Comments</span></br>${e.comments}</p></li>
          <li class="item-information"><p><span class="info-title">Downloads</span></br>${e.downloads}</p></li>
          </ul>
          </li >`).join("");u.insertAdjacentHTML("beforeend",s),g.refresh()}}const i=document.querySelector(".search-form"),h=i.elements.search,u=document.querySelector(".gallery"),g=new m(".gallery a",{captionsData:"alt",captionDelay:300}),a=document.querySelector(".loader");a.style.display="none";const y=()=>{a.style.display="flex"},c=()=>{a.style.display="none"};i.addEventListener("submit",b);function b(r){r.preventDefault(),u.innerHTML="",r.target.elements.search.value.trim()!==""&&(window.onload=()=>{p().then(e=>{d(e.hits),c()}).catch(e=>{console.log(e),c(),f.error({message:"Sorry, an error occurred while loading. Please try again!",position:"topRight",icon:null,backgroundColor:"#ef4040",titleColor:"#fff",messageColor:"#fff",close:!1})})},window.onload(),i.reset())}
//# sourceMappingURL=commonHelpers.js.map
