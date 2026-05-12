document.addEventListener("DOMContentLoaded", () => {
    // Navbar hide/show on scroll direction (fixed flicker, stable direction, threshold)
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let lastDirection = null;
    let ticking = false;
    const SCROLL_THRESHOLD = 8; // px

    // Always show navbar on page load, no flicker
    navbar.style.transform = 'translateY(0)';
    navbar.style.setProperty('transform', 'translateY(0)', 'important');
    navbar.style.transition = navbar.style.transition || 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    // Show navbar after page transition animation
    document.addEventListener('transitionend', () => {
        navbar.style.setProperty('transform', 'translateY(0)', 'important');
    });

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;
        let direction = null;
        if (Math.abs(diff) < SCROLL_THRESHOLD) {
            ticking = false;
            return;
        }
        direction = diff > 0 ? 'down' : 'up';

        if (currentScrollY < 50) {
            navbar.style.transform = 'translateY(0)';
        } else {
            if (direction !== lastDirection) {
                if (direction === 'down') {
                    navbar.style.transform = 'translateY(-100%)';
                } else if (direction === 'up') {
                    navbar.style.transform = 'translateY(0)';
                }
                lastDirection = direction;
            }
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleNavbarScroll);
            ticking = true;
        }
    });
    console.log("Page Loaded");

    // Initialize premium animated hero background
    new HeroBackground();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Page transition animation wanna enhance it more
    // i have to improve it later
    const pageTransition = () => {
        const tl = gsap.timeline();
        tl.to(".transition-overlay", {
            duration: 0.5,
            scaleY: 1,
            transformOrigin: "bottom",
            ease: "power4.inOut"
        })
            .to(".transition-overlay", {
                duration: 0.5,
                scaleY: 0,
                transformOrigin: "top",
                ease: "power4.inOut"
            });
    };

    //  Typewriter effect
    const typewriter = new Typewriter('.typewriter', {
        strings: ['Aspiring Software Developer.', 'Code & Design Enthusiast.'],
        autoStart: true,
        loop: true,
        delay: 75,
        deleteSpeed: 50
    });

    //  Hero section animations 
    const tl = gsap.timeline();
    tl.from("nav", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out"
    })
        .from(".hero-content > *:not(.hero-image):not(.profile-container)", {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });

    //  Profile image animation
    gsap.from(".profile-pic", {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)",
        clearProps: "opacity,scale"
    });


    gsap.utils.toArray('.parallax').forEach(layer => {
        const depth = layer.dataset.depth;
        const movement = -(layer.offsetHeight * depth);
        gsap.to(layer, {
            y: movement,
            ease: "none",
            scrollTrigger: {
                trigger: layer,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    });

    //  3D Tilt cards
    VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .certificate-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    // Certificate cards reveal with subtle stagger
    gsap.utils.toArray('.certificate-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: i * 0.05,
            ease: "power2.out"
        });
    });

    //  Skill animations
    const animateSkills = () => {
        const cards = gsap.utils.toArray('.skill-card');

        cards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true
                    },
                    opacity: 0,
                    y: 60,
                    rotation: gsap.utils.random(-8, 8),
                    duration: 0.35,
                    delay: i * 0.07,
                    ease: "back.out(1.4)"
                });
        });

        gsap.utils.toArray('.progress').forEach(progress => {
            const width = progress.style.width;
            gsap.fromTo(progress,
                { width: "0%" },
                {
                    width: width,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: progress,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    onStart: () => progress.classList.add("glow"),
                    onReverseComplete: () => progress.classList.remove("glow")
                }
            );
        });
    };

    //  Hover animations on project cards
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -15,
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            });
            gsap.to(card.querySelector('.project-overlay'), {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            });
            gsap.to(card.querySelector('.project-overlay'), {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    //  Show more/less toggle on project cards
    document.querySelectorAll('.project-card').forEach(card => {
        const descWrapper = card.querySelector('.project-description-wrapper');
        const btn = card.querySelector('.show-more-btn');
        const fade = card.querySelector('.fade-gradient');
        if (descWrapper && btn && fade) {
            btn.addEventListener('click', () => {
                const expanded = descWrapper.classList.toggle('expanded');
                if (expanded) {
                    btn.textContent = 'Show Less';
                    fade.style.opacity = '0';
                } else {
                    btn.textContent = 'Show More';
                    fade.style.opacity = '1';
                }
            });
        }
    });

    //  Smooth scrolling with page transition
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            pageTransition();
            setTimeout(() => {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: target,
                            offsetY: 70
                        },
                        ease: "power4.inOut"
                    });
                }
            }, 500);
        });
    });

    // Contact Form Animation & UX Enhancements

    const formSection = document.querySelector('#message');
    if (formSection) {
        gsap.from(formSection, {
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: formSection,
                start: "top 85%",
            }
        });

        // Animate each input/textarea in sequence
        const inputs = formSection.querySelectorAll('input, textarea');
        gsap.from(inputs, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.15,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: formSection,
                start: "top 85%",
            }
        });

        // Animate submit button
        const submitBtn = formSection.querySelector('button[type="submit"]');
        if (submitBtn) {
            gsap.from(submitBtn, {
                opacity: 0,
                scale: 0.8,
                duration: 0.7,
                delay: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: formSection,
                    start: "top 85%",
                }
            });
        }


        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, { boxShadow: "0 0 0 4px #00b4d855", duration: 0.3 });
            });
            input.addEventListener('blur', () => {
                gsap.to(input, { boxShadow: "0 2px 8px rgba(37,99,235,0.04)", duration: 0.3 });
            });
        });


        if (formSection.querySelector('form')) {
            formSection.querySelector('form').addEventListener('submit', function (e) {

                const btn = this.querySelector('button[type="submit"]');
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }

                setTimeout(() => {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = 'Send Message';
                    }
                }, 4000);
            });
        }
    }

    //  Run animations
    animateSkills();
    timelineAnimation();
});


