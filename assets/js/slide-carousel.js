/** Slide carousel **/
const btnNext = getEle(".btn-next");
const btnPrev = getEle(".btn-prev");
let navigationBtnBox = getEle(".navigation-button");
let carouselSlide = getEle(".carousel__slide");
let listSlideItem = getListEle(".slide__item");
let carouselLenght = listSlideItem.length;
let sizeItem = window.innerWidth;
let counter = 1;
let isLoop = true;
let timeTrans = 1;
let timeInterval = 5000;
let autoSlide = true;

/* function get element */
getEle = (params) => {
	return document.querySelector(params);
};
getListEle = (params) => {
	return document.querySelectorAll(params);
};

/* function remove class from list node */
removeClassAtListItem = (listNode, className) => {
	listNode.forEach((ele) => {
		ele.classList.remove(className);
	});
};

//create navigation button radio
createInputRadio = (id) => {
	return `
    <input type="radio" id=${id} name="radio-btn">
    <label for="${id}" class="manual-btn"></label>
    `;
};

let htmlStringRadioBtn = "";
for (let i = 1; i <= carouselLenght; i++) {
	htmlStringRadioBtn += createInputRadio(`radio-${i}`);
}

navigationBtnBox.innerHTML = htmlStringRadioBtn;
let labelBtnRadio = document.querySelectorAll("input[name=radio-btn]");

//set cheked input radio
setCheckedRadio = (index) => {
	labelBtnRadio.forEach((ele) => {
		ele.removeAttribute("checked");
	});
	if (index >= labelBtnRadio.length) {
		labelBtnRadio[0].setAttribute("checked", true);
	} else if (index < 0) {
		labelBtnRadio[labelBtnRadio.length - 1].setAttribute("checked", true);
	} else {
		labelBtnRadio[index].setAttribute("checked", true);
	}
};

setCheckedRadio(0);

/** clone item slide **/
if (isLoop) {
	let firstSlideChildClone = carouselSlide.firstElementChild.cloneNode(true);
	let lastSlideChildClone = carouselSlide.lastElementChild.cloneNode(true);
	carouselSlide.append(firstSlideChildClone);
	carouselSlide.prepend(lastSlideChildClone);
	listSlideItem = getListEle(".slide__item");
	carouselLenght = listSlideItem.length;

	//add class to clone element
	listSlideItem[carouselLenght - 1].classList.add("clone-first");
	listSlideItem[0].classList.add("clone-last");
}

listSlideItem.forEach((ele) => {
	ele.style.width = `${sizeItem}px`;
});

window.onresize = function (event) {
	sizeItem = window.innerWidth;
	listSlideItem.forEach((ele) => {
		ele.style.width = `${sizeItem}px`;
    });
    
	//start at first element = index: 1
	carouselSlide.style.transform = `translateX(${-sizeItem * counter}px)`;
};

//start at first element = index: 1
carouselSlide.style.transform = `translateX(${-sizeItem * counter}px)`;

transformSlide = (isNext) => {
	if (isNext) {
		if (counter >= carouselLenght - 1) return;
		counter++;
	} else {
		if (counter <= 0) return;
		counter--;
	}
	// listSlideItem[counter-1].style.animation = `fadeOut ${timeTrans}s ease-in-out`;
	
	carouselSlide.style.transition = `all ${timeTrans}s ease-in-out`;
	carouselSlide.style.transform = `translateX(${-sizeItem * counter}px)`;
	removeClassAtListItem(listSlideItem, 'active');
	listSlideItem[counter].classList.add('active');
	setCheckedRadio(counter - 1);
};

transformSlideRadio = (num) => {
	carouselSlide.style.transition = `all ${timeTrans}s ease-in-out`;
	carouselSlide.style.transform = `translateX(${-sizeItem * num}px)`;
};

//onWheel
carouselSlide.addEventListener("wheel", (event) => {
	if (event.deltaY < 0) {
		transformSlide(true);
	} else {
		transformSlide(false);
	}
});

/** Button next - prev **/
btnNext.addEventListener("click", () => {
	transformSlide(true);
});

btnPrev.addEventListener("click", () => {
	transformSlide(false);
});

//reset loop
carouselSlide.addEventListener("transitionend", () => {
	if (isLoop) {
		if (listSlideItem[counter].classList.contains("clone-last")) {
			carouselSlide.style.transition = "none";
			counter = carouselLenght - 2;
			carouselSlide.style.transform = `translateX(${
				-sizeItem * counter
			}px)`;
		} else if (listSlideItem[counter].classList.contains("clone-first")) {
			carouselSlide.style.transition = "none";
			counter = 1;
			carouselSlide.style.transform = `translateX(${
				-sizeItem * counter
			}px)`;
		}
	}
});

// auto loop
if (autoSlide & isLoop) {
	setInterval(() => {
		transformSlide(true);
	}, timeInterval);
}

//navigation button
labelBtnRadio.forEach((element) => {
	element.addEventListener("click", (event) => {
		counter = event.target.id.match(/\d+/)[0];
		transformSlideRadio(counter);
	});
});
