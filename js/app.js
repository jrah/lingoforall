/* global document:true*/
const menuToggle = document.querySelector('.menu__toggle');

menuToggle.addEventListener('click', (e) => {
  const menu = document.querySelector('.menu');
  e.stopPropagation();
  e.preventDefault();
  menu.classList.toggle('menu--open');
});
