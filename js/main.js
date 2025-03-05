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
  var generateColumns = function () {
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
        console.warn('Container element not found, skipping image generation.');
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
  function generateRows() {
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
			console.warn('Container element not found, skipping image generation.');
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
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row"); // 'row' class as you mentioned

            // Loop through the images of the current project
            projectImages.forEach((image) => {
              const itemDiv = document.createElement("div");
              itemDiv.classList.add("fh5co-item");

              // Create an anchor tag to wrap the image
              const linkElement = document.createElement("a");
              linkElement.href = `images/${projectNameParam}/${image}`; // Add the project parameter to the URL
              linkElement.classList.add("image-popup");

              // Create the image element
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
              rowDiv.appendChild(itemDiv);
            });

            // Append the project div to the main container
            container.appendChild(rowDiv);
          } else {
            // If the project name is not found in the JSON data
            container.innerHTML = "<p>Project not found!</p>";
          }
        } else {
          // If no project name is specified, load images for all projects
          for (const projectName in data) {
            if (data.hasOwnProperty(projectName)) {
              const projectImages = data[projectName];

              // Create a div to hold the images for this project
              const projectDiv = document.createElement("div");
              projectDiv.classList.add("row"); // 'row' class as you mentioned

              // Loop through the images of the current project
              projectImages.forEach((image) => {
                // Create an anchor tag to wrap the image
                const linkElement = document.createElement("a");
                linkElement.href = `images/${projectName}/${image}`; // Add the project parameter to the URL
                linkElement.classList.add("image-popup");
                linkElement.classList.add("animate-box");

                // Create the image element
                const imgElement = document.createElement("img");
                imgElement.classList.add("fit-image");
                imgElement.src = `images/${projectName}/${image}`;
                imgElement.alt = `Image for project ${projectName}`;

                // Wrap the image with the anchor link
                linkElement.appendChild(imgElement);

                // Append the link to the project container
                projectDiv.appendChild(linkElement);
              });

              // Append the project div to the main container
              container.appendChild(projectDiv);
            }
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
    generateColumns();
    generateRows();
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
