(function () {
  "use strict";

  // iPad and iPod detection
  var isiPad = function () {
    return navigator.platform.indexOf("iPad") != -1;
  };

  var isiPhone = function () {
    return (
      navigator.platform.indexOf("<i></i>Phone") != -1 ||
      navigator.platform.indexOf("iPod") != -1
    );
  };

  // Loading page
  var loaderPage = function () {
    $(".fh5co-loader").fadeOut("slow");
  };

  // Magnific Popup

  var magnifPopup = function () {
    $(".image-popup").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      titleSrc: "title",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  el.addClass("fadeIn animated");
                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "50%" }
    );
  };

  // Function to dynamically generate and insert columns
  var generateProjects = function () {
    const projectsData = [
      [
        {
          image: "images/anh_nguyen_1/IMG_1412.JPG",
          redirectUrls: "project.html?project=anh_nguyen_1",
        },
        {
          image: "images/man_nghi_1/IMG_6240.jpeg",
          redirectUrls: "project.html?project=man_nghi_1",
        },
        {
          image: "images/horizontal_image_placeholder.svg",
          redirectUrls: "project.html?project=horizontal_image_placeholder",
        },
      ],
      [
        {
          image: "images/hang_tran_1/IMG_2733.jpg",
          redirectUrls: "project.html?project=hang_tran_1",
        },
        {
          image: "images/anh_nguyen_2/IMG_5678.jpg",
          redirectUrls: "project.html?project=anh_nguyen_2",
        },
        {
          image: "images/kaila_1/IMG_1206.jpg",
          redirectUrls: "project.html?project=kaila_1",
        },
        {
          image: "images/square_image_placeholder.svg",
          redirectUrls: "project.html?project=square_image_placeholder",
        },
      ],
      [
        {
          image: "images/nhi_tang_1/IMG_1746.JPG",
          redirectUrls: "project.html?project=nhi_tang_1",
        },
        {
          image: "images/truc_pham_1/IMG_2960.jpg",
          redirectUrls: "project.html?project=truc_pham_1",
        },
        {
          image: "images/horizontal_image_placeholder.svg",
          redirectUrls: "project.html?project=horizontal_image_placeholder",
        },
        {
          image: "images/horizontal_image_placeholder.svg",
          redirectUrls: "project.html?project=horizontal_image_placeholder",
        },
        {
          image: "images/horizontal_image_placeholder.svg",
          redirectUrls: "project.html?project=horizontal_image_placeholder",
        },
      ],
    ];

    // Get the container where columns should be inserted
    const container = document.getElementById("columns-container");

    // Skip if the container is not found
    if (!container) {
      console.warn("Container element not found, skipping image generation.");
      return; // Skip the rest of the function if the container doesn't exist
    }

    // Loop through the projectsData and create the HTML structure dynamically
    projectsData.forEach((columnData) => {
      const columnDiv = document.createElement("div");
      columnDiv.classList.add("column");

      columnData.forEach((project) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("fh5co-item");

        // Create anchor element for redirection
        const linkElement = document.createElement("a");
        linkElement.href = project.redirectUrls;

        // Create image element
        const imgElement = document.createElement("img");
        imgElement.classList.add("fit-image");
        imgElement.src = project.image;
        imgElement.alt = "";

        // Create text wrap div
        const textWrapDiv = document.createElement("div");
        textWrapDiv.classList.add("fh5co-item-text-wrap");

        const textDiv = document.createElement("div");
        textDiv.classList.add("fh5co-item-text");

        // Append text and image to the anchor tag
        textWrapDiv.appendChild(textDiv);
        linkElement.appendChild(imgElement);
        linkElement.appendChild(textWrapDiv);

        // Append the anchor to the item div
        itemDiv.appendChild(linkElement);
        columnDiv.appendChild(itemDiv);
      });

      // Append the column div to the container
      container.appendChild(columnDiv);
    });
  };

  // Function to load the JSON data and generate the image elements dynamically based on the URL parameter
  function generateProjectRow() {
    // Path to your JSON file
    const jsonFilePath = "imagesList.json";

    // Fetch the JSON data
    fetch(jsonFilePath)
      .then((response) => response.json())
      .then((data) => {
        // Get the container where the images should be inserted
        const container = document.getElementById("rows-container");

        // Skip if the container is not found
        if (!container) {
          console.warn(
            "Container element not found, skipping image generation."
          );
          return; // Skip the rest of the function if the container doesn't exist
        }

        // Get the project name from the URL query parameter (e.g., ?project=anh_nguyen_1)
        const urlParams = new URLSearchParams(window.location.search);
        const projectNameParam = urlParams.get("project");

        // If a project is specified in the URL, load only images for that project
        if (projectNameParam) {
          if (data.hasOwnProperty(projectNameParam)) {
            const projectImages = data[projectNameParam];

            // Create a div to hold the images for this specific project
            //const rowDiv = document.createElement("div");
            //rowDiv.classList.add("row"); // 'row' class as you mentioned
            // Variable to keep track of images for the current row
            let rowDiv = null;

            // Loop through the images of the current project
            // Iterate through all images
            projectImages.forEach((image, index) => {
              // Every time we need to start a new row (1-3 images per row), we create a new rowDiv
              if (index % 3 === 0) {
                // Close the previous row (if exists) and append to the container
                if (rowDiv) {
                  container.appendChild(rowDiv);
                }

                // Create a new rowDiv for a new row
                rowDiv = document.createElement("div");
                rowDiv.classList.add("row"); // You can use your row class for styling (Bootstrap or custom)

                // Set the number of images randomly between 1 and 3
                const imagesInCurrentRow = Math.min(
                  3,
                  projectImages.length - index
                );
                for (let i = 0; i < imagesInCurrentRow; i++) {
                  const imageIndex = index + i;

                  // Create the item div for each image
                  const itemDiv = document.createElement("div");
                  itemDiv.classList.add(
                    "fh5co-item",
                    "col-md-" + Math.floor(12 / imagesInCurrentRow)
                  ); // Use grid columns based on number of images

                  // Create an anchor tag to wrap the image
                  const linkElement = document.createElement("a");
                  linkElement.href = `images/${projectNameParam}/${projectImages[imageIndex]}`; // Add the project parameter to the URL
                  linkElement.classList.add("image-popup");

                  // Create the image element
                  const imgElement = document.createElement("img");
                  imgElement.classList.add("fit-image");
                  imgElement.src = `images/${projectNameParam}/${projectImages[imageIndex]}`;
                  imgElement.alt = `Image for project ${projectNameParam}`;

                  // Create text wrap div
                  const textWrapDiv = document.createElement("div");
                  textWrapDiv.classList.add("fh5co-item-text-wrap");

                  const textDiv = document.createElement("div");
                  textDiv.classList.add("fh5co-item-text");

                  // Append text and image to the anchor tag
                  textWrapDiv.appendChild(textDiv);
                  linkElement.appendChild(imgElement);
                  linkElement.appendChild(textWrapDiv);

                  // Append the anchor to the item div
                  itemDiv.appendChild(linkElement);
                  rowDiv.appendChild(itemDiv);
                }
              }
            });

            // Append the project div to the main container
            container.appendChild(rowDiv);
          }
        }
        magnifPopup();
      })
      .catch((error) => {
        console.error("Error loading the JSON data:", error);
      });
  }

  function generateProjectColumn() {
    // Path to your JSON file
    const jsonFilePath = "imagesList.json";

    // Fetch the JSON data
    fetch(jsonFilePath)
      .then((response) => response.json())
      .then((data) => {
        // Get the container where the images should be inserted
        const container = document.getElementById("rows-container");

        // Skip if the container is not found
        if (!container) {
          console.warn(
            "Container element not found, skipping image generation."
          );
          return; // Skip the rest of the function if the container doesn't exist
        }

        // Get the project name from the URL query parameter (e.g., ?project=anh_nguyen_1)
        const urlParams = new URLSearchParams(window.location.search);
        const projectNameParam = urlParams.get("project");

        // If a project is specified in the URL, load only images for that project
        if (projectNameParam) {
          if (data.hasOwnProperty(projectNameParam)) {
            const projectImages = data[projectNameParam];

            const columnDiv1 = document.createElement("div");
            columnDiv1.classList.add("column");
            const columnDiv2 = document.createElement("div");
            columnDiv2.classList.add("column");
            const columnDiv3 = document.createElement("div");
            columnDiv3.classList.add("column");

            projectImages.forEach((image, index) => {
              const itemDiv = document.createElement("div");
              itemDiv.classList.add("fh5co-item");

              // Create anchor element for redirection
              const linkElement = document.createElement("a");
              linkElement.href = `images/${projectNameParam}/${image}`;
              linkElement.classList.add("image-popup");

              // Create image element
              const imgElement = document.createElement("img");
              imgElement.classList.add("fit-image");
              imgElement.src = `images/${projectNameParam}/${image}`;
              imgElement.alt = `Image for project ${projectNameParam}`;

              // Create text wrap div
              const textWrapDiv = document.createElement("div");
              textWrapDiv.classList.add("fh5co-item-text-wrap");

              const textDiv = document.createElement("div");
              textDiv.classList.add("fh5co-item-text");

              // Append text and image to the anchor tag
              textWrapDiv.appendChild(textDiv);
              linkElement.appendChild(imgElement);
              linkElement.appendChild(textWrapDiv);

              // Append the anchor to the item div
              itemDiv.appendChild(linkElement);

              if (index % 3 === 0) {
                columnDiv1.appendChild(itemDiv);
              } else if (index % 3 === 1) {
                columnDiv2.appendChild(itemDiv);
              } else {
                columnDiv3.appendChild(itemDiv);
              }
            });

            // Append the column div to the container
            container.appendChild(columnDiv1);
            container.appendChild(columnDiv2);
            container.appendChild(columnDiv3);
          }
        }
        magnifPopup();
      })
      .catch((error) => {
        console.error("Error loading the JSON data:", error);
      });
  }

  // Document on load.
  $(function () {
    loaderPage();
    magnifPopup();
    generateProjects();
    //generateProjectRow();
    generateProjectColumn();
    // Animations
    contentWayPoint();
  });
})();

$(document).ready(function () {
  $("body").css("display", "none");

  $("body").fadeIn(2000);
  $("body").stop().animate({
    opacity: 1,
  });

  $("a.transition").click(function (event) {
    event.preventDefault();
    linkLocation = this.href;
    $("body").fadeOut(1000, redirectPage);
  });

  function redirectPage() {
    window.location = linkLocation;
  }
});
