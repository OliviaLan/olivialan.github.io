function save_answer() {

    pleasure = document.getElementById('AS-pleasure').nextSibling.children[0].getAttribute("aria-valuenow")
    arousal = document.getElementById('AS-arousal').nextSibling.children[0].getAttribute("aria-valuenow")

    preference_like = Array.prototype.slice.call(document.getElementsByClassName('preference_like'))
    preference_share = Array.prototype.slice.call(document.getElementsByClassName('preference_share'))


    var counter = 0

    for (var l in preference_like) {
        for (var s in preference_share) {
            if (preference_like[l].checked == true && preference_share[s].checked == true && document.getElementById('reason').value != '') {
                console.log('finished')
                new_answer = {
                    'pleasure': pleasure,
                    'arousal': arousal,
                    'pic_id': questions_shuffle[current_question]['id'],
                    'reason': document.getElementById('reason').value,
                    'preference_like': preference_like[l].value,
                    'preference_share': preference_share[s].value,
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
                preference_share[s].checked = false
                document.getElementById('AS-pleasure').nextSibling.children[0].style = "left: 50%;"
                document.getElementById('AS-arousal').nextSibling.children[0].style = "left: 50%;"
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
                    document.getElementsByClassName('timeclass')[0].style.width = Math.round((current_question + 1) * window.innerWidth / questions_shuffle.length) + "px"
                    document.getElementsByClassName('timeclass')[1].innerHTML = 'pic number: ' + (1 + current_question) + '/' + (questions_shuffle.length)
                    document.getElementById("stimuli").src = './data/' + questions_shuffle[current_question]['src']
                } else {
                    // user_data['full_questions_time'] = Date.now() - init_timestamp
                    init_survey()
                }

            } else {
                counter++
                if (counter == 5 * 5) {
                    var error = document.createElement('div')
                    error.className = "error"
                    error.innerHTML = 'Please answer all the questions'
                    error.style.color = 'red'
                    d.append(error)
                }
            }

        }
    }

}


function gen_pic() {


    document.body.innerHTML = ''
    progress_bar((current_question + 1) * window.innerWidth / questions_shuffle.length, 'rgb(115, 183, 192)', 'test')


    d = document.createElement('div')
    d.style.textAlign = 'center'
    d.style.margin = '2%'
    document.body.append(d)
    d.innerHTML += '<h1 style="text-align: center;">请阅读下图，然后按要求打分</h1>'
    d.innerHTML += '<br><br><img id = "stimuli" src =./data/' + questions_shuffle[current_question]['src'] + ' style="width: 50%;"></img>'


    //----------rating-----------

    d.innerHTML += '<br><br><br><p><strong>1. Please score the affective traits of the visualization</p><br>'

    sam = document.createElement('form');
    sam.style.textAlign = "center";
    // sam.className = "AffectiveSlider";
    sam.setAttribute("class", "AffectiveSlider");

    pleasure = document.createElement('div');
    pleasure.className = "AScontainer pleasure";
    pleasure.innerHTML = '<input type="range" name="AS-pleasure" id="AS-pleasure" value=".5" min="0" max="1" step=".01" /><div class="ASintensityCue"></div></div>'

    arousal = document.createElement('div');
    arousal.className = "AScontainer arousal";
    arousal.innerHTML = '<input type="range" name="AS-arousal" id="AS-arousal" value=".5" min="0" max="1" step=".01" /><div class="ASintensityCue"></div></div>'

    sam.append(pleasure);
    sam.append(arousal);

    d.append(sam);

    // sam = document.createElement('span');
    // sam.style.lineHeight = "20px";
    // d.append(sam);

    // for (var i = 1; i < 6; i++) {
    //     scale = document.createElement('span')
    //     scale.style.display = "inline-block";
    //     scale.style.width = "100px";
    //     scale.style.verticalAlign = "top";
    //     scale.style.marginRight = "50px";
    //     scale.style.textAlign = "center";
    //     scale.innerHTML = '<img src = "./img/sam_' + i + '.png" style="width:100%"></img>'
    //     sam.append(scale)
    // }

    // d.innerHTML += '<br><br>'


    // input = document.createElement('span');
    // input.style.lineHeight = "20px";
    // input.style.marginLeft = "20px";
    // input.style.marginRight = "20px";
    // d.append(input);

    // for (var i = 1; i < 10; i++) {
    //     choice = document.createElement("span");
    //     choice.style.display = "inline-block";
    //     choice.style.width = "75px";
    //     choice.style.height = "20px";
    //     choice.style.textAlign = "center";
    //     r2 = document.createElement("input");
    //     r2.type = "radio";
    //     r2.name = "arousal";
    //     r2.className = "r1 arousal";
    //     r2.value = i;
    //     l2 = document.createElement("label");
    //     l2.for = i;
    //     l2.innerHTML = i;
    //     l2.className = "l1";
    //     //依次添加radio button和label
    //     choice.append(r2);
    //     choice.append(l2);
    //     input.append(choice)
    //         // d.innerHTML += '<br>'
    // }

    d.innerHTML += '<br><br>'

    // -----------------reason--------------------


    d.innerHTML += '<p><strong>2. Please write down your reason:</strong></p><p>if you find more than one affective design factors, we encourage you to list them one by one.</p><p>if you find the infographic design low in affective arousal, please explain why.</p><br>'

    textarea = document.createElement('textarea')
    textarea.id = "reason"
    textarea.style.width = "500px"
    textarea.style.margin = "0 auto"


    d.append(textarea)

    d.innerHTML += '<br><br>'


    // -----------------preference 1--------------------
    d.innerHTML += '<p><strong>3. I feel that I like this data visualization.</strong></p>'
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


    for (i of['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    // -----------------preference 2--------------------
    d.innerHTML += '<p><strong>4. I feel that I want to share this data visualization.</strong></p>'
    d.innerHTML += '<br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "preference_share";
        r1.className = "r1 preference_share";
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


    for (i of['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    //去掉jquery里的样式。累死我了！
    $(".r1").css({ 'position': 'static' });
    $("#reason").removeClass()


    btn = document.createElement('button')
    if (current_question < questions_shuffle.length - 1) btn.innerHTML = 'Next Pic'
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
    document.body.append(btn)

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