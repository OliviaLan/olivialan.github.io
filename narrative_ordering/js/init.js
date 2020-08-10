tutorial_slides = []
tutorial_length = 10
current_slide = 0
current_question = 0
randomize = true
allowed_time_in_minutes = 60
user_answers = []
user_data = {}
chosen_patterns = []
time_out = false
questions_shuffle = []

//要提前在firebase里新建几个存数据的文件夹-collection
mid_collection = 'mID'
complete_collection = 'test_result'
incomplete_collection = 'test_result_incomplete'

replacement_mid_collection = 'mID_replacement'
experiment_replacement = 'pilot_test1_replacement'

test_mID = "test_mid"

total_num_participants = 108

var tutorial_start_time, test_start_time;

var width = window.innerWidth - 100;
var height = window.innerHeight * 0.95;

var shapes = ['hline', 'line', 'circle', 'spiral']
var datasets = ['plants', 'history', 'schedule']
    // var question_types = [0, 1, 2, 3]
var datalimit = 12

var curems = 0.8
var curdatalimit = 12

var clickable_selected_answer = null

PRODUCTION = true

// --- LAST PAGE
// var count_correct_answers = () => {
//     let res = 0

//     if (user_answers == undefined || user_answers.length == 0) return 0

//     for (answer of user_answers) {
//         if (questions.find(q => q.ques_index == answer.ques_index)['answer'] == answer['answer']) res += 1
//     }
//     return res
// }

var init_end = () => {
    user_data['answers'] = user_answers

    document.body.innerHTML = ''
    d = document.createElement('div')
    d.style.margin = '10%'
    d.style.marginBottom = '1%'
        // numright = count_correct_answers()
        // user_data['num_correct_answers'] = numright
    d.innerHTML = 'Thank you for participating. <br>Please copy and paste the following code in Mechanical Turk to get paid: <br>'
        // 生成一个独有的随机码
    d2 = document.createElement('div')
    d2.innerHTML = uniquecode
    d2.style.fontSize = 'large'
    d2.style.fontWeight = 'bold'

    document.body.append(d)
    document.body.append(d2)

    console.log('finalize')
        // 最后提交完成才会生成final，包括做题的和问卷的结果
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


var init_warning = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    d.innerHTML = 'Attention: do not close or reload the page after this step. <br>If you do, the HIT will end without being finished.'
    d.style.fontWeight = 'bold'
    d.style.textAlign = 'center'
    d.style.fontSize = '20px'
    d.style.marginTop = '20%'
    d.style.marginLeft = '20%'
    d.style.marginRight = '20%'
    d.style.color = '#c00'
    document.body.append(d)

    btn = document.createElement('button')
    btn.innerHTML = 'Start the HIT'
    btn.style.margin = '5%'
    btn.style.fontSize = 'large'
        // btn.className = 'button f_button'
    btn.onclick = init_questions
        // btn.onclick = init_tutorial
    document.body.append(btn)
}


