var save_form_answers = () => {

    age = document.getElementById('age').value;
    country = document.getElementById('country').value;

    gender_all = document.getElementsByName('gender');
    education_all = document.getElementsByName('education');
    sum_impress_all = document.getElementsByClassName('r1 sum_impress');
    sum_like_all = document.getElementsByClassName('r1 sum_like');
    // sum_share_all = document.getElementsByClassName('r1 sum_share');

    sum_impress_why = document.getElementById('sum_impress_why').value;
    sum_like_why = document.getElementById('sum_like_why').value;


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

    var sum_impress = [];
    for (i = 0; i < 10; i++) {
        if (sum_impress_all[i].checked == true) {
            sum_impress.push(questions_shuffle[i]['id'])
        }
    }


    var sum_like = [];
    for (i = 0; i < 10; i++) {
        if (sum_like_all[i].checked == true) {
            sum_like.push(questions_shuffle[i]['id'])
        }
    }

    // var sum_share = [];
    // for (i = 0; i < 10; i++) {
    //     if (sum_share_all[i].checked == true) {
    //         sum_share.push(questions_shuffle[i]['id'])
    //     }
    // }

    if (age && gender && education && country && sum_impress_why && sum_like_why && sum_impress.length != 0 && sum_like.length != 0) {
        user_data['age'] = age;
        user_data['gender'] = gender;
        user_data['country'] = country;
        user_data['education'] = education;
        user_data['sum_impress'] = sum_impress;
        user_data['sum_impress_why'] = sum_impress_why;
        user_data['sum_like'] = sum_like;
        user_data['sum_like_why'] = sum_like_why;
        // user_data['sum_share'] = sum_share;
        user_data['feedback'] = document.getElementById('feedback').value;
        user_data['timestamp_end'] = Date.now();
        user_data['worktime_in_seconds'] = (user_data['timestamp_end'] - user_data['timestamp_start']) / 1000;
        user_data['timestamp_start'] = new Date(user_data['timestamp_start']).toString();
        user_data['timestamp_end'] = new Date(user_data['timestamp_end']).toString();
        init_end()
    } else {
        console.log('pls fill in')
        error = document.createElement('div')
        error.innerHTML = 'Please answer all the questions'
        error.style.color = 'red'
        d.append(error)
    }
}



var init_survey = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<p><strong>Survey:</strong>'
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d.innerHTML += '<br><p><strong>1. Age</strong></p>'

    input = document.createElement('input')
    input.id = "age"
    input.name = "age"

    d.append(input)

    d.innerHTML += '<br><br><p><strong>2. Gender</strong></p>'
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




    d.innerHTML += '<br><p><strong>3. Country</strong></p>'
    input_3 = document.createElement('input')
    input_3.id = "country"
    input_3.name = "country"

    d.append(input_3)


    d.innerHTML += '<br><br><p><strong>4. What is the highest level of education that you have completed?</strong></p>'
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

    d.innerHTML += '<br><br><p><strong>5. Below shows all the 10 animated chart viewed by you. Which animation(s) impressed you most? (You can choose more than one)</strong></p><br>'

    gallery = document.createElement('div')
    d.append(gallery)
    gallery.style.border = "4px solid #8DC487"
    gallery.style.textAlign = "center"
    gallery.style.padding = "10px"


    for (var i = 0; i < 10; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "220px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        l1 = document.createElement("img");
        l1.src = './img/' + questions_shuffle[i]['src'];
        l1.style.width = '220px';
        // l1.innerHTML = i;
        l1.className = "l1";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "sum_impress" + i;
        r1.className = "r1 sum_impress";
        r1.value = i;
        choice.append(l1);
        choice.append(r1);
        gallery.append(choice)
    }

    d.innerHTML += '<br><br><p><strong>Please explain your reasons.</strong></p><br>'

    textarea_1 = document.createElement('textarea')
        // input.name = "reason"
    textarea_1.id = "sum_impress_why"
        // input.size = "35"
    textarea_1.style.width = "500px"
    textarea_1.style.height = "60px"

    d.append(textarea_1)


    d.innerHTML += '<br><br><p><strong>6. Below shows all the 10 animated charts viewed by you. Which is/are your favorite animation(s)? (You can choose more than one)</strong></p><br>'

    gallery2 = document.createElement('div')
    d.append(gallery2)
    gallery2.style.border = "4px solid #8DC487"
    gallery2.style.textAlign = "center"
    gallery2.style.padding = "10px"


    for (var i = 0; i < 10; i++) {
        choice = document.createElement("span");
        choice.style.display = "inline-block";
        choice.style.width = "220px";
        choice.style.height = "20px";
        choice.style.textAlign = "center";
        l1 = document.createElement("img");
        l1.src = './img/' + questions_shuffle[i]['src'];
        l1.style.width = '220px';
        // l1.innerHTML = i;
        l1.className = "l1";
        r1 = document.createElement("input");
        r1.type = "radio";
        r1.name = "sum_like" + i;
        r1.className = "r1 sum_like";
        r1.value = i;
        choice.append(l1);
        choice.append(r1);
        gallery2.append(choice)
    }

    d.innerHTML += '<br><br><p><strong>Please explain your reasons.</strong></p><br>'

    textarea_2 = document.createElement('textarea')
        // input.name = "reason"
    textarea_2.id = "sum_like_why"
        // input.size = "35"
    textarea_2.style.width = "500px"
    textarea_2.style.height = "60px"

    d.append(textarea_2)



    // d.innerHTML += '<br><br><p><strong>7. Below shows all the 10 animations you have viewed. Which animation(s) do you want to share most? (You can choose more than one)</strong></p><br>'

    // gallery3 = document.createElement('div')
    // d.append(gallery3)
    // gallery3.style.border = "4px solid #8DC487"
    // gallery3.style.textAlign = "center"
    // gallery3.style.padding = "10px"

    // for (var i = 0; i < 10; i++) {
    //     choice = document.createElement("span");
    //     choice.style.display = "inline-block";
    //     choice.style.width = "220px";
    //     choice.style.height = "20px";
    //     choice.style.textAlign = "center";
    //     l1 = document.createElement("img");
    //     l1.src = './img/' + questions_shuffle[i]['src'];
    //     l1.style.width = '220px';
    //     // l1.innerHTML = i;
    //     l1.className = "l1";
    //     r1 = document.createElement("input");
    //     r1.type = "radio";
    //     r1.name = "sum_share" + i;
    //     r1.className = "r1 sum_share";
    //     r1.value = i;
    //     choice.append(l1);
    //     choice.append(r1);
    //     gallery3.append(choice)
    // }


    d.innerHTML += '<br><br><p><strong>7. Please leave your feedback or comments related to this study below (optional).</strong></p><br>'

    textarea_3 = document.createElement('textarea')
        // input.name = "reason"
    textarea_3.id = "feedback"
        // input.size = "35"
    textarea_3.style.width = "500px"
    textarea_3.style.height = "120px"

    d.append(textarea_3)


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