// Split text animation
const splitText = (element) => {
    const text = element.textContent;
    element.textContent = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'letter-reveal';
        element.appendChild(span);
    });
};

document.querySelectorAll('.section-header h2').forEach(heading => {
    splitText(heading);
    gsap.to(heading.querySelectorAll('.letter-reveal'), {
        opacity: 1,
        y: 0,
        duration: 0.28,
        stagger: 0.025,
        scrollTrigger: {
            trigger: heading,
            start: 'top 85%'
        }
    });
});

// Floating social links animation
gsap.to('.social-link', {
    y: -10,
    duration: 1.5,
    ease: 'power1.inOut',
    stagger: {
        each: 0.2,
        repeat: -1,
        yoyo: true
    }
});

// Parallax layers (if using .parallax-layer)
gsap.utils.toArray('.parallax-layer').forEach(layer => {
    const speed = layer.dataset.speed || 0.5;
    gsap.to(layer, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: layer.parentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Timeline animation 
const timelineAnimation = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        if (index === 0) {
            gsap.from('.timeline-line', {
                scrollTrigger: {
                    trigger: '.education-timeline',
                    start: "top 80%"
                },
                height: 0,
                duration: 1.5,
                ease: "power2.inOut"
            });
        }



        gsap.from(item.querySelector('.timeline-card'), {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            y: 30,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });
};

// Premium Hero Background Animation
class HeroBackground {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));

        this.time = 0;
        this.mouseX = this.width / 2;
        this.mouseY = this.height / 2;
        this.targetMouseX = this.width / 2;
        this.targetMouseY = this.height / 2;

        this.particles = [];
        for (let i = 0; i < 40; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                baseOpacity: Math.random() * 0.3 + 0.1
            });
        }

        document.addEventListener('mousemove', (e) => {
            this.targetMouseX = e.clientX;
            // Only care about mouse interactions when in or near the hero section
            if (window.scrollY < window.innerHeight) {
                this.targetMouseY = e.clientY + window.scrollY; 
            }
        });

        // Use IntersectionObserver to pause animation when hero is out of view
        this.isVisible = true;
        const observer = new IntersectionObserver((entries) => {
            this.isVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        
        const heroSection = document.getElementById('home');
        if (heroSection) observer.observe(heroSection);

        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // Handle High DPI displays for sharper rendering
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
    }

    drawSilk() {
        this.ctx.lineWidth = 1.2;
        
        const colors = [
            'rgba(79, 140, 255, ',
            'rgba(123, 97, 255, ',
            'rgba(165, 180, 255, '
        ];

        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 6; i++) {
                this.ctx.beginPath();
                let phase = i * 0.8 + j * 1.5;
                let opacity = 0.12 - (i * 0.015);
                this.ctx.strokeStyle = `${colors[j]}${opacity})`;
                
                for (let x = 0; x <= this.width; x += 30) {
                    let dx = x - this.mouseX;
                    // base Y concentrated at bottom half
                    let baseY = this.height * 0.6 + i * 35 + j * 20; 
                    let dy = baseY - this.mouseY;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    let influence = Math.max(0, 1 - dist / 600);
                    
                    let y = baseY + 
                            Math.sin(x * 0.002 + phase + this.time * 0.0006) * 100 +
                            Math.cos(x * 0.004 - phase + this.time * 0.0004) * 40 -
                            influence * 60 * Math.sin(this.time * 0.002 - dx * 0.005);
                    
                    if (x === 0) this.ctx.moveTo(x, y);
                    else {
                        this.ctx.lineTo(x, y);
                    }
                }
                this.ctx.stroke();
            }
        }
    }

    drawParticles() {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Subtle mouse repel/parallax
            let dx = p.x - this.mouseX;
            let dy = p.y - this.mouseY;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 300) {
                p.x += dx * 0.001;
                p.y += dy * 0.001;
                p.opacity = p.baseOpacity + (1 - dist/300) * 0.3; // glow when near mouse
            } else {
                p.opacity = p.baseOpacity;
            }

            // Wrap around
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(79, 140, 255, ${p.opacity})`;
            this.ctx.fill();
        });
    }

    animate() {
        if (!this.isVisible) {
            requestAnimationFrame(this.animate.bind(this));
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Mouse interpolation
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.06;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.06;

        this.drawParticles();
        this.drawSilk();
        
        this.time += 16; 
        requestAnimationFrame(this.animate.bind(this));
    }
}

