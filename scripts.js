time_in_minutes = 1;
start = false;
correctwordcounter = 0;
totalwordcounter = 0;

// Obtain the value for textdiv css right property

element = document.getElementById('textdiv')
style = window.getComputedStyle(element);
value = style.getPropertyValue('right');
right = parseInt(value, 10)

function getTime(selectObject) {
	window.time_in_minutes = parseInt(selectObject.value);
	console.log(window.time_in_minutes);
}

wordbank = ['never', 'soon', 'into', 'sea', 'also', 'who', 'without', 'fire', 'got', 'only', 'which', 'because', 'much', 'could', 'different', 'close', 'us', 'watch', 'what', 'girl', 'our', 'more', 'help', 'ask', 'begin', 'its', 'new', 'move', 'a', 'with', 'look', 'enough', 'he', 'well', 'often', 'point', 'over', 'will', 'seem', 'grow', 'off', 'line', 'me', 'spell', 'live', 'walk', 'start', 'come', 'see', 'sometimes', 'saw', 'life', 'near', 'turn', 'had', 'and', 'we', 'but', 'I', 'every', 'leave', 'school', 'night', 'both', 'part', 'many', 'list', 'not', 'use', 'small', 'above', 'those', 'boy', 'as', 'where', 'far', 'car', 'by', 'follow', 'home', 'big', 'at', 'few', 'house', 'again', 'story', 'why', 'hard', 'have', 'here', 'were', 'upon', 'answer', 'make', 'their', 'came', 'good', 'they', 'large', 'she', 'black', 'open', 'song', 'place', 'end', 'how', 'all', 'keep', 'of', 'form', 'from', 'these', 'land', 'sun', 'earth', 'paper', 'high', 'world', 'be', 'group', 'very', 'almost', 'up', 'even', 'his', 'own', 'feet', 'little', 'below', 'side', 'took', 'young', 'did', 'back', 'was', 'country', 'know', 'hear', 'other', 'that', 'way', 'want', 'book', 'day', 'give', 'another', 'really', 'study', 'tree', 'when', 'after', 'think', 'state', 'too', 'play', 'two', 'went', 'old', 'water', 'or', 'around', 'mean', 'take', 'cut', 'learn', 'mother', 'it', 'add', 'before', 'plant', 'run', 'later', 'carry', 'work', 'talk', 'must', 'you', 'should', 'an', 'away', 'is', 'important', 'eye', 'time', 'stop', 'there', 'last', 'like', 'said', 'any', 'one', 'under', 'father', 'get', 'call', 'read', 'about', 'them', 'made', 'word', 'men', 'while', 'family', 'great', 'show', 'might', 'go', 'man', 'put', 'write', 'sound', 'then', 'tell', 'war', 'through', 'does', 'may', 'out', 'three', 'being', 'page', 'oil', 'children', 'hand', 'along', 'for', 'air', 'first', 'change', 'next', 'second', 'thing', 'such', 'still', 'thought', 'between', 'together', 'has', 'red', 'so', 'miss', 'mile', 'her', 'idea', 'example', 'eat', 'same', 'let', 'than', 'been', 'river', 'no', 'him', 'city', 'best', 'need', 'just', 'something', 'find', 'on', 'number', 'some', 'this', 'once', 'face', 'do', 'long', 'say', 'your', 'left', 'year', 'try', 'light', 'fall', 'to', 'can', 'if', 'food', 'head', 'set', 'animal', 'began', 'would', 'my', 'the', 'right', 'kind', 'down', 'four', 'each', 'are', 'white', 'name', 'found', 'until', 'people', 'now', 'always', 'most', 'in', 'letter'];

// Shuffle Array

function shuffle_array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffle_array(wordbank)

fill_text();

// Fill textdiv with wordbank

function fill_text() {
	for (var i = 0; i < wordbank.length; i++) {
		document.getElementById("textdiv").insertAdjacentHTML('beforeend', `<div class="Word" id=${i}>${wordbank[i]}</div>`);
	}
}

function time_remaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	return {'minutes':minutes, 'seconds':seconds};
}

// Clock Function

function run_clock(id, endtime) {
	var clock = document.getElementById(id);
	function update_clock() {
		var t = time_remaining(endtime);
		if (t.seconds < 10) {
			clock.innerHTML = t.minutes + ' : 0' + t.seconds;
		} else {
			clock.innerHTML = t.minutes + ' : ' + t.seconds;
		}
		if (t.minutes == 0 && t.seconds == 0) { 
			clearInterval(timeinterval); 
			clock.innerHTML = correctwordcounter / time_in_minutes + " WPM";
		}
	}
	// run function once at first to avoid delay
	update_clock(); 
	var timeinterval = setInterval(update_clock, 1000);
}

// Check word

function checkWord(input, word, totalwordcounter) {
	if (input == " " + word || input == word) {
		document.getElementById(totalwordcounter).style.color = "green";
		correctwordcounter += 1;
		return true;
	} else {
		document.getElementById(totalwordcounter).style.color = "red";
		return false;
	}
}

// Submit Function

function submit(event) {
	
	// Start the game

	if (window.start == false) {
		current_time = Date.parse(new Date());
		deadline = new Date(current_time + time_in_minutes*60*1000);
		run_clock("clockdiv", deadline);
		window.start = true;
	}

	// Space is pressed

	if (event.which == 32 || event.keyCode == 32) {
		input = document.getElementById("inputdiv").value;
		checkWord(input, wordbank[totalwordcounter], totalwordcounter)
		document.getElementById("worddiv").innerHTML = correctwordcounter + " Words";	
		right += (document.getElementById(totalwordcounter).offsetWidth + 50);
		totalwordcounter += 1;
		document.getElementById("accdiv").innerHTML = Math.round(correctwordcounter / totalwordcounter * 100) + "%";
		document.getElementById('inputdiv').value = "";
		document.getElementById('textdiv').style.right = right;
	}
} 