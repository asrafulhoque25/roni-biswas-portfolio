    // ── Navbar scroll blur ──
    const navbar = document.getElementById('navbar');
 
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('backdrop-blur-md', 'bg-[#070d1e]/70', 'shadow-[0_1px_0_rgba(255,255,255,0.06)]');
        navbar.classList.remove('py-6', 'lg:py-10');
        navbar.classList.add('py-4');
      } else {
        navbar.classList.remove('backdrop-blur-md', 'bg-[#070d1e]/70', 'shadow-[0_1px_0_rgba(255,255,255,0.06)]');
        navbar.classList.remove('py-4');
        navbar.classList.add('py-6', 'lg:py-10');
      }
    });
 
    // ── Mobile menu toggle ──
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamTop = hamburger.querySelector('.ham-top');
    const hamMid = hamburger.querySelector('.ham-mid');
    const hamBot = hamburger.querySelector('.ham-bot');
    let menuOpen = false;
 
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
 
      if (menuOpen) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        // Top line: move to center + rotate 45deg
        hamTop.style.transform = 'translateY(7px) rotate(45deg)';
        // Mid line: fade out
        hamMid.style.opacity = '0';
        hamMid.style.transform = 'scaleX(0)';
        // Bottom line: move to center + rotate -45deg, full width
        hamBot.style.width = '24px';
        hamBot.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        mobileMenu.style.maxHeight = '0';
        hamTop.style.transform = '';
        hamMid.style.opacity = '';
        hamMid.style.transform = '';
        hamBot.style.width = '';
        hamBot.style.transform = '';
      }
    });
 
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.style.maxHeight = '0';
        hamTop.style.transform = '';
        hamMid.style.opacity = '';
        hamMid.style.transform = '';
        hamBot.style.width = '';
        hamBot.style.transform = '';
      });
    });





// ── Manifesto cards hover effect ──

// ── Manifesto cards hover effect ──

const cards = document.querySelectorAll('.manifesto-card');

let activeCard = document.querySelector('.manifesto-card.is-active') || cards[0];

function activateCard(newCard) {
  if (newCard === activeCard) return;

  const oldCard = activeCard;
  activeCard = newCard;

  // Step 1: Expand new card first
  newCard.classList.add('is-active');

  // Step 2: After expand transition completes, collapse old card
  setTimeout(() => {
    oldCard.classList.remove('is-active');
  }, 500); // match your transition duration (500ms)
}

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    activateCard(card);
  });
});

//service 

// Assign bg images & preload
  document.querySelectorAll('.svc-row').forEach(row => {
    row.querySelector('.svc-bg').style.backgroundImage = `url(${row.dataset.img})`;
    new Image().src = row.dataset.img;
  });

  // Entrance animation
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.svc-row',  { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, '-=0.45');

  // Hover animations
  document.querySelectorAll('.svc-row').forEach(row => {
    const bg      = row.querySelector('.svc-bg');
    const overlay = row.querySelector('.svc-overlay');
    const shimmer = row.querySelector('.svc-shimmer');
    const name    = row.querySelector('.svc-name');
    const descs   = row.querySelectorAll('[class*="text-white/60"]');
    const num     = row.querySelector('.svc-num');

    row.addEventListener('mouseenter', () => {
      gsap.killTweensOf([bg, overlay, shimmer, name]);
      gsap.to(bg,      { opacity: 1, scale: 1,    duration: 0.65, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 1,               duration: 0.5,  ease: 'power2.out' });
      gsap.fromTo(shimmer,
        { left: '-70%', opacity: 1 },
        { left: '120%', opacity: 1, duration: 0.75, ease: 'power1.inOut' }
      );
      gsap.to(name, { y: -4, duration: 0.4, ease: 'power2.out' });
      gsap.to([...descs, num], { color: 'rgba(255,255,255,0.9)', duration: 0.35 });
    });

    row.addEventListener('mouseleave', () => {
      gsap.killTweensOf([bg, overlay, name, ...descs, num]);
      gsap.to(bg,      { opacity: 0, scale: 1.08,           duration: 0.55, ease: 'power2.inOut' });
      gsap.to(overlay, { opacity: 0,                         duration: 0.4,  ease: 'power2.in' });
      gsap.to(name,    { y: 0,                               duration: 0.35, ease: 'power2.out' });
      gsap.to(descs,   { color: 'rgba(255,255,255,0.6)',     duration: 0.35 });
      gsap.to(num,     { color: 'rgba(255,255,255,0.5)',     duration: 0.35 });
    });
  });





  // counter section


let animated = false;

function startAnimation() {
  if (animated) return;
  animated = true;

  const statCards = document.querySelectorAll('.stat-card'); // ← renamed

  gsap.to(statCards, {
    opacity: 1,
    y: 0,
    duration: 0.65,
    ease: 'power3.out',
    stagger: 0.13,
  });

  document.querySelectorAll('.counter').forEach((el, i) => {
    const target = parseInt(el.dataset.target);
    const pad    = parseInt(el.dataset.pad || 0);

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      delay: 0.2 + i * 0.1,
      onUpdate() {
        const v = Math.round(obj.val);
        el.textContent = pad ? String(v).padStart(pad, '0') : v;
      },
      onComplete() {
        el.textContent = pad ? String(target).padStart(pad, '0') : target;
      }
    });
  });
}

