window.addEventListener("DOMContentLoaded", () => {
    let docWidth = document.body.clientWidth;
    const wrap = document.querySelector("#wrap");
    const images = document.querySelectorAll("#wrap .block");
    let slidesWidth = wrap.clientWidth;

    let currentOffset = 0;
    let targetOffset = 0;
    let isAnimating = false;

    window.addEventListener("resize", () => {
        docWidth = document.body.clientWidth;
        slidesWidth = wrap.clientWidth;
    });

    document.addEventListener("mousemove", (e) => {
        let mouseX = e.pageX;
        targetOffset = -1 * ((mouseX / docWidth) * slidesWidth - mouseX / 2);

        if (!isAnimating) {
            requestAnimationFrame(updateOffset);
        }
    });

    function updateOffset() {
        isAnimating = true;
        currentOffset = lerp(currentOffset, targetOffset, 0.075);

        if (Math.abs(currentOffset - targetOffset) < 0.5) {
            currentOffset = targetOffset;
            isAnimating = false;
        }

        images.forEach((image) => {
            image.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
        });

        if (isAnimating) {
            requestAnimationFrame(updateOffset);
        }
    }

    function lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }
});

const tl = gsap.timeline({ paused: true });
let path = document.querySelector(".path");

function showCards() {
    revealCards();

    const showBtn = document.getElementById("toggleOverlay");
    showBtn.onclick = function (e) {
        tl.reversed(!tl.reversed());
    };

    const closeBtn = document.getElementById("closeBtn");
    closeBtn.onclick = function (e) {
        tl.reversed(!tl.reversed());
    };
}

showCards();

function revealCards() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Start: A very thin shape in the center (small vertical height)
    let start = `M 0 ${height / 2} V ${height / 2} Q ${width / 2} ${height / 2} ${width} ${height / 2} V ${
        height / 2
    } z`;

    // End: Full height reveal from center outward
    let end = `M 0 ${height} V 0 Q ${width / 2} 0 ${width} 0 V ${height} z`;

    tl.to("#logo", 0.1, {
        scale: 0,
        ease: "power2.inOut",
    });

    tl.to(".wines", 0.1, {
        opacity: 1,
        ease: "power2.inOut",
    });

    tl.to(path, 0.01, {
        attr: { d: start },
        ease: Power3.easeIn,
    }).to(path, 0.4, {
        attr: { d: end },
        ease: Power3.easeOut,
    });

    tl.to("#logo", {
        delay: 0.12,
        scale: 1,
        color: "#ecaa5d",
        ease: "power2.inOut",
    });

    tl.from(".block", 1, {
        clipPath: "inset(0 100% 0 0)",
        ease: Power4.easeOut,
        stagger: { amount: 0.25 },
    });

    tl.from(
        ".product img",
        1,
        {
            scale: 3,
            ease: Power4.easeOut,
            stagger: { amount: 0.25 },
        },
        "-=1.5"
    );

    tl.from(
        "#closeBtn",
        1,
        {
            opacity: 0,
            right: "-25%",
            ease: "power2.inOut",
        },
        "-=1"
    ).reverse();
}
