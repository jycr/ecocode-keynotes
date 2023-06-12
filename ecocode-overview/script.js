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
		console.log("bodyClassList:", bodyClassList);
		updateBodyClass(document.querySelector("section.present"));
		Reveal.on('slidechanged', event => {
			updateBodyClass(event.currentSlide);
		});
		document.querySelectorAll("section").forEach(slide=>{
			let drawing;
			slide.querySelectorAll("[data-connect-to]").forEach(source=>{
				if(!drawing) { drawing = new Drawing(); }
				drawing.addLineFor(source);
			});
			if(drawing) {
				drawing.toCssImg(slide);
			}
		});
	});

