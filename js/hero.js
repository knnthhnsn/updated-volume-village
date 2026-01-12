document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM queries once
    const hero = document.querySelector(".vv-hero-bridge");
    const sun = document.querySelector(".vv-hero-bridge__sun");
    const bridgeOverlay = document.querySelector(".vv-hero-bridge__bridge--overlay");
    const stars = document.querySelector(".vv-hero-bridge__stars");
    const cars = document.querySelectorAll(".vv-hero-bridge__car");
    const defaultLogo = document.querySelector(".bold-nav-full__logo--default img");
    const defaultBurger = document.querySelector(".bold-nav-full__hamburger--default");

    // Throttle flag for requestAnimationFrame
    let ticking = false;

    if (!hero) {
        // Fallback for sider uden hero
        if (defaultLogo) defaultLogo.style.filter = "brightness(1) invert(0)";
        if (defaultBurger) {
            defaultBurger.style.color = "#FF5500";
            defaultBurger.style.filter = "none";
        }
        return;
    }

    function updateHeroUI() {
        const scroll = window.scrollY;
        const heroTop = hero.offsetTop;
        const heroH = hero.offsetHeight || window.innerHeight;

        let t = (scroll - heroTop) / (heroH * 0.3);
        t = Math.max(0, Math.min(1, t));

        // Baggrundsfarve
        const start = { r: 252, g: 76, b: 2 };
        const end = { r: 4, g: 20, b: 48 };
        const R = Math.round(start.r + (end.r - start.r) * t);
        const G = Math.round(start.g + (end.g - start.g) * t);
        const B = Math.round(start.b + (end.b - start.b) * t);

        hero.style.setProperty("--hero-r", R);
        hero.style.setProperty("--hero-g", G);
        hero.style.setProperty("--hero-b", B);

        // Bro overlay
        if (bridgeOverlay) bridgeOverlay.style.opacity = t;

        // Stjerner
        if (stars) stars.style.opacity = t;

        // Bil-lygter
        const lightsOpacity = t * t;
        cars.forEach(car => {
            car.style.setProperty("--car-lights-opacity", lightsOpacity);
        });

        // Solen
        if (sun) {
            const heroBottom = heroTop + heroH;
            sun.style.opacity = scroll < heroBottom ? 1 : 0;
            const sunGlow = 1 - (t * 0.7);
            sun.style.setProperty("--sun-glow", sunGlow);
        }

        // Logo og burger
        if (defaultLogo) {
            defaultLogo.style.filter = `brightness(${t})`;
        }
        if (defaultBurger) {
            const burgerR = Math.round(255 * t);
            const burgerG = Math.round(85 * t);
            defaultBurger.style.color = `rgb(${burgerR}, ${burgerG}, 0)`;
            defaultBurger.style.filter = "none";
        }

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeroUI);
            ticking = true;
        }
    }

    // Initial update
    updateHeroUI();

    // Use passive listeners for better scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
});
