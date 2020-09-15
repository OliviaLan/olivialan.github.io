current_slide = 0
current_question = 0
user_answers = []
user_data = {}
chosen_patterns = []
questions_shuffle = []

mid_collection = 'mID_prolific'
complete_collection = 'result_prolific'
incomplete_collection = 'result_incomplete_prolific'

test_mID = "test_mid"

var width = window.innerWidth - 100;
var height = window.innerHeight * 0.95;


var curems = 0.8

PRODUCTION = true


var init_end = () => {
    user_data['answers'] = user_answers

    document.body.innerHTML = ''
    d = document.createElement('div')
    d.style.margin = '10%'
    d.style.marginBottom = '1%'
    d.innerHTML = '<p>Thank you for participating. <br>Please <a href = "copy Prolific link here" >click here to completed your study.</a></p>'
        // IF USE UNIQUE CODE
        // d2 = document.createElement('div')
        // d2.innerHTML = uniquecode
        // d2.style.fontSize = 'large'
        // d2.style.fontWeight = 'bold'

    document.body.append(d)

    console.log('finalize')

    //Download the final data
    // get_firebase_data(complete_collection, true)

    final_user_data = {}
    for (elem of Object.keys(user_data)) {
        if (user_data[elem] != undefined) {
            final_user_data[elem] = user_data[elem]
        }
    }

    if (PRODUCTION && mID != test_mID) {
        db.collection(complete_collection).add(final_user_data)
            .then(function(docRef) {
                console.log(complete_collection + "Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        db.collection(experiment_replacement).add(final_user_data)
            .then(function(docRef) {
                console.log(experiment_replacement + "Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    }
}



var get_firebase_data = (collection = complete_collection, download = true) => {
    return firebase.firestore().collection(collection)
        .get()
        .then(function(querySnapshot) {
            data = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
            filename = 'results.json'

            if (download) {
                if (typeof data === "object") {
                    data = JSON.stringify(data, undefined, 4)
                }

                var blob = new Blob([data], { type: 'text/json' }),
                    e = document.createEvent('MouseEvents'),
                    a = document.createElement('a')

                a.download = filename
                a.href = window.URL.createObjectURL(blob)
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
                e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                a.dispatchEvent(e)
            } else return data;
        });
}


var init_firebase = () => {

    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
}

var save_mid = () => {
    db.collection(mid_collection).add(user_data)
        .then(function(docRef) {
            console.log(mid_collection + "Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    db.collection(replacement_mid_collection).add(user_data)
        .then(function(docRef) {
            console.log(replacement_mid_collection + "Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}


async function returning_mid() {
    document.body.innerHTML = ''
    d = document.createElement('div')
    d.innerHTML = "It looks like you have already attempted this test. Unfortunately, we can't allow users to take the test twice. Please contact us if you have any questions.<br><br>"
    d.style.margin = '20%'
    d.style.fontWeight = 'bold'
    document.body.append(d)
}


var end_preview = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    d.innerHTML = "This is the end of the preview. Unfortunately, we can't show you more than this. <br><br> We have to ask you to accept this study because we need to verify that you have not completed this survey before."
    d.style.margin = '20%'
    d.style.fontWeight = 'bold'
    document.body.append(d)
}

var ID = function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};


async function find_mid() {
    old_mids = await get_firebase_data(mid_collection, false)
    if (mID == undefined || mID == '') {
        console.warn('mid is null')
    } else if (old_mids.some(a => a.mid == mID) && mID != test_mID) {
        returning_mid(mID)
        return
    } else {
        uniquecode = 'se' + ID()
        user_data['code'] = uniquecode
        if (mID != test_mID && mID != undefined && mID != '') {
            save_mid()
        }
    }
}

async function choose_assigned_pattern_type() {
    assigned_types = []
    d = await get_firebase_data(mid_collection, false)
    for (i = 0; i < 5; i++) {
        num_of_this_type = d.filter(p => p['assigned_pattern_type'].includes(i + 2)).length
        assigned_types.push(num_of_this_type)
    }
    min_type = assigned_types.indexOf(Math.min(...assigned_types));
    min_type = min_type + 2;
    delete assigned_types[min_type - 2];
    min_type_2 = assigned_types.indexOf(Math.min.apply(null, assigned_types.filter(function(n) { return !isNaN(n); })));
    min_type_2 = min_type_2 + 2;
    chosen_patterns = [];
    chosen_patterns.push(1);
    chosen_patterns.push(min_type);
    chosen_patterns.push(min_type_2);

    return chosen_patterns
}

async function choose_pattern_order(chosen_patterns) {

    d = await get_firebase_data(mid_collection, false)
    company_pattern_1 = d.filter(p => p['company_pattern'] == chosen_patterns[0]).length
    population_pattern_1 = d.filter(p => p['population_pattern'] == chosen_patterns[0]).length
    crime_pattern_1 = d.filter(p => p['crime_pattern'] == chosen_patterns[0]).length

    company_pattern_2 = d.filter(p => p['company_pattern'] == chosen_patterns[1]).length
    population_pattern_2 = d.filter(p => p['population_pattern'] == chosen_patterns[1]).length
    crime_pattern_2 = d.filter(p => p['crime_pattern'] == chosen_patterns[1]).length


    if (company_pattern_1 <= population_pattern_1 && company_pattern_1 <= crime_pattern_1) {
        user_data['company_pattern'] = 1;
        if (population_pattern_2 <= crime_pattern_2) {
            user_data['population_pattern'] = chosen_patterns[1];
            user_data['crime_pattern'] = chosen_patterns[2];
        } else {
            user_data['crime_pattern'] = chosen_patterns[1];
            user_data['population_pattern'] = chosen_patterns[2];
        }
    } else if (population_pattern_1 <= company_pattern_1 && population_pattern_1 <= crime_pattern_1) {
        user_data['population_pattern'] = 1;
        if (company_pattern_2 <= crime_pattern_2) {
            user_data['company_pattern'] = chosen_patterns[1];
            user_data['crime_pattern'] = chosen_patterns[2];
        } else {
            user_data['crime_pattern'] = chosen_patterns[1];
            user_data['company_pattern'] = chosen_patterns[2];
        }
    } else {
        user_data['crime_pattern'] = 1;
        if (company_pattern_2 <= population_pattern_2) {
            user_data['company_pattern'] = chosen_patterns[1];
            user_data['population_pattern'] = chosen_patterns[2];
        } else {
            user_data['population_pattern'] = chosen_patterns[1];
            user_data['company_pattern'] = chosen_patterns[2];
        }
    }

    for (i = 0; i < 3; i++) {
        if (questions_shuffle[i]['dataset'] == 'company') {
            questions_shuffle[i]['pattern'] = user_data['company_pattern'];
        }
        if (questions_shuffle[i]['dataset'] == 'population') {
            questions_shuffle[i]['pattern'] = user_data['population_pattern'];
        }
        if (questions_shuffle[i]['dataset'] == 'crime') {
            questions_shuffle[i]['pattern'] = user_data['crime_pattern'];
        }
    }


    var record = []
    record.push(questions_shuffle[0]['dataset'])
    record.push(questions_shuffle[0]['pattern'])
    record.push(questions_shuffle[1]['dataset'])
    record.push(questions_shuffle[1]['pattern'])
    record.push(questions_shuffle[2]['dataset'])
    record.push(questions_shuffle[2]['pattern'])
    return record
}


function shuffle_question(questions) {
    var dice = Math.floor(Math.random() * 6)
    if (dice == 0) {
        questions_shuffle.push(questions[0])
        questions_shuffle.push(questions[1])
        questions_shuffle.push(questions[2])
    } else if (dice == 1) {
        questions_shuffle.push(questions[0])
        questions_shuffle.push(questions[2])
        questions_shuffle.push(questions[1])
    } else if (dice == 2) {
        questions_shuffle.push(questions[1])
        questions_shuffle.push(questions[0])
        questions_shuffle.push(questions[2])
    } else if (dice == 3) {
        questions_shuffle.push(questions[1])
        questions_shuffle.push(questions[2])
        questions_shuffle.push(questions[0])
    } else if (dice == 4) {
        questions_shuffle.push(questions[2])
        questions_shuffle.push(questions[1])
        questions_shuffle.push(questions[0])
    } else if (dice == 5) {
        questions_shuffle.push(questions[2])
        questions_shuffle.push(questions[0])
        questions_shuffle.push(questions[1])
    }
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

var progress_bar = (progress, color) => {

    bar = document.createElement('div')
    bar.style.position = 'absolute'
    bar.style.top = '0px'
    bar.style.height = '10px'
    bar.className = 'timeclass'
    bar.id = 'timebar'
    bar.style.width = Math.round(progress) + 'px'
    bar.style.backgroundColor = color
    document.body.append(bar)

    d = document.createElement('div')
    d.style.position = 'absolute'
    d.className = 'timeclass'
    d.style.top = '1vh'
    d.style.left = '1vh'
    d.style.color = color
    d.innerHTML = 'story number: ' + (1 + current_question) + '/' + (questions.length)
    document.body.append(d)

    d = document.createElement('div')
    d.id = 'timediv'
    d.className = 'timeclass'
    d.style.position = 'absolute'
    d.style.top = '4%'
    d.style.left = '1vh'
    d.style.color = color
    document.body.append(d)
}


var next_question = () => {

    clickable_selected_answer = null
    clickable_selected_answer_event = null

    cur_start_time = new Date()

    document.body.innerHTML = ''
    error = undefined
    progress_bar((current_question + 1) * window.innerWidth / questions_shuffle.length, '#0000cc')
    gen_question(questions_shuffle[current_question]['text'], questions_shuffle[current_question]['pattern'], questions_shuffle[current_question]['dataset'])

}


var init_questions = () => {
    document.body.innerHTML = ''
    timediv = document.createElement('div')
    timediv.id = 'timediv'
    for (i in questions_shuffle) questions_shuffle[i]['original_index'] = i
    next_question()
}

questions = [{
        'text': 'The Life of Company X',
        'dataset': 'company',
    },
    {
        'text': 'The Population of City Y',
        'dataset': 'population',
    },
    {
        'text': 'One Day of Z',
        'dataset': 'crime',
    },

]

async function init() {

    init_firebase()
    mID = getUrlVars()['PROLIFIC_PID'];
    init_timestamp = Date.now()
    user_data['timestamp_start'] = init_timestamp
    user_data['mid'] = mID
    shuffle_question(questions)
    user_data['assigned_pattern_type'] = await choose_assigned_pattern_type()
    user_data['record'] = await choose_pattern_order(chosen_patterns)
    user_data['company' + '_replay'] = 0
    user_data['population' + '_replay'] = 0
    user_data['crime' + '_replay'] = 0


    window.addEventListener("beforeunload", function(e) {
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome
    });

    init_landing_page()
}

init()