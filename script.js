'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header=document.querySelector('.header');
const section1=document.querySelector('#section--1');
const  btnScrollTo= document.querySelector('.btn--scroll-to');
//modal window
const openModal = function (e) {
e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
 btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//cookie message
// const message =document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML='We use cookies for better functionality and for Analytics :) <button class="btn btn--close--cookie">Got it!</button>';
// header.append(message);
// const btncookieclose=document.querySelector('.btn--close--cookie');
// //console.log(btncookieclose);
// document.body.style.overflow='hidden';
// btncookieclose.addEventListener('click',function(){
//   message.remove();
//   document.body.style.overflow='visible';
// })
// message.style.backgroundColor='#37383d';
// message.style.width='120%';
// message.style.height='143px';
//smooth scrolling
btnScrollTo.addEventListener('click',function(){
  
  section1.scrollIntoView({behavior:'smooth'});
})
// btnScrollTo.addEventListener('mouseenter',function(){
//   alert('hello');
// })
//Page navigation-----
document.querySelector('.nav__links').addEventListener('click',function(e){
e.preventDefault();
console.log(e.target);
if(e.target.classList.contains('nav__link')){
  const id=e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({behavior:'smooth'})
}
})
const h1=document.querySelector('h1');
h1.firstElementChild.style.color='white';
h1.lastElementChild.style.color='white';
//BUILDING TABBED COMPONANT
const tabsContainer= document.querySelector('.operations__tab-container');
const operationTabs=document.querySelectorAll('.operations__tab');
const tabsContent=document.querySelectorAll('.operations__content');
 tabsContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
 // console.log(clicked);
  if(!clicked) return
  operationTabs.forEach((tb)=>tb.classList.remove('operations__tab--active'));
  //tab content area
  tabsContent.forEach((tb)=>tb.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
 })
 const navContainer=document.querySelector('.nav');
 const links=document.querySelectorAll('.nav__link');
 //console.log(links);
 const hoverEffect=function(e,opacity){
  const hover=e.target.closest('.nav__link');
  
  //console.log(hover);
  if(!hover) return
  links.forEach((lin)=>lin.style.opacity=opacity);
    hover.style.opacity=1;

 }
navContainer.addEventListener('mouseover',function(e){
hoverEffect(e,0.5);
})
navContainer.addEventListener('mouseout',function(e){
hoverEffect(e,1);
  })
  const nav= document.querySelector('.nav');
  const boundingNav= nav.getBoundingClientRect();
  //console.log(boundingNav);
  const stickyNav=function(entries){
    const [entry]=entries;
//console.log(entry);
if(entry.isIntersecting)
  nav.classList.remove('sticky');
else
nav.classList.add('sticky');

  }
  const headerOptions={
    root:null,
    threshold:0,
    rootMargin:`-${boundingNav.height}px`
  };
    const headerObserver= new IntersectionObserver(stickyNav,headerOptions);
    headerObserver.observe(header);
    //headerObserver.unobserve(header)   
     const allSection= document.querySelectorAll('.section');
//console.log(allSection);
const revealSection=function(entries){
const [entry]=entries;
//console.log(entry);
if(!entry.isIntersecting) return
entry.target.classList.remove('section--hidden');
}
const sectionObserver= new IntersectionObserver(revealSection,{  root:null,threshold:0.15}
)
allSection.forEach(function(section){
   section.classList.add('section--hidden');
  sectionObserver.observe(section);
  
})
 const allLazyImg= document.querySelectorAll('img[data-src]');
 const loadImg= function(entries,observer){
const [entry]=entries;
//console.log(entry);
if(!entry.isIntersecting)
  return;
  entry.target.src=entry.target.dataset.src;
 entry.target.addEventListener('load',()=>    entry.target.classList.remove('lazy-img'));
  
observer.unobserve(entry.target);
 };
 const imgObserver= new IntersectionObserver(loadImg,{
  root:null,
  threshold:0
 });
allLazyImg.forEach((img)=>
  imgObserver.observe(img)
);

const slides=document.querySelectorAll('.slide');
const slider=document.querySelector('.slider');
const btnright=document.querySelector('.slider__btn--right');
const btnleft=document.querySelector('.slider__btn--left');
const dotsContainer=document.querySelector('.dots');
let currentslide=0;
// console.log(slider);
// console.log(slides);
const activeDot=function(slide){
  document.querySelectorAll('.dots__dot').forEach((dots)=>dots.classList.remove('dots__dot--active'));
// console.log(document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active'))
document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
const createDots=function(){
  slides.forEach((_,i)=>dotsContainer.insertAdjacentHTML('beforeend',
  `<button class="dots__dot" data-slide="${i}"></button>`));
}

const goToSlide=function(slide){
  slides.forEach(function(sli,i){
    let pospercentage=(100*(i-slide));
  sli.style.transform=`translateX(${pospercentage}%)`;
  })
}
const moveNext=function(){
  currentslide===maxslide-1 ? currentslide=0:currentslide++;
goToSlide(currentslide);
activeDot(currentslide);
}
const movePrevious=function(){
  currentslide===0 ?currentslide=maxslide-1 : currentslide--;
  goToSlide(currentslide);
  activeDot(currentslide);
}

const maxslide=slides.length;
//slider.style.transform='scale(0.5) translateX(0%)';
//slider.style.overflow='visible';
goToSlide(0);
createDots();
activeDot(0);
btnright.addEventListener('click',moveNext);
btnleft.addEventListener('click',movePrevious);
document.addEventListener('keydown',function(e){
  if(e.key==='ArrowRight') moveNext();
  e.key==='ArrowLeft' && movePrevious();
})
dotsContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goToSlide(slide);
    activeDot(slide)
  }
    })
//  <button class="dots__dot" data-slide="0"></button>
  // dotsContainer.insertAdjacentHTML('beforeend',
  // `<button class="dots__dot" data-slide="0"></button>`);
 