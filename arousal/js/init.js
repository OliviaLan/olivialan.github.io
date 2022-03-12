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
    //一个人测多少张图
testNum = 20

//要提前在firebase里新建几个存数据的文件夹-collection
mid_collection = 'ID_arousal'
complete_collection = 'result_arousal'
incomplete_collection = 'result_incomplete_arousal'

// replacement_mid_collection = 'ID_replacement'
// experiment_replacement = 'pilot_test1_replacement'

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
        //这里放submit之后的跳转链接
    d.innerHTML = '<p>Thank you for participating! <br>Please <a href = "https://app.prolific.co/submissions/complete?cc=4D52EE3F" >click here to completed your study.</a></p>'
        // 生成一个独有的随机码
        // d2 = document.createElement('div')
        // d2.innerHTML = uniquecode
        // d2.style.fontSize = 'large'
        // d2.style.fontWeight = 'bold'

    document.body.append(d)
        // document.body.append(d2)


    //实验人员在本地下载
    //get_firebase_data(complete_collection, true)
    // get_firebase_data(incomplete_collection, true)
    // get_firebase_data(mid_collection, true)

    // 最后提交完成才会生成final，包括做题的和问卷的结果
    final_user_data = {}
    for (elem of Object.keys(user_data)) {
        if (user_data[elem] != undefined) {
            final_user_data[elem] = user_data[elem]
        }
    }

    if (PRODUCTION && mID != test_mID) {
        console.log('finalize')
        db.collection(complete_collection).add(final_user_data)
            .then(function(docRef) {
                console.log(complete_collection + "Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        // db.collection(experiment_replacement).add(final_user_data)
        //     .then(function(docRef) {
        //         console.log(experiment_replacement + "Document written with ID: ", docRef.id);
        //     })
        //     .catch(function(error) {
        //         console.error("Error adding document: ", error);
        //     });

    }
}


// var init_warning = () => {
//     document.body.innerHTML = ''
//     d = document.createElement('div')
//     d.innerHTML = 'Attention: do not close or reload the page after this step. <br>If you do, the study will end without being finished.'
//     d.style.fontWeight = 'bold'
//     d.style.textAlign = 'center'
//     d.style.fontSize = '20px'
//     d.style.marginTop = '20%'
//     d.style.marginLeft = '20%'
//     d.style.marginRight = '20%'
//     d.style.color = 'red'
//     document.body.append(d)

//     btn = document.createElement('button')
//     btn.innerHTML = 'Start the HIT'
//     btn.style.margin = '5%'
//     btn.style.fontSize = 'large'
//         // btn.className = 'button f_button'
//     btn.onclick = init_questions
//         // btn.onclick = init_tutorial
//     document.body.append(btn)
// }


var get_firebase_data = (collection = complete_collection, download = true) => {
    return firebase.firestore().collection(collection)
        .get()
        .then(function(querySnapshot) {
            data = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
            filename = 'results.json'

            // for (elem of data) {
            //     for (prop of Object.keys(form_properties)) {
            //         if (elem[prop] == undefined) elem[prop] = 'null'
            //     }
            // }

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

    // db.collection(replacement_mid_collection).add(user_data)
    //     .then(function(docRef) {
    //         console.log(replacement_mid_collection + "Document written with ID: ", docRef.id);
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });
}


async function returning_mid() {
    document.body.innerHTML = ''
    d = document.createElement('div')
    d.innerHTML = "It looks like you have already attempted this test. Unfortunately, we can't allow users to take the test twice. Please contact us if you have any questions.<br><br>"
    d.style.margin = '20%'
    d.style.fontWeight = 'bold'
    document.body.append(d)

    // incomplete = await get_firebase_data(incomplete_collection, false)
    // complete = await get_firebase_data(complete_collection, false)

    //在现有的数据里去查，此人是否做完了/做了多少
    //做完：
    // if (complete.find(a => a['mid'] == mID)) {
    // elem = complete.find(a => a['mid'] == mID)
    // d.innerHTML += 'You got ' + elem['num_correct_answers'] + '/' + questions.length + ' correct answers. <br><br> '
    // d.innerHTML += 'Please copy and paste the following code in Mechanical Turk: <br>' + incomplete.find(a => a['mid'] == mID)['code']
    //else d.innerHTML += 'Unfortunately, your number of correct answers in the test was insufficient to respect the conditions for passing the test.'

    // }
    //没做完，做了一部分（也给钱）：
    // else if (incomplete.find(a => a['mid'] == mID)) {
    // max_answers = 0
    // for (elem of incomplete.filter(a => a['mid'] == mID)) {
    //     if (parseFloat(elem['num_correct_answers']) > max_answers) max_answers = parseFloat(elem['num_correct_answers'])
    // }
    // d.innerHTML += 'You got ' + max_answers + '/' + questions.length + ' correct answers. <br><br> '

    // d.innerHTML += 'Please copy and paste the following code in Mechanical Turk: <br>' + incomplete.find(a => a['mid'] == mID)['code']
    //else d.innerHTML += 'Unfortunately, your number of correct answers in the test was insufficient to respect the conditions for passing the test.'
    // }
}


var end_preview = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    d.innerHTML = "This is the end of the preview. Unfortunately, we can't show you more than this. <br><br> We have to ask you to accept this study because we need to verify that you have not completed this survey before."
    d.style.margin = '20%'
    d.style.fontWeight = 'bold'
    document.body.append(d)
}

// 在consent页，查询它是否有mturk id，以及是否已经做过了
async function find_mid() {
    old_mids = await get_firebase_data(mid_collection, false)
        // replacement_mids = await get_firebase_data(replacement_mid_collection, false)
    if (mID == undefined || mID == '') {
        console.warn('mid is null')
    }
    //发现这个账号已经在数据记录里了（test_mID不会被视为重复，可以通行），执行函数显示其记录
    else if (old_mids.some(a => a.mid == mID) && mID != test_mID) {
        returning_mid(mID)
        return
    } else {
        //新账号，生成一个独有的code并存储。mturk做完测试需要给用户一个独特的code，让用户输进去。
        uniquecode = 'se' + ID()
        user_data['code'] = uniquecode
            //但是test_mID的数据不会被存储
        if (mID != test_mID && mID != undefined && mID != '') {
            save_mid()
        }
    }
}




function generateRan() {
    //从1-max生成整数
    var max = questions.length;
    var random = [];
    for (var i = 0; i < max; i++) {
        var temp = Math.ceil(Math.random() * max);
        if (random.indexOf(temp) == -1) {
            random.push(temp);
        } else
            i--;
    }
    return (random)
}


//有些图被看得很少的，专门抓出来看
function generateSelected() {
    console.log("patch5")
    var selection = [25, 25, 25, 25, 66, 76, 77, 83, 88, 103, 122, 142, 152, 157, 177, 197, 198, 208, 220, 222, 227, 231, 242, 251];
    var selected = [];
    for (var i = 0; i < testNum; i++) {
        var temp = Math.floor(Math.random() * selection.length);
        if (selected.indexOf(selection[temp]) == -1) {
            selected.push(selection[temp]);
        } else
            i--;
    }
    return (selected)
}



async function init() {
    //连接到数据库
    init_firebase()
        //记录mturk id
    mID = getUrlVars()['PROLIFIC_PID'];
    //开始时间
    init_timestamp = Date.now()
    user_data['timestamp_start'] = init_timestamp
    user_data['mid'] = mID
        // assigned_pics = generateRan().slice(0, testNum)
    assigned_pics = generateSelected()
    user_data['assigned_pics'] = assigned_pics
    for (i = 0; i < testNum; i++) {
        questions_shuffle.push(questions[assigned_pics[i] - 1])
    }

    window.addEventListener("beforeunload", function(e) {
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome
    });

    //页面跳转
    // init_landing_page()
    init_questions()
}

init()