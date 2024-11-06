    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar.clientHeight;

    window.addEventListener("scroll", () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add("black");
    } else {
        navbar.classList.remove("black");
    }
    });

    function toggleMenu() {
        const menuIcon = document.getElementById("menu-icon");
        const navbarMenu = document.getElementById("navbarMenu");
        const menuLinks = document.getElementById("menuLinks");
        const bar1 = document.getElementById("bar1");
        const bar2 = document.getElementById("bar2");
        const bar3 = document.getElementById("bar3");

        menuIcon.classList.toggle("open");
        navbarMenu.classList.toggle("open");
        menuLinks.classList.toggle("open");
        bar1.classList.toggle("open");
        bar2.classList.toggle("open");
        bar3.classList.toggle("open");
    }