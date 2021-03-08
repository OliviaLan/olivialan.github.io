function gen_pic() {
    document.body.innerHTML = ''
    progress_bar((current_question + 1) * window.innerWidth / questions_shuffle.length, '#8DC487', 'test')

    index = document.createElement('h2')
    index.style.textAlign = 'center'
    index.innerHTML += '<br>Story ' + (current_question + 1)
    document.body.append(index)

    // note = document.createElement('p')
    // note.style.textAlign = 'center'
    // note.innerHTML += '<strong>(Hint: the animation will replay automatically)</strong>'
    // document.body.append(note)

    intro = document.createElement('div')
    intro.style.textAlign = 'center'
    intro.style.marginLeft = '15%'
    intro.style.marginRight = '15%'
    intro.innerHTML += '<br><p>' + questions_shuffle[current_question]['story'] + '</p>'
    document.body.append(intro)

    d = document.createElement('div')
    d.style.textAlign = 'center'
        // d.style.margin = '2%'
    document.body.append(d)
    d.innerHTML += '<br><img src =./img/' + questions_shuffle[current_question]['src'] + ' style="width: 60%"></img><br><br>'



    btn = document.createElement('button')
    btn.innerHTML = 'Next'
    btn.className = 'button f_button'
        // btn.style.display = 'block'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        evaluate()
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