var btnCreate = document.getElementById("btn-create");
btnCreate.addEventListener("click", createCard);

function createCard() {
	var card = document.createElement("div");
	var cardsContainer = document.getElementById("cards-container");
	card.className = "card";
	cardsContainer.appendChild(card);
}
