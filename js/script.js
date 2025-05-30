// Ejemplo: Toggle del menú hamburguesa
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-activo');
});

document.addEventListener('DOMContentLoaded', () => {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      }
    });
  });

  const elementos = document.querySelectorAll('.oculto');
  elementos.forEach((el) => observador.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progreso = entry.target.querySelector('.progreso');
        progreso.style.width = progreso.getAttribute('data-porcentaje');
      }
    });
  });

  const habilidades = document.querySelectorAll('.habilidad');
  habilidades.forEach((habilidad) => observer.observe(habilidad));
});

document.getElementById('formulario-contacto').addEventListener('submit', function(e) {
  e.preventDefault();
  // Aquí puedes agregar la lógica para enviar el formulario, por ejemplo, usando fetch()
  document.getElementById('mensaje-exito').style.display = 'block';
  this.reset();
});
