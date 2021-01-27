function save_answer() {

    arousal = Array.prototype.slice.call(d.getElementsByClassName('arousal'))
    preference_like = Array.prototype.slice.call(d.getElementsByClassName('preference_like'))
    preference_share = Array.prototype.slice.call(d.getElementsByClassName('preference_share'))


    var counter = 0
    for (var i in arousal) {
        for (var l in preference_like) {
            for (var s in preference_share) {
                if (arousal[i].checked == true && preference_like[l].checked == true && preference_share[s].checked == true && document.getElementById('reason').value != '') {
                    console.log('finished')
                    new_answer = {
                        'arousal': arousal[i].value,
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
                    if (current_question < questions_shuffle.length - 1) {
                        current_question++
                        gen_pic()
                    } else {
                        // user_data['full_questions_time'] = Date.now() - init_timestamp
                        init_survey()
                    }

                } else {
                    counter++
                    if (counter == 9 * 5 * 5) {
                        var error = document.createElement('div')
                        error.innerHTML = 'Please answer all the questions'
                        error.style.color = 'red'
                        d.append(error)
                    }
                }

            }
        }
    }
}


function gen_pic() {
    document.body.innerHTML = ''
    progress_bar((current_question + 1) * window.innerWidth / questions_shuffle.length, '#0000cc', 'test')

    d = document.createElement('div')
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)
    d.innerHTML += '<br><br><img src =./data_add_2/' + questions_shuffle[current_question]['src'] + ' style="width: 80%"></img>'


    //----------rating-----------

    d.innerHTML += '<br><br><br><p><strong>1. Please score the affective arousal level of the <u>design</u>:</strong></p><br>'


    sam = document.createElement('span');
    sam.style.lineHeight = "20px";
    d.append(sam);

    for (var i = 1; i < 6; i++) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        scale.style.marginRight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = '<img src = "./img/sam_' + i + '.png" style="width:100%"></img>'
        sam.append(scale)
    }

    d.innerHTML += '<br><br>'


    input = document.createElement('span');
    input.style.lineHeight = "20px";
    input.style.marginLeft = "20px";
    input.style.marginRight = "20px";
    d.append(input);

    for (var i = 1; i < 10; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "75px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r2 = document.createElement("input");
        r2.type = "radio";
        r2.name = "arousal";
        r2.className = "r1 arousal";
        r2.value = i;
        l2 = document.createElement("label");
        l2.for = i;
        l2.innerHTML = i;
        l2.className = "l1";
        //依次添加radio button和label
        choice.append(r2);
        choice.append(l2);
        input.append(choice)
            // d.innerHTML += '<br>'
    }

    d.innerHTML += '<br><br>'

    // -----------------reason--------------------


    d.innerHTML += '<p><strong>2. Please write down your reason:</strong></p><p>if you find more than one affective design factors, we encourage you to list them one by one.</p><p>if you find the infographic design low in affective arousal, please explain why.</p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "reason"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "150px"

    d.append(textarea)

    d.innerHTML += '<br><br>'


    // -----------------preference 1--------------------
    d.innerHTML += '<p><strong>3. I feel that I like this infographic.</strong></p>'
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
    d.innerHTML += '<p><strong>4. I feel that I want to share this infographic.</strong></p>'
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




    btn = document.createElement('button')
    if (current_question < questions_shuffle.length - 1) btn.innerHTML = 'Next Pic'
    else btn.innerHTML = 'End Test'
        // btn.style.marginLeft = '45%'
    btn.className = 'button f_button'
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