let bodyClassList = [];

function updateBodyClass(activeSlide) {
	Array.from(document.body.classList)
		.filter(cn => !bodyClassList.includes(cn))
		.forEach(cn => document.body.classList.remove(cn));
	const slideClass = activeSlide?.dataset?.slideClass;
	if (slideClass) {
		document.body.classList.add(slideClass);
	}
}

function onSlideDisplayed(slide) {
	updateBodyClass(slide);
	let drawing;
	if(!slide.dataset.drawing){
		slide.querySelectorAll("[data-connect-to]").forEach(source=>{
			if(!drawing) { drawing = new Drawing(); }
			drawing.addLineFor(source);
		});
		if(drawing) {
			drawing.toCssImg(slide);
		}
		slide.dataset.drawing = slide.style.backgroundImage;
	}
}

// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
Reveal
	.initialize({
		hash: true,
		width: '100%',
		height: '100%',
		mouseWheel: true,
		transition: 'convex',

		// Learn about plugins: https://revealjs.com/plugins/
		plugins: [
			RevealMarkdown,
			RevealHighlight,
			RevealNotes,
		]
	})
	.then(() => {
		bodyClassList = Array.from(document.body.classList);
		onSlideDisplayed(document.querySelector("section.present"));
		Reveal.on('slidechanged', event => {
			onSlideDisplayed(event.currentSlide);
		});
	});

