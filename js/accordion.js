const accordion = document.querySelector('.accordion');


accordion.addEventListener('click', (event) => {
  if (event.target.className === 'accordion-term') {
    const dd = event.target.nextElementSibling;
    dd.classList.toggle('open');
  }
});
