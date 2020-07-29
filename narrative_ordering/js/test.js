  	// --- TEST


  	//判断选项是否正确
  	var check_answer_present = () => {
  	    //与question.js里的正确答案对比
  	    if (questions_shuffle[current_question]['question_type'] != 3) {
  	        arr = Array.prototype.slice.call(divradio.children).filter(d => d.type == 'radio')
  	        return arr.some(a => a.checked)
  	    } else {
  	        return clickable_selected_answer != null
  	    }
  	}

  	var disable_radio_buttons = () => {
  	    r_buttons = document.getElementsByTagName('input')
  	    for (r = 0; r < r_buttons.length; r++) {
  	        r_buttons[r].disabled = true
  	    }
  	}

  	//显示选择结果是否正确
  	var show_correct_answer = () => {
  	    a = key[questions_shuffle[current_question]['original_index']]
  	    wrong_elem = Array.prototype.slice.call(divradio.children).filter(d => d.className == 'l1' && d.innerHTML == user_answers[user_answers.length - 1]['answer'])[0]
  	    corr_elem = Array.prototype.slice.call(divradio.children).filter(d => d.className == 'l1' && d.innerHTML == a)[0]

  	    wrong_elem.style.color = '#c00'
  	    corr_elem.style.color = '#0c0'

  	    if (wrong_elem.innerHTML != corr_elem.innerHTML) {
  	        d = document.createElement('div')
  	        d.innerHTML = 'wrong'
  	        d.className = 'answer-result'
  	        wrong_elem.append(d)

  	        d = document.createElement('div')
  	        d.innerHTML = 'correct'
  	        d.className = 'answer-result'
  	        corr_elem.append(d)
  	    } else {
  	        d = document.createElement('div')
  	        d.innerHTML = 'correct'
  	        d.className = 'answer-result'
  	        corr_elem.append(d)
  	    }

  	    cur_correct_answer_displayed = true
  	}

  	var next_question = () => {

  	    clickable_selected_answer = null
  	    clickable_selected_answer_event = null

  	    // cur_correct_answer_displayed = true
  	    cur_start_time = new Date()

  	    document.body.innerHTML = ''
  	    error = undefined
  	    progress_bar((current_question + 1) * window.innerWidth / questions_shuffle.length, '#0000cc', 'test')

  	    // var q_div = document.createElement('div')
  	    // q_div.style.textAlign = 'center'

  	    //q_div.style.marginTop = '5%'

  	    gen_question(questions_shuffle[current_question]['text'], questions_shuffle[current_question]['pattern'], questions_shuffle[current_question]['dataset'])

  	}


  	var init_questions = () => {
  	        // startTimer(allowed_time_in_minutes * 60);
  	        // test_start_time = new Date()
  	        document.body.innerHTML = ''

  	        timediv = document.createElement('div')
  	        timediv.id = 'timediv'
  	            //记录这个问题在原js里的顺序
  	        for (i in questions_shuffle) questions_shuffle[i]['original_index'] = i
  	            //挑出符合task类型的12个问题，然后洗牌

  	        // if (randomize) questions = shuffle_constrained(questions, chosen_patterns)
  	        // if (randomize) questions = shuffle_constrained(questions.filter(q => q['question_type'] == user_data['assigned_question_type']))

  	        next_question()
  	    }
  	    // --- END cur_start_time