document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeNavigation();

        initializeCategories();

        initializePostModal();

        renderFeed();

        renderClubs();

        renderProfile();

        renderCommunication();

        if (typeof initializeAI === "function") {
            initializeAI();
        }

        const aiTopBtn = document.getElementById("aiTopBtn");
        if (aiTopBtn) {
            aiTopBtn.addEventListener("click", () => {
                const aiNavBtn = document.querySelector('.nav-item[data-page="aiPage"]');
                if (aiNavBtn) {
                    aiNavBtn.click();
                }
            });
        }

    }
);


function initializeNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    const pages =
        document.querySelectorAll(".page");


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const target =
                    item.dataset.page;


                navItems.forEach(nav =>
                    nav.classList.remove("active")
                );


                item.classList.add("active");


                pages.forEach(page =>
                    page.classList.remove("active")
                );


                const targetPage =
                    document.getElementById(target);


                if (targetPage) {
                    targetPage.classList.add("active");
                }

            }
        );

    });

}


function initializeCategories() {

    const buttons =
        document.querySelectorAll(
            ".category-chip"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn =>
                    btn.classList.remove("active")
                );

                button.classList.add("active");

                renderFeed(
                    button.dataset.category
                );

            }
        );

    });

}


function initializePostModal() {

    const modal =
        document.getElementById("postModal");

    const open =
        document.getElementById("createPostBtn");

    const close =
        document.getElementById("closePostModal");


    open.addEventListener(
        "click",
        () => modal.classList.remove("hidden")
    );


    close.addEventListener(
        "click",
        () => modal.classList.add("hidden")
    );


    document
        .getElementById("publishPostBtn")
        .addEventListener(
            "click",
            publishPost
        );

}


function publishPost() {

    const type =
        document.getElementById("postType").value;

    const title =
        document.getElementById("postTitle").value.trim();

    const description =
        document
            .getElementById("postDescription")
            .value
            .trim();

    const link =
        document.getElementById("postLink").value.trim();


    if (!title || !description) {

        alert(
            "Please enter a title and description."
        );

        return;
    }


    createNewPost({

        type,

        title,

        description,

        link

    });


    document
        .getElementById("postModal")
        .classList.add("hidden");


    document.getElementById("postTitle").value = "";

    document.getElementById("postDescription").value = "";

    document.getElementById("postLink").value = "";

}