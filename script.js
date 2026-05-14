// Scroll krne ke liye(navbar)
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// image generate krane ke liye(random jb load na ho)
function getImgSrc(seed) {
    return `https://picsum.photos/seed/${seed}/400/225`;
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    // row wise rows generate krane ke liye
    const rowsContainer = document.getElementById("rows-container");

    rowsData.forEach(row => {
        // row container ke liye (create rows)
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        // title ke liye
        const titleElement = document.createElement("h2");
        titleElement.classList.add("row-title");
        titleElement.textContent = row.title;
        rowDiv.appendChild(titleElement);

        // saare posters ke liye (create posters)
        const postersDiv = document.createElement("div");
        postersDiv.classList.add("row-posters");

        // (Save cards for search ) save krne ke liye
        row.items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            //  background image aaegi
            card.style.backgroundImage = `url('${item.img}')`;

            const cardTitle = document.createElement("p");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = item.title;

            card.appendChild(cardTitle);

            // Click function ke liye(interactive part)
            card.addEventListener('click', () => {
                if (item.video) {
                    const modal = document.getElementById("videoModal");
                    const videoPlayer = document.getElementById("modalVideoPlayer");
                    videoPlayer.src = item.video;
                    modal.classList.add("active");
                    videoPlayer.play().catch(e => console.log("Autoplay prevented:", e));
                } else {
                    alert(`Add a 'video' property to ${item.title} in script.js to play a video!`);
                }
            });

            postersDiv.appendChild(card);
        });

        rowDiv.appendChild(postersDiv);
        rowsContainer.appendChild(rowDiv);
    });

    // Search ka logic
    document.getElementById("searchBar").addEventListener("keyup", function (e) {
        let input = e.target.value.toLowerCase();
        let allCards = document.querySelectorAll(".card");

        allCards.forEach(card => {
            let text = card.querySelector(".card-title").textContent.toLowerCase();
            if (text.includes(input)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // Modal ko close krne ke liye
    const modal = document.getElementById("videoModal");
    const closeBtn = document.getElementById("closeModal");
    const videoPlayer = document.getElementById("modalVideoPlayer");

    if (modal && closeBtn) {
        const closeModal = () => {
            modal.classList.remove("active");
            videoPlayer.pause();
            videoPlayer.src = "";
        };

        closeBtn.addEventListener("click", closeModal);

        // chalte video ko close krne ke liye(aur achha krna h)
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});