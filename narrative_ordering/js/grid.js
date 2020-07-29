<<<<<<< HEAD
var grid_width = 600
var grid_margin = 70


=======
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
var save_q4_answers = () => {

    position = document.getElementById('circle').getAttribute("transform")

    position = position.match(/\(([^)]+)\)/)[1].split(",")

    var x = d3.scaleLinear()
<<<<<<< HEAD
        .domain([-3, 3])
        .range([grid_margin, grid_width - grid_margin]);

    var y = d3.scaleLinear()
        .domain([3, -3])
        .range([grid_margin, grid_width - grid_margin]);
=======
        .domain([-10, 10])
        .range([50, 350]);

    var y = d3.scaleLinear()
        .domain([10, -10])
        .range([50, 350]);
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    var position_invert = []
    position_invert.push(x.invert(position[0]))
    position_invert.push(y.invert(position[1]))

<<<<<<< HEAD
    if (document.getElementById('grid_reason').value != '') {
        new_answer = {
            'index': questions[current_question]['original_index'],
            'like': position_invert[0],
            'learn': position_invert[1],
            'grid_reason': document.getElementById('grid_reason').value,
            'elapsed_time': Date.now() - cur_start_time,
            'dataset': questions[current_question]['dataset'],
            'pattern': questions[current_question]['pattern'],
        }
        user_answers.push(new_answer)
        user_data['answers'] = user_answers
        db.collection(incomplete_collection).add(user_data)
        if (current_question < questions.length - 1) {
            current_question++
            next_question()
        } else {
            user_data['full_questions_time'] = Date.now() - init_timestamp
            init_survey()
        }
    } else {
        console.log('pls fill in')
        error = document.createElement('div')
        error.innerHTML = 'Please provide reason for the placement.'
        error.style.color = 'red'
        d.append(error)
    }
=======

    new_answer = {
        'index': questions[current_question]['original_index'],
        'expressiveness': position_invert[0],
        'learnability': position_invert[1],
        'grid_reason': document.getElementById('grid_reason').value,
        'elapsed_time': Date.now() - cur_start_time,
        'ques_index': questions[current_question]['ques_index'],
        'pattern': questions[current_question]['pattern'],
    }
    user_answers.push(new_answer)
    user_data['answers'] = user_answers
    db.collection(incomplete_collection).add(user_data)
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
}

