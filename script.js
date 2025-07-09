document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect mejorado
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    let lastScrollTop = 0;
    const navbarHeight = navbar.offsetHeight;
    
    // Función para alternar el menú hamburguesa
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de scroll para desktop y móvil
        if (window.innerWidth > 768) {
            // Comportamiento desktop
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        } else {
            // Comportamiento móvil
            if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
                // Scroll hacia abajo
                navbar.classList.add('scrolled');
            } else {
                // Scroll hacia arriba
                if (scrollTop <= navbarHeight) {
                    navbar.classList.remove('scrolled');
                }
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // Testimonios Slider mejorado
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    const slider = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;
    let autoSlideInterval;
    let startX, moveX;
    let isDragging = false;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.transform = 'translateX(0)';
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Eventos de touch/swipe para desktop y móvil
    slider.addEventListener('mousedown', handleStart);
    slider.addEventListener('touchstart', handleStart);
    slider.addEventListener('mousemove', handleMove);
    slider.addEventListener('touchmove', handleMove);
    slider.addEventListener('mouseup', handleEnd);
    slider.addEventListener('touchend', handleEnd);
    slider.addEventListener('mouseleave', handleEnd);

    function handleStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        clearInterval(autoSlideInterval);
    }

    function handleMove(e) {
        if (!isDragging) return;
        moveX = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - startX;
    }

    function handleEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        if (Math.abs(moveX) > 50) { // Umbral para considerar swipe
            if (moveX > 0) {
                prevTestimonial();
            } else {
                nextTestimonial();
            }
        }
        startAutoSlide();
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
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    // Mostrar el primer testimonio
    showTestimonial(0);
    startAutoSlide();

    // Pausar auto slide al interactuar
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
    slider.addEventListener('touchstart', () => clearInterval(autoSlideInterval), { passive: true });

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

    // Función para mostrar/ocultar detalles del servicio
    window.toggleServiceDetails = function(serviceId) {
        const details = document.getElementById(`service-details-${serviceId}`);
        details.classList.toggle('visible');
    };
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
