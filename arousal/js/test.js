//初始分数
var samInitialScore = 0.5

function inputListener() {
    // debugger;
    //$('.ui-slider-handle ui-btn ui-shadow')[0].click(function() { updateScore(); return false; });
    document.getElementsByClassName('ui-slider-handle ui-btn ui-shadow')[0].addEventListener("mouseup", function() { updateArousalScore() })
    document.getElementsByClassName('ui-slider-handle ui-btn ui-shadow')[1].addEventListener("mouseup", function() { updatePleasureScore() })
}

//拖动条导致上方显示的数字更新
function updatePleasureScore() {
    pleasure = document.getElementById('AS-pleasure').nextSibling.children[0].getAttribute("aria-valuenow")
    document.getElementById('pleasure_score').innerHTML = 'Move the slider to rate your level of Pleasure: ' + pleasure
}

function updateArousalScore() {
    arousal = document.getElementById('AS-arousal').nextSibling.children[0].getAttribute("aria-valuenow")
    document.getElementById('arousal_score').innerHTML = 'Move the slider to rate your level of Arousal: ' + arousal
}


//隐藏介绍页，显示图片页
function showPic() {
    document.getElementById("showPic").style.display = "block"
    document.getElementById("introPage").style.display = "none"
        //显示进度条
        // document.getElementsByClassName('timeclass')[0].style.display = "block"
        // document.getElementsByClassName('timeclass')[1].style.display = "block"
    $('html, body').animate({ scrollTop: 0 }, 'fast');
}


function save_answer() {

    pleasure = document.getElementById('AS-pleasure').nextSibling.children[0].getAttribute("aria-valuenow")
    arousal = document.getElementById('AS-arousal').nextSibling.children[0].getAttribute("aria-valuenow")

    preference_like = Array.prototype.slice.call(document.getElementsByClassName('preference_like'))
        // preference_share = Array.prototype.slice.call(document.getElementsByClassName('preference_share'))


    var counter = 0

    for (var l in preference_like) {
        if (preference_like[l].checked == true && document.getElementById('reason').value != '') {
            // console.log('finished')
            new_answer = {
                'pleasure': pleasure,
                'arousal': arousal,
                'pic_id': questions_shuffle[current_question]['id'],
                'reason': document.getElementById('reason').value,
                'preference_like': preference_like[l].value,
                // 'preference_share': preference_share[s].value,
            }
            user_answers.push(new_answer)
            user_data['answers'] = user_answers
                // db.collection(incomplete_collection).add(user_data)
                // .then(involvementction(docRef) {
                //     console.log("Document written with ID: ", docRef.id);
                // })
                // .catch(involvementction(error) {
                //     console.error("Error adding document: ", error);
                // });

            //清空答案
            document.getElementById('reason').value = ''
            preference_like[l].checked = false
                // preference_share[s].checked = false
            document.getElementById('AS-pleasure').nextSibling.children[0].style = "left: 50%;"
            document.getElementById('AS-arousal').nextSibling.children[0].style = "left: 50%;"
            document.getElementById('AS-pleasure').nextSibling.children[0].setAttribute("aria-valuenow", "0.5")
            document.getElementById('AS-arousal').nextSibling.children[0].setAttribute("aria-valuenow", "0.5")
            document.getElementById('pleasure_score').innerHTML = 'Move the slider to rate your level of Pleasure: ' + samInitialScore
            document.getElementById('arousal_score').innerHTML = 'Move the slider to rate your level of Arousal: ' + samInitialScore

            errors = document.getElementsByClassName('error')
            while (errors.length > 0) {
                for (i = 0; i < errors.length; i++) {
                    errors[i].remove()
                }
            }

            //前进一张图，在原网页上把图替换掉
            if (current_question < questions_shuffle.length - 1) {
                current_question++
                $('html, body').animate({ scrollTop: 0 }, 'fast');
                //更新进度条
                // document.getElementsByClassName('timeclass')[0].style.width = Math.round((current_question + 1) * window.innerWidth / questions_shuffle.length) + "px"
                // document.getElementsByClassName('timeclass')[1].innerHTML = 'pic number: ' + (1 + current_question) + '/' + (questions_shuffle.length)
                document.getElementById("headline").innerHTML = 'Data Visualization #' + (current_question + 1) + '/20'
                document.getElementById("stimuli").src = './stimuli/' + questions_shuffle[current_question]['src']

            } else {
                // user_data['full_questions_time'] = Date.now() - init_timestamp
                init_survey()
            }

        } else {
            counter++
            if (counter == 5) {
                var error = document.createElement('div')
                error.className = "error"
                error.innerHTML = 'Please answer all the questions'
                error.style.color = 'red'
                d.append(error)
            }
        }

    }


}


