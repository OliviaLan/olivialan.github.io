var save_q2_answers = () => {

    if (current_question == 0) {
        var dataset = user_data['record'][0];
        var pattern = user_data['record'][1];
    } else if (current_question == 1) {
        var dataset = user_data['record'][2];
        var pattern = user_data['record'][3];
    } else {
        var dataset = user_data['record'][4];
        var pattern = user_data['record'][5];
    }

    attention = Array.prototype.slice.call(d.getElementsByClassName('attention'))
    involvement = Array.prototype.slice.call(d.getElementsByClassName('involvement'))
    novelty = Array.prototype.slice.call(d.getElementsByClassName('novelty'))
    motivation = Array.prototype.slice.call(d.getElementsByClassName('motivation'))
    challenge = Array.prototype.slice.call(d.getElementsByClassName('challenge'))
    affect_enjoy = Array.prototype.slice.call(d.getElementsByClassName('affect_enjoy'))
    affect_arousal = Array.prototype.slice.call(d.getElementsByClassName('affect_arousal'))
    likability = Array.prototype.slice.call(d.getElementsByClassName('likability'))

    // arousal = Array.prototype.slice.call(d.children).filter(d => d.name == 'arousal')
    // clearness = Array.prototype.slice.call(d.children).filter(d => d.name == 'clearness')
    // attention = Array.prototype.slice.call(d.children).filter(d => d.name == 'attention')

    var counter = 0
    for (var n in novelty) {
        for (var a in attention) {
            for (var i in involvement) {
                for (var m in motivation) {
                    for (var ch in challenge) {
                        for (var en in affect_enjoy) {
                            for (var ar in affect_arousal) {
                                for (var l in likability) {
                                    if (likability[l].checked == true && affect_enjoy[en].checked == true && affect_arousal[ar].checked == true && novelty[n].checked == true && attention[a].checked == true && involvement[i].checked == true && motivation[m].checked == true && challenge[ch].checked == true) {

                                        console.log('finished')
                                        new_answer = {
                                            'attention': attention[a].value,
                                            'involvement': involvement[i].value,
                                            'novelty': novelty[n].value,
                                            'motivation': motivation[m].value,
                                            'challenge': challenge[ch].value,
                                            'affect_enjoy': affect_enjoy[en].value,
                                            'affect_arousal': affect_arousal[ar].value,
                                            'likability': likability[l].value,
                                            'elapsed_time': Date.now() - cur_start_time,
                                            'dataset': dataset,
                                            'pattern': pattern,
                                            // 'rating_reason': document.getElementById('rating_reason').value,
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
                                        init_grid()
                                    } else {
                                        counter++
                                        if (counter == 49 * 49 * 49 * 49) {
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


    // disable_radio_buttons()
}


var init_emotion = () => {

    document.body.innerHTML = ''
    d = document.createElement('div')
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)
    text = '<p><strong>Question 2: Engagement</strong></p><br><p>Please select one button for each of the items below:</p>'
    d.innerHTML = text
    d.innerHTML += '<br>'

    //----------question-----------

    d.innerHTML += '<p><strong>1. I think the <u>narrative order</u> of this story holds my attention.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r2 = document.createElement("input");
        r2.type = "radio";
        r2.name = "attention";
        r2.className = "r1 attention";
        r2.value = i;
        l2 = document.createElement("label");
        l2.for = i;
        l2.innerHTML = i;
        l2.className = "l1";
        //依次添加radio button和label
        choice.append(r2);
        choice.append(l2);
        d.append(choice)
            // d.innerHTML += '<br>'
    }

    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'


    //----------question-----------
    d.innerHTML += '<p><strong>2. I think the <u>narrative order</u> of this story is fun.</strong></p>'
    d.innerHTML += '<br>'


    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "involvement";
        r1.className = "r1 involvement";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        //依次添加radio button和label
        choice.append(r1);
        choice.append(l1);
        d.append(choice)

        // d.innerHTML += '<br>'
    }

    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    //----------question-----------
    d.innerHTML += '<p><strong>3. I think the <u>narrative order</u> of this story interests me.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "novelty";
        r1.className = "r1 novelty";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        //依次添加radio button和label
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
            // d.innerHTML += '<br>'
    }
    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    //----------question-----------

    d.innerHTML += '<p><strong>4. I think the <u>narrative order</u> of this story gives me a reason to keep reading.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r2 = document.createElement("input");
        r2.type = "radio";
        r2.name = "motivation";
        r2.className = "r1 motivation";
        r2.value = i;
        l2 = document.createElement("label");
        l2.for = i;
        l2.innerHTML = i;
        l2.className = "l1";
        //依次添加radio button和label
        choice.append(r2);
        choice.append(l2);
        d.append(choice)
            // d.innerHTML += '<br>'
    }

    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }
    d.innerHTML += '<br><br>'


    //----------question-----------
    d.innerHTML += '<p><strong>5. I think the <u>narrative order</u> of this story encourages me to think.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "challenge";
        r1.className = "r1 challenge";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        //依次添加radio button和label
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
            // d.innerHTML += '<br>'
    }
    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    //----------question-----------
    d.innerHTML += '<p><strong>6. I think the <u>narrative order</u> of this story is enjoyable.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "affect_enjoy";
        r1.className = "r1 affect_enjoy";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        //依次添加radio button和label
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
            // d.innerHTML += '<br>'
    }
    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'


    //----------question-----------
    d.innerHTML += '<p><strong>7. I was emotionally aroused by the <u>narrative order</u> of the story.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "affect_arousal";
        r1.className = "r1 affect_arousal";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        //依次添加radio button和label
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
            // d.innerHTML += '<br>'
    }
    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }

    d.innerHTML += '<br><br>'

    //----------question-----------
    d.innerHTML += '<p><strong>8. I like the <u>narrative order</u> of the story.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "likability";
        r1.className = "r1 likability";
        r1.value = i;
        l1 = document.createElement("label");
        l1.for = i;
        l1.innerHTML = i;
        l1.className = "l1";
        //依次添加radio button和label
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
            // d.innerHTML += '<br>'
    }
    d.innerHTML += '<br>'

    likert = document.createElement('span');
    likert.style.lineHeight = "20px";
    d.append(likert);


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
        // hhh.style.lineHeight = "50px";
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }



    //----------question-----------

    // d_r = document.createElement('div')
    // d_r.innerHTML = 'Please provide your reason: <br>'
    // d_r.style.textAlign = 'left'
    // d_r.style.margin = '2%'
    // d.append(d_r)
    // textarea = document.createElement('textarea')
    //     // input.name = "reason"
    // textarea.id = "rating_reason"
    //     // input.size = "35"
    // textarea.style.width = "500px"
    // textarea.style.height = "100px"
    // d_r.append(textarea)


    btn = document.createElement('button')
    btn.innerHTML = 'Next Question'
    btn.className = 'button f_button'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_q2_answers()
    }
    document.body.append(btn)

    d.innerHTML += '<br><br>'



}