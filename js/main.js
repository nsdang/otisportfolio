;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("<i></i>Phone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	// Magnific Popup
	
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			titleSrc: 'title',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){
					
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeIn animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '50%' } );


	};

	// Function to dynamically generate and insert columns
	var generateColumns = function() {
		const projectsData = [
			[
				{ image: "images/anh_nguyen_1/IMG_1412.JPG", redirectUrls: "pages/project.html?project=anh_nguyen_1" },
				{ image: "images/man_nghi_1/IMG_6240.jpeg", redirectUrls: "pages/project.html?project=man_nghi_1" },
				{ image: "images/horizontal_image_placeholder.svg", redirectUrls: "pages/project.html?project=horizontal_image_placeholder" }
			],
			[
				{ image: "images/hang_tran_1/IMG_2733.jpg", redirectUrls: "pages/project.html?project=hang_tran_1" },
				{ image: "images/anh_nguyen_2/IMG_5678.jpg", redirectUrls: "pages/project.html?project=anh_nguyen_2" },
				{ image: "images/kaila_1/IMG_1206.jpg", redirectUrls: "pages/project.html?project=kaila_1" },
				{ image: "images/square_image_placeholder.svg", redirectUrls: "pages/project.html?project=square_image_placeholder" }
			],
			[
				{ image: "images/nhi_tang_1/IMG_1746.JPG", redirectUrls: "pages/project.html?project=nhi_tang_1" },
				{ image: "images/truc_pham_1/IMG_2960.jpg", redirectUrls: "pages/project.html?project=truc_pham_1" },
				{ image: "images/horizontal_image_placeholder.svg", redirectUrls: "pages/project.html?project=horizontal_image_placeholder" },
				{ image: "images/horizontal_image_placeholder.svg", redirectUrls: "pages/project.html?project=horizontal_image_placeholder" },
				{ image: "images/horizontal_image_placeholder.svg", redirectUrls: "pages/project.html?project=horizontal_image_placeholder" }
			]
		];			

		// Get the container where columns should be inserted
		const container = document.getElementById('columns-container');

		// Loop through the projectsData and create the HTML structure dynamically
		projectsData.forEach((columnData) => {
			const columnDiv = document.createElement('div');
			columnDiv.classList.add('column');

			columnData.forEach((project) => {
				const itemDiv = document.createElement('div');
				itemDiv.classList.add('fh5co-item');
				
				// Create anchor element for redirection
				const linkElement = document.createElement('a');
				linkElement.href = project.redirectUrls;

				// Create image element
				const imgElement = document.createElement('img');
				imgElement.classList.add('fit-image');
				imgElement.src = project.image;
				imgElement.alt = "";

				// Create text wrap div
				const textWrapDiv = document.createElement('div');
				textWrapDiv.classList.add('fh5co-item-text-wrap');

				const textDiv = document.createElement('div');
				textDiv.classList.add('fh5co-item-text');

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

	// Document on load.
	$(function(){
		loaderPage();
		magnifPopup();
		generateColumns(); // Add the dynamic image columns

		// Animations
		contentWayPoint();		
		
	});


}());

$(document).ready(function() {

	$("body").css("display", "none");

    $("body").fadeIn(2000);
    $("body").stop().animate({
    	opacity: 1
    });


	$("a.transition").click(function(event){

		event.preventDefault();
		linkLocation = this.href;
		$("body").fadeOut(1000, redirectPage);		

	});
		
	function redirectPage() {
		window.location = linkLocation;
	}
	
});