var save_form_answers = () => {

    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;
    judgement_1_why = document.getElementById('judgement_1_why').value;
    feedback = document.getElementById('feedback').value;

    // speed_all = document.getElementsByName('speed');
    literacy_all = document.getElementsByName('literacy');
    judgement_1_all = document.getElementsByName('judgement_1');

    for (i = 0; i < 2; i++) {
        // if (speed_all[i].checked == true) {
        //     var speed = speed_all[i].value
        // }
        if (literacy_all[i].checked == true) {
            var literacy = literacy_all[i].value
        }
    }

    for (i = 0; i < 3; i++) {
        if (judgement_1_all[i].checked == true) {
            var judgement_1 = judgement_1_all[i].value
        }
    }


    if (age && gender && speed && literacy && judgement_1 && judgement_1_why) {
        user_data['age'] = age;
        user_data['gender'] = gender;
        // user_data['speed'] = speed;
        user_data['literacy'] = literacy;
        user_data['judgement_1'] = judgement_1;
        user_data['judgement_1_why'] = judgement_1_why;
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

    // val = $('#form').alpaca('get');
    // //存数据-property
    // for (prop of Object.keys(form_properties)) {
    // 	//如果是放图片的，略过
    // 	// if (prop == 'img') continue;
    // 	if (val.getValue()[prop] != undefined) user_data[prop] = val.getValue()[prop]
    // 	else user_data[prop] = 'null'
    // }

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

    d.innerHTML += '<br><br><p>4. I think the animation speed is neither too fast nor too slow.</p>'
    input_5 = document.createElement('input')
    input_5.id = "speed"
    input_5.type = "radio"
    input_5.name = "speed"
    input_5.value = "Yes";
    input_6 = document.createElement('input')
    input_6.id = "speed"
    input_6.type = "radio"
    input_6.name = "speed"
    input_6.value = "No";


    d.append(input_5)
    d.innerHTML += ' Yes  '

    d.append(input_6)
    d.innerHTML += ' No  '

    d.innerHTML += '<br><br><p>5. Which story has better narrative order? (story content not taken into account).</p>'
    input_7 = document.createElement('input')
    input_7.id = "judgement_1"
    input_7.type = "radio"
    input_7.name = "judgement_1"
    input_7.value = "Story One";
    input_8 = document.createElement('input')
    input_8.id = "judgement_1"
    input_8.type = "radio"
    input_8.name = "judgement_1"
    input_8.value = "Story Two";
    input_9 = document.createElement('input')
    input_9.id = "judgement_1"
    input_9.type = "radio"
    input_9.name = "judgement_1"
    input_9.value = "Story Three";


    d.append(input_7)
    d.innerHTML += ' Story One&nbsp'

    d.append(input_8)
    d.innerHTML += ' Story Two   '

    d.append(input_9)
    d.innerHTML += ' Story Three   '

    d.innerHTML += '<br><br><p>please describe your reason briefly.</p><br>'

    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "judgement_1_why"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "50px"

    d.append(textarea)

    d.innerHTML += '<br><br><p>6. Please leave your feedback or comments related to this study below.</p><br>'

    textarea_2 = document.createElement('textarea')
        // input.name = "reason"
    textarea_2.id = "feedback"
        // input.size = "35"
    textarea_2.style.width = "500px"
    textarea_2.style.height = "100px"

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



// // --- SURVEY

form_properties = {
    // "country": {
    //     "type": "string",
    //     "title": "Current country",
    // },
    "age": {
        "type": "string",
        "title": "1. Age",
        'required': true
    },
    "gender": {
        "type": "string",
        "title": "2. Gender",
        "enum": ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
        'required': true
    },
    "literacy": {
        "type": "string",
        "title": "3. I can understand the visualization in the stories (timeline).",
        "enum": ['Yes', 'No'],
        'required': true
    },
    "speed": {
        "type": "string",
        "title": "4. I think the animation speed is neither too fast nor too slow",
        "enum": ['Yes', 'No'],
        'required': true
    },
    "judgement_1": {
        "type": "string",
        "title": "5. Which story has better narrative order? (story content not taken into account)",
        "enum": ['Story One', 'Story Two', 'Story Three'],
        'required': true
    },
    "judgement_1_why": {
        "type": "string",
        "title": "please describe your reason briefly.",
        'required': true
    },
    // "img": {
    //     "title": "Which story do you prefer?"
    // },
    // "judgement_2": {
    //     "type": "string",
    //     "title": "Which story is more engaging?",
    //     "enum": ['Story One', 'Story Two'],
    //     'required': true
    // },
    // "judgement_2_why": {
    //     "type": "string",
    //     "title": "Please describe why briefly.",
    //     'required': true
    // },
    // "replay": {
    //     "type": "string",
    //     "title": "6. Did you click the 'replay' buttons? If you did, please describe the reason briefly.",
    //     'required': true
    // },

    "feedback": {
        "type": "string",
        "title": "6. Please leave your feedback or comments related to this study below."
    },
}

// var init_survey = () => {
//         time_out = true
//         document.body.innerHTML = ''
//         d = document.createElement('div')
//         d.id = 'form'
//         document.body.append(d)

//         var schema = {
//             "title": "Survey",
//             "description": "Demographic information",
//             "type": "object",
//             "properties": form_properties
//         }

//         var options = {
//             'fields': {
//                 // 'country': {
//                 //     'type': 'country',
//                 //     'label': 'Current country'
//                 // },
//                 "age": {
//                     "size": 20,
//                 },
//                 "gender": {
//                     'type': 'radio',
//                     'hideNone': true
//                 },
//                 "literacy": {
//                     'sort': function(a, b) { return 0 },
//                     'type': 'radio',
//                     'hideNone': true
//                 },
//                 "speed": {
//                     'sort': function(a, b) { return 0 },
//                     'type': 'radio',
//                     'hideNone': true
//                 },

//                 "replay": {
//                     "size": 100,
//                 },
//                 "judgement_1": {
//                     'sort': function(a, b) { return 0 },
//                     'type': 'radio',
//                     'hideNone': true
//                 },
//                 // 'judgement_1_why': {
//                 //     "type": "textarea",
//                 //     "rows": 1,
//                 //     "cols": 60,
//                 //     "label": "",
//                 // },
//                 // "judgement_2": {
//                 //     'sort': function(a, b) { return 0 },
//                 //     'type': 'radio',
//                 //     'hideNone': true
//                 // },
//                 // 'judgement_2_why': {
//                 //     "type": "textarea",
//                 //     "rows": 1,
//                 //     "cols": 60,
//                 //     "label": "",
//                 // },
//                 'feedback': {
//                     "type": "textarea",
//                     "rows": 5,
//                     "cols": 60,
//                     "label": "",
//                     "wordlimit": 1000
//                 },
//                 // "img": {
//                 //     "type": "image",
//                 //     // "label": "History dataset",
//                 //     "view": "bootstrap-display"
//                 // },
//             },
//             "form": {
//                 "buttons": {
//                     "submit": {
//                         "value": "Submit the Form",
//                         "click": (a) => {
//                             user_data['timestamp_end'] = Date.now()
//                             user_data['worktime_in_seconds'] = (user_data['timestamp_end'] - user_data['timestamp_start']) / 1000
//                             user_data['timestamp_start'] = new Date(user_data['timestamp_start']).toString()
//                             user_data['timestamp_end'] = new Date(user_data['timestamp_end']).toString()
//                             val = $('#form').alpaca('get');
//                             //存数据-property
//                             for (prop of Object.keys(form_properties)) {
//                                 //如果是放图片的，略过
//                                 // if (prop == 'img') continue;
//                                 if (val.getValue()[prop] != undefined) user_data[prop] = val.getValue()[prop]
//                                 else user_data[prop] = 'null'
//                             }

//                             init_end()
//                         }
//                     }
//                 }
//             }
//         }

//         var data = {
//             "img": './tutorial/history_surveypic.png',
//             // "img_plant": './tutorial/plant_surveypic.png',
//             // "img_schedule": './tutorial/schedule_surveypic.png'
//         }

//         $("#form").alpaca({
//             'options': options,
//             "schema": schema,
//             'data': data,
//             // "view": "bootstrap-display"
//         });

//         $(document).ready(function() {
//             $(window).keydown(function(event) {
//                 if (event.keyCode == 13) {
//                     event.preventDefault();
//                     return false;
//                 }
//             });
//         });
//     }
//     // --- END SURVEY