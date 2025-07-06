document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Testimonios Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    let currentTestimonial = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Click en los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            showTestimonial(index);
            startAutoSlide();
        });
    });

    // Iniciar auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    // Mostrar el primer testimonio
    showTestimonial(0);
    startAutoSlide();

    // Pausar auto slide al hacer hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', startAutoSlide);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.card-overlay');
            overlay.style.backgroundColor = 'rgba(37, 211, 102, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.card-overlay');
            overlay.style.backgroundColor = '';
        });
    });

    // Modal functionality for service details
    const serviceButtons = document.querySelectorAll('.btn-outline');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceTitle = this.closest('.service-card').querySelector('h3').textContent;
            alert(`Más información sobre: ${serviceTitle}\n\nEsta funcionalidad abriría un modal con detalles completos del servicio en una implementación real.`);
        });
    });
});

// Función para mostrar/ocultar detalles del servicio
function toggleServiceDetails(serviceId) {
    const details = document.getElementById(`service-details-${serviceId}`);
    if (details.style.display === 'block') {
        details.style.display = 'none';
    } else {
        details.style.display = 'block';
    }
}
