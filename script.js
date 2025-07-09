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
// Carrusel de fotos - Versión mejorada para móviles
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators') || document.createElement('div');
    
    // Configuración del carrusel
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    
    // Crear indicadores si no existen
    if (!document.querySelector('.carousel-indicators')) {
        indicatorsContainer.className = 'carousel-indicators';
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Ir a la diapositiva ${index + 1}`);
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        document.querySelector('.gallery-carousel').appendChild(indicatorsContainer);
    }
    
    const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
    
    // Funciones del carrusel
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Eventos de navegación
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    // Eventos táctiles para móviles
    slides.forEach((slide, index) => {
        // Evitar arrastre de imágenes
        slide.addEventListener('dragstart', (e) => e.preventDefault());
        
        // Eventos táctiles
        slide.addEventListener('touchstart', touchStart(index), { passive: false });
        slide.addEventListener('touchend', touchEnd, { passive: false });
        slide.addEventListener('touchmove', touchMove, { passive: false });
    });
    
    // Eventos de ratón para desktop
    track.addEventListener('mousedown', touchStart(0));
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);
    track.addEventListener('mousemove', touchMove);
    
    function touchStart(index) {
        return function(event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            track.style.cursor = 'grabbing';
            track.style.transition = 'none';
            clearInterval(autoSlideInterval);
        }
    }
    
    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -100 && currentIndex < slides.length - 1) {
            currentIndex += 1;
        }
        
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        
        setPositionByIndex();
        track.style.cursor = 'grab';
        startAutoSlide();
    }
    
    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function animation() {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }
    
    function setPositionByIndex() {
        currentTranslate = currentIndex * -track.offsetWidth;
        prevTranslate = currentTranslate;
        track.style.transform = `translateX(${currentTranslate}px)`;
        track.style.transition = 'transform 0.5s ease';
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Iniciar carrusel
    updateCarousel();
    startAutoSlide();
    
    // Pausar al interactuar
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', () => {
        if (!isDragging) startAutoSlide();
    });
    
    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
        setPositionByIndex();
    });
});
