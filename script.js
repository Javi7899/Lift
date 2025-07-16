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

// JavaScript para el carrusel
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    
    // Crear dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Funciones del carrusel
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            
            // Efecto 3D de apilamiento
            if (index === currentIndex) {
                slide.classList.add('active');
                slide.style.transform = 'translateZ(100px) scale(1.05)';
            } else if (index < currentIndex) {
                slide.style.transform = `translateZ(${-100 + (currentIndex - index) * 50}px) scale(${1 - (currentIndex - index) * 0.05})`;
            } else {
                slide.style.transform = `translateZ(${-100 + (index - currentIndex) * 50}px) scale(${1 - (index - currentIndex) * 0.05})`;
            }
        });
        
        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Iniciar carrusel
    updateCarousel();
    
    // Auto-avance opcional (descomenta si lo quieres)
    // setInterval(nextSlide, 5000);
});
    // Calculadora de IMC y PMC
    const genderSelect = document.getElementById('gender');
    const hipGroup = document.getElementById('hip-group');
    
    if (genderSelect && hipGroup) {
        genderSelect.addEventListener('change', function() {
            hipGroup.style.display = this.value === 'female' ? 'block' : 'none';
        });
        
        // Calcular IMC y PMC
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateResults);
        }
        
        // Resetear calculadora
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetCalculator);
        }
        
        function calculateResults() {
            // Obtener valores de los inputs
            const gender = document.getElementById('gender').value;
            const age = parseInt(document.getElementById('age').value) || 0;
            const height = parseInt(document.getElementById('height').value);
            const weight = parseInt(document.getElementById('weight').value);
            const neck = parseInt(document.getElementById('neck').value) || 0;
            const waist = parseInt(document.getElementById('waist').value) || 0;
            const hip = gender === 'female' ? (parseInt(document.getElementById('hip').value) || 0) : 0;
            
            // Validaciones básicas
            if (!height || !weight) {
                alert('Por favor ingresa al menos tu altura y peso para calcular el IMC.');
                return;
            }
            
            // Calcular IMC
            const bmi = calculateBMI(weight, height);
            displayBMIResults(bmi);
            
            // Calcular PMC si hay datos suficientes
            if (neck && waist && (gender === 'male' || (gender === 'female' && hip))) {
                const bfp = calculateBFP(gender, height, neck, waist, hip);
                displayBFPResults(bfp, gender);
            } else {
                document.getElementById('bfp-value').textContent = '--';
                document.getElementById('bfp-category').textContent = 'Datos insuficientes';
                document.getElementById('bfp-indicator').style.left = '0';
            }
        }
        
        function calculateBMI(weight, height) {
            // IMC = peso (kg) / (altura (m))^2
            const heightInMeters = height / 100;
            return (weight / (heightInMeters * heightInMeters)).toFixed(1);
        }
        
        function calculateBFP(gender, height, neck, waist, hip) {
            // Fórmula de la Marina de EE.UU. para porcentaje de grasa corporal
            if (gender === 'male') {
                return (86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76).toFixed(1);
            } else {
                return (163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387).toFixed(1);
            }
        }
        
        function displayBMIResults(bmi) {
            const bmiValue = document.getElementById('bmi-value');
            const bmiCategory = document.getElementById('bmi-category');
            const bmiIndicator = document.getElementById('bmi-indicator');
            
            bmiValue.textContent = bmi;
            
            // Determinar categoría y posición del indicador
            let category, position;
            const bmiNum = parseFloat(bmi);
            
            if (bmiNum < 18.5) {
                category = 'Bajo peso';
                position = (bmiNum / 18.5) * 25;
            } else if (bmiNum < 25) {
                category = 'Peso normal';
                position = 25 + ((bmiNum - 18.5) / 6.5) * 25;
            } else if (bmiNum < 30) {
                category = 'Sobrepeso';
                position = 50 + ((bmiNum - 25) / 5) * 25;
            } else {
                category = 'Obesidad';
                position = 75 + ((Math.min(bmiNum, 40) - 30) / 10) * 25;
            }
            
            // Ajustar posición si es mayor a 100
            position = Math.min(position, 98);
            
            bmiCategory.textContent = category;
            bmiIndicator.style.left = `${position}%`;
            
            // Cambiar color según categoría
            if (bmiNum < 18.5) {
                bmiValue.style.color = '#4FC3F7';
            } else if (bmiNum < 25) {
                bmiValue.style.color = '#66BB6A';
            } else if (bmiNum < 30) {
                bmiValue.style.color = '#FFA726';
            } else {
                bmiValue.style.color = '#EF5350';
            }
        }
        
        function displayBFPResults(bfp, gender) {
            const bfpValue = document.getElementById('bfp-value');
            const bfpCategory = document.getElementById('bfp-category');
            const bfpIndicator = document.getElementById('bfp-indicator');
            
            bfpValue.textContent = bfp + '%';
            
            // Determinar categoría y posición del indicador
            let category, position;
            const bfpNum = parseFloat(bfp);
            
            if (gender === 'male') {
                if (bfpNum < 6) {
                    category = 'Esencial';
                    position = (bfpNum / 6) * 20;
                } else if (bfpNum < 14) {
                    category = 'Atleta';
                    position = 20 + ((bfpNum - 6) / 8) * 20;
                } else if (bfpNum < 18) {
                    category = 'Fitness';
                    position = 40 + ((bfpNum - 14) / 4) * 20;
                } else if (bfpNum < 25) {
                    category = 'Promedio';
                    position = 60 + ((bfpNum - 18) / 7) * 20;
                } else {
                    category = 'Alto';
                    position = 80 + ((Math.min(bfpNum, 40) - 25) / 15) * 20;
                }
            } else {
                if (bfpNum < 14) {
                    category = 'Esencial';
                    position = (bfpNum / 14) * 20;
                } else if (bfpNum < 21) {
                    category = 'Atleta';
                    position = 20 + ((bfpNum - 14) / 7) * 20;
                } else if (bfpNum < 25) {
                    category = 'Fitness';
                    position = 40 + ((bfpNum - 21) / 4) * 20;
                } else if (bfpNum < 32) {
                    category = 'Promedio';
                    position = 60 + ((bfpNum - 25) / 7) * 20;
                } else {
                    category = 'Alto';
                    position = 80 + ((Math.min(bfpNum, 45) - 32) / 13) * 20;
                }
            }
            
            // Ajustar posición si es mayor a 100
            position = Math.min(position, 98);
            
            bfpCategory.textContent = category;
            bfpIndicator.style.left = `${position}%`;
            
            // Cambiar color según categoría
            if ((gender === 'male' && bfpNum < 6) || (gender === 'female' && bfpNum < 14)) {
                bfpValue.style.color = '#5C6BC0';
            } else if ((gender === 'male' && bfpNum < 14) || (gender === 'female' && bfpNum < 21)) {
                bfpValue.style.color = '#26A69A';
            } else if ((gender === 'male' && bfpNum < 18) || (gender === 'female' && bfpNum < 25)) {
                bfpValue.style.color = '#66BB6A';
            } else if ((gender === 'male' && bfpNum < 25) || (gender === 'female' && bfpNum < 32)) {
                bfpValue.style.color = '#FFA726';
            } else {
                bfpValue.style.color = '#EF5350';
            }
        }
        
        function resetCalculator() {
            // Resetear inputs
            document.getElementById('age').value = '';
            document.getElementById('height').value = '';
            document.getElementById('weight').value = '';
            document.getElementById('neck').value = '';
            document.getElementById('waist').value = '';
            document.getElementById('hip').value = '';
            
            // Resetear resultados
            document.getElementById('bmi-value').textContent = '--';
            document.getElementById('bmi-category').textContent = 'Introduce tus datos';
            document.getElementById('bmi-indicator').style.left = '0';
            document.getElementById('bmi-value').style.color = 'white';
            
            document.getElementById('bfp-value').textContent = '--';
            document.getElementById('bfp-category').textContent = 'Introduce medidas adicionales';
            document.getElementById('bfp-indicator').style.left = '0';
            document.getElementById('bfp-value').style.color = 'white';
        }
    }
});