var get_firebase_data = (collection = complete_collection, download = true) => {
    return firebase.firestore().collection(collection)
        .get()
        .then(function(querySnapshot) {
            data = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
            filename = 'results.json'

            for (elem of data) {
                for (prop of Object.keys(form_properties)) {
                    if (elem[prop] == undefined) elem[prop] = 'null'
                }
            }

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

// async function time_run_out() {
//     document.body.innerHTML = ''
//     d = document.createElement('div')
//     d.innerHTML = 'Your time for completing the experiment has run out. <br><br> You got ' + count_correct_answers() + '/' + (questions.length / 4) + ' correct answers. <br><br> '
//     d.style.margin = '20%'
//     d.style.fontWeight = 'bold'

//     old_mids = await get_firebase_data(mid_collection, false)
//     code = old_mids.find(m => m['mid'] == mID)['code']

//     d.innerHTML += 'Please copy and paste the following code in Mechanical Turk: <br>' + code
//         //else d.innerHTML += 'Unfortunately, your number of correct answers in the test was insufficient to respect the conditions for passing the test.'

//     document.body.append(d)
// }

var init_firebase = () => {

        // Initialize Firebase
        // 与我的firebase进行连接
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
    }
    // --- END LAST PAGE

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

    incomplete = await get_firebase_data(incomplete_collection, false)
    complete = await get_firebase_data(complete_collection, false)

    //在现有的数据里去查，此人是否做完了/做了多少
    //做完：
    if (complete.find(a => a['mid'] == mID)) {
        // elem = complete.find(a => a['mid'] == mID)
        // d.innerHTML += 'You got ' + elem['num_correct_answers'] + '/' + questions.length + ' correct answers. <br><br> '
        d.innerHTML += 'Please copy and paste the following code in Mechanical Turk: <br>' + incomplete.find(a => a['mid'] == mID)['code']
            //else d.innerHTML += 'Unfortunately, your number of correct answers in the test was insufficient to respect the conditions for passing the test.'

    }
    //没做完，做了一部分（也给钱）：
    else if (incomplete.find(a => a['mid'] == mID)) {
        // max_answers = 0
        // for (elem of incomplete.filter(a => a['mid'] == mID)) {
        //     if (parseFloat(elem['num_correct_answers']) > max_answers) max_answers = parseFloat(elem['num_correct_answers'])
        // }
        // d.innerHTML += 'You got ' + max_answers + '/' + questions.length + ' correct answers. <br><br> '

        d.innerHTML += 'Please copy and paste the following code in Mechanical Turk: <br>' + incomplete.find(a => a['mid'] == mID)['code']
            //else d.innerHTML += 'Unfortunately, your number of correct answers in the test was insufficient to respect the conditions for passing the test.'
    }
}


var end_preview = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    d.innerHTML = "This is the end of the preview. Unfortunately, we can't show you more than this. <br><br> We have to ask you to accept this HIT because we need to verify that you have not completed this survey before. According to MTurk support, accepting and then returning HITs does not affect your account or your eligibility to complete other HITs. <br> <br> <br> If you did not choose to preview the test, you may be seeing this message because of an issue with your Mechanical Turk ID. Try opening the link from the Mechanical Turk page again."
    d.style.margin = '20%'
    d.style.fontWeight = 'bold'
    document.body.append(d)
}

// 在consent页，查询它是否有mturk id，以及是否已经做过了
async function find_mid() {
    old_mids = await get_firebase_data(mid_collection, false)
    replacement_mids = await get_firebase_data(replacement_mid_collection, false)
    if (mID == undefined || mID == '') {
        console.warn('mid is null')
    }
    //发现这个账号已经在数据记录里了（test_mID不会被视为重复，可以通行），执行函数显示其记录
    else if (old_mids.some(a => a.mid == mID) && mID != test_mID) {
        returning_mid(mID)
        return
    } else {
        //新账号，生成一个独有的code并存储
        uniquecode = 'se' + ID()
        user_data['code'] = uniquecode
            //但是test_mID的数据不会被存储
        if (mID != test_mID && mID != undefined && mID != '') {
            save_mid()
        }
    }
}

async function choose_assigned_pattern_type() {
    assigned_types = []
    d = await get_firebase_data(mid_collection, false)
        //一共六种pattern，i=5
    for (i = 0; i < 5; i++) {
        num_of_this_type = d.filter(p => p['assigned_pattern_type'].includes(i + 2)).length
        assigned_types.push(num_of_this_type)
    }
    min_type = assigned_types.indexOf(Math.min(...assigned_types));
    min_type = min_type + 2;
    delete assigned_types[min_type - 2];
    min_type_2 = assigned_types.indexOf(Math.min.apply(null, assigned_types.filter(function(n) { return !isNaN(n); })));
    min_type_2 = min_type_2 + 2;
    // delete assigned_types[min_type_2 - 2];
    // min_type_3 = assigned_types.indexOf(Math.min.apply(null, assigned_types.filter(function(n) { return !isNaN(n); })));
    // min_type_3 = min_type_3 + 2;
    chosen_patterns = [];
    chosen_patterns.push(1);
    chosen_patterns.push(min_type);
    chosen_patterns.push(min_type_2);
    // chosen_patterns.push(min_type_3);

    // 包含chronological和其他任意三个pattern
    return chosen_patterns
}

async function choose_pattern_order(chosen_patterns) {
    // console.log(chosen_patterns.sort(function() { return Math.random() - 0.5; }))
    history_assigned_types = [];
    stock_assigned_types = [];
    c_assigned_types = [];
    // d_assigned_types = []
    // pattern_1 = 1
    // pattern_2 = chosen_patterns[1]
    // pattern_3 = chosen_patterns[2]
    // pattern_4 = chosen_patterns[3]
    // chosen_patterns_copy = chosen_patterns.slice(0, 2)

    d = await get_firebase_data(mid_collection, false)
    history_pattern_1 = d.filter(p => p['history_pattern'] == chosen_patterns[0]).length
    population_pattern_1 = d.filter(p => p['population_pattern'] == chosen_patterns[0]).length
    diary_pattern_1 = d.filter(p => p['diary_pattern'] == chosen_patterns[0]).length

    history_pattern_2 = d.filter(p => p['history_pattern'] == chosen_patterns[1]).length
    population_pattern_2 = d.filter(p => p['population_pattern'] == chosen_patterns[1]).length
    diary_pattern_2 = d.filter(p => p['diary_pattern'] == chosen_patterns[1]).length


    if (history_pattern_1 <= population_pattern_1 && history_pattern_1 <= diary_pattern_1) {
        user_data['history_pattern'] = 1;
        if (population_pattern_2 <= diary_pattern_2) {
            user_data['population_pattern'] = chosen_patterns[1];
            user_data['diary_pattern'] = chosen_patterns[2];
        } else {
            user_data['diary_pattern'] = chosen_patterns[1];
            user_data['population_pattern'] = chosen_patterns[2];
        }
        // if (questions_shuffle[0]['dataset'] == 'history') {
        //     questions_shuffle[0]['pattern'] = 1;
        //     questions_shuffle[1]['pattern'] = chosen_patterns[1];
        // } else {
        //     questions_shuffle[1]['pattern'] = 1;
        //     questions_shuffle[0]['pattern'] = chosen_patterns[1];
        // }
    } else if (population_pattern_1 <= history_pattern_1 && population_pattern_1 <= diary_pattern_1) {
        user_data['population_pattern_1'] = 1;
        if (history_pattern <= diary_pattern_2) {
            user_data['history_pattern'] = chosen_patterns[1];
            user_data['diary_pattern'] = chosen_patterns[2];
        } else {
            user_data['diary_pattern'] = chosen_patterns[1];
            user_data['history_pattern'] = chosen_patterns[2];
        }
    } else {
        user_data['diary_pattern'] = 1;
        if (history_pattern <= population_pattern_1) {
            user_data['history_pattern'] = chosen_patterns[1];
            user_data['population_pattern_1'] = chosen_patterns[2];
        } else {
            user_data['population_pattern_1'] = chosen_patterns[1];
            user_data['history_pattern'] = chosen_patterns[2];
        }
    }

    for (i = 0; i < 3; i++) {
        if (questions_shuffle[i]['dataset'] == 'history') {
            questions_shuffle[i]['pattern'] = user_data['history_pattern'];
        }
        if (questions_shuffle[i]['dataset'] == 'population') {
            questions_shuffle[i]['pattern'] = user_data['population_pattern'];
        }
        if (questions_shuffle[i]['dataset'] == 'diary') {
            questions_shuffle[i]['pattern'] = user_data['diary_pattern'];
        }
    }


    // if (history_pattern_1 <= population_pattern_1) {
    //     user_data['history_pattern'] = 1;
    //     user_data['population_pattern'] = chosen_patterns[1];
    //     if (questions_shuffle[0]['dataset'] == 'history') {
    //         questions_shuffle[0]['pattern'] = 1;
    //         questions_shuffle[1]['pattern'] = chosen_patterns[1];
    //     } else {
    //         questions_shuffle[1]['pattern'] = 1;
    //         questions_shuffle[0]['pattern'] = chosen_patterns[1];
    //     }
    // } else {
    //     user_data['history_pattern'] = chosen_patterns[1];
    //     user_data['population_pattern'] = 1
    //     if (questions_shuffle[0]['dataset'] == 'stock') {
    //         questions_shuffle[0]['pattern'] = 1;
    //         questions_shuffle[1]['pattern'] = chosen_patterns[1];

    //     } else {
    //         questions_shuffle[1]['pattern'] = 1;
    //         questions_shuffle[0]['pattern'] = chosen_patterns[1];

    //     }
    // }


    // for (i = 0; i < 2; i++) {
    //     num_of_this_type = d.filter(p => p['history_pattern'] == chosen_patterns_copy[i]).length
    //     history_assigned_types.push(num_of_this_type)
    // }
    // history_min_type = history_assigned_types.indexOf(Math.min(...history_assigned_types));
    // if (questions_shuffle[0]['dataset'] == 'history') {
    //     questions_shuffle[0]['pattern'] = chosen_patterns_copy[history_min_type];
    // } else {
    //     questions_shuffle[1]['pattern'] = chosen_patterns_copy[history_min_type];
    // }
    // user_data['history_pattern'] = chosen_patterns_copy[history_min_type];


    // chosen_patterns_copy.splice(history_min_type, 1)

    // for (i = 0; i < 1; i++) {
    //     num_of_this_type = d.filter(p => p['population_pattern'] == chosen_patterns_copy[i]).length
    //     stock_assigned_types.push(num_of_this_type)
    // }

    // stock_min_type = stock_assigned_types.indexOf(Math.min(...stock_assigned_types));
    // if (questions_shuffle[0]['dataset'] == 'stock') {
    //     questions_shuffle[0]['pattern'] = chosen_patterns_copy[stock_min_type];

    // } else {
    //     questions_shuffle[1]['pattern'] = chosen_patterns_copy[stock_min_type];
    // }
    // user_data['population_pattern'] = chosen_patterns_copy[stock_min_type];

    // chosen_patterns_copy.splice(stock_min_type, 1)

    // for (i = 0; i < 2; i++) {
    //     num_of_this_type = d.filter(p => p['diary_pattern'] == chosen_patterns_copy[i]).length
    //     c_assigned_types.push(num_of_this_type)
    // }

    // c_min_type = c_assigned_types.indexOf(Math.min(...c_assigned_types));
    // questions[2]['pattern'] = chosen_patterns_copy[c_min_type];

    // chosen_patterns_copy.splice(c_min_type, 1);

    // questions[3]['pattern'] = chosen_patterns_copy[0];

    var record = []
    record.push(questions_shuffle[0]['dataset'])
    record.push(questions_shuffle[0]['pattern'])
    record.push(questions_shuffle[1]['dataset'])
    record.push(questions_shuffle[1]['pattern'])
    record.push(questions_shuffle[2]['dataset'])
    record.push(questions_shuffle[2]['pattern'])
        // pattern_order.push(questions[2]['pattern'])
        // pattern_order.push(questions[3]['pattern'])
    return record
}

// async function choose_assigned_question_type() {
//     assigned_types = []
//     d = await get_firebase_data(mid_collection, false)
//     for (i = 0; i < 4; i++) {
//         num_of_this_type = d.filter(p => p['assigned_question_type'] == i + 1).length
//         assigned_types.push(num_of_this_type)
//     }
//     //读取数据库，看哪种layout现在是最少的，返回它的index
//     min_type = assigned_types.indexOf(Math.min(...assigned_types))
//     return min_type + 1
// }


// async function choose_latin_square_index() {
//     assigned_indices = []
//     d = await get_firebase_data(mid_collection, false)
//         //从数据库中找出和这个用户que type一样的数据
//     d = d.filter(p => p['assigned_question_type'] == user_data['assigned_question_type'])
//         //看数据库中的12种latin-square index的频次，找出最少的那种
//     for (i = 0; i < 12; i++) {
//         num_of_this_type = d.filter(p => p['latin_square_index'] == i).length
//         assigned_indices.push(num_of_this_type)
//     }

//     min_index = assigned_indices.indexOf(Math.min(...assigned_indices))

//     console.log(user_data['assigned_question_type'], min_index, assigned_indices)

//     return min_index
// }

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



async function init() {
    //连接到数据库
    init_firebase()
        //记录mturk id
    mID = getUrlVars()['MID'];
    //开始时间
    init_timestamp = Date.now()
    user_data['timestamp_start'] = init_timestamp
    user_data['mid'] = mID
    shuffle_question(questions)
        //随机选择一种layout
        // user_data['assigned_question_type'] = await choose_assigned_question_type()
        //找到question里的这种layout，并随机排序
        // user_data['latin_square_index'] = await choose_latin_square_index()
    user_data['assigned_pattern_type'] = await choose_assigned_pattern_type()
    user_data['record'] = await choose_pattern_order(chosen_patterns)
    user_data['history' + '_replay'] = 0
    user_data['population' + '_replay'] = 0

    // user_data['history_pattern'] = user_data['pattern_order'][0]
    // user_data['story_pattern'] = user_data['pattern_order'][1]
    // user_data['diary_pattern'] = user_data['pattern_order'][2]
    // user_data['d_pattern'] = user_data['pattern_order'][3]

    window.addEventListener("beforeunload", function(e) {
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome
    });

    //页面跳转
    // init_questions()
    //init_tutorial()
    init_landing_page()
        //init_consent()
        //init_survey()
}

init()