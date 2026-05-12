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

        this.mouseHistory = [];
        this.maxHistory = 20; // length of trail

        this.particles = [];
        for (let i = 0; i < 25; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 20 + 10, // larger for glassmorphism
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                baseOpacity: Math.random() * 0.08 + 0.02
            });
        }

        document.addEventListener('pointermove', (e) => {
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

    drawFluidRibbons() {
        const ribbons = [
            { baseY: 0.55, amplitude: 140, thickness: 180, speed: 0.0002, color1: 'rgba(79, 140, 255, 0.06)', color2: 'rgba(123, 97, 255, 0)' },
            { baseY: 0.65, amplitude: 110, thickness: 150, speed: 0.0003, color1: 'rgba(123, 97, 255, 0.04)', color2: 'rgba(79, 140, 255, 0)' },
            { baseY: 0.75, amplitude: 90, thickness: 130, speed: 0.0004, color1: 'rgba(59, 130, 246, 0.05)', color2: 'rgba(167, 139, 250, 0)' },
            { baseY: 0.85, amplitude: 70, thickness: 100, speed: 0.0005, color1: 'rgba(167, 139, 250, 0.04)', color2: 'rgba(59, 130, 246, 0)' }
        ];

        for (let j = 0; j < ribbons.length; j++) {
            let rib = ribbons[j];
            this.ctx.beginPath();

            let pointsTop = [];
            let pointsBottom = [];

            for (let x = 0; x <= this.width + 50; x += 50) {
                let dx = x - this.mouseX;
                let baseY = this.height * rib.baseY;
                let dy = baseY - this.mouseY;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let influence = Math.max(0, 1 - dist / 800);

                let offset = Math.sin(x * 0.0012 + this.time * rib.speed + j) * rib.amplitude +
                    Math.cos(x * 0.0018 - this.time * rib.speed * 0.8 + j * 2) * (rib.amplitude * 0.5) -
                    influence * 80 * Math.sin(this.time * 0.0015 - dx * 0.002);

                pointsTop.push({ x: x, y: baseY + offset });
                pointsBottom.push({ x: x, y: baseY + offset + rib.thickness + Math.sin(x * 0.002 + this.time * rib.speed * 1.5) * 40 });
            }

            this.ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
            for (let i = 1; i < pointsTop.length; i++) this.ctx.lineTo(pointsTop[i].x, pointsTop[i].y);
            for (let i = pointsBottom.length - 1; i >= 0; i--) this.ctx.lineTo(pointsBottom[i].x, pointsBottom[i].y);
            this.ctx.closePath();

            let grad = this.ctx.createLinearGradient(0, this.height * rib.baseY - rib.amplitude, 0, this.height * rib.baseY + rib.amplitude + rib.thickness);
            grad.addColorStop(0, rib.color1);
            grad.addColorStop(1, rib.color2);

            this.ctx.fillStyle = grad;
            this.ctx.fill();
        }
    }

    drawGlassParticles() {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            let dx = p.x - this.mouseX;
            let dy = p.y - this.mouseY;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 400) {
                p.x += dx * 0.0015;
                p.y += dy * 0.0015;
                p.opacity = p.baseOpacity + (1 - dist / 400) * 0.15;
            } else {
                p.opacity = p.baseOpacity;
            }

            if (p.x < -100) p.x = this.width + 100;
            if (p.x > this.width + 100) p.x = -100;
            if (p.y < -100) p.y = this.height + 100;
            if (p.y > this.height + 100) p.y = -100;

            let grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 1.5})`);
            grad.addColorStop(0.4, `rgba(255, 255, 255, ${p.opacity * 0.8})`);
            grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = grad;
            this.ctx.fill();

            // Soft border
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.5})`;
            this.ctx.stroke();
        });
    }

    drawCursorGlow() {
        this.mouseHistory.unshift({ x: this.mouseX, y: this.mouseY });
        if (this.mouseHistory.length > this.maxHistory) {
            this.mouseHistory.pop();
        }

        // Draw Trail
        if (this.mouseHistory.length > 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouseHistory[0].x, this.mouseHistory[0].y);
            for (let i = 1; i < this.mouseHistory.length; i++) {
                this.ctx.lineTo(this.mouseHistory[i].x, this.mouseHistory[i].y);
            }
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.lineWidth = 60;

            let trailGrad = this.ctx.createLinearGradient(
                this.mouseHistory[0].x, this.mouseHistory[0].y,
                this.mouseHistory[this.mouseHistory.length - 1].x, this.mouseHistory[this.mouseHistory.length - 1].y
            );
            trailGrad.addColorStop(0, 'rgba(79, 140, 255, 0.05)');
            trailGrad.addColorStop(1, 'rgba(123, 97, 255, 0)');

            this.ctx.strokeStyle = trailGrad;
            this.ctx.stroke();
        }

        // Draw Main Glow
        let radius = 100;
        let glowGrad = this.ctx.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, radius);
        glowGrad.addColorStop(0, 'rgba(79, 140, 255, 0.15)');
        glowGrad.addColorStop(0.4, 'rgba(123, 97, 255, 0.12)');
        glowGrad.addColorStop(1, 'rgba(123, 97, 255, 0)');

        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = glowGrad;
        this.ctx.fill();
    }

    animate() {
        if (!this.isVisible) {
            requestAnimationFrame(this.animate.bind(this));
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Smooth interpolation
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;

        this.drawCursorGlow();
        this.drawGlassParticles();
        this.drawFluidRibbons();

        this.time += 16;
        requestAnimationFrame(this.animate.bind(this));
    }
}

