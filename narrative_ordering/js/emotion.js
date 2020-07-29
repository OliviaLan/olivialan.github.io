var save_q2_answers = () => {

<<<<<<< HEAD
    curiosity = Array.prototype.slice.call(d.getElementsByClassName('curiosity'))
    attention = Array.prototype.slice.call(d.getElementsByClassName('attention'))
    fun = Array.prototype.slice.call(d.getElementsByClassName('fun'))
    motivation = Array.prototype.slice.call(d.getElementsByClassName('motivation'))
    challenge = Array.prototype.slice.call(d.getElementsByClassName('challenge'))

=======
    valance = Array.prototype.slice.call(d.getElementsByClassName('valance'))
    arousal = Array.prototype.slice.call(d.getElementsByClassName('arousal'))
    clearness = Array.prototype.slice.call(d.getElementsByClassName('clearness'))
    attention = Array.prototype.slice.call(d.getElementsByClassName('attention'))
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    // arousal = Array.prototype.slice.call(d.children).filter(d => d.name == 'arousal')
    // clearness = Array.prototype.slice.call(d.children).filter(d => d.name == 'clearness')
    // attention = Array.prototype.slice.call(d.children).filter(d => d.name == 'attention')

    var counter = 0
<<<<<<< HEAD
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

=======
    for (var i in valance) {
        for (var j in arousal) {
            for (var c in clearness) {
                for (var a in attention) {
                    if (document.getElementById('rating_reason').value != '' && valance[i].checked == true && arousal[j].checked == true && clearness[c].checked == true && attention[a].checked == true) {
                        console.log('finished')
                        new_answer = {
                            'index': questions[current_question]['original_index'],
                            'clearness': clearness[c].value,
                            'valance': valance[i].value,
                            'arousal': arousal[j].value,
                            'attention': attention[a].value,
                            'elapsed_time': Date.now() - cur_start_time,
                            'ques_index': questions[current_question]['ques_index'],
                            'pattern': questions[current_question]['pattern'],
                            'rating_reason': document.getElementById('rating_reason').value,
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
                        init_recall()
                    } else {
                        counter++
                        if (counter == 49 * 49) {
                            var error = document.createElement('div')
                            error.innerHTML = 'Please set scores to the buttons'
                            error.style.color = 'red'
                            d.append(error)
                        }
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
                    }

                }

            }
        }

    }


    // disable_radio_buttons()
}


var init_emotion = () => {
<<<<<<< HEAD

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
=======
    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<b>Evaluation:</b> <br>1. I think the narrative of this story is clear'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    d.innerHTML += '<br>'


    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
<<<<<<< HEAD
        r1.name = "fun";
        r1.className = "r1 fun";
=======
        r1.name = "clearness";
        r1.className = "r1 clearness";
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
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
<<<<<<< HEAD

    //----------question-----------
    d.innerHTML += '<p><strong>3. I think the narratives of this story incited my curiosity.</strong></p>'
=======
    d.innerHTML += '2. I think the narratives of this story is emotional engaging:'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r1 = document.createElement("input");
        r1.type = "radio";
<<<<<<< HEAD
        r1.name = "curiosity";
        r1.className = "r1 curiosity";
=======
        r1.name = "valance";
        r1.className = "r1 valance";
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
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
<<<<<<< HEAD

    //----------question-----------

    d.innerHTML += '<p><strong>4. I think the narratives of this story motivates me to read the story.</strong></p>'
=======
    d.innerHTML += '3. I think the narratives of this story is fun:'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        r2 = document.createElement("input");
        r2.type = "radio";
<<<<<<< HEAD
        r2.name = "motivation";
        r2.className = "r1 motivation";
=======
        r2.name = "arousal";
        r2.className = "r1 arousal";
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
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
<<<<<<< HEAD
    d.innerHTML += '<br><br>'


    //----------question-----------
    d.innerHTML += '<p><strong>5. I think the narratives of this story encourages me to think.</strong></p>'
=======

    d.innerHTML += '<br><br>'
    d.innerHTML += '4. I think the narratives of this story makes me attentive:'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    d.innerHTML += '<br>'

    for (var i = 1; i < 8; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "100px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
<<<<<<< HEAD
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
=======
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

>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
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
<<<<<<< HEAD


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
=======
    d.innerHTML += '<br><br><br>'

    d_r = document.createElement('div')
    d_r.innerHTML = 'Please provide your reason: <br>'
    d_r.style.textAlign = 'left'
    d_r.style.margin = '2%'
    d.append(d_r)
    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "rating_reason"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "100px"
    d_r.append(textarea)
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4


    btn = document.createElement('button')
    btn.innerHTML = 'Next Question'
    btn.className = 'button f_button'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_q2_answers()
    }
    document.body.append(btn)
<<<<<<< HEAD

    d.innerHTML += '<br><br>'



=======
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
}