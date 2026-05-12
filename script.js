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

        // Disable hide-on-scroll for mobile for better stability
        if (window.innerWidth < 768) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

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
    }, { passive: true }); // Passive listener for better scroll performance

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

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
                scrub: true,
                invalidateOnRefresh: true // Better for responsive changes
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
                toggleActions: "play none none none",
                once: true // Trigger once only
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.05,
            ease: "power2.out",
            clearProps: "all"
        });
    });



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
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            pageTransition();
            
            setTimeout(() => {
                const target = document.querySelector(targetId);
                if (target) {
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: target,
                            offsetY: 70,
                            autoKill: true
                        },
                        ease: "power3.inOut" // Smoother, lighter ease
                    });
                }
            }, 400); // Reduced delay
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

    //  Skill animations & Filtering logic
    const initSkillsSection = () => {
        const grid = document.getElementById('skills-grid');
        const cards = gsap.utils.toArray('.skill-card-new');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const indicator = document.querySelector('.filter-indicator');

        // Initial Animation
        const animateIn = (targets) => {
            gsap.set(targets, { display: 'block' });
            gsap.fromTo(targets, 
                { opacity: 0, y: 30, scale: 0.9 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    duration: 0.5, 
                    stagger: 0.05, 
                    ease: "power2.out",
                    clearProps: "all"
                }
            );
        };

        // Indicator position logic
        const updateIndicator = (btn) => {
            if (!indicator) return;
            indicator.style.width = `${btn.offsetWidth}px`;
            indicator.style.left = `${btn.offsetLeft}px`;
        };

        // Initialize indicator
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) updateIndicator(activeBtn);

        // Filtering Logic
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateIndicator(btn);

                // Animate out all cards first
                gsap.to(cards, {
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                    duration: 0.3,
                    stagger: 0.02,
                    ease: "power2.in",
                    onComplete: () => {
                        cards.forEach(card => {
                            if (filter === 'all' || card.dataset.category === filter) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });

                        // Filter cards and animate in
                        const visibleCards = cards.filter(card => 
                            filter === 'all' || card.dataset.category === filter
                        );
                        animateIn(visibleCards);
                    }
                });
            });
        });

        // ScrollTrigger for initial reveal
        ScrollTrigger.create({
            trigger: "#skills",
            start: "top 80%",
            onEnter: () => animateIn(cards),
            once: true
        });
    };

    // About Section Animation
    const animateAboutSection = () => {
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 80%",
                once: true // Trigger once
            }
        });

        // Use defensive selectors and check for existence
        const badge = aboutSection.querySelector('.about-badge');
        const title = aboutSection.querySelector('.about-title');
        const subtitle = aboutSection.querySelector('.about-subtitle');
        const leftContent = aboutSection.querySelectorAll('.about-left > *');
        const cards = aboutSection.querySelectorAll('.feature-card');
        const statsBar = aboutSection.querySelector('.about-stats-bar');

        if (badge) tl.from(badge, { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" });
        if (title) tl.from(title, { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
        if (subtitle) tl.from(subtitle, { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
        
        if (leftContent.length) {
            tl.from(leftContent, {
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.2");
        }

        if (cards.length) {
            tl.from(cards, {
                scale: 0.9,
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                clearProps: "all" // CRITICAL: Ensures opacity and transforms are cleared after animation
            }, "-=0.6");
        }

        if (statsBar) {
            tl.from(statsBar, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                clearProps: "all"
            }, "-=0.6");
        }

        // Mouse Parallax for feature cards (Optimized with requestAnimationFrame)
        const visualArea = aboutSection.querySelector('.feature-visual-area');
        if (visualArea && cards.length) {
            let parallaxTicking = false;

            visualArea.addEventListener('mousemove', (e) => {
                if (!parallaxTicking) {
                    window.requestAnimationFrame(() => {
                        const { clientX, clientY } = e;
                        const { left, top, width, height } = visualArea.getBoundingClientRect();
                        const x = (clientX - left) / width - 0.5;
                        const y = (clientY - top) / height - 0.5;

                        cards.forEach((card, index) => {
                            const factor = (index + 1) * 8; // Reduced factor for subtlety
                            const direction = index % 2 === 0 ? 1 : -1;
                            gsap.to(card, { 
                                x: x * factor * direction, 
                                y: y * factor * direction, 
                                duration: 0.8, // Slower for premium feel
                                overwrite: 'auto',
                                ease: "power2.out"
                            });
                        });
                        
                        const glow = visualArea.querySelector('.ambient-glow');
                        if (glow) {
                            gsap.to(glow, { x: x * 20, y: y * 20, duration: 1, overwrite: 'auto' });
                        }
                        parallaxTicking = false;
                    });
                    parallaxTicking = true;
                }
            }, { passive: true });

            visualArea.addEventListener('mouseleave', () => {
                gsap.to([...cards, visualArea.querySelector('.ambient-glow')].filter(Boolean), { 
                    x: 0, 
                    y: 0, 
                    duration: 1, 
                    ease: "power2.out",
                    overwrite: 'auto'
                });
            });
        }
    };

    //  Run animations
    initSkillsSection();
    animateAboutSection();
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
        this.maxHistory = 20;

        // Global Floating Particles
        const isMobile = window.innerWidth < 768;
        this.particles = [];
        const particleCount = isMobile ? 8 : 30;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: isMobile ? (Math.random() * 10 + 5) : (Math.random() * 20 + 10),
                speedX: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2),
                speedY: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.2),
                baseOpacity: Math.random() * 0.08 + 0.02
            });
        }

        // Global Ambient Blobs
        this.ambientBlobs = [
            { x: this.width * 0.2, y: this.height * 0.3, radius: 400, color: 'rgba(79, 140, 255, 0.05)', speedX: 0.1, speedY: 0.15 },
            { x: this.width * 0.8, y: this.height * 0.7, radius: 500, color: 'rgba(123, 97, 255, 0.04)', speedX: -0.12, speedY: -0.1 },
            { x: this.width * 0.5, y: this.height * 0.9, radius: 450, color: 'rgba(59, 130, 246, 0.05)', speedX: 0.08, speedY: -0.12 }
        ];

        document.addEventListener('pointermove', (e) => {
            this.targetMouseX = e.clientX;
            this.targetMouseY = e.clientY;
        }, { passive: true });

        // Always animate since it's a global background
        this.isVisible = true;

        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
    }

    drawAmbientBlobs() {
        for (let b of this.ambientBlobs) {
            b.x += b.speedX;
            b.y += b.speedY;

            // Bounce off edges softly
            if (b.x < -b.radius || b.x > this.width + b.radius) b.speedX *= -1;
            if (b.y < -b.radius || b.y > this.height + b.radius) b.speedY *= -1;

            let grad = this.ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
            grad.addColorStop(0, b.color);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = grad;
            this.ctx.fill();
        }
    }

    drawFluidRibbons() {
        const isMobile = window.innerWidth < 768;
        const scrollOffset = window.scrollY; // Use scroll to parallax waves

        const ribbons = [
            { baseY: 0.60, amplitude: isMobile ? 60 : 140, thickness: isMobile ? 80 : 180, speed: 0.0002, color1: 'rgba(79, 140, 255, 0.08)', color2: 'rgba(123, 97, 255, 0)' },
            { baseY: 0.72, amplitude: isMobile ? 50 : 110, thickness: isMobile ? 70 : 150, speed: 0.00035, color1: 'rgba(123, 97, 255, 0.06)', color2: 'rgba(79, 140, 255, 0)' },
            { baseY: 0.85, amplitude: isMobile ? 40 : 80, thickness: isMobile ? 60 : 120, speed: 0.0005, color1: 'rgba(59, 130, 246, 0.09)', color2: 'rgba(167, 139, 250, 0)' }
        ];

        for (let j = 0; j < ribbons.length; j++) {
            let rib = ribbons[j];
            this.ctx.beginPath();

            let pointsTop = [];
            let pointsBottom = [];
            let step = isMobile ? 80 : 50;

            // Apply scroll parallax to Y position. Multiplying by 0.7 creates a soft delay effect.
            let baseY = (this.height * rib.baseY) - (scrollOffset * 0.7);

            // Don't draw if completely out of view (optimization)
            if (baseY + rib.amplitude + rib.thickness < 0) continue;

            for (let x = 0; x <= this.width + step; x += step) {
                let dx = x - this.mouseX;
                let dy = baseY - this.mouseY;
                let dist = Math.sqrt(dx * dx + dy * dy);

                let influence = Math.max(0, 1 - dist / 900);

                let offset = Math.sin(x * 0.0012 + this.time * rib.speed + j) * rib.amplitude +
                    Math.cos(x * 0.0018 - this.time * rib.speed * 0.8 + j * 2) * (rib.amplitude * 0.5) -
                    influence * 120 * Math.sin(this.time * 0.0015 - dx * 0.002);

                pointsTop.push({ x: x, y: baseY + offset });
                pointsBottom.push({ x: x, y: baseY + offset + rib.thickness + Math.sin(x * 0.002 + this.time * rib.speed * 1.5) * 40 });
            }

            if (pointsTop.length === 0) continue;

            this.ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
            for (let i = 1; i < pointsTop.length; i++) this.ctx.lineTo(pointsTop[i].x, pointsTop[i].y);
            for (let i = pointsBottom.length - 1; i >= 0; i--) this.ctx.lineTo(pointsBottom[i].x, pointsBottom[i].y);
            this.ctx.closePath();

            let grad = this.ctx.createLinearGradient(0, baseY - rib.amplitude, 0, baseY + rib.amplitude + rib.thickness);
            grad.addColorStop(0, rib.color1);
            grad.addColorStop(1, rib.color2);

            this.ctx.fillStyle = grad;
            this.ctx.fill();
        }
    }

    drawGlassParticles() {
        const isMobile = window.innerWidth < 768;
        // Optimized: significantly fewer particles on mobile
        const activeParticles = this.particles.length; 

        for (let i = 0; i < activeParticles; i++) {
            let p = this.particles[i];
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

            this.ctx.lineWidth = 0.5;
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.5})`;
            this.ctx.stroke();
        }
    }

    drawCursorGlow() {
        this.mouseHistory.unshift({ x: this.mouseX, y: this.mouseY });
        if (this.mouseHistory.length > this.maxHistory) {
            this.mouseHistory.pop();
        }

        if (this.mouseHistory.length > 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouseHistory[0].x, this.mouseHistory[0].y);
            for (let i = 1; i < this.mouseHistory.length; i++) {
                this.ctx.lineTo(this.mouseHistory[i].x, this.mouseHistory[i].y);
            }
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.lineWidth = 80;

            let trailGrad = this.ctx.createLinearGradient(
                this.mouseHistory[0].x, this.mouseHistory[0].y,
                this.mouseHistory[this.mouseHistory.length - 1].x, this.mouseHistory[this.mouseHistory.length - 1].y
            );
            trailGrad.addColorStop(0, 'rgba(79, 140, 255, 0.06)');
            trailGrad.addColorStop(1, 'rgba(123, 97, 255, 0)');

            this.ctx.strokeStyle = trailGrad;
            this.ctx.stroke();
        }

        let radius = 180;
        let glowGrad = this.ctx.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, radius);
        glowGrad.addColorStop(0, 'rgba(79, 140, 255, 0.12)');
        glowGrad.addColorStop(0.5, 'rgba(123, 97, 255, 0.08)');
        glowGrad.addColorStop(1, 'rgba(123, 97, 255, 0)');

        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = glowGrad;
        this.ctx.fill();
    }

    animate() {
        if (!this.isVisible) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;

        this.drawAmbientBlobs();
        this.drawCursorGlow();
        this.drawGlassParticles();
        this.drawFluidRibbons();

        this.time += 16;
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Footer Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modalBtns = document.querySelectorAll('.footer-btn');
    const overlay = document.getElementById('modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.legal-modal');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal && overlay) {
            overlay.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // lock scroll
        }
    }

    function closeModal() {
        if (overlay) overlay.classList.remove('active');
        modals.forEach(m => m.classList.remove('active'));
        document.body.style.overflow = ''; // restore scroll
    }

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
