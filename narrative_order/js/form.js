var save_form_answers = () => {

    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;
    preference_why = document.getElementById('preference_why').value;
    feedback = document.getElementById('feedback').value;

    literacy_all = document.getElementsByName('literacy');
    preference_all = document.getElementsByName('preference');

    for (i = 0; i < 2; i++) {
        if (literacy_all[i].checked == true) {
            var literacy = literacy_all[i].value
        }
    }

    for (i = 0; i < 3; i++) {
        if (preference_all[i].checked == true) {
            var preference = preference_all[i].value
        }
    }


    if (age && gender && literacy && preference && preference_why) {
        user_data['age'] = age;
        user_data['gender'] = gender;
        user_data['literacy'] = literacy;
        user_data['preference'] = preference;
        user_data['preference_why'] = preference_why;
        user_data['feedback'] = feedback;
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

    d.innerHTML += '<br><p>1. age</p>'

    input = document.createElement('input')
    input.id = "age"
    input.name = "age"

    d.append(input)

    d.innerHTML += '<br><br><p>2. gender</p>'
    input_2 = document.createElement('input')
    input_2.id = "gender"
    input_2.name = "age"

    d.append(input_2)

    d.innerHTML += '<br><br><p>3. I can understand the visualization in the stories (timeline).</p>'
    input_3 = document.createElement('input')
    input_3.id = "literacy"
    input_3.type = "radio"
    input_3.name = "literacy"
    input_3.value = "Yes";
    input_4 = document.createElement('input')
    input_4.id = "literacy"
    input_4.type = "radio"
    input_4.name = "literacy"
    input_4.value = "No";

    d.append(input_3)
    d.innerHTML += ' Yes  '

    d.append(input_4)
    d.innerHTML += ' No  '


    d.innerHTML += '<br><br><p>4. Which story has better narrative order? (story content not taken into account).</p>'
    input_7 = document.createElement('input')
    input_7.id = "preference"
    input_7.type = "radio"
    input_7.name = "preference"
    input_7.value = "Story One";
    input_8 = document.createElement('input')
    input_8.id = "preference"
    input_8.type = "radio"
    input_8.name = "preference"
    input_8.value = "Story Two";
    input_9 = document.createElement('input')
    input_9.id = "preference"
    input_9.type = "radio"
    input_9.name = "preference"
    input_9.value = "Story Three";


    d.append(input_7)
    d.innerHTML += ' Story One&nbsp'

    d.append(input_8)
    d.innerHTML += ' Story Two   '

    d.append(input_9)
    d.innerHTML += ' Story Three   '

    d.innerHTML += '<br><br><p>please describe your reason briefly.</p><br>'

    textarea = document.createElement('textarea')
    textarea.id = "preference_why"
    textarea.style.width = "500px"
    textarea.style.height = "50px"

    d.append(textarea)

    d.innerHTML += '<br><br><p>5. Please leave your feedback or comments related to this study below.</p><br>'

    textarea_2 = document.createElement('textarea')
    textarea_2.id = "feedback"
    textarea_2.style.width = "500px"
    textarea_2.style.height = "100px"

    d.append(textarea_2)


    btn = document.createElement('button')
    btn.innerHTML = 'Submit'
    btn.className = 'button f_button'
    btn.onclick = () => {
        save_form_answers()
    }
    document.body.append(btn)

}