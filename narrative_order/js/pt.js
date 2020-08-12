var save_q1_answers = () => {
    //document.getElementById('pt').value
    if (document.getElementById('value-time').innerHTML) {
        new_answer = {
            'index': questions[current_question]['original_index'],
            'pt': document.getElementById('value-time').innerHTML,
            'elapsed_time': Date.now() - cur_start_time,
            'ques_index': questions[current_question]['ques_index'],
            'pattern': questions[current_question]['pattern'],
        }
        user_answers.push(new_answer)
        user_data['answers'] = user_answers
        db.collection(incomplete_collection).add(user_data)
        init_emotion()
    } else {
        console.log('pls fill in')
        error = document.createElement('div')
        error.innerHTML = 'Please drag the bar to set your answer'
        error.style.color = 'red'
        d.append(error)
    }
}

var init_pt = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
    text = '<b>Quiz 1:</b> Your perception of time: </b><br>How long do you think the prior story lasted? (please write in seconds) '
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)
        // input = document.createElement('input')
        // input.name = "pt"
        // input.id = "pt"
        // d.append(input)

    d_2 = document.createElement('div')
    d_2.style.width = "50%"
    document.body.append(d_2)
    d_value = document.createElement('p')
    d_value.id = "value-time"
    d_2.append(d_value)

    d_3 = document.createElement('div')
    d_3.id = "slider-time"
    d_3.style.width = "50%"
    document.body.append(d_3)

    // d_value = document.createElement('p')
    // d_value.id = "value-simple"
    // d_2.append(d_value)

    // <div class="col-sm-2"><p id="value-simple"></p></div>
    // <div class="col-sm"><div id="slider-simple"></div></div>



    var dataTime = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map(function(d) {
        return new Date(1995, 10, 3, 3, 0, 0 + d);
    });


    var sliderTime = d3
        .sliderBottom()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        // .step(1000 * 60 * 60 * 24 * 365)
        .width(400)
        .tickFormat(d3.timeFormat('%M: %S'))
        .tickValues(dataTime)
        .default(new Date(1995, 10, 3, 3, 0, 0))
        .on('onchange', val => {
            d3.select('p#value-time').text(d3.timeFormat('%M')(val) + "min " + d3.timeFormat('%S')(val) + "s");
        });

    var gTime = d3
        .select('div#slider-time')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gTime.call(sliderTime);

    // d3.select('p#value-time').text(d3.timeFormat('%S')(sliderTime.value()));

    btn = document.createElement('button')
    btn.innerHTML = 'Next Quiz'
    btn.style.margin = '5%'
    btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_q1_answers()
    }
    document.body.append(btn)
}