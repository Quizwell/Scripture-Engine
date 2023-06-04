var data = null;
var bookIndex = null;
var chapterIndex = null;
var sectionIndex = null;
var verseIndex = null;
var verseNumber = null;

if (localStorage.getItem("savedData")) {
	data = JSON.parse(localStorage.getItem("savedData"));
}

function createPackage() {
	var cycleYearName = prompt("Enter the cycle year name.");
	data = {
		cycleYearName: cycleYearName,
		books: [],
	};
	render();
}

function editPackage() {
	var cycleYearName = prompt("Enter a new cycle year name.");
	data.cycleYearName = cycleYearName;
	render();
}

function createBook() {
	var bookName = prompt("Enter the book's name.");
	var shortName = prompt("Enter the book's short name.");
	var abbreviation = prompt("Enter the book's abbreviation.");
	var id = prompt("Enter the book's id.");
	if (!bookName || !shortName || !abbreviation || !id) {
		return;
	}
	data.books.push({
		name: bookName,
		shortName: shortName,
		abbreviation: abbreviation,
		id: id,
		chapters: [],
	});
	bookIndex = data.books.length - 1;
	render();
}

function editBook() {
	var bookName = prompt("Enter the book's name.");
	var shortName = prompt("Enter the book's short name.");
	var abbreviation = prompt("Enter the book's abbreviation.");
	var id = prompt("Enter the book's id.");
	if (!bookName || !shortName || !abbreviation || !id) {
		return;
	}
	data.books[bookIndex].name = bookName;
	data.books[bookIndex].shortName = shortName;
	data.books[bookIndex].abbreviation = abbreviation;
	data.books[bookIndex].id = id;
	render();
}

function removeBook() {
	if (confirm("Are you sure you want to remove this book?")) {
		if (confirm("Are you sure? This action cannot be undone.")) {
			data.books.splice(bookIndex, 1);
			bookIndex = 0;
			chapterIndex = 0;
			sectionIndex = 0;
			verseIndex = 0;
			verseNumber = 1;
			render();
		}
	}
}

function previousBook() {
	if (bookIndex > 0) {
		bookIndex--;
		chapterIndex = 0;
		sectionIndex = 0;
		verseIndex = 0;
		verseNumber = 1;
		render();
	}
}
function nextBook() {
	if (bookIndex < data.books.length - 1) {
		bookIndex++;
		chapterIndex = 0;
		sectionIndex = 0;
		verseIndex = 0;
		verseNumber = 1;
		render();
	}
}

function createChapter() {
	data.books[bookIndex].chapters.push({
		number: data.books[bookIndex].chapters.length + 1,
		sections: [],
	});
	chapterIndex = data.books[bookIndex].chapters.length - 1;
	render();
}

function removeChapter() {
	if (confirm("Are you sure you want to remove this chapter?")) {
		data.books[bookIndex].chapters.splice(chapterIndex, 1);
		chapterIndex -= 1;
		if (chapterIndex < 0) {
			chapterIndex = 0;
		}
		sectionIndex = 0;
		verseIndex = 0;
		verseNumber = 1;
		render();
	}
}

function previousChapter() {
	if (chapterIndex > 0) {
		chapterIndex--;
		sectionIndex = 0;
		verseIndex = 0;
		verseNumber = 1;
		render();
	}
}
function nextChapter() {
	if (chapterIndex < data.books[bookIndex].chapters.length - 1) {
		chapterIndex++;
		sectionIndex = 0;
		verseIndex = 0;
		verseNumber = 1;
		render();
	}
}

function createSection() {
	var sectionTitle = prompt("Enter the section's title.");
	if (!sectionTitle) {
		return;
	}
	data.books[bookIndex].chapters[chapterIndex].sections.push({
		title: sectionTitle,
		verses: [],
	});
	sectionIndex = data.books[bookIndex].chapters[chapterIndex].sections.length - 1;
	render();
}

function editSection() {
	var sectionTitle = prompt("Enter the section's title.");
	if (!sectionTitle) {
		return;
	}
	data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].title = sectionTitle;
	render();
}

function removeSection() {
	if (confirm("Are you sure you want to remove this section?")) {
		data.books[bookIndex].chapters[chapterIndex].sections.splice(sectionIndex, 1);
		sectionIndex -= 1;
		if (sectionIndex < 0) {
			sectionIndex = 0;
		}
		verseIndex = 0;
		render();
	}
}

