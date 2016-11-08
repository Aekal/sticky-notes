$(document).ready(function() {

function createCard() {
	var $container = $("#cards-container");

	var newCard = $("<div/>", {
		class: "card",
		click: function(e) {
			if ($(e.target).is(".card")) {
				$(this).find("input").focus();
			}
		}
	}).appendTo($container);

	var minusCardBtn = $("<button/>", {
		type: "button",
		class: "btn-minus fa fa-minus",
		click: function() {
			$(this).parent().remove();
		}
	}).appendTo(newCard);

	var list = $("<ul/>", {class: "list"}).appendTo(newCard);

	var inputField = $("<input/>", {
		class: "new-elem",
		type: "text",
		blur: function() {
			//createListItem()
		},
		keypress: function(e) {
			if((e.which == 13) && ($(this).val() !== "")) {
				var list = $(this).parent().find(".list");

				var item = $("<li/>", {
					class: "item",
					click: function (e) {
						$(this).find("span").toggleClass("selected");

						var checkbox = $(this).find(".checkbox")
						if (checkbox.hasClass("fa-square-o")) {
							checkbox
							.removeClass("fa-square-o")
							.addClass("fa-check-square-o")
						} else {
							checkbox
							.removeClass("fa-check-square-o")
							.addClass("fa-square-o")
						}
					}
				}).appendTo(list);

				var checkbox = $("<div/>",{
					class: "checkbox fa fa-square-o",
				}).appendTo(item);

				var itemText = $("<span/>", {
					text: $(this).val()
				}).appendTo(item);

				var minusItemBtn = $("<button/>", {
					type: "button",
					class: "fa fa-minus-circle",
					click: function() {
						$(this).parent().remove();
					}
				}).appendTo(item);

				$(this).val("");
			}
		}
	}).appendTo(newCard);

	var colorList = $("<ul/>", {
		class: "card-colors"
	}).appendTo(newCard);

	var colorItems = [];
	for (i = 0; i < 3; i++) {
		colorItems.push(
			$("<li/>", {
				class: "color"
			}).appendTo(colorList)
		);
	}
	$(".color").click(function () {
		var selectedColor = $(this).css("background-color");
		$(this).closest(".card").css("background-color", selectedColor);
	})
 }

 $(".card").on("click", function(e) {
	 if ($(e.target).is(".card")) {
		 $(this).find("input").focus();
	 }
 });

 $("#btn-create").on("click", function() {
	 createCard();
 });

 createCard();

});
