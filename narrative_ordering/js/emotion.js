var save_q2_answers = () => {

    curiosity = Array.prototype.slice.call(d.getElementsByClassName('curiosity'))
    attention = Array.prototype.slice.call(d.getElementsByClassName('attention'))
    fun = Array.prototype.slice.call(d.getElementsByClassName('fun'))
    motivation = Array.prototype.slice.call(d.getElementsByClassName('motivation'))
    challenge = Array.prototype.slice.call(d.getElementsByClassName('challenge'))


    // arousal = Array.prototype.slice.call(d.children).filter(d => d.name == 'arousal')
    // clearness = Array.prototype.slice.call(d.children).filter(d => d.name == 'clearness')
    // attention = Array.prototype.slice.call(d.children).filter(d => d.name == 'attention')

    var counter = 0
    for (var c in curiosity) {
        for (var a in attention) {
            for (var f in fun) {
                for (var m in motivation) {
                    for (var ch in challenge) {
                        if (curiosity[c].checked == true && attention[a].checked == true && fun[f].checked == true && motivation[m].checked == true && challenge[ch].checked == true) {
                            console.log('finished')
                            new_answer = {
                                'index': questions[current_question]['original_index'],
                                'fun': fun[f].value,
                                'curiosity': curiosity[c].value,
                                'motivation': motivation[m].value,
                                'attention': attention[a].value,
                                'elapsed_time': Date.now() - cur_start_time,
                                'dataset': questions[current_question]['dataset'],
                                'pattern': questions[current_question]['pattern'],
                                // 'rating_reason': document.getElementById('rating_reason').value,
                            }
                            user_answers.push(new_answer)
                            user_data['answers'] = user_answers
                            db.collection(incomplete_collection).add(user_data)
                                //         .then(function(docRef) {
                                //             console.log("Document written with ID: ", docRef.id);
                                //         })
                                //         .catch(function(error) {
                                //             console.error("Error adding document: ", error);
                                //         });
                            init_grid()
                        } else {
                            counter++
                            if (counter == 49 * 49 * 7) {
                                var error = document.createElement('div')
                                error.innerHTML = 'Please set scores to the buttons'
                                error.style.color = 'red'
                                d.append(error)
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
    text = '<p><strong>Question 2: Engagement</strong></p>'
    d.innerHTML = text
    d.innerHTML += '<br>'

    //----------question-----------

    d.innerHTML += '<p><strong>1. I think the narrative of this story holds my attention.</strong></p>'
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
    d.innerHTML += '<p><strong>2. I think the narrative of this story is fun.</strong></p>'
    d.innerHTML += '<br>'


    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "fun";
        r1.className = "r1 fun";
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
    d.innerHTML += '<p><strong>3. I think the narratives of this story incited my curiosity.</strong></p>'
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "curiosity";
        r1.className = "r1 curiosity";
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

    d.innerHTML += '<p><strong>4. I think the narratives of this story motivates me to read the story.</strong></p>'
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
    d.innerHTML += '<p><strong>5. I think the narratives of this story encourages me to think.</strong></p>'
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