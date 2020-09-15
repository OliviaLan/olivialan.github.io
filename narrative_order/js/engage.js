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
    interest = Array.prototype.slice.call(d.getElementsByClassName('interest'))
    motivation = Array.prototype.slice.call(d.getElementsByClassName('motivation'))
    challenge = Array.prototype.slice.call(d.getElementsByClassName('challenge'))
    enjoyment = Array.prototype.slice.call(d.getElementsByClassName('enjoyment'))
    affect_arousal = Array.prototype.slice.call(d.getElementsByClassName('affect_arousal'))
    likability = Array.prototype.slice.call(d.getElementsByClassName('likability'))


    var counter = 0
    for (var it in interest) {
        for (var a in attention) {
            for (var i in involvement) {
                for (var m in motivation) {
                    for (var ch in challenge) {
                        for (var en in enjoyment) {
                            for (var ar in affect_arousal) {
                                for (var l in likability) {
                                    if (likability[l].checked == true && enjoyment[en].checked == true && affect_arousal[ar].checked == true && interest[it].checked == true && attention[a].checked == true && involvement[i].checked == true && motivation[m].checked == true && challenge[ch].checked == true) {
                                        console.log('finished')
                                        new_answer = {
                                            'attention': attention[a].value,
                                            'involvement': involvement[i].value,
                                            'interest': interest[it].value,
                                            'motivation': motivation[m].value,
                                            'challenge': challenge[ch].value,
                                            'enjoyment': enjoyment[en].value,
                                            'affect_arousal': affect_arousal[ar].value,
                                            'likability': likability[l].value,
                                            'elapsed_time': Date.now() - cur_start_time,
                                            'dataset': dataset,
                                            'pattern': pattern,
                                        }
                                        user_answers.push(new_answer)
                                        user_data['answers'] = user_answers
                                        db.collection(incomplete_collection).add(user_data)
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

}


var init_engage = () => {

    document.body.innerHTML = ''
    d = document.createElement('div')
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)
    text = '<p><strong>Question 2: Engagement</strong></p><br><p>Please select one button for each of the items below. </p><p><span style="color:red"><strong>Note that you are going to evaluate the <u>narrative order</u> of this story instead of the story content</strong></span>:</p>'
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
        choice.append(r2);
        choice.append(l2);
        d.append(choice)
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
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
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
        r1.name = "interest";
        r1.className = "r1 interest";
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


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
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
        choice.append(r2);
        choice.append(l2);
        d.append(choice)
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
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
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
        r1.name = "enjoyment";
        r1.className = "r1 enjoyment";
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


    for (i of['strongly disagree', 'disagree', 'somewhat disagree', 'neutral', 'somewhat agree', 'agree', 'strongly agree']) {
        scale = document.createElement('span')
        scale.style.display = "inline-block";
        scale.style.width = "100px";
        scale.style.verticalAlign = "top";
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
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
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
        choice.append(r1);
        choice.append(l1);
        d.append(choice)
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
        scale.style.textAlign = "center";
        scale.innerHTML = i
        likert.append(scale)
    }


    btn = document.createElement('button')
    btn.innerHTML = 'Next Question'
    btn.className = 'button f_button'
    btn.onclick = () => {
        save_q2_answers()
    }
    document.body.append(btn)

    d.innerHTML += '<br><br>'



}