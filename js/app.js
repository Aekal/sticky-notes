var Note = (function() {
	createCard();
	$("#btn-create").on("click", createCard);

	function createCard() {
		var $container = $("#cards-container");

		$("<div/>", {
			class: "card",
			click: function(e) {
				if ($(e.target).is(".card") || $(e.target).is(".watermark")) {
					$(this).find(".watermark").removeClass("visible");
					var input = $(this).find("input");
					input.addClass("visible");
					input.focus();
				}
			}
		})
		.append($("<span/>", {
			text: "Click to add new item",
			class: "watermark visible"
		}))
		.append($("<h2/>", {
			text: "title",
			class: "card-title",
			contenteditable: true,
			keypress: function(e) {
				if (e.which == 13) {
					$(this).blur();
					window.getSelection().removeAllRanges();
				}
			}
		}))
		.append($("<button/>", {
			type: "button",
			class: "btn-minus fa fa-trash",
			click:
			function() {
				$(this).parent().remove();
			}
		}))
		.append($("<ul/>", {class: "list"}))
		.append($("<input/>", {
				class: "new-elem",
				type: "text",
				blur: function(e) {
					if ($(this).val() !== "") {
						focusOutEvent(e);
					}
					$(this).removeClass("visible");
				},
				keypress: function(e) {
					if((e.which == 13) && ($(this).val() !== "")) {
						focusOutEvent(e);
					}
				}
			})
		)
		.append($("<ul/>", {
				class: "card-colors"
			}).append(createColorPalette))
		.appendTo($container);
	};

	function focusOutEvent(e) {
		var that = $(e.target);
		var list = $(that).parent().find(".list");

		var item = $("<li/>", {
			class: "item",
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
		}).appendTo(list);

		$("<div/>", {class: "checkbox fa fa-square-o"}).appendTo(item);

		$("<span/>", {text: $(that).val()}).appendTo(item);

		$("<button/>", {
			type: "button",
			class: "fa fa-minus-circle",
			click: function() {
				if ($(this).closest(".list").children().length === 1) {
					$(".watermark").addClass("visible")
				}
				$(this).parent().remove();
			}
		}).appendTo(item);

		$(that).val("");
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
			})
		}
		return colorPalette;
	}

	return {
		createCard : createCard
	};
}());