function previousSection() {
	if (sectionIndex > 0) {
		sectionIndex--;
		verseIndex = 0;
		render();
	}
}
function nextSection() {
	if (sectionIndex < data.books[bookIndex].chapters[chapterIndex].sections.length - 1) {
		sectionIndex++;
		verseIndex = 0;
		render();
	}
}

function createVerse() {
	data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses.push({
		text: "",
	});
	render();
}

function removeVerse() {
	if (confirm("Are you sure you want to remove this verse?")) {
		data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses.splice(verseIndex, 1);
		verseIndex -= 1;
		if (verseIndex < 0) {
			verseIndex = 0;
		}
		render();
	}
}

function previousVerse() {
	if (verseIndex > 0) {
		verseIndex--;
		render();
	}
}
function nextVerse() {
	if (verseIndex < data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses.length - 1) {
		verseIndex++;
		render();
	}
}

function updateVerseNumber() {
	// If this is the first section, the verse number is the index plus 1.
	// Otherwise, the verse number is the index plus 1 plus the number of verses in the previous sections.
	if (sectionIndex === 0) {
		verseNumber = verseIndex + 1;
	} else {
		var previousVerses = 0;
		for (var i = 0; i < sectionIndex; i++) {
			previousVerses += data.books[bookIndex].chapters[chapterIndex].sections[i].verses.length;
		}
		verseNumber = previousVerses + verseIndex + 1;
	}
}

function render() {
	if (document.querySelector(".actions .pronounClarifications").classList.contains("active")) {
		var pronounClarificationModeEnabled = true;
	}
	hideVerseEditor();
	hidePronounClarificationEditor();
	if (data && data.cycleYearName) {
		document.querySelector(".package h3").textContent = data.cycleYearName;
		hide(".package .create");
		show(".package .controls");

		if (data.books.length === 0) {
			document.querySelector(".book h3").textContent = "None";
			document.querySelector(".chapter h3").textContent = "None";
			document.querySelector(".section h3").textContent = "None";
			document.querySelector(".verse h3").textContent = "None";
			hide(".book .controls", ".chapter .controls", ".section .controls", ".verse .controls");
			show(".book .create");
			return;
		} else {
			if (!bookIndex) {
				bookIndex = 0;
			}
			// Disable or enable previous and next buttons
			if (bookIndex === 0) {
				document.querySelector(".book .previous").disabled = true;
			} else {
				document.querySelector(".book .previous").disabled = false;
			}
			if (bookIndex === data.books.length - 1) {
				document.querySelector(".book .next").disabled = true;
			} else {
				document.querySelector(".book .next").disabled = false;
			}

			document.querySelector(".book h3").textContent = data.books[bookIndex].name;
			hide(".book .create");
			show(".book .controls");
		}

		if (data.books[bookIndex].chapters.length === 0) {
			document.querySelector(".chapter h3").textContent = "None";
			document.querySelector(".section h3").textContent = "None";
			document.querySelector(".verse h3").textContent = "None";
			hide(".chapter .controls", ".section .controls", ".verse .controls");
			show(".chapter .create");
			return;
		} else {
			if (!chapterIndex) {
				chapterIndex = 0;
			}
			// Disable or enable previous and next buttons
			if (chapterIndex === 0) {
				document.querySelector(".chapter .previous").disabled = true;
			} else {
				document.querySelector(".chapter .previous").disabled = false;
			}
			if (chapterIndex === data.books[bookIndex].chapters.length - 1) {
				document.querySelector(".chapter .next").disabled = true;
			} else {
				document.querySelector(".chapter .next").disabled = false;
			}

			document.querySelector(".chapter h3").textContent = data.books[bookIndex].chapters[chapterIndex].number;
			hide(".chapter .create");
			show(".chapter .controls");
		}

		if (data.books[bookIndex].chapters[chapterIndex].sections.length === 0) {
			document.querySelector(".section h3").textContent = "None";
			document.querySelector(".verse h3").textContent = "None";
			hide(".section .controls", ".verse .controls");
			show(".section .create");
			return;
		} else {
			if (!sectionIndex) {
				sectionIndex = 0;
			}
			// Disable or enable previous and next buttons
			if (sectionIndex === 0) {
				document.querySelector(".section .previous").disabled = true;
			} else {
				document.querySelector(".section .previous").disabled = false;
			}
			if (sectionIndex === data.books[bookIndex].chapters[chapterIndex].sections.length - 1) {
				document.querySelector(".section .next").disabled = true;
			} else {
				document.querySelector(".section .next").disabled = false;
			}

			document.querySelector(".section h3").textContent = data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].title;
			hide(".section .create");
			show(".section .controls");
		}

		if (data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses.length === 0) {
			document.querySelector(".verse h3").textContent = "None";
			hide(".verse .controls");
			show(".verse .create");
			return;
		} else {
			if (!verseIndex) {
				verseIndex = 0;
			}
			updateVerseNumber();
			// Disable or enable previous and next buttons
			if (verseIndex === 0) {
				document.querySelector(".verse .previous").disabled = true;
			} else {
				document.querySelector(".verse .previous").disabled = false;
			}
			if (verseIndex === data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses.length - 1) {
				document.querySelector(".verse .next").disabled = true;
			} else {
				document.querySelector(".verse .next").disabled = false;
			}

			document.querySelector(".verse h3").textContent = verseNumber;
			hide(".verse .create");
			show(".verse .controls");

			hide(".noVerseSelected");
			if (pronounClarificationModeEnabled) {
				showPronounClarificationEditor();
			} else {
				showVerseEditor();
			}
		}
	}
}

