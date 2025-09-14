document.addEventListener("DOMContentLoaded", () => {
    console.log("Page Loaded");

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
        strings: ['Aspiring Software Developer', 'Code & Design Enthusiast'],
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
    VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    //  Skill animations
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
            formSection.querySelector('form').addEventListener('submit', function(e) {
                
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
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
            trigger: heading,
            start: 'top 80%'
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

