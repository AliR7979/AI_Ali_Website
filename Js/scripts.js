document.addEventListener("DOMContentLoaded", function () {
    var footer = document.getElementById("hidden-footer");

    window.addEventListener("scroll", function () {
        // Calculate how much of the page is scrolled
        var scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        // Adjust this threshold as needed
        var threshold = 90;

        // If the scroll percentage is greater than the threshold, show the footer
        if (scrollPercentage > threshold) {
            footer.style.display = "block";
        } else {
            footer.style.display = "none";
        }
    });

    // Function to open the image popup with a blurred background
    window.openImagePopup = function (imageUrl) {
        // Create the blur container
        var blurContainer = document.createElement("div");
        blurContainer.classList.add("blur-container");

        // Create the popup container
        var popup = document.createElement("div");
        popup.classList.add("popup");

        // Create the image element
        var popupImage = document.createElement("img");
        popupImage.src = imageUrl;
        popupImage.alt = "Popup Image";
        popupImage.onload = function () {
            calculatePopupSize(popup, popupImage);
        };

        // Create the close button
        var closeButton = document.createElement("span");
        closeButton.classList.add("close");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", closeImagePopup);

        // Append elements to the popup
        popup.appendChild(popupImage);
        popup.appendChild(closeButton);

        // Append the popup to the blur container
        blurContainer.appendChild(popup);

        // Append the blur container to the body
        document.body.appendChild(blurContainer);

        // Blur the background
        document.body.style.overflow = "hidden"; // Prevent scrolling

        // Add event listener to close the image popup on "Esc" key press
        document.addEventListener("keydown", handleKeyPress);
    };

    // Function to calculate the maximum size of the popup based on image aspect ratio
    function calculatePopupSize(popup, image) {
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        var aspectRatio = image.width / image.height;

        // Set a maximum width for the popup
        var maxWidth = Math.min(viewportWidth * 0.8, image.width);

        // Set a maximum height for the popup
        var maxHeight = Math.min(viewportHeight * 0.8, image.height);

        // Adjust the width and height based on the aspect ratio
        if (maxWidth / aspectRatio > maxHeight) {
            popup.style.width = maxHeight * aspectRatio + "px";
            popup.style.height = maxHeight + "px";
        } else {
            popup.style.width = maxWidth + "px";
            popup.style.height = maxWidth / aspectRatio + "px";
        }
    }

    // Function to handle "Esc" key press
    function handleKeyPress(event) {
        if (event.key === "Escape") {
            closeImagePopup();
        }
    }

    // Function to close the image popup and remove the blur effect
    window.closeImagePopup = function () {
        var blurContainer = document.querySelector(".blur-container");

        // Remove the blur container
        if (blurContainer) {
            blurContainer.remove();
        }

        // Remove the "Esc" key press event listener
        document.removeEventListener("keydown", handleKeyPress);

        // Restore scrolling
        document.body.style.overflow = "auto";
    };
});
