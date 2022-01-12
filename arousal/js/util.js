  	// --- UTILS
  	function getRandomInt(min, max) {
  	    min = Math.ceil(min);
  	    max = Math.floor(max);
  	    return Math.floor(Math.random() * (max - min + 1)) + min;
  	}

  	var shuffle = (array) => {
  	    var currentIndex = array.length,
  	        temporaryValue, randomIndex;

  	    // While there remain elements to shuffle...
  	    while (0 !== currentIndex) {

  	        // Pick a remaining element...
  	        randomIndex = Math.floor(Math.random() * currentIndex);
  	        currentIndex -= 1;

  	        // And swap it with the current element.
  	        temporaryValue = array[currentIndex];
  	        array[currentIndex] = array[randomIndex];
  	        array[randomIndex] = temporaryValue;
  	    }

  	    return array;
  	}


  	var latinsquare_initstring_generator = () => {
  	    s = ''
  	    for (i of['hline', 'line', 'circle', 'spiral']) {
  	        for (j of['history', 'plants', 'schedule']) {
  	            s += j + "/" + i + ","
  	        }
  	    }
  	    s = s.slice(0, s.length - 1)

  	    return s
  	}



  	var ID = function() {
  	    // Math.random should be unique because of its seeding algorithm.
  	    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  	    // after the decimal.
  	    return '_' + Math.random().toString(36).substr(2, 9);
  	};

  	var progress_bar = (progress, color, section) => {
  	    //总体bar
  	    bar = document.createElement('div')
  	    bar.style.position = 'absolute'
  	    bar.style.top = '0px'
  	    bar.style.height = '10px'
  	    bar.className = 'timeclass'
  	    bar.id = 'timebar'
  	    bar.style.width = Math.round(progress) + 'px'
  	    bar.style.backgroundColor = color
  	    bar.style.display = "none"
  	    document.body.append(bar)
  	        //进行到第几个，显示红色bar
  	    d = document.createElement('div')
  	    d.style.position = 'absolute'
  	    d.className = 'timeclass'
  	    d.style.top = '10px'
  	    d.style.left = '10px'
  	    d.style.color = color
  	    d.style.display = "none"
  	    if (section == 'tutorial') d.innerHTML = 'tutorial progress: ' + (1 + current_slide) + '/' + (tutorial_length)
  	    else if (section == 'test') d.innerHTML = 'pic number: ' + (1 + current_question) + '/' + (questions_shuffle.length)
  	    document.body.append(d)

  	    // d = document.createElement('div')
  	    // d.id = 'timediv'
  	    // d.className = 'timeclass'
  	    // d.style.position = 'absolute'
  	    // d.style.top = '4%'
  	    // d.style.left = '1vh'
  	    // d.style.color = color
  	    // document.body.append(d)
  	}

  	// function startTimer(duration) {
  	//     var timer = duration,
  	//         minutes, seconds;
  	//     setInterval(function() {
  	//         minutes = parseInt(timer / 60, 10);
  	//         seconds = parseInt(timer % 60, 10);

  	//         minutes = minutes < 10 ? "0" + minutes : minutes;
  	//         seconds = seconds < 10 ? "0" + seconds : seconds;

  	//         timediv = document.getElementById('timediv')
  	//         timebar = document.getElementById('timebar')

  	//         if (timediv != null) {
  	//             timediv.innerHTML = 'remaining time: ' + minutes + ":" + seconds;
  	//         }

  	//         if (--timer < 0) {
  	//             if (!time_out) {
  	//                 time_out = true
  	//                 init_survey()
  	//             }
  	//         }
  	//     }, 1000);
  	// }

  	function getUrlVars() {
  	    var vars = {};
  	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
  	        vars[key] = value;
  	    });
  	    return vars;
  	}

  	// --- END UTILS