var init_grid = () => {
    document.body.innerHTML = ''
    d = document.createElement('div')
<<<<<<< HEAD
    text = '<p><strong>Question 3: Grid</strong></p> <br> <p>Place the red button to where you feel right with.</p>'
=======
    text = '<b>Overall evaluation</b> <br> <b>Place the red button to where you feel right with.'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    d.innerHTML = text
    d.style.textAlign = 'left'
    d.style.margin = '2%'
    document.body.append(d)

    d_2 = document.createElement('div')
    d_2.id = 'grid'
    d_2.style.textAlign = 'left'
    d_2.style.display = 'inline-block'
    document.body.append(d_2)

    d_3 = document.createElement('div')
<<<<<<< HEAD
    d_3.innerHTML = 'Please write down your reason: <br>'
=======
    d_3.innerHTML = 'Please provide your reason: <br>'
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    d_3.style.textAlign = 'left'
    d_3.style.margin = '2%'
    d_3.style.display = 'inline-block'
    document.body.append(d_3)
    textarea = document.createElement('textarea')
        // input.name = "reason"
    textarea.id = "grid_reason"
        // input.size = "35"
    textarea.style.width = "500px"
    textarea.style.height = "100px"

    d_3.append(textarea)

<<<<<<< HEAD
=======
    var grid_width = 600
    var grid_margin = 70

>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    var svg = d3.select("#grid").append("svg")
        .attr("width", grid_width)
        .attr("height", grid_width)
        // .on("click", click);

    var x = d3.scaleLinear()
        .domain([-3, 3])
        .range([grid_margin, grid_width - grid_margin]);

    var xaxis = d3.axisBottom(x)
        .ticks(5)

    var y = d3.scaleLinear()
        .domain([3, -3])
        .range([grid_margin, grid_width - grid_margin]);

    var yaxis = d3.axisLeft(y)
        .ticks(5)

    svg
        .append("g")
        .attr("transform", "translate(0," + grid_width / 2 + ")")
        .call(xaxis)

    svg.append("text")
<<<<<<< HEAD
        .attr("transform", "translate(" + grid_width / 2 + "," + (grid_margin - 20) + ")")
        .style("text-anchor", "middle")
        .text("Learnt");

    svg.append("text")
        .attr("transform", "translate(" + grid_width / 2 + "," + (grid_width - grid_margin + 20) + ")")
        .style("text-anchor", "middle")
        .text("Didn't learn");
=======
        .attr("transform", "translate(" + grid_width / 2 + ",10)")
        .style("text-anchor", "middle")
        .text("Learn a lot");

    svg.append("text")
        .attr("transform", "translate(" + grid_width / 2 + "," + (grid_width - grid_margin) + ")")
        .style("text-anchor", "middle")
        .text("Learn nothing");
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4


    svg
        .append("g")
        .attr("transform", "translate(" + grid_width / 2 + ", 0)")
        .call(yaxis)

    svg.append("text")
        .attr("transform", "translate(" + (grid_width - grid_margin) + "," + (grid_width / 2 + 20) + ")")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
<<<<<<< HEAD
        .text("Liked it");
=======
        .text("Expressive");
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4

    svg.append("text")
        .attr("transform", "translate(" + grid_margin + "," + (grid_width / 2 + 20) + ")")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
<<<<<<< HEAD
        .text("Disliked it");
=======
        .text("Not Expressive");
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4




    var xPointer = svg
        .append('line')
        .attr('id', 'x-pointer')
        .attr('stroke', '#bbb')
        .attr("class", "hahaha")
        .attr('stroke-width', 2)
        .style("stroke-dasharray", ("7, 3"))
        .attr("x1", grid_width / 2)
        .attr("y1", grid_width / 2)
        .attr("x2", grid_width / 2)
        .attr("y2", grid_width / 2);



    var yPointer = svg
        .append('line')
        .attr('id', 'y-pointer')
        .attr('stroke', '#bbb')
        .attr("class", "hahaha")
        .attr('stroke-width', 2)
        .style("stroke-dasharray", ("7, 3"))
        .attr("x1", grid_width / 2)
        .attr("y1", grid_width / 2)
        .attr("x2", grid_width / 2)
        .attr("y2", grid_width / 2);



    function dragmove(d) {
        var pos_x = function() {
            if (d3.event.x >= grid_width - grid_margin) return grid_width - grid_margin;
            else if (d3.event.x <= grid_margin) return grid_margin;
            else return d3.event.x;
        }
        var pos_y = function() {
            if (d3.event.y >= grid_width - grid_margin) return grid_width - grid_margin;
            else if (d3.event.y <= grid_margin) return grid_margin;
            else return d3.event.y;
        }

        d3.select(this).attr("transform", "translate(" + pos_x() + "," + pos_y() + ")");
        d3.select("#x-pointer").attr("x1", grid_width / 2);
        d3.select("#x-pointer").attr("y1", pos_y());
        d3.select("#x-pointer").attr("x2", pos_x());
        d3.select("#x-pointer").attr("y2", pos_y());
<<<<<<< HEAD
        d3.select("#xpos").text("like: " + Math.round(x.invert(pos_x()) * 10) / 10);
        d3.select("#ypos").text("learn: " + Math.round(y.invert(pos_y()) * 10) / 10);
=======
        d3.select("#xpos").text("expressiveness: " + Math.round(x.invert(pos_x()) * 10) / 10);
        d3.select("#ypos").text("learnability: " + Math.round(y.invert(pos_y()) * 10) / 10);
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
        d3.select("#xpos").attr("transform", "translate(" + pos_x() + "," + pos_y() + ")");
        d3.select("#ypos").attr("transform", "translate(" + pos_x() + "," + pos_y() + ")");
        d3.select("#y-pointer").attr("x1", pos_x());
        d3.select("#y-pointer").attr("y1", grid_width / 2);
        d3.select("#y-pointer").attr("x2", pos_x());
        d3.select("#y-pointer").attr("y2", pos_y());
    }

    var drag = d3.drag()
        .on("drag", dragmove);


    svg.append('circle')
        .attr("transform", "translate(" + grid_width / 2 + "," + grid_width / 2 + ")")
        .attr("id", "circle")
<<<<<<< HEAD
        .attr("r", "15")
        .attr("stroke", "red")
        .attr("stroke-width", "5px")
        .attr("fill", "transparent")
=======
        .attr("r", "10")
        .attr("fill", "red")
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
        .call(drag)

    svg.append('text')
        .attr("transform", "translate(" + grid_width / 2 + "," + grid_width / 2 + ")")
        .attr("class", "pos")
        .attr("id", "xpos")
        .attr("x", -60)
        .attr("dy", 30);

    svg.append('text')
        .attr("transform", "translate(" + grid_width / 2 + "," + grid_width / 2 + ")")
        .attr("class", "pos")
        .attr("id", "ypos")
        .attr("x", -60)
        .attr("dy", 50);



    btn = document.createElement('button')
    if (current_question < questions.length - 1) btn.innerHTML = 'Next Story'
    else btn.innerHTML = 'End test'
        // btn.style.marginLeft = '45%'
    btn.className = 'button f_button'
        // btn.style.display = 'block'
        // btn.style.fontSize = 'large'
    btn.onclick = () => {
        save_q4_answers()
<<<<<<< HEAD
=======
        if (current_question < questions.length - 1) {
            current_question++
            next_question()
        } else {
            user_data['full_questions_time'] = Date.now() - test_start_time
            init_survey()
        }
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    }
    document.body.append(btn)
}