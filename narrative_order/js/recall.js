var save_q3_answers = () => {

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


    if (document.getElementById('recall_order').value && document.getElementById('retell').value) {
        // var recall = []
        // recall.push(document.getElementById('recall1').value)
        // recall.push(document.getElementById('recall2').value)
        // recall.push(document.getElementById('recall3').value)
        // recall.push(document.getElementById('recall4').value)
        // recall.push(document.getElementById('recall5').value)
        // recall.push(document.getElementById('recall6').value)
        // recall.push(document.getElementById('recall7').value)
        new_answer = {
            // 'index': shuffle_question[current_question]['original_index'],
            // 'recall_overall': document.getElementById('main_idea').value,
            'recall': document.getElementById('retell').value,
            'recall_order': document.getElementById('recall_order').value,
            'elapsed_time': Date.now() - cur_start_time,
            'dataset': dataset,
            'pattern': pattern,
        }
        user_answers.push(new_answer)
        user_data['answers'] = user_answers
        db.collection(incomplete_collection).add(user_data)
        init_engage()
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
    text = '<p><strong>Question 1: Recall</strong></p><br><p>Please recall the story and answer the following questions:</p>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<br><p>1. <span style="color:red"><strong><u>Narrative order</u> refers to how a storyteller arranges the story pieces into an ordered telling sequence; it can be chronological (linear) or non-linear. </strong><span><br></p><p>Please recall and describe the <u>narrative order</u> of this story:</p><br>'

    textarea_2 = document.createElement('textarea')
    textarea_2.id = "recall_order"
    textarea_2.style.width = "500px"
    textarea_2.style.height = "150px"

    d.append(textarea_2)


    d.innerHTML += '<br><p>2. Please retell the story content as much as you can:</p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "retell"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "150px"

    d.append(textarea)


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