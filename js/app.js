var Note = (function() {
	createCard();
	$("#btn-create").on("click", createCard);

	function createCard() {
		var $container = $("#cards-container");
		//Card
		$("<div/>", {
			class: "card",
			click: function(e) {
				if ($(e.target).is(".list-container") || $(e.target).is(".watermark")) {
					$(this).find(".watermark").removeClass("visible");
					var input = $(this).find("input");
					input.addClass("visible");
					input.focus();
				}
			}
		})
		//Card's Watermark
		.append($("<span/>", {
			text: "Click to add new item",
			class: "watermark visible"
		}))
		//Card's Title
		.append($("<h2/>", {
			text: "title",
			contenteditable: true,
			keypress: function(e) {
				if (e.which == 13) {
					$(this).blur();
					window.getSelection().removeAllRanges();
				}
			}
		}))
		//Card's remove button
		.append($("<button/>", {
			type: "button",
			class: "btn-minus fa fa-trash",
			click: function() {
				$(this).parent().fadeOut(function() {
					$(this).remove();
				});
			}
		}))
		//Card's internal container - to separate list of items from color palette
		.append($("<div/>", {
			class: "list-container"
		})
			//List of items
			.append($("<ul/>", {class: "list"}))
			//Input to add new items
			.append($("<input/>", {
				class: "new-elem",
				type: "text",
				blur: function(e) {
					if ($(this).val() !== "") {
						createItem(e);
					} else {
						if (($(this).parent().find(".list").children().length == 0)) {
							$(".watermark").addClass("visible");
						}
					}
					$(this).removeClass("visible");
				},
				keypress: function(e) {
					if((e.which == 13) && ($(this).val() !== "")) {
						createItem(e);
					}
				}
			}))
			//Card's button container
			.append($("<div/>", {class: "btn-selected-container"})
				//Button for remove selected items
				.append($("<button/>", {
					type: "button",
					class: "remove-selected-btn fa fa-eraser",
					click: function() {
						var $selectedItems = $(this).closest(".list-container").find(".selected");
						for (i = 0; i < $selectedItems.length; i++) {
							$($selectedItems[i]).parent().remove();
						}
					}
				}))
				//Tooltip for button
				.append($("<span/>", {
					class: "tooltip",
					text: "Remove selected items"
				}))
			)
		)
		//Card's Color Palette
		.append($("<ul/>", {
				class: "card-colors"
		})
		.append(createColorPalette))
		//Add everything to main container
		.hide().fadeIn().appendTo($container);

		//Scroll to new card (Mobile)
		if (($(window).width() < 800) && ($(".card").length > 1)) {
			var $lastCard = $(".card:last");
			$("html, body").animate({
				scrollTop: $lastCard.offset().top
			},700);
		}
	}

	function createItem(e) {
		var input = $(e.target);
		var list = $(input).parent().find(".list");

		//Create list item
		var item = $("<li/>", {
			class: "item",
			//Check done items
			click: function (e) {
				$(this).find("span").toggleClass("selected");
				var checkbox = $(this).find(".checkbox");
				if (checkbox.hasClass("fa-square-o")) {
					checkbox.removeClass("fa-square-o")
					.addClass("fa-check-square-o");
				} else {
					checkbox.removeClass("fa-check-square-o")
					.addClass("fa-square-o");
				}
			}
		})
			//Item's checkbox
			.append($("<div/>", {class: "checkbox fa fa-square-o"}))
			//Item's text from input
			.append($("<span/>", {text: $(input).val()}))
			//Item's remove button
			.append($("<button/>", {
				type: "button",
				class: "fa fa-minus-circle",
				click: function() {
					if ($(this).closest(".list").children().length === 1) {
						$(".watermark").addClass("visible");
					}
					$(this).parent().remove();
				}
			}))
			//Add item to list
		.appendTo(list);

		//Clear input field
		$(input).val("");
	}

	function createColorPalette() {
		var colorPalette = [];
		for (var i = 0; i < 3; i++) {
			colorPalette[i] = $("<li/>", {
				class: "color",
				click: function() {
					var selectedColor = $(this).css("background-color");
					$(this).closest(".card").css("background-color", selectedColor);
				}
			});
		}
		return colorPalette;
	}

	return {
		createCard : createCard
	};
}());