function showVerseEditor() {
	show(".verseEditor");
	hide(".noVerseSelected");

	var currentVerse = data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex];

	var reference = data.books[bookIndex].name + " " + data.books[bookIndex].chapters[chapterIndex].number + ":" + verseNumber;
	document.querySelector(".verseEditor .reference").textContent = reference;
	document.querySelector(".verseEditor textarea").value = currentVerse.text;
	document.querySelector(".verseEditor textarea").style.height = "5px";
	document.querySelector(".verseEditor textarea").style.height = document.querySelector(".verseEditor textarea").scrollHeight + 20 + "px";

	var footnotes = data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex].footnotes;
	document.querySelector(".verseEditor .footnotes").innerHTML = "";
	if (footnotes && footnotes.length > 0) {
		for (var i = 0; i < footnotes.length; i++) {
			var footnote = footnotes[i];
			var footnoteElement = document.createElement("div");
			footnoteElement.classList.add("footnote");
			footnoteElement.innerHTML = "<span class='letter'>" + footnote.letter + "</span> " + footnote.text;
			document.querySelector(".verseEditor .footnotes").appendChild(footnoteElement);
		}
		show(".verseEditor .footnotes");
	}
}

function updateVerseContent() {
	var textarea = document.querySelector(".verseEditor textarea");
	data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex].text = textarea.value;
	textarea.style.height = "5px";
	textarea.style.height = textarea.scrollHeight + 20 + "px";
}

function hideVerseEditor() {
	show(".noVerseSelected");
	hide(".verseEditor");
}

function importVerses() {
	// Ensure that a book, chapter, and section exist
	if (!data?.books[bookIndex]?.chapters[chapterIndex]?.sections[sectionIndex]) {
		alert("Please create a book, chapter, and section first.");
		return;
	}

	var inputText = prompt();

	// Split the string at every occurrence of a verse number
	var splitText = inputText.split(/\[\d+\] /);

	// Convert each string in the array to an object in the regular verse format
	splitText.forEach(function (item, index) {
		splitText[index] = {
			text: item.replaceAll("\n", " "),
		};
	});

	// Remove the first empty item
	splitText.shift();

	// If there is a current verse, add the verses after it
	if (data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex]) {
		data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses.splice(verseIndex + 1, 0, ...splitText);
	} else {
		data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses.push(...splitText);
	}

	render();
}

function showPronounClarificationEditor() {
	var currentVerse = data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex];

	var reference = data.books[bookIndex].name + " " + data.books[bookIndex].chapters[chapterIndex].number + ":" + verseNumber;
	document.querySelector(".pronounClarificationEditor .reference").textContent = reference;

	var verseContentElement = document.querySelector(".pronounClarificationEditor p");
	verseContentElement.innerHTML = "";
	var splitVerse = currentVerse.text.split(" ");
	splitVerse.forEach(function (item, index) {
		var element = document.createElement("span");
		element.textContent = item;
		element.setAttribute("data-index", index);
		element.addEventListener("click", function () {
			var index = parseInt(this.getAttribute("data-index"));
			var pronoun = splitVerse[index];
			showAntecedentSelection(pronoun, index);
		});
		verseContentElement.appendChild(element);
	});

	var clarificationElementsContainer = document.querySelector(".pronounClarificationEditor .clarifications");
	clarificationElementsContainer.innerHTML = "";
	if (currentVerse.pronounClarifications) {
		currentVerse.pronounClarifications.forEach(function (item, index) {
			createPronounClarificationElement(item.pronoun, item.pronounWordIndex, item.antecedent, item.antecedentWordIndex, item.antecedentReference);
		});
	}

	document.querySelector(".actions .pronounClarifications").classList.add("active");
	document.querySelector(".actions .pronounClarifications").onclick = hidePronounClarificationEditor;
	show(".pronounClarificationEditor");
	hide(".verseEditor");
}

