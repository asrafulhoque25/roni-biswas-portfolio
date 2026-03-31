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

const cards = document.querySelectorAll('.manifesto-card');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');
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
