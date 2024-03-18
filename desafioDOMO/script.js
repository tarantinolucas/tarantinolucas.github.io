/* Header */

//  seleccionamos los dos elementos que serán clickables del menu

const toggleButton = document.getElementById("button-menu");
const navWrapper = document.getElementById("nav");

/* 
  mostramos el menu
*/
toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("close");
  navWrapper.classList.toggle("show");
});

/* 
  cerramos el menu cuando se clickea fuera de el
*/

navWrapper.addEventListener("click", (e) => {
  if (e.target.id === "nav") {
    navWrapper.classList.remove("show");
    toggleButton.classList.remove("close");
  }
});
