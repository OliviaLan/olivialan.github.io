var save_q3_answers = () => {
    if (document.getElementById('main_idea').value && document.getElementById('retell').value) {
        // var recall = []
        // recall.push(document.getElementById('recall1').value)
        // recall.push(document.getElementById('recall2').value)
        // recall.push(document.getElementById('recall3').value)
        // recall.push(document.getElementById('recall4').value)
        // recall.push(document.getElementById('recall5').value)
        // recall.push(document.getElementById('recall6').value)
        // recall.push(document.getElementById('recall7').value)
        new_answer = {
            'index': questions[current_question]['original_index'],
            'recall_overall': document.getElementById('main_idea').value,
            'recall': document.getElementById('retell').value,
            'elapsed_time': Date.now() - cur_start_time,
            'dataset': questions[current_question]['dataset'],
            'pattern': questions[current_question]['pattern'],
        }
        user_answers.push(new_answer)
        user_data['answers'] = user_answers
        db.collection(incomplete_collection).add(user_data)
        init_emotion()
    } else {
        console.log('pls fill in')
        error = document.createElement('div')
        error.innerHTML = 'Please fill in your answer'
        error.style.color = 'red'
        d.append(error)

    }
}

var init_recall = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Question 1: Recall</strong></p>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<br><p><strong>1. Please write down the main idea of this story:</strong></p>'

    input = document.createElement('input')
    input.name = "main_idea"
    input.id = "main_idea"
    input.size = "60"
    d.append(input)


    d.innerHTML += '<br><br><p><strong>2. Please retell the story.</strong></p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "retell"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "300px"

    d.append(textarea)


    // d.innerHTML += '<br><br><p>No. 1</p>'


    // input = document.createElement('input')
    // input.name = "recall1"
    // input.id = "recall1"
    // input.size = "60"
    // d.append(input)

    // d.innerHTML += '<br><p>No. 2</p>'

    // input2 = document.createElement('input')
    // input2.name = "recall2"
    // input2.id = "recall2"
    // input2.size = "60"
    // d.append(input2)

    // d.innerHTML += '<br><p>No. 3</p>'

    // input3 = document.createElement('input')
    // input3.name = "recall3"
    // input3.id = "recall3"
    // input3.size = "60"
    // d.append(input3)

    // d.innerHTML += '<br><p>No. 4</p>'

    // input4 = document.createElement('input')
    // input4.name = "recall4"
    // input4.id = "recall4"
    // input4.size = "60"
    // d.append(input4)

    // d.innerHTML += '<br><p>No. 5</p>'

    // input5 = document.createElement('input')
    // input5.name = "recall5"
    // input5.id = "recall5"
    // input5.size = "60"
    // d.append(input5)

    // d.innerHTML += '<br><p>No. 6</p>'

    // input6 = document.createElement('input')
    // input6.name = "recall6"
    // input6.id = "recall6"
    // input6.size = "60"
    // d.append(input6)

    // d.innerHTML += '<br><p>Others</p>'

    // input7 = document.createElement('input')
    // input7.name = "recall7"
    // input7.id = "recall7"
    // input7.size = "60"
    // d.append(input7)



    btn = document.createElement('button')
    btn.innerHTML = 'Next Question'
    btn.className = 'button f_button'
        // btn.style.margin = '5%'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_q3_answers()
    }
    document.body.append(btn)
}