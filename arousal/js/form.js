var save_form_answers = () => {

    age = document.getElementById('age').value;
    country = document.getElementById('country').value;
    importance_arousal = document.getElementById('importance_arousal').value;
    importance_pleasure = document.getElementById('importance_pleasure').value;

    gender_all = document.getElementsByName('gender');
    education_all = document.getElementsByName('education');
    // prior_all = document.getElementsByName('prior');

    for (i = 0; i < 4; i++) {
        if (gender_all[i].checked == true) {
            var gender = gender_all[i].value
        }
    }

    for (i = 0; i < 6; i++) {
        if (education_all[i].checked == true) {
            var education = education_all[i].value
        }
    }


    // for (i = 0; i < 2; i++) {
    //     if (prior_all[i].checked == true) {
    //         var prior = prior_all[i].value
    //     }
    // }



    if (age && gender && education && country && importance_arousal && importance_pleasure) {
        user_data['age'] = age;
        user_data['gender'] = gender;
        user_data['country'] = country;
        // user_data['prior'] = prior;
        user_data['education'] = education;
        user_data['importance_arousal'] = importance_arousal;
        user_data['importance_pleasure'] = importance_pleasure;
        user_data['feedback'] = document.getElementById('feedback').value;
        user_data['timestamp_end'] = Date.now();
        user_data['worktime_in_seconds'] = (user_data['timestamp_end'] - user_data['timestamp_start']) / 1000;
        user_data['timestamp_start'] = new Date(user_data['timestamp_start']).toString();
        user_data['timestamp_end'] = new Date(user_data['timestamp_end']).toString();

        init_end()
    } else {
        error = document.createElement('div')
        error.innerHTML = 'Please fill in your answer'
        error.style.color = 'red'
        d.append(error)
    }
}



var init_survey = () => {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
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
    input_21 = document.createElement('input')
    input_21.id = "gender"
    input_21.type = "radio"
    input_21.name = "gender"
    input_21.value = "female";
    input_22 = document.createElement('input')
    input_22.id = "gender"
    input_22.type = "radio"
    input_22.name = "gender"
    input_22.value = "male";
    input_23 = document.createElement('input')
    input_23.id = "gender"
    input_23.type = "radio"
    input_23.name = "gender"
    input_23.value = "non-binary";
    input_24 = document.createElement('input')
    input_24.id = "gender"
    input_24.type = "radio"
    input_24.name = "gender"
    input_24.value = "prefer not to say";



    // input_2 = document.createElement('input')
    // input_2.id = "gender"
    // input_2.name = "gender"

    d.append(input_21)
    d.innerHTML += ' Female<br>'
    d.append(input_22)
    d.innerHTML += ' Male<br>'
    d.append(input_23)
    d.innerHTML += ' Non-binary<br>'
    d.append(input_24)
    d.innerHTML += ' Prefer not to say<br>'




    d.innerHTML += '<br><p>3. Country</p>'
    input_3 = document.createElement('input')
    input_3.id = "country"
    input_3.name = "country"

    d.append(input_3)


    d.innerHTML += '<br><br><p>4. What is the highest level of education that you have completed?</p>'
    input_41 = document.createElement('input')
    input_41.id = "education"
    input_41.type = "radio"
    input_41.name = "education"
    input_41.value = "Less than a high school diploma";
    input_42 = document.createElement('input')
    input_42.id = "education"
    input_42.type = "radio"
    input_42.name = "education"
    input_42.value = "High school or equivalent";
    input_43 = document.createElement('input')
    input_43.id = "education"
    input_43.type = "radio"
    input_43.name = "education"
    input_43.value = "Bachelor or equivalent";
    input_44 = document.createElement('input')
    input_44.id = "education"
    input_44.type = "radio"
    input_44.name = "education"
    input_44.value = "Master or equivalent";
    input_45 = document.createElement('input')
    input_45.id = "education"
    input_45.type = "radio"
    input_45.name = "education"
    input_45.value = "Doctoral or equivalent";
    input_46 = document.createElement('input')
    input_46.id = "education"
    input_46.type = "radio"
    input_46.name = "education"
    input_46.value = "Others";

    d.append(input_41)
    d.innerHTML += ' Less than a high school diploma<br>'
    d.append(input_42)
    d.innerHTML += ' High school or equivalent<br>'
    d.append(input_43)
    d.innerHTML += ' Bachelor or equivalent<br>'
    d.append(input_44)
    d.innerHTML += ' Master or equivalent<br>'
    d.append(input_45)
    d.innerHTML += ' Doctoral or equivalent<br>'
    d.append(input_46)
    d.innerHTML += ' Others'


    // d.innerHTML += '<br><br><p>5. Have you ever seen any of the 10 infographics before?</p>'
    // input_51 = document.createElement('input')
    // input_51.id = "prior"
    // input_51.type = "radio"
    // input_51.name = "prior"
    // input_51.value = "Yes";
    // input_52 = document.createElement('input')
    // input_52.id = "prior"
    // input_52.type = "radio"
    // input_52.name = "prior"
    // input_52.value = "No";


    // d.append(input_51)
    // d.innerHTML += ' Yes  '

    // d.append(input_52)
    // d.innerHTML += ' No  '




    d.innerHTML += '<br><br><p>5.Please recall the data visualizations you have viewed and list the design factor(s) that helped increase the arousal level.</p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "importance_arousal"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "80px"

    d.append(textarea)

    d.innerHTML += '<br><br><p>6.Please recall the data visualizations you have viewed and list the design factor(s) that helped increase the pleasure level.</p><br>'

    textarea_3 = document.createElement('textarea')
    textarea_3.id = "importance_pleasure"
    textarea_3.style.width = "500px"
    textarea_3.style.height = "80px"

    d.append(textarea_3)


    d.innerHTML += '<br><br><p>*Your feedback or comments related to this study (optional).</p><br>'

    textarea_2 = document.createElement('textarea')
        // input.name = "reason"
    textarea_2.id = "feedback"
        // input.size = "35"
    textarea_2.style.width = "500px"
    textarea_2.style.height = "80px"

    d.append(textarea_2)


    btn = document.createElement('button')
    btn.innerHTML = 'Submit'
    btn.className = 'button f_button'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_form_answers()
    }
    document.body.append(btn)

}