const statsSection = document.getElementById('stats'); // ← renamed

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startAnimation();
      observer.disconnect();
    }
  });
}, { threshold: 0.2 });

observer.observe(statsSection);





//design philosophy

(function initDesignPhilosophySection() {

    const section = document.getElementById('philosophy-section');
    if (!section) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const q    = (sel) => section.querySelector(sel);
    const qAll = (sel) => section.querySelectorAll(sel);

    /* Title */
    gsap.to(q('.design-title'), {
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      opacity: 1, y: 0,
      duration: 1, ease: 'power4.out',
    });

    /* Cards stagger */
    gsap.to(qAll('.process-card'), {
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      opacity: 1, y: 0,
      duration: 0.8, stagger: 0.15,
      ease: 'power3.out',
    });

  })();






  

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,     
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical', 
  gestureDirection: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.3, 
  infinite: false,
});


lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);



// testimonial slider

  const splide = new Splide('#testimonial-splide', {
      type        : 'loop',
      drag        : 'free',
      focus       : 'center',
      perPage     : 2,
      gap         : '12px',
      arrows      : false,
      pagination  : false,
      autoScroll  : {
        speed        : 1,
        pauseOnHover : true,
        pauseOnFocus : true,
      },
      breakpoints : {
        1536 : { perPage: 2 },
        1280 : { perPage: 4 },
        1024 : { perPage: 3, gap: '10px' },
        768  : { perPage: 2.5 },
        640  : { perPage: 1.5, gap: '8px' },
      },
    });

    if (window.splide && window.splide.Extensions) {
      splide.mount(window.splide.Extensions);
    } else {
      splide.mount();
    }

    // ── Video hover play ──
    const videoCards = document.querySelectorAll('.video-card');

    if (videoCards.length > 0) {
      videoCards.forEach(card => {
        const video = card.querySelector('.video-element');
        if (!video) return;

        let isPlaying = false;

        card.addEventListener('mouseenter', function () {
          if (!isPlaying) {
            video.currentTime = 0;
            video.play().catch(err => console.log('Video play error:', err));
            card.classList.add('is-playing');
            isPlaying = true;
          }
        });

        card.addEventListener('mouseleave', function () {
          if (isPlaying) {
            video.pause();
            video.currentTime = 0;
            card.classList.remove('is-playing');
            isPlaying = false;
          }
        });

        video.addEventListener('ended', function () {
          if (isPlaying) {
            video.currentTime = 0;
            video.play();
          }
        });
      });

      // Slider move হলে সব video pause করো
      splide.on('move', function () {
        videoCards.forEach(card => {
          const video = card.querySelector('.video-element');
          if (video) {
            video.pause();
            video.currentTime = 0;
            card.classList.remove('is-playing');
          }
        });
      });
    }



    // skill rating box hover effect and scroll

    
    /* ── Rating box animation per row ─────────── */
    document.querySelectorAll(".skill-row").forEach((row, rowIndex) => {
      const rating = parseInt(row.dataset.rating, 10);
      const boxes  = row.querySelectorAll(".rating-box");

      // Create a GSAP timeline for this row, paused
      const tl = gsap.timeline({ paused: true });

      boxes.forEach((box, i) => {
        const isFilled = i < rating;

        if (isFilled) {
          tl.to(box, {
            "--fill": "1",
            duration: 0,
            onStart: () => {
              gsap.to(box, {
                duration: 0.35,
                ease: "power2.out",
                onStart: () => {
                  box.classList.add("filled");
                  box.style.background = "transparent";
                }
              });
            }
          }, i * 0.12);   
        }
      });

      /* ScrollTrigger for each row */
      ScrollTrigger.create({
        trigger: row,
        start: "top 85%",
        onEnter: () => {
          const boxes = row.querySelectorAll(".rating-box");
          boxes.forEach((box, i) => {
            const isFilled = i < rating;
            if (isFilled) {
              gsap.to(box, {
                delay: i * 0.13,
                duration: 0,
                onComplete: () => {
                  gsap.fromTo(
                    box,
                    { "--scale": 0 },
                    {
                      duration: 0.4,
                      ease: "power3.out",
                      onStart: () => {
                        box.classList.add("filled");
                        box.style.background = "transparent";
                      }
                    }
                  );
                }
              });
            }
          });
        },
        onLeaveBack: () => {
          // Reset when scrolled back up
          row.querySelectorAll(".rating-box").forEach(box => {
            box.classList.remove("filled");
            box.style.background = "";
          });
        }
      });

      /* ── Hover: re-animate boxes on mouse enter ── */
      row.addEventListener("mouseenter", () => {
        const boxes = row.querySelectorAll(".rating-box");
        boxes.forEach((box, i) => {
          if (i < rating) {
            box.classList.remove("filled");
            box.style.background = "transparent";
            gsap.delayedCall(i * 0.08, () => {
              box.classList.add("filled");
              gsap.fromTo(box, { scale: 0.7, opacity: 0.4 }, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "back.out(2)"
              });
            });
          }
        });
      });
    });