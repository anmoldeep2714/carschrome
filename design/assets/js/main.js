const categories_carousel = new Swiper('.categories-carousel', {
    loop: true,
    slidesPerView: 6,
    spaceBetween: 20,
    autoplay: {
        delay: 3000, // Adjust delay as needed (milliseconds)
        disableOnInteraction: false, // Keeps autoplay running after user interaction
    },
    // Navigation arrows
    navigation: {
        nextEl: '.categories-carousel-button-next',
        prevEl: '.categories-carousel-button-prev',
    },
});



const banner_carousel = new Swiper('.banner-carousel', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,

    pagination: {
        el: '.banner-carousel-pagination',
    },
});



document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-menu li a");
    const tabContents = document.querySelectorAll(".tab-content");

    // Hide all tab contents initially
    tabContents.forEach(content => content.style.display = "none");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Check if the clicked tab is already active
            const isActive = this.classList.contains("active");

            // Remove active class from all tabs and hide all contents
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => {
                content.style.display = "none";
                content.classList.remove("active");
            });

            // If the clicked tab was not active, show its content
            if (!isActive) {
                this.classList.add("active");
                tabContents[index].style.display = "flex";
                tabContents[index].classList.add("active");
            }
        });
    });

    // Close tab when clicking outside tab content
    document.addEventListener("click", function (event) {
        const activeContent = document.querySelector(".tab-content.active");
        if (
            activeContent &&
            !event.target.closest(".tab-content") &&
            !event.target.closest(".tab-menu")
        ) {
            // Hide all tab contents and remove active class
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => {
                content.style.display = "none";
                content.classList.remove("active");
            });
        }
    });
});







document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".essentials-tab");
    const contents = document.querySelectorAll(".essentials-tab-content");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("essentials-tab-active"));
            // Add active class to clicked tab
            tab.classList.add("essentials-tab-active");

            // Hide all tab content
            contents.forEach(content => content.style.display = "none");
            // Show corresponding content
            contents[index].style.display = "block";
        });
    });

    // Set the default active tab content
    if (contents.length > 0) {
        contents.forEach(content => content.style.display = "none");
        contents[0].style.display = "block";
    }
});




document.querySelectorAll('.essentials-grid').forEach((grid) => {
    grid.querySelectorAll('.item').forEach((el, index) => {
        el.style.setProperty('--delay', `${index * 0.1}s`);
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const signInPopup = document.querySelector(".sign-in-popop");
    const signUpPopup = document.querySelector(".sign-up-popop");
    const signInToggle = document.querySelectorAll(".sign-in-popup-toggle");
    const signUpToggle = document.querySelectorAll(".sign-up-popup-toggle");
    const closeButtons = document.querySelectorAll(".close");

    function openPopup(popup) {
        popup.style.display = "flex";
    }

    function closePopup(popup) {
        popup.style.display = "none";
    }

    signInToggle.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            closePopup(signUpPopup);
            openPopup(signInPopup);
        });
    });

    signUpToggle.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            closePopup(signInPopup);
            openPopup(signUpPopup);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            closePopup(signInPopup);
            closePopup(signUpPopup);
        });
    });

    // Close popups when clicking outside of them
    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("popup-sign-form")) {
            closePopup(e.target);
        }
    });
});