function gen_pic() {


    document.body.innerHTML = ''

    intro = document.createElement('div')
    text = '<p style="text-align:center"><strong>What Makes A Data Visualization Design Emotional?</strong></p> <br> <p>Data visualization is the graphical representation of data. Although data itself is rational and objective, different design of data may trigger different subjective perceptions. In this study, we are interested in what design factors in data visualizations can trigger emotional feelings. You are going to view 20 different data visualizations randomly chosen from our corpus, rate emotions, and explain why. To prevent the influence of content, <strong style="color:red">we have blurred all the texts</strong> so that you can focus on design only. Here are some examples:</p><br><img width=100% src="images/examples.png"></img><br><br><p>To evaluate the emotions, you will use the following sliders: (1) <strong style="color:red">Level of arousal, an indicator that describes the intensity of emotion</strong>, ranging from "Sleepy" to "Wide awake", (2) <strong style="color:red">Level of pleasure, an indicator about how positive an emotion is</strong>, ranging from "Unhappy" to "Happy".</p><br><img width=100% src="images/tutorial.png"></img><br><br><p>The whole survey will last about 20 minutes. <strong>IRRELEVANT OR INCOMPLETE ANSWERS WILL NOT BE ACCEPTED. </strong>We encourage you to provide your answers as required clearly to help us distinguish qualified answers.</p> <p style="color:red"><strong>Attention: do not close or reload the page after this step. If you do, the study will end without being finished.</p>'
    intro.innerHTML = text
    intro.style.textAlign = 'left'
    intro.style.fontSize = 'large'
    intro.style.marginTop = '5%'
    intro.style.marginLeft = '15%'
    intro.style.marginRight = '15%'
    intro.setAttribute("id", "introPage")
    document.body.append(intro)


    intro_btn = document.createElement('button')
    intro_btn.innerHTML = 'Accept and Proceed'
        // btn.style.margin = '3%'
        // btn.style.class = 'large'
    intro_btn.style.width = "200px"
    intro_btn.style.margin = "2em auto"
    intro_btn.className = "begin"

    intro_btn.onclick = () => {
        find_mid()
        if (mID == undefined || mID == '' || mID == 'preview') end_preview()
            // else init_warning()
            // else init_survey()
            // else init_tutorial_1()
            //else init_questions()
            // else showPic()
        else init_survey()
    }

    intro.append(intro_btn)

    //顶部进度条
    // progress_bar((current_question + 1) * window.innerWidth / questions_shuffle.length, 'rgb(115, 183, 192)', 'test')


    d = document.createElement('div')
    d.style.textAlign = 'center'
    d.style.margin = '2%'
    d.setAttribute("id", "showPic")
    d.style.display = "none"
    document.body.append(d)
    d.innerHTML += '<h1 style="text-align: center" id="headline">Data Visualization #' + (current_question + 1) + '/20</h1>'
    d.innerHTML += '<br><br><img id = "stimuli" src =./stimuli_pilot/' + questions_shuffle[current_question]['src'] + ' style="width: 50%;"></img>'


    //----------rating-----------


    d.innerHTML += '<br><br><br><p><strong>1. Please rate the data visualization using BOTH the sliders. Do not think too much about it, just rate how you feel when watching it.</p><br>'

    sam = document.createElement('form');
    sam.style.textAlign = "center";
    // sam.className = "AffectiveSlider";
    sam.setAttribute("class", "AffectiveSlider");

    sam.innerHTML += '<p id="arousal_score">Move the slider to rate your level of Arousal: ' + samInitialScore + '</p>';
    arousal = document.createElement('div');
    arousal.className = "AScontainer arousal";
    arousal.innerHTML = ' <input type="range" name="AS-arousal" id="AS-arousal" value=".5" min="0" max="1" step=".01"><div class="ASintensityCue"></div></div>'
    sam.append(arousal);

    sam.innerHTML += '<p id="pleasure_score">Move the slider to rate your level of Pleasure: ' + samInitialScore + '</p>';
    pleasure = document.createElement('div');
    pleasure.className = "AScontainer pleasure";
    pleasure.innerHTML = '<input type="range" name="AS-pleasure" id="AS-pleasure" value=".5" min="0" max="1" step=".01"><div class="ASintensityCue"></div></div>'
    sam.append(pleasure);

    d.append(sam);


    d.innerHTML += '<br><br>'

    // -----------------reason--------------------


    d.innerHTML += '<p><strong>2. Please explain your ratings briefly:</p><br>'

    textarea = document.createElement('textarea')
    textarea.id = "reason"
    textarea.style.width = "500px"
    textarea.style.margin = "0 auto"


    d.append(textarea)

    d.innerHTML += '<br><br>'


    // -----------------preference 1--------------------
    d.innerHTML += '<p><strong>3. Do you like this data visualization?</strong></p>'
    d.innerHTML += '<br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "preference_like";
        r1.className = "r1 preference_like";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
    }

    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['Strongly dislike', 'Somewhat dislike', 'Neither like nor dislike', 'Somewhat like', 'Strongly like']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    // // -----------------preference 2--------------------
    // d.innerHTML += '<p><strong>4. I feel that I want to share this data visualization.</strong></p>'
    // d.innerHTML += '<br>'


    // for (var i = 1; i < 6; i++) {
    //     choice = document.createElement("span");
    //     choice.style.display = "inline-block";
    //     choice.style.width = "100px";
    //     choice.style.height = "20px";
    //     choice.style.textAlign = "center";
    //     r1 = document.createElement("input");
    //     r1.type = "radio";
    //     r1.name = "preference_share";
    //     r1.className = "r1 preference_share";
    //     r1.value = i;
    //     l1 = document.createElement("label");
    //     l1.for = i;
    //     l1.innerHTML = i;
    //     l1.className = "l1";
    //     choice.append(r1);
    //     choice.append(l1);
    //     d.append(choice)
    // }

    // d.innerHTML += '<br>'

    // likert = document.createElement('span');
    // likert.style.lineHeight = "20px";
    // d.append(likert);


    // for (i of['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree']) {
    //     scale = document.createElement('span')
    //     scale.style.display = "inline-block";
    //     scale.style.width = "100px";
    //     scale.style.verticalAlign = "top";
    //     scale.style.textAlign = "center";
    //     scale.innerHTML = i
    //     likert.append(scale)
    // }

    // d.innerHTML += '<br><br>'

    //去掉jquery里的样式。累死我了！
    $(".r1").css({ 'position': 'static' });
    $("#reason").removeClass()


    btn = document.createElement('button')
    if (current_question < questions_shuffle.length - 1) btn.innerHTML = 'Next Image'
    else btn.innerHTML = 'End Test'
        // btn.style.marginLeft = '45%'
    btn.style.margin = '2em auto'
    btn.style.width = '200px'
    btn.className = 'nextpic'
        // btn.style.display = 'block'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_answer()
    }
    d.append(btn)

    // $('document').ready(inputListener());

}

var init_questions = () => {
    // startTimer(allowed_time_in_minutes * 60);
    // test_start_time = new Date()
    document.body.innerHTML = ''

    timediv = document.createElement('div')
    timediv.id = 'timediv'
        //记录这个问题在原js里的顺序
        // for (i in questions_shuffle) questions_shuffle[i]['original_index'] = i
        //挑出符合task类型的12个问题，然后洗牌

    // if (randomize) questions = shuffle_constrained(questions, chosen_patterns)
    // if (randomize) questions = shuffle_constrained(questions.filter(q => q['question_type'] == user_data['assigned_question_type']))

    gen_pic()
}