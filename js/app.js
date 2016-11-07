$(document).ready(function() {
	var myCard = {
		init : function() {
			this.cacheDOM();
			this.display();
		},
		cacheDOM : function() {
			this.$container = $("#cards-container");
		},
		display : function() {
			this.newCard = $("<div/>", {
				class: "card",
			}).appendTo(this.$container);

			this.minusBtn = $("<button/>", {
				type: "button",
				class: "minus fa fa-minus",
				click: function() {
					$(this).parent().remove();
				}
			}).appendTo(this.newCard);
		},
	};

	$("#btn-create").on("click", function() {
		myCard.init();
	});
});
