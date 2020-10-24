/*** DOM Element ***/

/* function get element */
getEle = (params) => {
	return document.querySelector(params);
};
getListEle = (params) => {
	return document.querySelectorAll(params);
};

/* toggle menu nav */
const btnToggle = getEle(".nav__toggler");
const bodyContainer = getEle("body");
const navMenu = getEle(".nav__menu");
const btnCloseToggle = getEle(".close__toggle");

btnToggle.addEventListener("click", () => {
	bodyContainer.classList.add("open-menu");
	navMenu.classList.toggle("is-closed");
});

btnCloseToggle.addEventListener("click", () => {
	bodyContainer.classList.remove("open-menu");
	navMenu.classList.add("is-closed");
});

document.body.addEventListener("click", (event) => {
	var closestNavMenu = event.target.closest(".nav__menu");
	var closestBtnToggle = event.target.closest(".nav__toggler");

	if (closestNavMenu !== null || closestBtnToggle !== null) {
		return;
	} else {
		bodyContainer.classList.remove("open-menu");
		navMenu.classList.add("is-closed");
	}
});

/* Search button */
const btnCloseSearchBar = getEle(".close-search-bar");
const labelSearch = getEle(".label-search");
const searchFormContainer = getEle(".search-form");
const btnOpenSearch = getEle(".btn-search");

btnCloseSearchBar.addEventListener("click", () => {
	searchFormContainer.classList.add("is-closed");
	bodyContainer.classList.remove("open-search");
});

btnOpenSearch.addEventListener("click", () => {
	searchFormContainer.classList.remove("is-closed");
	bodyContainer.classList.add("open-search");
});


