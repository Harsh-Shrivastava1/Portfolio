document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    
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

    const typewriter = new Typewriter('.typewriter', {
        strings: ['Aspiring Full Stack Developer','Code & Design Enthusiast'],
        autoStart: true,
        loop: true,
        delay: 75,
        deleteSpeed: 50
    });

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

    
    VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    
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

   
    animateSkills();
    timelineAnimation();
});


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

        
        gsap.from(item.querySelector('::before'), {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            scale: 0,
            duration: 0.5,
            delay: index * 0.2 + 0.3,
            ease: "back.out(1.7)"
        });

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
