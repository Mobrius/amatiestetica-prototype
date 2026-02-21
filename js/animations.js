export function initImages(){
  // Se l'immagine esiste la usa come bg; altrimenti rimane il gradient.
  document.querySelectorAll("[data-img]").forEach(el => {
    const url = el.getAttribute("data-img");
    if(!url) return;
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url('${url}')`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      el.style.filter = "saturate(1.05) contrast(1.02)";
    };
    img.src = url;
  });
}

export function initAnimations(){
  if(!window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  // HERO reveal
  const heroEls = document.querySelectorAll(".hero .reveal");
  gsap.set(heroEls, { opacity: 0, y: 18 });
  gsap.to(heroEls, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.08,
    delay: 0.15
  });

  // Scroll hint line
  gsap.to(".scrollHint__line", {
    scaleX: 0.4,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  // Floating cards: micro motion
  gsap.to(".fc1", { y: "+=10", duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".fc2", { y: "-=12", duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".fc3", { y: "+=8", duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });

  // Reveal on scroll per cards/sections
  const cards = gsap.utils.toArray(".revealCard");
  cards.forEach((card) => {
    gsap.fromTo(card,
      { opacity: 0, y: 18 },
      {
        opacity: 1, y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Parallax leggero su immagini
  const parallaxEls = gsap.utils.toArray(".visualCard__media, .mediaFrame, .teamCard__media");
  parallaxEls.forEach((el) => {
    gsap.to(el, {
      y: -18,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6
      }
    });
  });

  // Gentle scale-in on large frames
  gsap.fromTo(".visualCard",
    { scale: 0.98 },
    {
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: { trigger: ".visualCard", start: "top 90%" }
    }
  );
}