var next_question = () => {

    clickable_selected_answer = null
    clickable_selected_answer_event = null

    // cur_correct_answer_displayed = true
    cur_start_time = new Date()

    document.body.innerHTML = ''
    error = undefined

    // var q_div = document.createElement('div')
    // q_div.style.textAlign = 'center'

    //q_div.style.marginTop = '5%'



}


function save_answer() {

    arousal = Array.prototype.slice.call(d.getElementsByClassName('arousal'))

    var counter = 0
    for (var i in arousal) {
        if (arousal[i].checked == true && document.getElementById('reason').value != '') {
            console.log('finished')
            new_answer = {
                'arousal': arousal[i].value,
                'pic_id': questions_shuffle[current_question]['id'],
                'reason': document.getElementById('reason').value,
            }
            user_answers.push(new_answer)
            user_data['answers'] = user_answers
                // db.collection(incomplete_collection).add(user_data)
                //         .then(involvementction(docRef) {
                //             console.log("Document written with ID: ", docRef.id);
                //         })
                //         .catch(involvementction(error) {
                //             console.error("Error adding document: ", error);
                //         });
            if (current_question < questions_shuffle.length - 1) {
                current_question++
                gen_pic()
            } else {
                // user_data['full_questions_time'] = Date.now() - init_timestamp
                init_survey()
            }

        } else {
            counter++
            if (counter == 7) {
                var error = document.createElement('div')
                error.innerHTML = 'Please answer all the questions'
                error.style.color = 'red'
                d.append(error)
            }
        }

    }



    // disable_radio_buttons()
}


function gen_pic() {
    document.body.innerHTML = ''
    progress_bar((current_question + 1) * window.innerWidth / questions_shuffle.length, '#0000cc', 'test')

    d = document.createElement('div')
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)
    d.innerHTML += '<img src =' + questions_shuffle[current_question]['dataset'] + ' style="width: 80%"></img>'


    //----------question-----------

    d.innerHTML += '<br><br><br><p><strong>1. Please score the arousal level of the design:</strong></p><br><br>'


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

    d.innerHTML += '<br>'

    // likert = document.createElement('span');
    // likert.style.lineHeight = "20px";
    // d.append(likert);


    // for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
    //     scale = document.createElement('span')
    //     scale.style.display = "inline-block";
    //     scale.style.width = "100px";
    //     scale.style.verticalAlign = "top";
    //     // hhh.style.lineHeight = "50px";
    //     scale.style.textAlign = "center";
    //     scale.innerHTML = i
    //     likert.append(scale)
    // }

    // d.innerHTML += '<br><br>'

    d.innerHTML += '<br><p><strong>2. Please write down your reason:</strong></p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "reason"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "150px"

    d.append(textarea)


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
    // --- END cur_start_time