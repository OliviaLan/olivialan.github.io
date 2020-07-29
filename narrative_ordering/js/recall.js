var save_q3_answers = () => {
<<<<<<< HEAD
    if (document.getElementById('recall_overall').value && document.getElementById('recall1').value) {
        var recall = []
        recall.push(document.getElementById('recall1').value)
        recall.push(document.getElementById('recall2').value)
        recall.push(document.getElementById('recall3').value)
        recall.push(document.getElementById('recall4').value)
        recall.push(document.getElementById('recall5').value)
        recall.push(document.getElementById('recall6').value)
        recall.push(document.getElementById('recall7').value)
        new_answer = {
            'index': questions[current_question]['original_index'],
            'recall_overall': document.getElementById('recall_overall').value,
            'recall': recall,
            'elapsed_time': Date.now() - cur_start_time,
            'dataset': questions[current_question]['dataset'],
=======
    if (document.getElementById('recall').value) {
        new_answer = {
            'index': questions[current_question]['original_index'],
            'recall': document.getElementById('recall').value,
            'elapsed_time': Date.now() - cur_start_time,
            'ques_index': questions[current_question]['ques_index'],
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
            'pattern': questions[current_question]['pattern'],
        }
        user_answers.push(new_answer)
        user_data['answers'] = user_answers
        db.collection(incomplete_collection).add(user_data)
<<<<<<< HEAD
        init_emotion()
=======
        init_grid()
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
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
<<<<<<< HEAD
    text = '<p><strong>Question 1: Recall</strong></p>'
=======
    text = '<b>Recall</b><br>Please write down anything you remember about the story. If you remember many facts about the story, we encourage you to break them down into small pieces and fill them into the inputs one by one.'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

<<<<<<< HEAD
    d.innerHTML += '<br><p><strong>1. Please write down what is the story about:</strong></p>'

    input = document.createElement('input')
    input.name = "recall_overall"
    input.id = "recall_overall"
    input.size = "60"
    d.append(input)


    d.innerHTML += '<br><br><p><strong>2. Please write down anything you remember about the story.</strong></p><br>We pay $0.1 bonus for every right shot. We encourage you to write them down one by one so that we can calculate your bonus more precisely.'

    d.innerHTML += '<br><br><p>No. 1</p>'


    input = document.createElement('input')
    input.name = "recall1"
    input.id = "recall1"
    input.size = "60"
    d.append(input)

    d.innerHTML += '<br><p>No. 2</p>'
=======
    d.innerHTML += '<br><p>Fact 1</p>'

    input = document.createElement('input')
    input.name = "recall"
    input.id = "recall"
    input.size = "60"
    d.append(input)

    d.innerHTML += '<br><p>Fact 2</p>'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    input2 = document.createElement('input')
    input2.name = "recall2"
    input2.id = "recall2"
    input2.size = "60"
    d.append(input2)

<<<<<<< HEAD
    d.innerHTML += '<br><p>No. 3</p>'
=======
    d.innerHTML += '<br><p>Fact 3</p>'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    input3 = document.createElement('input')
    input3.name = "recall3"
    input3.id = "recall3"
    input3.size = "60"
    d.append(input3)

<<<<<<< HEAD
    d.innerHTML += '<br><p>No. 4</p>'
=======
    d.innerHTML += '<br><p>Fact 4</p>'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    input4 = document.createElement('input')
    input4.name = "recall4"
    input4.id = "recall4"
    input4.size = "60"
    d.append(input4)

<<<<<<< HEAD
    d.innerHTML += '<br><p>No. 5</p>'
=======
    d.innerHTML += '<br><p>Fact 5</p>'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    input5 = document.createElement('input')
    input5.name = "recall5"
    input5.id = "recall5"
    input5.size = "60"
    d.append(input5)

<<<<<<< HEAD
    d.innerHTML += '<br><p>No. 6</p>'
=======
    d.innerHTML += '<br><p>Fact 6</p>'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    input6 = document.createElement('input')
    input6.name = "recall6"
    input6.id = "recall6"
    input6.size = "60"
    d.append(input6)

    d.innerHTML += '<br><p>Others</p>'

    input7 = document.createElement('input')
    input7.name = "recall7"
    input7.id = "recall7"
    input7.size = "60"
    d.append(input7)



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