function hidePronounClarificationEditor() {
	document.querySelector(".actions .pronounClarifications").classList.remove("active");
	document.querySelector(".actions .pronounClarifications").onclick = showPronounClarificationEditor;
	hide(".pronounClarificationEditor");
	// Show the verse editor if a verse is selected
	if (data?.books[bookIndex]?.chapters[chapterIndex]?.sections[sectionIndex]?.verses[verseIndex]) {
		showVerseEditor();
	} else {
		show(".noVerseSelected");
	}
}

function showAntecedentSelection(pronoun, pronounWordIndex) {
	show(".antecedentSelection");

	// Populate the .verses div with all the verses from the current chapter.
	var versesElement = document.querySelector(".antecedentSelection .verses");
	versesElement.innerHTML = "";
	data.books[bookIndex].chapters[chapterIndex].sections.forEach(function (section) {
		section.verses.forEach(function (verse, index) {
			var verseElement = document.createElement("div");
			// Add a span for each word in the verse
			var splitVerse = verse.text.split(" ");
			splitVerse.forEach(function (item, index) {
				var element = document.createElement("span");
				element.textContent = item;
				verseElement.appendChild(element);
			});
			versesElement.appendChild(verseElement);
		});
	});

	// Add a class to the current verse
	versesElement.querySelector(`div:nth-child(${verseNumber})`).classList.add("currentVerse");
	// Add a class to the pronoun
	versesElement
		.querySelector(`div:nth-child(${verseNumber})`)
		.querySelector(`span:nth-child(${pronounWordIndex + 1})`)
		.classList.add("currentPronoun");
	// Scroll to the current verse
	versesElement.scrollTop = versesElement.querySelector(`:nth-child(${verseNumber})`).offsetTop - versesElement.offsetTop;

	// Add a single event listener to the verse container that checks the event target
	versesElement.onclick = function (event) {
		if (event.target.tagName === "SPAN") {
			var antecedent = event.target.textContent;
			// Get the index of the antecedent in its verse
			var antecedentWordIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
			// If the antecedent is from a different verse, store the reference in the format "bookAbbreviation chapterNumber:verseNumber"
			var antecedentReference = undefined;
			if (event.target.parentNode.parentNode.parentNode !== versesElement) {
				var antecedentVerseNumber = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode) + 1;
				antecedentReference = data.books[bookIndex].abbreviation + " " + data.books[bookIndex].chapters[chapterIndex].number + ":" + antecedentVerseNumber;
			}
			hideAntecedentSelection();
			createPronounClarification(pronoun, pronounWordIndex, antecedent, antecedentWordIndex, antecedentReference);
		}
	};
}

function hideAntecedentSelection() {
	hide(".antecedentSelection");
}

function createPronounClarification(pronoun, pronounWordIndex, antecedent, antecedentWordIndex, antecedentReference) {
	var currentVerse = data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex];

	var pronounClarification = {
		pronoun: pronoun,
		pronounWordIndex: pronounWordIndex,
		antecedent: antecedent,
		antecedentWordIndex: antecedentWordIndex,
	};
	if (antecedentReference) {
		pronounClarification.antecedentReference = antecedentReference;
	}
	if (!currentVerse.pronounClarifications) {
		currentVerse.pronounClarifications = [];
	}
	currentVerse.pronounClarifications.push(pronounClarification);

	createPronounClarificationElement(pronoun, pronounWordIndex, antecedent, antecedentWordIndex, antecedentReference);
}

