document.addEventListener("DOMContentLoaded", () => {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Page transition overlay
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

    // Typing animation for hero section
    const typewriter = new Typewriter('.typewriter', {
        strings: ['A Full Stack Developer', 'A Problem Solver', 'A Creative Thinker'],
        autoStart: true,
        loop: true,
        delay: 75,
        deleteSpeed: 50
    });

    // Enhanced initial animations
    const tl = gsap.timeline();
    tl.from("nav", { 
        opacity: 0, 
        y: -50, 
        duration: 1, 
        ease: "power3.out" 
    })
    .from(".hero-content > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)"
    })
    .from(".profile-pic", {
        scale: 0,
        rotation: 360,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
    }, "-=1");

    // Enhanced parallax effects
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

    // 3D tilt effect for cards
    VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    // Enhanced skill cards animation
    const animateSkills = () => {
        const cards = gsap.utils.toArray('.skill-card');
        
        cards.forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 100,
                rotation: gsap.utils.random(-10, 10),
                duration: 0.8,
                delay: i * 0.2,
                ease: "back.out(1.7)"
            });
        });

        // Animated progress bars with glow effect
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

    // Enhanced project card hover animations
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

    // Smooth scroll with enhanced easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            pageTransition();
            setTimeout(() => {
                const target = document.querySelector(this.getAttribute('href'));
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "power4.inOut"
                });
            }, 500);
        });
    });

    // Initialize animations
    animateSkills();
    timelineAnimation();
});

// Text reveal animation
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
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
            trigger: heading,
            start: 'top 80%'
        }
    });
});

// Floating animation for social links
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

// Parallax background effect
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

// Initialize timeline animations
const timelineAnimation = () => {
    const timeline = document.querySelector('.timeline-line');
    const items = document.querySelectorAll('.timeline-item');
    
    // Set initial timeline height
    const timelineHeight = document.querySelector('.education-timeline').offsetHeight;
    timeline.style.height = timelineHeight + 'px';
    
    // Initialize tilt effect
    VanillaTilt.init(document.querySelectorAll(".timeline-item"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });

    // Animate items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
};
