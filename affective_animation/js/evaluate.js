function save_answer() {

    story_echo = Array.prototype.slice.call(d.getElementsByClassName('story_echo'))
    story_connect = Array.prototype.slice.call(d.getElementsByClassName('story_connect'))
    story_empathy = Array.prototype.slice.call(d.getElementsByClassName('story_empathy'))


    engage_novel = Array.prototype.slice.call(d.getElementsByClassName('engage_novel'))
    engage_attention = Array.prototype.slice.call(d.getElementsByClassName('engage_attention'))
    engage_arousal = Array.prototype.slice.call(d.getElementsByClassName('engage_arousal'))
    engage_interest = Array.prototype.slice.call(d.getElementsByClassName('engage_interest'))
    engage_involve = Array.prototype.slice.call(d.getElementsByClassName('engage_involve'))
    engage_aesthetics = Array.prototype.slice.call(d.getElementsByClassName('engage_aesthetics'))


    var counter = 0
    for (var e in story_echo) {
        for (var c in story_connect) {
            for (var em in story_empathy) {
                for (var n in engage_novel) {
                    for (var at in engage_attention) {
                        for (var ar in engage_arousal) {
                            for (var it in engage_interest) {
                                for (var iv in engage_involve) {
                                    for (var a in engage_aesthetics) {
                                        if (engage_novel[n].checked == true && engage_attention[at].checked == true && engage_arousal[ar].checked == true && engage_interest[it].checked == true && engage_involve[iv].checked == true && engage_aesthetics[a].checked == true && story_echo[e].checked == true && story_connect[c].checked == true && story_empathy[em].checked == true && document.getElementById('category').value != '' && document.getElementById('trend').value != '' && document.getElementById('message').value != '') {
                                            console.log('finished')
                                            new_answer = {
                                                'id': questions_shuffle[current_question]['id'],
                                                // 'arousal': arousal[i].value,
                                                // 'reason': document.getElementById('reason').value,
                                                // 'preference_like': preference_like[l].value,
                                                // 'preference_share': preference_share[s].value,
                                            }
                                            user_answers.push(new_answer)
                                            user_data['answers'] = user_answers
                                            if (current_question < questions_shuffle.length - 1) {
                                                current_question++
                                                gen_pic()
                                            } else {
                                                init_survey()
                                            }

                                        } else {
                                            counter++
                                            if (counter == 5 * 5 * 5 * 5 * 5 * 5 * 5 * 5 * 5) {
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
                    }
                }
            }
        }
    }
}


// var save_answers = () => {

//     if (document.getElementById('category').value && document.getElementById('trend').value) {
//         new_answer = {
//             'recall': document.getElementById('category').value,
//             'recall_order': document.getElementById('trend').value,
//             'id': questions_shuffle[current_question]['id'],
//             // 'elapsed_time': Date.now() - cur_start_time,
//             // 'dataset': dataset,
//             // 'pattern': pattern,
//         }
//         user_answers.push(new_answer)
//         user_data['answers'] = user_answers
//         db.collection(incomplete_collection).add(user_data)
//         if (current_question < questions_shuffle.length - 1) {
//             current_question++
//             gen_pic()
//         } else {
//             init_survey()
//         }
//     } else {
//         console.log('pls fill in')
//         error = document.createElement('div')
//         error.innerHTML = 'Please fill in your answer'
//         error.style.color = 'red'
//         d.append(error)

//     }
// }

var evaluate = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Evaluating the animation design</strong></p><br><p>Please recall the story and answer the following questions:</p>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<br><p><strong>1.What is the value of xxx?</strong></p><br>'
    textarea = document.createElement('textarea')
    textarea.id = "category"
    textarea.style.width = "500px"
    textarea.style.height = "25px"
    d.append(textarea)


    d.innerHTML += '<br><br><p><strong>2. What is the trend of xxx?</strong></p><br>'
    textarea_2 = document.createElement('textarea')
    textarea_2.id = "trend"
    textarea_2.style.width = "500px"
    textarea_2.style.height = "25px"
    d.append(textarea_2)

    d.innerHTML += '<br><br><p><strong>3. What is emotional message that the storyteller want to communicate?</strong></p><br>'
    textarea_3 = document.createElement('textarea')
    textarea_3.id = "message"
    textarea_3.style.width = "500px"
    textarea_3.style.height = "50px"
    d.append(textarea_3)


    // -----------------story judge 1--------------------
    d.innerHTML += '<br><br><p><strong>4. I feel that I like this infographic.</strong></p><br>'

    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "story_echo";
        r1.className = "r1 story_echo";
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

    // -----------------story judge 2--------------------
    d.innerHTML += '<br><br><p><strong>5. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "story_connect";
        r1.className = "r1 story_connect";
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

    // -----------------story judge 3--------------------
    d.innerHTML += '<br><br><p><strong>6. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "story_empathy";
        r1.className = "r1 story_empathy";
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

    // -----------------engage judge 1--------------------
    d.innerHTML += '<br><br><p><strong>7. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "engage_novel";
        r1.className = "r1 engage_novel";
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

    // -----------------engage judge 2--------------------
    d.innerHTML += '<br><br><p><strong>8. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "engage_attention";
        r1.className = "r1 engage_attention";
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

    // -----------------engage judge 3--------------------
    d.innerHTML += '<br><br><p><strong>9. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "engage_arousal";
        r1.className = "r1 engage_arousal";
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

    // -----------------engage judge 4--------------------
    d.innerHTML += '<br><br><p><strong>10. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "engage_interest";
        r1.className = "r1 engage_interest";
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

    // -----------------engage judge 5--------------------
    d.innerHTML += '<br><br><p><strong>11. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "engage_involve";
        r1.className = "r1 engage_involve";
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

    // -----------------engage judge 6--------------------
    d.innerHTML += '<br><br><p><strong>12. I feel that I want to share this infographic.</strong></p><br>'


    for (var i = 1; i < 6; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "engage_aesthetics";
        r1.className = "r1 engage_aesthetics";
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


    // -----------button------------
    btn = document.createElement('button')
    if (current_question < questions_shuffle.length - 1) btn.innerHTML = 'Next'
    else btn.innerHTML = 'End Test'
        // btn.innerHTML = 'Next Question'
    btn.className = 'button f_button'
    btn.onclick = () => {
        save_answer()
    }
    document.body.append(btn)
}