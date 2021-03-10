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
mid_collection = 'ID_animation'
complete_collection = 'result_animation'
incomplete_collection = 'result_incomplete_animation'

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
    d.innerHTML = '<p>Thank you for participating. <br>Please <a href = "https://app.prolific.co/submissions/complete?cc=4C20487C" >click here to completed your study.</a></p>'
        // 生成一个独有的随机码
        // d2 = document.createElement('div')
        // d2.innerHTML = uniquecode
        // d2.style.fontSize = 'large'
        // d2.style.fontWeight = 'bold'

    document.body.append(d)
        // document.body.append(d2)

    console.log('finalize')

    //实验人员在本地下载
    // get_firebase_data(complete_collection, true)
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
        //新账号，生成一个独有的code并存储
        uniquecode = 'se' + ID()
        user_data['code'] = uniquecode
            //但是test_mID的数据不会被存储
        if (mID != test_mID && mID != undefined && mID != '') {
            save_mid()
        }
    }
}


function generateStory() {
    //从1-max生成整数
    var random = [];
    for (var i = 0; i < 26; i++) {
        var temp = Math.ceil(Math.random() * 26);
        if (random.indexOf(temp + 1) == -1) {
            random.push(temp + 1);
        } else
            i--;
    }
    return (random)
}

function shuffle(array) {
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


function generateAnimation(assigned_stories) {
    //在10个故事里面选择一个应用baseline动画
    var baseline_dice = Math.ceil(Math.random() * 10);
    var baseline_story
    for (d = 0; d < questions.length; d++) {
        if (questions[d]['story_id'] == "story" + assigned_stories[baseline_dice - 1] && questions[d]['animation'] == "baseline") {
            baseline_story = questions[d]
        }
    }
    questions_shuffle.push(baseline_story)

    //先copy一下选到的故事，然后去掉应用baseline的故事
    var other_stories = JSON.parse(JSON.stringify(assigned_stories));
    other_stories.splice(baseline_dice - 1, 1);

    //对于剩下的9个故事，依次找出它们各自的所有的kinetic动画
    for (i = 0; i < 9; i++) {
        // console.log(assigned_stories[i])
        var animations = [];
        for (j = 0; j < questions.length; j++) {
            if (questions[j]['story_id'] == "story" + other_stories[i]) {
                animations.push(questions[j])
            }
        }
        //在这些动画里随机选一个
        var temp = Math.ceil(Math.random() * animations.length) - 1;
        var animation_selected = animations[temp]
            //第一个故事直接放入        
        if (questions_shuffle.length == 0) {
            questions_shuffle.push(animation_selected);
        }
        //对于此后的故事，需要判断选到的vis动画是否重复
        else {
            counter = 0
            for (h = 0; h < questions_shuffle.length; h++) {
                if (questions_shuffle[h]['vis'] == animation_selected['vis'] && questions_shuffle[h]['animation'] == animation_selected['animation']) {
                    //出现了同样的vis动画，只是故事内容不同，例如故事1的bounce和故事4的bounce，都是柱状图的bounce
                    console.log('same animated vis!')
                    console.log(questions_shuffle[h], animation_selected)
                        //因此，需要排除掉刚才选择的index后，为它选择一个另外的动画
                    var animation_selected_index = Array.apply(null, { length: animations.length }).map(Number.call, Number)
                    animation_selected_index.splice(temp, 1)
                    var temp_new = animation_selected_index[Math.floor(Math.random() * animation_selected_index.length)]
                        //把新选择的动画放入问题列表
                    questions_shuffle.push(animations[temp_new]);
                    console.log(animations[temp_new]);
                } else {
                    //如果没有出现重复的vis动画，则计数器加一
                    counter++
                }
            }
            //当计数器等于问题列表长度，说明这个vis动画和此前的动画都没有重复，可以放入
            if (counter == questions_shuffle.length) {
                questions_shuffle.push(animation_selected);
            }
        }
    }
    shuffle(questions_shuffle)
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
    assigned_stories = generateStory().slice(0, 10)
        //从question里随机挑
        // assigned_pics = generateRan().slice(0, 10)
        //从指定的list里随机挑
        // assigned_pics = generateSelected()
    user_data['assigned_stories'] = assigned_stories
    generateAnimation(assigned_stories)
        // for (i = 0; i < 10; i++) {
        //     questions_shuffle.push(questions[assigned_stories[i] - 1])
        // }

    window.addEventListener("beforeunload", function(e) {
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome
    });

    //页面跳转
    init_landing_page()
}

init()