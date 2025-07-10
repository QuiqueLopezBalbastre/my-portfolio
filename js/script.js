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

const formularioContacto = document.getElementById('formulario-contacto');
if (formularioContacto) {
    // Clonar el elemento para eliminar todos los event listeners
    const nuevoFormulario = formularioContacto.cloneNode(true);
    formularioContacto.parentNode.replaceChild(nuevoFormulario, formularioContacto);
    
    // Agregar el nuevo event listener
    document.getElementById('formulario-contacto').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('input[type="submit"]');
        const originalText = submitBtn.value;
        const mensajeExito = document.getElementById('mensaje-exito');
        
        // Mostrar estado de carga
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // IMPORTANTE: Usar tu ID real de Formspree aquí
            const response = await fetch('https://formspree.io/f/mqabraqo', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Mostrar mensaje de éxito
                if (mensajeExito) {
                    mensajeExito.style.display = 'block';
                    mensajeExito.classList.add('show');
                }
                
                // Limpiar formulario
                this.reset();
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    if (mensajeExito) {
                        mensajeExito.style.display = 'none';
                        mensajeExito.classList.remove('show');
                    }
                }, 5000);
                
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
        } catch (error) {
            console.error('Error enviando formulario:', error);
            
            // Mostrar mensaje de error amigable
            showErrorMessage('Error sending message. Please try again or contact me directly at quilobal@gmail.com');
            
        } finally {
            // Restaurar botón
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Función para mostrar mensajes de error
function showErrorMessage(message) {
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = `
        background: linear-gradient(135deg, #f44336, #d32f2f);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: center;
        font-family: 'Cinzel', serif;
        font-weight: 500;
        letter-spacing: 1px;
        border: 2px solid #d32f2f;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        z-index: 10000;
    `;
    errorMsg.textContent = message;
    
    document.body.appendChild(errorMsg);
    
    // Remover mensaje después de 7 segundos
    setTimeout(() => {
        if (errorMsg.parentNode) {
            errorMsg.style.opacity = '0';
            errorMsg.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (errorMsg.parentNode) {
                    errorMsg.parentNode.removeChild(errorMsg);
                }
            }, 300);
        }
    }, 7000);
}