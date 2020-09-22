var save_form_answers = () => {

    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;
    country = document.getElementById('country').value;


    // speed_all = document.getElementsByName('speed');
    education_all = document.getElementsByName('education');
    prior_all = document.getElementsByName('prior');

    for (i = 0; i < 6; i++) {
        if (education_all[i].checked == true) {
            var education = education_all[i].value
        }
    }

    for (i = 0; i < 2; i++) {
        if (prior_all[i].checked == true) {
            var prior = prior_all[i].value
        }
    }



    if (age && gender && education && country && prior && document.getElementById('importance').value) {
        user_data['age'] = age;
        user_data['gender'] = gender;
        user_data['country'] = country;
        user_data['prior'] = prior;
        user_data['education'] = education;
        user_data['importance'] = document.getElementById('importance').value;
        user_data['data'] = document.getElementById('data').value;
        user_data['feedback'] = document.getElementById('feedback').value;
        user_data['timestamp_end'] = Date.now();
        user_data['worktime_in_seconds'] = (user_data['timestamp_end'] - user_data['timestamp_start']) / 1000;
        user_data['timestamp_start'] = new Date(user_data['timestamp_start']).toString();
        user_data['timestamp_end'] = new Date(user_data['timestamp_end']).toString();

        init_end()
    } else {
        console.log('pls fill in')
        error = document.createElement('div')
        error.innerHTML = 'Please fill in your answer'
        error.style.color = 'red'
        d.append(error)
    }
}



var init_survey = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Suvey:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<br><p>1. Age</p>'

    input = document.createElement('input')
    input.id = "age"
    input.name = "age"

    d.append(input)

    d.innerHTML += '<br><br><p>2. Gender</p>'
    input_2 = document.createElement('input')
    input_2.id = "gender"
    input_2.name = "gender"

    d.append(input_2)

    d.innerHTML += '<br><br><p>3. Country</p>'
    input_9 = document.createElement('input')
    input_9.id = "country"
    input_9.name = "country"

    d.append(input_9)


    d.innerHTML += '<br><br><p>4. What is the highest level of education that you have completed?</p>'
    input_3 = document.createElement('input')
    input_3.id = "education"
    input_3.type = "radio"
    input_3.name = "education"
    input_3.value = "Less than a high school diploma";
    input_4 = document.createElement('input')
    input_4.id = "education"
    input_4.type = "radio"
    input_4.name = "education"
    input_4.value = "High school or equivalent";
    input_5 = document.createElement('input')
    input_5.id = "education"
    input_5.type = "radio"
    input_5.name = "education"
    input_5.value = "Bachelor or equivalent";
    input_6 = document.createElement('input')
    input_6.id = "education"
    input_6.type = "radio"
    input_6.name = "education"
    input_6.value = "Master or equivalent";
    input_7 = document.createElement('input')
    input_7.id = "education"
    input_7.type = "radio"
    input_7.name = "education"
    input_7.value = "Doctoral or equivalent";
    input_8 = document.createElement('input')
    input_8.id = "education"
    input_8.type = "radio"
    input_8.name = "education"
    input_8.value = "Others";

    d.append(input_3)
    d.innerHTML += ' Less than a high school diploma<br>'
    d.append(input_4)
    d.innerHTML += ' High school or equivalent<br>'
    d.append(input_5)
    d.innerHTML += ' Bachelor or equivalent<br>'
    d.append(input_6)
    d.innerHTML += ' Master or equivalent<br>'
    d.append(input_7)
    d.innerHTML += ' Doctoral or equivalent<br>'
    d.append(input_8)
    d.innerHTML += ' Others'


    d.innerHTML += '<br><br><p>5. Have you ever seen any of the 10 infographics before?</p>'
    input_10 = document.createElement('input')
    input_10.id = "prior"
    input_10.type = "radio"
    input_10.name = "prior"
    input_10.value = "Yes";
    input_11 = document.createElement('input')
    input_11.id = "prior"
    input_11.type = "radio"
    input_11.name = "prior"
    input_11.value = "No";


    d.append(input_10)
    d.innerHTML += ' Yes  '

    d.append(input_11)
    d.innerHTML += ' No  '




    d.innerHTML += '<br><br><p>6.What do you think is the most important design factor(s) in infographics to augement affective arousal?</p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "importance"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "80px"

    d.append(textarea)

    d.innerHTML += '<br><br><p>7.Do you agree that augmenting the affective arousal of infographic design helps you absorb the data better? why?</p><br>'

    textarea_3 = document.createElement('textarea')
        // input.name = "reason"
    textarea_3.id = "data"
        // input.size = "35"
    textarea_3.style.width = "500px"
    textarea_3.style.height = "80px"

    d.append(textarea_3)


    d.innerHTML += '<br><br><p>8. Please leave your feedback or comments related to this study below (optional).</p><br>'

    textarea_2 = document.createElement('textarea')
        // input.name = "reason"
    textarea_2.id = "feedback"
        // input.size = "35"
    textarea_2.style.width = "500px"
    textarea_2.style.height = "120px"

    d.append(textarea_2)


    btn = document.createElement('button')
    btn.innerHTML = 'Submit'
    btn.className = 'button f_button'
        // btn.style.margin = '5%'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_form_answers()
    }
    document.body.append(btn)

}