function createPronounClarificationElement(pronoun, pronounWordIndex, antecedent, antecedentWordIndex, antecedentReference) {
	var pronounClarificationElement = document.createElement("div");
	pronounClarificationElement.classList.add("pronounClarification");
	if (antecedentReference) {
		pronounClarificationElement.innerHTML = `
			<h3>${pronoun}</h3>
			<h4>${pronounWordIndex}</h4>
			<h3>${antecedent}</h3>
			<h4>${antecedentWordIndex}</h4>
			<h5>${antecedentReference}</h5>
			<button>Delete</button>
		`;
	} else {
		pronounClarificationElement.innerHTML = `
			<h3>${pronoun}</h3>
			<h4>${pronounWordIndex}</h4>
			<h3>${antecedent}</h3>
			<h4>${antecedentWordIndex}</h4>
			<button>Delete</button>
		`;
	}
	// When the user hovers over the pronoun clarification, highlight the pronoun in the verse
	pronounClarificationElement.addEventListener("mouseenter", function () {
		var pronounElement = document.querySelector(".pronounClarificationEditor p span[data-index='" + pronounWordIndex + "']");
		pronounElement.classList.add("highlighted");
	});
	pronounClarificationElement.addEventListener("mouseleave", function () {
		var pronounElement = document.querySelector(".pronounClarificationEditor p span[data-index='" + pronounWordIndex + "']");
		pronounElement.classList.remove("highlighted");
	});
	// When the user clicks the delete button, delete the pronoun clarification
	pronounClarificationElement.querySelector("button").addEventListener("click", function () {
		var index = data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex].pronounClarifications.findIndex(function (item) {
			return item.pronounWordIndex === pronounWordIndex;
		});
		data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex].pronounClarifications.splice(index, 1);
		pronounClarificationElement.remove();
		// Also make sure to remove the highlight from the verse
		var pronounElement = document.querySelector(".pronounClarificationEditor p span[data-index='" + pronounWordIndex + "']");
		pronounElement.classList.remove("highlighted");
	});

	document.querySelector(".pronounClarificationEditor .clarifications").appendChild(pronounClarificationElement);
}

function addFootnote() {
	var footnoteLetter = prompt("Footnote letter:");
	var footnoteText = prompt("Footnote text:");
	var footnote = {
		letter: footnoteLetter,
		text: footnoteText,
	};
	if (!data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex].footnotes) {
		data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex].footnotes = [];
	}
	data.books[bookIndex].chapters[chapterIndex].sections[sectionIndex].verses[verseIndex].footnotes.push(footnote);
	render();
}

function hide() {
	// Loop through every item in the arguments array
	for (var i = 0; i < arguments.length; i++) {
		var item = arguments[i];
		// If the item is a string, feed it to querySelector first
		if (typeof item === "string") {
			item = document.querySelector(item);
		}
		item.classList.add("hidden");
	}
}

function show() {
	// Loop through every item in the arguments array
	for (var i = 0; i < arguments.length; i++) {
		var item = arguments[i];
		// If the item is a string, feed it to querySelector first
		if (typeof item === "string") {
			item = document.querySelector(item);
		}
		item.classList.remove("hidden");
	}
}

var lastSaved = null;
var lastSavedElement = document.querySelector(".lastSaved");

function save() {
	// Save data to localStorage
	localStorage.setItem("savedData", JSON.stringify(data));
	lastSaved = new Date();
	lastSavedElement.textContent = "Saved just now.";
}

setInterval(function () {
	// Update last saved element to reflect time since lastSaved
	if (lastSaved) {
		var now = new Date();
		var seconds = Math.round((now - lastSaved) / 1000);
		var minutes = Math.round(seconds / 60);
		var hours = Math.round(minutes / 60);
		var days = Math.round(hours / 24);
		var weeks = Math.round(days / 7);
		var months = Math.round(weeks / 4);
		var years = Math.round(months / 12);

		var timeSinceLastSaved = null;
		if (seconds < 60) {
			timeSinceLastSaved = "just now";
		} else if (minutes < 60) {
			timeSinceLastSaved = minutes + " minutes ago";
		} else if (hours < 24) {
			timeSinceLastSaved = hours + " hours ago";
		}

		lastSavedElement.textContent = "Saved " + timeSinceLastSaved + ".";
	}
}, 10000);

document.addEventListener(
	"keydown",
	function (e) {
		switch (e.code) {
			case "KeyS":
				if (e.metaKey) {
					e.preventDefault();
					save();
				}
				break;
			case "ArrowLeft":
				if (e.shiftKey) {
					previousChapter();
					e.preventDefault();
				}
				break;
			case "ArrowRight":
				if (e.shiftKey) {
					nextChapter();
					e.preventDefault();
				}
				break;
			case "Minus":
				if (e.shiftKey) {
					previousSection();
					e.preventDefault();
				} else {
					previousVerse();
					e.preventDefault();
				}
				break;
			case "Equal":
				if (e.shiftKey) {
					nextSection();
					e.preventDefault();
				} else {
					nextVerse();
					e.preventDefault();
				}
				break;
		}
	},
	false
);

render();
