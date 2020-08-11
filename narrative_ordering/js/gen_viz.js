var line = d3
    .line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    });

var curve = d3
    .line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .curve(d3.curveCatmullRomClosed.alpha(1));

var curveOpen = d3
    .line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .curve(d3.curveCatmullRom.alpha(1));

var interval = 40

//【重要】画出左边的选项卡和右边的图
function gen_question(text, pattern, dataset) {
    //生成到数据的路径  
    // var path = "./datasets/line.csv";

    var path = "./datasets/";
    if (dataset == "history") {
        // path += "history_recurrence.csv";
        if (pattern == "1") path += "history_chronology.csv";
        else if (pattern == "2") path += "history_trace.csv";
        else if (pattern == "3") path += "history_trailer.csv";
        else if (pattern == "4") path += "history_recurrence.csv";
        else if (pattern == "5") path += "history_halfway.csv";
        else if (pattern == "6") path += "history_anchor.csv";
    } else if (dataset == "population") {
        // path += "line_chronology.csv";
        if (pattern == "1") path += "line_chronology.csv";
        else if (pattern == "2") path += "line_trace.csv";
        else if (pattern == "3") path += "line_trailer.csv";
        else if (pattern == "4") path += "line_recurrence.csv";
        else if (pattern == "5") path += "line_halfway.csv";
        else if (pattern == "6") path += "line_anchor.csv";
    } else if (dataset == "diary") {
        // path += "diary_chronology.csv";
        if (pattern == "1") path += "diary_chronology.csv";
        else if (pattern == "2") path += "diary_trace.csv";
        else if (pattern == "3") path += "diary_trailer.csv";
        else if (pattern == "4") path += "diary_recurrence.csv";
        else if (pattern == "5") path += "diary_halfway.csv";
        else if (pattern == "6") path += "diary_anchor.csv";
    }
    // else if (dataset == "story3") path += "plants.csv";
    // else if (dataset == "story4") path += "schedule.csv";

    d3.csv(path).then(data => {
        //截取前datalimit行
        // if (dataset == "stock") data = data.slice(0, 26);
        // else data = data.slice(0, datalimit);

        //大div，装了左边的form和右边的vis
        var divquestion = document.createElement("div")
        divquestion.setAttribute("id", "replayable")
        divquestion.style.position = 'relative'
        divquestion.style.height = height + 'px'
        divquestion.style.marginTop = '3%'
            //在大div里生成一个svg
        var svg = d3
            .select(divquestion)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("position", "absolute")
            .style("left", "0px")
            // console.log('create svg')
            // 创建一个form，并放到大div里
        var divradio = document.createElement("form");
        divradio.style.textAlign = "left";
        divradio.id = "divradio";
        // divradio.style.maxWidth = '30%'
        //通过函数传的文字放进去
        divradio.innerHTML = "<b>Story " + (current_question + 1) + ": " + text + "</b>" + "<p>The animation will start in 3 seconds</p>";
        divquestion.append(divradio);

        document.body.append(divquestion);

        b = document.createElement('button')
        b.style.zIndex = 10
        b.style.display = 'none'
        b.innerHTML = "Next"
        b.className = 'button f_button'
        b.id = 'story_finish'

        b.onclick = () => {
            init_recall()
        }

        document.body.append(b)

        b_replay = document.createElement('button')
        b_replay.style.zIndex = 10
        b_replay.style.display = 'none'
        b_replay.innerHTML = "Replay"
        b_replay.className = 'button replay_button'
        b_replay.id = 'story_replay'

        document.body.append(b_replay)

        b_replay.onclick = () => {
            user_data[questions_shuffle[current_question]['dataset'] + '_replay'] = user_data[questions_shuffle[current_question]['dataset'] + '_replay'] + 1
            clearvis()
            gen_question(questions_shuffle[current_question]['text'], questions_shuffle[current_question]['pattern'], questions_shuffle[current_question]['dataset'])
        }

        if (pattern == "1") create_chronological_timeline(svg, data, datalimit);
        else if (pattern == "2") create_trace_timeline(svg, data, datalimit);
        else if (pattern == "3") create_trailer_timeline(svg, data, datalimit);
        else if (pattern == "4") create_recurrence_timeline(svg, data, datalimit);
        else if (pattern == "5") create_halfway_timeline(svg, data, datalimit);
        else if (pattern == "6") create_anchor_timeline(svg, data, datalimit);

        //user_data['assigned_question_type'] == 3 这个是为了判断true/false，如果为true，vis会是clickable的
        // if (dataset == 'history') {
        //     // create_recurrence_timeline(svg, data, datalimit)
        //     if (pattern == "1") create_chronological_timeline(svg, data, datalimit);
        //     else if (pattern == "2") create_trace_timeline(svg, data, datalimit);
        //     else if (pattern == "3") create_trailer_timeline(svg, data, datalimit);
        //     else if (pattern == "4") create_recurrence_timeline(svg, data, datalimit);
        //     else if (pattern == "5") create_halfway_timeline(svg, data, datalimit);
        //     else if (pattern == "6") create_anchor_timeline(svg, data, datalimit);
        // } else if (dataset == 'population') {
        //     // create_anchor_line(svg, data, datalimit)
        //     if (pattern == "1") create_chronological_line(svg, data, datalimit);
        //     else if (pattern == "2") create_trace_line(svg, data, datalimit);
        //     else if (pattern == "3") create_trailer_line(svg, data, datalimit);
        //     else if (pattern == "4") create_recurrence_line(svg, data, datalimit);
        //     else if (pattern == "5") create_halfway_line(svg, data, datalimit);
        //     else if (pattern == "6") create_anchor_line(svg, data, datalimit);
        // }
        // else if (dataset == 'story3') {
        //     if (pattern == "1") create_chronological_timeline(svg, data, nps, datalimit);
        //     else if (pattern == "2") create_retrograde_timeline(svg, data, nps, datalimit);
        //     else if (pattern == "3") create_turnahead_timeline(svg, data, nps, datalimit);
        //     else create_turnback_timeline(svg, data, datalimit);
        // } else if (dataset == 'story4') {
        //     if (pattern == "1") create_chronological_timeline(svg, data, nps, datalimit);
        //     else if (pattern == "2") create_retrograde_timeline(svg, data, nps, datalimit);
        //     else if (pattern == "3") create_turnahead_timeline(svg, data, nps, datalimit);
        //     else create_turnback_timeline(svg, data, datalimit);
        // }

        // if (answer != null) {
        //     a = document.createElement("div");
        //     a.innerHTML = "correct answer:   " + answer + "<br><br><br>";
        //     document.body.append(a);
        // }


    });
}

var clearvis = () => {
    d3.select('#replayable').remove(); //删除整个div
}



//——————————LINE——————————

var create_chronological_line = (svg, data, datalimit) => {

    console.log("chronological")

    var margin = { top: 100, right: 250, bottom: 150, left: 70 },
        width_chart = width - margin.left - margin.right,
        height_chart = height - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");

    // var xLine = d3.scaleLinear()
    //     .domain([0, 9])
    //     .range([0, width]);

    // X scale will use the index of our data
    var x = d3.scaleTime()
        .range([0, width_chart]);
    // 6. Y scale will use the randomly generate number 
    var y = d3.scaleLinear()
        .range([height_chart, 0]);

    // var valueline = d3.line()
    //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
    //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

    var linegraph = svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // .append("g")
    // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);


    var realGDPline = linegraph.append("line")
        .attr("class", "line")
        .style("stroke", "transparent");

    var focus = linegraph.append("g")
        .attr("fill", "black");

    focus.append("circle")
        .attr("r", 5);

    var t = focus.append("text")
        .attr("x", 0)
        .attr("dy", "-0.7em");

    var counter = 0;

    var lineGen = d3.line()
        .x(function(d, i) {
            return x(i <= counter ? d.date : data[counter].date);
        })
        .y(function(d, i) {
            return y(i <= counter ? d.close : data[counter].close);
        })

    var pathLine = linegraph.append('path').datum(data)
        .attr('d', lineGen)
        .classed('line', true)

    // Add the x Axis
    linegraph.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height_chart + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    linegraph.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

    function start() {

        counter = 0;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus.attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        // focus.select("text")
        // .text(data[counter].np);

        t.selectAll("tspan.text_" + counter)
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            });

    }

    start();

    var delay = 0


    for (counter = 1; counter < data.length; counter++) {
        movefocus(counter)
    }

    function movefocus(counter) {



        // counter++;
        var d = data[counter]

        realGDPline
            .transition()
            .ease(d3.easeLinear)
            .delay(function() {
                if (data[counter - 1].np) return delay = delay + interval
                else return delay = delay + 500
            })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .delay(delay)
            .duration(500)
            // .delay(10000 - counter * 500)
            .attr('d', lineGen)

        t.selectAll("tspan.text_" + (counter - 1))
            .transition()
            .delay(delay)
            .style("display", "none")

        t
            .selectAll("tspan.text_" + counter)
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });
        // .style('opacity', 1)
        // .duration(2000)
        // .style('opacity', 0)



        // setTimeout(function() {
        //     debugger;
        //     t.selectAll('tspan.text').remove()
        // }, delay + 2000)



        focus
            .transition()
            .delay(delay)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")
            // .select("text")
            // .text(data[counter].close + data[counter].np);


        // focus
        //     .transition()
        //     .delay(counter * 500)
        //     .duration(500)

        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            // .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisLeft(y));


    }

    if (user_data['population_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }

}

var create_trailer_line = (svg, data, datalimit) => {

    console.log("trailer")

    var margin = { top: 100, right: 250, bottom: 150, left: 70 },
        width_chart = width - margin.left - margin.right,
        height_chart = height - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");

    // var xLine = d3.scaleLinear()
    //     .domain([0, 9])
    //     .range([0, width]);

    // X scale will use the index of our data
    var x = d3.scaleTime().range([0, width_chart]);
    // 6. Y scale will use the randomly generate number 
    var y = d3.scaleLinear().range([height_chart, 0]);

    // var valueline = d3.line()
    //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
    //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

    var linegraph = svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // .append("g")
    // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    var realGDPline = linegraph.append("line")
        .attr("class", "line")
        .style("stroke", "transparent");

    var focus = linegraph.append("g")
        .attr("fill", "black");

    focus.append("circle")
        .attr("r", 5);

    var t = focus.append("text")
        .attr("x", 0)
        .attr("dy", "-0.7em");

    var counter = 0;

    var lineGen = d3.line()
        .x(function(d, i) {
            return x(i <= counter ? d.date : data[counter].date);
        })
        .y(function(d, i) {
            return y(i <= counter ? d.close : data[counter].close);
        })

    var pathLine = linegraph.append('path').datum(data)
        .attr('d', lineGen)
        .classed('line', true)

    // Add the x Axis
    linegraph.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height_chart + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    linegraph.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

    function start() {

        counter = 0;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus.attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_" + counter + "_trailer")
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter + "_trailer")
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            });

    }

    function start2() {

        counter = data.length - 1;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus
            .transition()
            .delay(3000)
            .duration(500)
            .attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_0_trailer")
            .transition()
            .delay(3000)
            .style("display", "none")

        t.selectAll("tspan.text_" + counter + "_trailer")
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter + "_trailer")
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .attr("opacity", 0)
            .transition()
            .delay(3000)
            .attr("opacity", 1)
    }

    start();
    start2();

    var delay = 0

    for (counter = 0; counter < data.length; counter++) {
        movefocus(counter)
    }

    function movefocus(counter) {

        // counter++;
        var d = data[counter]

        realGDPline
            .transition()
            .ease(d3.easeLinear)
            .delay(function() {
                if (counter > 0) {
                    if (data[counter - 1].np2) return delay = delay + interval
                    else return delay = delay + 500
                } else return delay = delay + interval * 2
            })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .delay(delay)
            .duration(500)
            // .delay(10000 - counter * 500)
            .attr('d', lineGen)


        focus
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")

        if (counter == 0) {
            t.selectAll("tspan.text_11_trailer")
                .transition()
                .delay(delay)
                .style("display", "none")
        } else {
            t.selectAll("tspan.text_" + (counter - 1))
                .transition()
                .delay(delay)
                .style("display", "none")
        }

        t
            .selectAll("tspan.text_" + counter)
            .data(d => data[counter].np2.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np2.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np2.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });

        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisLeft(y));


    }

    if (user_data['population_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }



}

var create_recurrence_line = (svg, data, datalimit) => {

    console.log("recurrence")
        // hahaha = []
        // hahaha.push(data[9])
        // hahaha.push(data[10])

    var margin = { top: 100, right: 250, bottom: 150, left: 70 },
        width_chart = width - margin.left - margin.right,
        height_chart = height - margin.top - margin.bottom;


    var parseTime = d3.timeParse("%Y");

    // var xLine = d3.scaleLinear()
    //     .domain([0, 9])
    //     .range([0, width]);

    // X scale will use the index of our data
    var x = d3.scaleTime().range([0, width_chart]);
    // 6. Y scale will use the randomly generate number 
    var y = d3.scaleLinear().range([height_chart, 0]);

    // var valueline = d3.line()
    //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
    //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

    var linegraph = svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // .append("g")
    // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    var realGDPline = linegraph.append("line")
        .attr("class", "line")
        .style("stroke", "transparent");

    var focus = linegraph.append("g")
        .attr("fill", "black");

    focus.append("circle")
        .attr("r", 5);

    t = focus.append("text")
        .attr("x", 0)
        .attr("dy", "-0.7em");

    var counter = 0;

    var lineGen = d3.line()
        .x(function(d, i) {
            return x(i <= counter ? d.date : data[counter].date);
        })
        .y(function(d, i) {
            return y(i <= counter ? d.close : data[counter].close);
        })

    var pathLine = linegraph.append('path').datum(data)
        .attr('d', lineGen)
        .classed('line', true)

    // Add the x Axis
    linegraph.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height_chart + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    linegraph.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

    function start() {

        counter = 0;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus
            .attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_" + counter)
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            });


    }

    // function start2() {

    //     counter = 0;

    //     realGDPline
    //         .attr("x1", x(data[counter].date))
    //         .attr("y1", y(data[counter].close))
    //         .attr("x2", x(data[counter].date))
    //         .attr("y2", y(data[counter].close));

    //     focus
    //         .transition()
    //         .delay(function() { delay = delay + interval })
    //         .duration(500)
    //         .attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

    //     t.selectAll("tspan.text_11")
    //         .transition()
    //         .delay(delay)
    //         .style("display", "none")

    //     t.selectAll("tspan.text_" + counter + "_again")
    //         .data(d => data[counter].np.split("\\n"))
    //         .enter()
    //         .append("tspan")
    //         .attr("class", "text_" + counter + "_again")
    //         .text(d => d)
    //         .style("font-size", curems + "em")
    //         .attr("x", function() {
    //             return this.parentElement.x.baseVal[0].value
    //         })
    //         .attr("dx", 10)
    //         .attr("dy", 20)
    //         .attr("opacity", 0)
    //         .transition()
    //         .delay(delay)
    //         .attr("opacity", 1)

    // }

    var delay = 0;

    start();

    for (counter = 1; counter < data.length; counter++) {
        movefocus(counter)
    }


    // start2();

    for (counter = 0; counter < data.length; counter++) {
        movefocus_forward(counter)
    }


    function movefocus(counter) {

        // counter++;
        var d = data[counter]


        realGDPline
            .transition()
            .ease(d3.easeLinear)
            // .delay(counter * 500)
            // .delay(10000 - counter * 500)
            .delay(function() { delay = delay + interval })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .delay(delay)
            .duration(500)
            // .delay(counter * 500)
            // .delay(10000 - counter * 500)
            .attr('d', lineGen)

        t.selectAll("tspan.text_" + (counter - 1))
            .transition()
            .delay(delay)
            .style("display", "none")

        t
            .selectAll("tspan.text_" + counter)
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });

        focus
            .transition()
            .delay(delay)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")


        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            .delay(delay)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            .delay(delay)
            .duration(490)
            .call(d3.axisLeft(y));


    }

    function movefocus_forward(counter) {

        // counter++;
        var d = data[counter]


        realGDPline
            .transition()
            .ease(d3.easeLinear)
            // .delay(10000 + counter * 500)
            .delay(function() {
                if (counter > 0) {
                    if (data[counter - 1].np2) return delay = delay + interval
                    else return delay = delay + 500
                } else return delay = delay + interval
            })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .duration(500)
            .delay(delay)
            // .delay(10000 + counter * 500)
            .attr('d', lineGen)


        focus
            .transition()
            // .delay(10000 + counter * 500)
            .delay(delay)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")

        t.selectAll("tspan.text_11")
            .transition()
            .delay(delay)
            .style("display", "none")

        t.selectAll("tspan.text_" + (counter - 1) + "_again")
            .transition()
            .delay(delay)
            .style("display", "none")

        t
            .selectAll("tspan.text_" + counter + "_again")
            .data(d => data[counter].np2.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter + "_again")
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np2.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np2.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });

        // focus
        //     .transition()
        //     .delay(counter * 500)
        //     .duration(500)


        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            // .delay(10000 + counter * 500)
            .delay(delay)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            // .delay(10000 + counter * 500)
            .delay(delay)
            .duration(500)
            .call(d3.axisLeft(y));


    }

    if (user_data['population_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }


}


var create_trace_line = (svg, data, datalimit) => {

    console.log("trace")

    var margin = { top: 100, right: 250, bottom: 150, left: 70 },
        width_chart = width - margin.left - margin.right,
        height_chart = height - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");

    // var xLine = d3.scaleLinear()
    //     .domain([0, 9])
    //     .range([0, width]);

    // X scale will use the index of our data
    var x = d3.scaleTime().range([0, width_chart]);
    // 6. Y scale will use the randomly generate number 
    var y = d3.scaleLinear().range([height_chart, 0]);

    // var valueline = d3.line()
    //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
    //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

    var linegraph = svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // .append("g")
    // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    var realGDPline = linegraph.append("line")
        .attr("class", "line")
        .style("stroke", "transparent");

    var focus = linegraph.append("g")
        .attr("fill", "black");

    focus.append("circle")
        .attr("r", 5);

    var t = focus.append("text")
        .attr("x", 0)
        .attr("dy", "-0.7em");

    var counter = 0;

    var lineGen = d3.line()
        .x(function(d, i) {
            return x(i <= counter ? d.date : data[counter].date);
        })
        .y(function(d, i) {
            return y(i <= counter ? d.close : data[counter].close);
        })

    var pathLine = linegraph.append('path').datum(data)
        .attr('d', lineGen)
        .classed('line', true)

    // Add the x Axis
    linegraph.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height_chart + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    linegraph.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

    function start() {

        counter = data.length - 1;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus.attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_" + counter + "_trace")
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter + "_trace")
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            });

    }

    start();

    var delay = 0

    for (counter = 0; counter < data.length; counter++) {
        movefocus(counter)
    }

    function movefocus(counter) {

        // counter++;
        var d = data[counter]

        realGDPline
            .transition()
            .ease(d3.easeLinear)
            .delay(function() {
                if (counter > 0) {
                    if (data[counter - 1].np2) return delay = delay + interval
                    else return delay = delay + 500
                } else return delay = delay + interval
            })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .delay(delay)
            .duration(500)
            // .delay(10000 - counter * 500)
            .attr('d', lineGen)


        focus
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")

        t.selectAll("tspan.text_11_trace")
            .transition()
            .delay(delay)
            .style("display", "none")

        t.selectAll("tspan.text_" + (counter - 1))
            .transition()
            .delay(delay)
            .style("display", "none")



        t.selectAll("tspan.text_" + counter)
            .data(d => data[counter].np2.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np2.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np2.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });


        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisLeft(y));


    }

    if (user_data['population_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }


}


// var create_retrograde_line = (svg, data, datalimit) => {

//     var margin = { top: 20, right: 20, bottom: 50, left: 70 },
//         width = 940 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom;

//     var parseTime = d3.timeParse("%Y");

//     // var xLine = d3.scaleLinear()
//     //     .domain([0, 9])
//     //     .range([0, width]);

//     // X scale will use the index of our data
//     var x = d3.scaleTime().range([0, width]);
//     // 6. Y scale will use the randomly generate number 
//     var y = d3.scaleLinear().range([height, 0]);

//     // var valueline = d3.line()
//     //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
//     //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

//     var linegraph = svg
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//     // .append("g")
//     // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

//     data.forEach(function(d) {
//         d.date = parseTime(d.date);
//         d.close = +d.close;
//     });

//     // Scale the range of the data
//     x.domain(d3.extent(data, function(d) { return d.date; }));
//     y.domain([0, d3.max(data, function(d) { return d.close; })]);

//     var realGDPline = linegraph.append("line")
//         .attr("class", "line")
//         .style("stroke", "transparent");

//     var focus = linegraph.append("g")
//         .attr("fill", "black");

//     focus.append("circle")
//         .attr("r", 5);

//     var t = focus.append("text")
//         .attr("x", 0)
//         .attr("dy", "-0.7em");

//     var counter = data.length - 1;

//     var lineGen = d3.line()
//         .x(function(d, i) {
//             return x(i <= counter ? d.date : data[counter].date);
//         })
//         .y(function(d, i) {
//             return y(i <= counter ? d.close : data[counter].close);
//         })

//     var pathLine = linegraph.append('path').datum(data)
//         .attr('d', lineGen)
//         .classed('line', true)

//     // Add the x Axis
//     linegraph.append("g")
//         .attr("class", "xAxis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));

//     // Add the y Axis
//     linegraph.append("g")
//         .attr("class", "yAxis")
//         .call(d3.axisLeft(y));

//     function start() {
//         counter = data.length - 1;

//         realGDPline
//             .attr("x1", x(data[counter].date))
//             .attr("y1", y(data[counter].close))
//             .attr("x2", x(data[counter].date))
//             .attr("y2", y(data[counter].close));

//         focus.attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

//         t.selectAll("tspan.text_" + counter)
//             .data(d => data[counter].np.split("\\n"))
//             .enter()
//             .append("tspan")
//             .attr("class", "text_" + counter)
//             .text(d => d)
//             .style("font-size", curems + "px")
//             .attr("x", function() {
//                 return this.parentElement.x.baseVal[0].value
//             })
//             .attr("dx", 10)
//             .attr("dy", 20);

//     }

//     start();

//     var delay = 0;

//     for (counter = data.length - 2; counter > -1; counter--) {
//         movefocus(counter)
//     }


//     function movefocus(counter) {

//         // counter++;
//         var d = data[counter]
//             // debugger;


//         realGDPline
//             .transition()
//             .ease(d3.easeLinear)
//             .delay(function() {
//                 if (data[counter + 1].np) return delay = delay + 2000
//                 else return delay = delay + 500
//             })
//             .duration(500)
//             .attr("x2", x(data[1].date))
//             .attr("y2", y(data[1].close));

//         pathLine
//             .transition()
//             .ease(d3.easeLinear)
//             .delay(delay)
//             .duration(500)
//             // .delay(10000 - counter * 500)
//             .attr('d', lineGen)


//         focus
//             .transition()
//             .delay(delay)
//             // .delay(10000 - counter * 500)
//             .duration(500)
//             .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")

//         t.selectAll("tspan.text_" + (counter + 1))
//             .transition()
//             .delay(delay)
//             .style("display", "none")

//         t
//             .selectAll("tspan.text_" + counter)
//             .data(d => data[counter].np.split("\\n"))
//             .enter()
//             .append("tspan")
//             .attr("class", "text_" + counter)
//             .style("font-size", curems + "px")
//             .attr("x", 0)
//             .attr("dx", 10)
//             .attr("dy", 20)
//             .transition()
//             .delay(delay)
//             .duration(500)
//             .text(function(d, i) { return d });


//         // focus
//         //     .transition()
//         //     .delay(counter * 500)
//         //     .duration(500)

//         x.domain(d3.extent(data, function(d) {
//             return d.date;
//         }));
//         y.domain([0, d3.max(data, function(d) {
//             return d.close;
//         })]);

//         linegraph.selectAll(".xAxis")
//             .transition()
//             .delay(function() {
//                 return data.length * 2000 - 2000 * counter;
//             })
//             // .delay(10000 - counter * 500)
//             .duration(500)
//             .call(d3.axisBottom(x));

//         // Add the y Axis
//         linegraph.selectAll(".yAxis")
//             .transition()
//             .delay(delay)
//             // .delay(10000 - counter * 500)
//             .duration(500)
//             .call(d3.axisLeft(y));


//     }
//     setTimeout(function() {
//         document.getElementById('story_finish').style.display = "block"
//     }, delay + 1000)


// }

var create_halfway_line = (svg, data, datalimit) => {

    console.log("halfway-back")

    var margin = { top: 100, right: 250, bottom: 150, left: 70 },
        width_chart = width - margin.left - margin.right,
        height_chart = height - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");

    // var xLine = d3.scaleLinear()
    //     .domain([0, 9])
    //     .range([0, width]);

    // X scale will use the index of our data
    var x = d3.scaleTime().range([0, width_chart]);
    // 6. Y scale will use the randomly generate number 
    var y = d3.scaleLinear().range([height_chart, 0]);

    // var valueline = d3.line()
    //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
    //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

    var linegraph = svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // .append("g")
    // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    var realGDPline = linegraph.append("line")
        .attr("class", "line")
        .style("stroke", "transparent");

    var focus = linegraph.append("g")
        .attr("fill", "black");

    focus.append("circle")
        .attr("r", 5);

    var t = focus.append("text")
        .attr("x", 0)
        .attr("dy", "-0.7em");

    var counter = 0;

    var lineGen = d3.line()
        .x(function(d, i) {
            return x(i <= counter ? d.date : data[counter].date);
        })
        .y(function(d, i) {
            return y(i <= counter ? d.close : data[counter].close);
        })

    var pathLine = linegraph.append('path').datum(data)
        .attr('d', lineGen)
        .classed('line', true)

    // Add the x Axis
    linegraph.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height_chart + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    linegraph.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

    function start() {

        counter = 6;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus.attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_" + counter + "_half")
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter + "_half")
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            });


    }

    start();

    var delay = 0

    for (counter = 0; counter < data.length; counter++) {
        movefocus(counter)
    }

    function movefocus(counter) {

        // counter++;
        var d = data[counter]

        realGDPline
            .transition()
            .ease(d3.easeLinear)
            .delay(function() {
                if (counter > 0) {
                    if (data[counter - 1].np2) return delay = delay + interval
                    else return delay = delay + 500
                } else return delay = delay + interval
            })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .delay(delay)
            .duration(500)
            // .delay(10000 - counter * 500)
            .attr('d', lineGen)


        focus
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")

        t.selectAll("tspan.text_6_half")
            .transition()
            .delay(delay)
            .style("display", "none")


        t.selectAll("tspan.text_" + (counter - 1))
            .transition()
            .delay(delay)
            .style("display", "none")

        t
            .selectAll("tspan.text_" + counter)
            .data(d => data[counter].np2.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np2.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np2.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });


        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            .delay(delay)
            // .delay(10000 - counter * 500)
            .duration(500)
            .call(d3.axisLeft(y));
    }

    if (user_data['population_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }


}


//     console.log("parting")
//         // hahaha = []
//         // hahaha.push(data[9])
//         // hahaha.push(data[10])

//     var margin = { top: 20, right: 20, bottom: 50, left: 70 },
//         width = 940 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom;

//     var parseTime = d3.timeParse("%Y");

//     // var xLine = d3.scaleLinear()
//     //     .domain([0, 9])
//     //     .range([0, width]);

//     // X scale will use the index of our data
//     var x = d3.scaleTime().range([0, width]);
//     // 6. Y scale will use the randomly generate number 
//     var y = d3.scaleLinear().range([height, 0]);

//     // var valueline = d3.line()
//     //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
//     //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

//     var linegraph = svg
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//     // .append("g")
//     // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

//     data.forEach(function(d) {
//         d.date = parseTime(d.date);
//         d.close = +d.close;
//     });

//     // Scale the range of the data
//     x.domain(d3.extent(data, function(d) { return d.date; }));
//     y.domain([0, d3.max(data, function(d) { return d.close; })]);

//     var realGDPline = linegraph.append("line")
//         .attr("class", "line")
//         .style("stroke", "transparent");

//     var focus = linegraph.append("g")
//         .attr("fill", "black");

//     focus.append("circle")
//         .attr("r", 5);

//     var t = focus.append("text")
//         .attr("x", 0)
//         .attr("dy", "-0.7em");

//     var counter = 5;

//     var lineGen = d3.line()
//         .x(function(d, i) {
//             if (counter >= 5) {
//                 if (i < 5) return x(data[5].date)
//                 else if (5 <= i && i <= counter) return x(d.date)
//                 else if (i > counter) return x(data[counter].date)
//             }
//             // debugger;
//             // return xScaleGDP(i <= counter ? d.date : dataGDP[counter].date);
//             else if (counter < 5) {
//                 if (i <= counter) return x(data[counter].date)
//                 else return x(d.date);
//             }
//         })
//         .y(function(d, i) {
//             // return yScaleGDP(i <= counter ? d.GDPreal : dataGDP[counter].GDPreal);
//             if (counter >= 5) {
//                 if (i < 5) return y(data[5].close)
//                 else if (5 <= i && i <= counter) return y(d.close)
//                 else if (i > counter) return y(data[counter].close)
//             } else if (counter < 5) {
//                 if (i <= counter) return y(data[counter].close)
//                 else return y(d.close);
//             }
//         })

//     var pathLine = linegraph.append('path').datum(data)
//         .attr('d', lineGen)
//         .classed('line', true)

//     // Add the x Axis
//     linegraph.append("g")
//         .attr("class", "xAxis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));

//     // Add the y Axis
//     linegraph.append("g")
//         .attr("class", "yAxis")
//         .call(d3.axisLeft(y));

//     function start() {

//         counter = 5;

//         realGDPline
//             .attr("x1", x(data[counter].date))
//             .attr("y1", y(data[counter].close))
//             .attr("x2", x(data[counter].date))
//             .attr("y2", y(data[counter].close));

//         focus.attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

//         t.selectAll("tspan.text_" + counter + "_parting")
//             .data(d => data[counter].np.split("\\n"))
//             .enter()
//             .append("tspan")
//             .attr("class", "text_" + counter + "_parting")
//             .text(d => d)
//             .style("font-size", curems + "px")
//             .attr("x", function() {
//                 return this.parentElement.x.baseVal[0].value
//             })
//             .attr("dx", 10)
//             .attr("dy", 20);
//     }

//     function start2() {

//         counter = 5;

//         realGDPline
//             .attr("x1", x(data[counter].date))
//             .attr("y1", y(data[counter].close))
//             .attr("x2", x(data[counter].date))
//             .attr("y2", y(data[counter].close));

//         focus
//             .transition()
//             .delay(function() { return delay = delay + interval })
//             .attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

//         t.selectAll("tspan.text_11")
//             .transition()
//             .delay(delay)
//             .style("display", "none")


//         t.selectAll("tspan.text_" + counter)
//             .data(d => data[counter].np.split("\\n"))
//             .enter()
//             .append("tspan")
//             .attr("class", "text_" + counter)
//             .text(d => d)
//             .style("font-size", curems + "px")
//             .attr("x", function() {
//                 return this.parentElement.x.baseVal[0].value
//             })
//             .attr("dx", 10)
//             .attr("dy", 20)
//             .attr("opacity", 0)
//             .transition()
//             .delay(delay)
//             .duration(500)
//             .attr("opacity", 1)
//             .text(function(d, i) { return d });

//     }


//     start();

//     var delay = 0

//     for (counter = 6; counter < data.length; counter++) {
//         movefocus(counter)
//     }

//     start2()

//     for (counter = 4; counter > -1; counter--) {
//         movefocus_forward(counter)
//     }


//     function movefocus(counter) {

//         // counter++;
//         var d = data[counter]


//         realGDPline
//             .transition()
//             .ease(d3.easeLinear)
//             // .delay(counter * 500)
//             // .delay(10000 - counter * 500)
//             .delay(function() {
//                 if (data[counter - 1].np) return delay = delay + interval
//                 else return delay = delay + 500
//             })
//             .duration(500)
//             .attr("x2", x(data[1].date))
//             .attr("y2", y(data[1].close));

//         pathLine
//             .transition()
//             .ease(d3.easeLinear)
//             .delay(delay)
//             .duration(500)
//             // .delay(counter * 500)
//             // .delay(10000 - counter * 500)
//             .attr('d', lineGen)


//         focus
//             .transition()
//             // .delay(counter * 500)
//             // .delay(10000 - counter * 500)
//             .delay(delay)
//             .duration(500)
//             .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")

//         t.selectAll("tspan.text_5_parting")
//             .transition()
//             .delay(delay)
//             .style("display", "none")


//         t.selectAll("tspan.text_" + (counter - 1))
//             .transition()
//             .delay(delay)
//             .style("display", "none")

//         t
//             .selectAll("tspan.text_" + counter)
//             .data(d => data[counter].np.split("\\n"))
//             .enter()
//             .append("tspan")
//             .attr("class", "text_" + counter)
//             .style("font-size", curems + "px")
//             .attr("x", 0)
//             .attr("dx", 10)
//             .attr("dy", 20)
//             .transition()
//             .delay(delay)
//             .duration(500)
//             .text(function(d, i) { return d });



//         x.domain(d3.extent(data, function(d) {
//             return d.date;
//         }));
//         y.domain([0, d3.max(data, function(d) {
//             return d.close;
//         })]);

//         linegraph.selectAll(".xAxis")
//             .transition()
//             // .delay(counter * 500)
//             // .delay(10000 - counter * 500)
//             .delay(delay)
//             .duration(500)
//             .call(d3.axisBottom(x));

//         // Add the y Axis
//         linegraph.selectAll(".yAxis")
//             .transition()
//             // .delay(counter * 500)
//             // .delay(10000 - counter * 500)
//             .delay(delay)
//             .duration(490)
//             .call(d3.axisLeft(y));


//     }

//     function movefocus_forward(counter) {

//         // counter++;
//         var d = data[counter]


//         realGDPline
//             .transition()
//             .ease(d3.easeLinear)
//             // .delay(10000 + counter * 500)
//             .delay(function() {
//                 if (data[counter + 1].np) return delay = delay + interval
//                 else return delay = delay + 500
//             })
//             .duration(500)
//             .attr("x2", x(data[1].date))
//             .attr("y2", y(data[1].close));

//         pathLine
//             .transition()
//             .ease(d3.easeLinear)
//             .duration(500)
//             .delay(delay)
//             // .delay(10000 + counter * 500)
//             .attr('d', lineGen)


//         focus
//             .transition()
//             // .delay(10000 + counter * 500)
//             .delay(delay)
//             .duration(500)
//             .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")


//         t.selectAll("tspan.text_" + (counter + 1))
//             .transition()
//             .delay(delay)
//             .style("display", "none")

//         t
//             .selectAll("tspan.text_" + counter)
//             .data(d => data[counter].np.split("\\n"))
//             .enter()
//             .append("tspan")
//             .attr("class", "text_" + counter)
//             .style("font-size", curems + "px")
//             .attr("x", 0)
//             .attr("dx", 10)
//             .attr("dy", 20)
//             .transition()
//             .delay(delay)
//             .duration(500)
//             .text(function(d, i) { return d });



//         x.domain(d3.extent(data, function(d) {
//             return d.date;
//         }));
//         y.domain([0, d3.max(data, function(d) {
//             return d.close;
//         })]);

//         linegraph.selectAll(".xAxis")
//             .transition()
//             // .delay(10000 + counter * 500)
//             .delay(delay)
//             .duration(500)
//             .call(d3.axisBottom(x));

//         // Add the y Axis
//         linegraph.selectAll(".yAxis")
//             .transition()
//             // .delay(10000 + counter * 500)
//             .delay(delay)
//             .duration(500)
//             .call(d3.axisLeft(y));
//     }

//     setTimeout(function() {
//         document.getElementById('story_finish').style.display = "block"
//     }, delay + 1000)

// }

var create_anchor_line = (svg, data, datalimit) => {

    console.log("anchor")
        // hahaha = []
    var margin = { top: 100, right: 250, bottom: 150, left: 70 },
        width_chart = width - margin.left - margin.right,
        height_chart = height - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");

    // var xLine = d3.scaleLinear()
    //     .domain([0, 9])
    //     .range([0, width]);

    // X scale will use the index of our data
    var x = d3.scaleTime().range([0, width_chart]);
    // 6. Y scale will use the randomly generate number 
    var y = d3.scaleLinear().range([height_chart, 0]);

    // var valueline = d3.line()
    //     .x(function(d) { return x(d.date); }) // set the x values for the line generator
    //     .y(function(d) { return y(d.close); }) // set the y values for the line generator 

    var linegraph = svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // .append("g")
    // .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    var realGDPline = linegraph.append("line")
        .attr("class", "line")
        .style("stroke", "transparent");

    var focus = linegraph.append("g")
        .attr("fill", "black");

    focus.append("circle")
        .attr("r", 5);

    var t = focus.append("text")
        .attr("x", 0)
        .attr("dy", "-0.7em");

    var breaking = 6;
    var counter = breaking + 0;

    var lineGen = d3.line()
        .x(function(d, i) {
            if (counter > breaking) {
                if (i <= counter) return x(d.date)
                else if (i > counter) return x(data[counter].date)
            }
            // debugger;
            // return xScaleGDP(i <= counter ? d.date : dataGDP[counter].date);
            else if (counter <= breaking) {
                if (i <= counter) return x(data[counter].date)
                else if (i > breaking) return x(data[breaking].date)
                else return x(d.date);
            }
        })
        .y(function(d, i) {
            // return yScaleGDP(i <= counter ? d.GDPreal : dataGDP[counter].GDPreal);
            if (counter > breaking) {
                if (i <= counter) return y(d.close)
                else if (i > counter) return y(data[counter].close)
            } else if (counter <= breaking) {
                if (i <= counter) return y(data[counter].close)
                else if (i > breaking) return y(data[breaking].close)
                else return y(d.close);
            }
        })

    var pathLine = linegraph.append('path').datum(data)
        .attr('d', lineGen)
        .classed('line', true)

    // Add the x Axis
    linegraph.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height_chart + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    linegraph.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

    function start() {

        counter = breaking;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus.attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_" + counter + "_anchor")
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter + "_anchor")
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            });

    }

    function start2() {

        counter = breaking;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus
            .transition()
            .delay(function() { return delay = delay + interval })
            .attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_0")
            .transition()
            .delay(delay)
            .style("display", "none")


        t.selectAll("tspan.text_" + counter)
            .data(d => data[counter].np2.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np2.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np2.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .attr("opacity", 0)
            .transition()
            .delay(delay)
            .duration(500)
            .attr("opacity", 1)
            .text(function(d, i) { return d });

    }

    function start3() {

        counter = breaking;

        realGDPline
            .attr("x1", x(data[counter].date))
            .attr("y1", y(data[counter].close))
            .attr("x2", x(data[counter].date))
            .attr("y2", y(data[counter].close));

        focus
            .transition()
            .delay(function() { return delay = delay + interval })
            .attr("transform", "translate(" + x(data[counter].date) + "," + y(data[counter].close) + ")");

        t.selectAll("tspan.text_11")
            .transition()
            .delay(delay)
            .style("display", "none")


        t.selectAll("tspan.text_" + counter + "_anchor2")
            .data(d => data[counter].np3.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter + "_anchor2")
            .text(d => d)
            .style("font-size", "14px")
            .attr("x", function() {
                return this.parentElement.x.baseVal[0].value
            })
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np3.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np3.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .attr("opacity", 0)
            .transition()
            .delay(delay)
            .duration(500)
            .attr("opacity", 1)
            .text(function(d, i) { return d });

    }


    delay = 0

    start();

    for (counter = breaking - 1; counter > -1; counter--) {
        movefocus(counter)
    }

    start2()

    for (counter = breaking + 1; counter < data.length; counter++) {
        movefocus_forward(counter)
    }

    start3()



    function movefocus(counter) {

        // counter++;
        var d = data[counter]


        realGDPline
            .transition()
            .ease(d3.easeLinear)
            // .delay(counter * 500)
            // .delay(10000 - counter * 500)
            .delay(function() { return delay = delay + interval })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .delay(delay)
            .duration(500)
            // .delay(counter * 500)
            // .delay(10000 - counter * 500)
            .attr('d', lineGen)


        focus
            .transition()
            // .delay(counter * 500)
            // .delay(10000 - counter * 500)
            .delay(delay)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")

        t.selectAll("tspan.text_" + breaking + "_anchor")
            .transition()
            .delay(delay)
            .style("display", "none")


        t.selectAll("tspan.text_" + (counter + 1))
            .transition()
            .delay(delay)
            .style("display", "none")

        t
            .selectAll("tspan.text_" + counter)
            .data(d => data[counter].np.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });




        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            // .delay(counter * 500)
            // .delay(10000 - counter * 500)
            .delay(delay)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            // .delay(counter * 500)
            // .delay(10000 - counter * 500)
            .delay(delay)
            .duration(490)
            .call(d3.axisLeft(y));


    }

    function movefocus_forward(counter) {

        // counter++;
        var d = data[counter]


        realGDPline
            .transition()
            .ease(d3.easeLinear)
            // .delay(10000 + counter * 500)
            .delay(function() { return delay = delay + interval })
            .duration(500)
            .attr("x2", x(data[1].date))
            .attr("y2", y(data[1].close));

        pathLine
            .transition()
            .ease(d3.easeLinear)
            .duration(500)
            .delay(delay)
            // .delay(10000 + counter * 500)
            .attr('d', lineGen)


        focus
            .transition()
            // .delay(10000 + counter * 500)
            .delay(delay)
            .duration(500)
            .attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")")



        t.selectAll("tspan.text_" + (counter - 1))
            .transition()
            .delay(delay)
            .style("display", "none")

        t
            .selectAll("tspan.text_" + counter)
            .data(d => data[counter].np2.split("\\n"))
            .enter()
            .append("tspan")
            .attr("class", "text_" + counter)
            .style("font-size", "14px")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("dy", function(d, i) {
                if (data[counter].np2.split("\\n").length == 2) {
                    if (i == 0) return -30
                    else return 20
                } else if (data[counter].np2.split("\\n").length == 3) {
                    if (i == 0) return -50
                    else return 20
                }
                return -10
            })
            .transition()
            .delay(delay)
            .duration(500)
            .text(function(d, i) { return d });


        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        linegraph.selectAll(".xAxis")
            .transition()
            // .delay(10000 + counter * 500)
            .delay(delay)
            .duration(500)
            .call(d3.axisBottom(x));

        // Add the y Axis
        linegraph.selectAll(".yAxis")
            .transition()
            // .delay(10000 + counter * 500)
            .delay(delay)
            .duration(500)
            .call(d3.axisLeft(y));
    }

    if (user_data['population_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }

}




//—————————————————TIMELINE———————————————————


var create_chronological_timeline = (svg, data, datalimit) => {

    console.log("chronological")
        // LINE

    // startdate = data[0].Year
    // if (startdate.includes('Mon')) {
    //     data = make_schedule_proportional(data)
    // } else if (startdate.includes('Spring')) {} else {
    //     data = make_history_proportional(data)
    // }
    linegraph = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    svg
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 50)
        .attr("markerHeight", 50)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");

    //主线
    l = linegraph
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr(
            "d",
            line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
        )
        .attr("marker-start", "url(#triangle)")
        .attr("marker-end", "url(#triangle)");

    delay = 0;

    //事件标签
    t = linegraph
        .selectAll(".labeltext")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "labeltext hahaha")
        .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            (d, i) =>
            width * 0.1 +
            (0.5 * (width * 0.8)) / data.length +
            (i * (width * 0.8)) / data.length
        )
        .attr("y", 60 * curems)

    t.selectAll("tspan.text")
        .data(d => d.Event.split("\\n"))
        .enter()
        .append("tspan")
        .attr("class", "text")
        .text(d => d)
        .style("font-size", "14px")
        .attr("x", function() {
            return this.parentElement.x.baseVal[0].value
        })
        .attr("dx", 0)
        .attr("dy", 20);

    t
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0);



    delay = 0;

    // //虚线
    // t = linegraph.selectAll('.dashedline')
    //     .data(data)
    //     .enter()
    //     .append('path')
    //     .attr('stroke', '#bbb')
    //     .attr("class", "hahaha")
    //     .attr('stroke-width', 2)
    //     .style("stroke-dasharray", ("7, 3"))
    //     .attr('d', (d, i) => {
    //         if (data.filter(e => e.Event != '').indexOf(d) % 2 != 0 || d.Event == '') return []
    //         else return line([{
    //                 x: width * 0.1 +
    //                     (0.5 * (width * 0.8)) / data.length +
    //                     (i * (width * 0.8)) / data.length,
    //                 y: 25
    //             },
    //             {
    //                 x: width * 0.1 +
    //                     (0.5 * (width * 0.8)) / data.length +
    //                     (i * (width * 0.8)) / data.length,
    //                 y: 65
    //             }
    //         ])
    //     })
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + 3000
    //         else return delay = delay + 0
    //     })
    //     .style("opacity", 1)
    //     // .transition()
    //     // .style("opacity", 0)


    delay = 0;

    //时间标签
    t = linegraph
        .selectAll(".yeartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "yeartext hahaha")
        .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            (d, i) =>
            width * 0.1 +
            (0.5 * (width * 0.8)) / data.length +
            (i * (width * 0.8)) / data.length
        )
        .attr("text-anchor", "middle")
        .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
        .attr("font-weight", "bold")
        .style("font-size", "14px")
        .text(d => d.Year.split(" ")[0])
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0)


    // .on("click", d => (clickable ? highlight_elem(svg, d) : null))
    // .attr("cursor", clickable ? "pointer" : "default");

    // t = linegraph
    //     .selectAll(".yeartext2")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("class", "yeartext2")
    //     .attr("id", d => "yr2_" + d.Year.replace(/ /g, ""))
    //     .attr(
    //         "x",
    //         (d, i) =>
    //         width * 0.1 +
    //         (0.5 * (width * 0.8)) / data.length +
    //         (i * (width * 0.8)) / data.length
    //     )
    //     .attr("text-anchor", "middle")
    //     .attr("y", (d, i) => 0 * curems)
    //     .attr("font-weight", "bold")
    //     .style("font-size", curems + "em")
    //     .text(d => d.Year.split(" ").slice(1, d.Year.split(" ").length).join(" "))
    // .on("click", d => (clickable ? highlight_elem(svg, d) : null))
    // .attr("cursor", clickable ? "pointer" : "default");
    //刻度
    t = linegraph
        .selectAll(".tick")
        .data(data)
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
        .attr("d", (d, i) =>
            line([{
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / data.length +
                        (i * (width * 0.8)) / data.length,
                    y: 25
                },
                {
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / data.length +
                        (i * (width * 0.8)) / data.length,
                    y: 15
                }
            ])
        );
    if (user_data['history_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }

}

var create_trailer_timeline = (svg, data, datalimit) => {
    // LINE

    // startdate = data[0].Year
    // if (startdate.includes('Mon')) {
    //     data = make_schedule_proportional(data)
    // } else if (startdate.includes('Spring')) {} else {
    //     data = make_history_proportional(data)
    // }
    console.log("trailer")

    linegraph = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    svg
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 50)
        .attr("markerHeight", 50)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");

    //主线
    l = linegraph
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr(
            "d",
            line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
        )
        .attr("marker-start", "url(#triangle)")
        .attr("marker-end", "url(#triangle)");

    delay = 0;

    //事件标签
    t = linegraph
        .selectAll(".labeltext")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "labeltext hahaha")
        .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == 0) j = 0;
                else if (i == 1) j = data.length - 3;
                else if (i == 2) j = 0;
                else j = i - 2;
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 2) +
                    (j * (width * 0.8)) / (data.length - 2)

            }
        )
        .attr("y", 60 * curems)

    t.selectAll("tspan.text")
        .data(d => d.Event.split("\\n"))
        .enter()
        .append("tspan")
        .attr("class", "text")
        .text(d => d)
        .style("font-size", "14px")
        .attr("x", function() {
            return this.parentElement.x.baseVal[0].value
        })
        .attr("dx", 0)
        .attr("dy", 20);

    t
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0);


    // t = linegraph
    //     .selectAll(".labeltext")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("text-anchor", "middle")
    //     .attr("class", "labeltext hahaha")
    //     .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
    //     .attr(
    //         "x",
    //         function(d, i) {
    //             var j = 0;
    //             if (i == 0) j = 0;
    //             else if (i == 1) j = data.length - 3;
    //             else if (i == 2) j = 0;
    //             else j = i - 2;
    //             return width * 0.1 +
    //                 (0.5 * (width * 0.8)) / (data.length - 2) +
    //                 (j * (width * 0.8)) / (data.length - 2)

    //         }
    //     )
    //     .attr("y", (d, i) => data.filter(e => e.Event != '').indexOf(d) % 2 != 0 ? 60 * curems : 100 * curems)
    //     .style("font-size", curems + "em")
    //     .text(function(d, i) {
    //             if (d.Event) {
    //                 if (i == 0) return "Once upon a time, " + d.Event;
    //                 else if (i == data.length - 1) return "Finally, " + d.Event;
    //                 else return "Then, " + d.Event;
    //             }
    //         }
    //         // d.Event.split(" ")
    //         // .slice(0, Math.round(d.Event.split(" ").length / 2))
    //         // .join(" ")
    //     )
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + interval
    //         else return delay = delay + 0
    //     })
    //     .duration(500)
    //     .style("opacity", 1)
    //     .transition()
    //     .delay(interval-1000)
    //     .style("opacity", 0)


    delay = 0;

    // //虚线
    // t = linegraph.selectAll('.dashedline')
    //     .data(data)
    //     .enter()
    //     .append('path')
    //     .attr('stroke', '#bbb')
    //     .attr("class", "hahaha")
    //     .attr('stroke-width', 2)
    //     .style("stroke-dasharray", ("7, 3"))
    //     .attr('d', function(d, i) {
    //         if (data.filter(e => e.Event != '').indexOf(d) % 2 != 0 || d.Event == '') return []
    //         else {
    //             var j = 0;
    //             if (i == 0) j = 0;
    //             else if (i == 1) j = data.length - 3;
    //             else if (i == 2) j = 0;
    //             else j = i - 2;
    //             return line([{
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 2) +
    //                         (j * (width * 0.8)) / (data.length - 2),
    //                     y: 25
    //                 },
    //                 {
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 2) +
    //                         (j * (width * 0.8)) / (data.length - 2),
    //                     y: 65
    //                 }
    //             ])


    //         }
    //     })
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + 2000
    //         else return delay = delay + 0
    //     })
    //     .style("opacity", 1)
    //     .transition()
    //     .style("opacity", 0)


    // delay = 0;

    //时间标签
    t = linegraph
        .selectAll(".yeartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "yeartext hahaha")
        .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == 0) j = 0;
                else if (i == 1) j = data.length - 3;
                else if (i == 2) j = 0;
                else j = i - 2;
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 2) +
                    (j * (width * 0.8)) / (data.length - 2)

            }
        )
        .attr("text-anchor", "middle")
        .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
        .attr("font-weight", "bold")
        .style("font-size", "14px")
        .text(d => d.Year)
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0)

    //刻度
    t = linegraph
        .selectAll(".tick")
        .data(data)
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
        .attr("d", function(d, i) {
            var j = 0;
            if (i == 0) j = 0;
            else if (i == 1) j = data.length - 3;
            else if (i == 2) j = 0;
            else j = i - 2;
            return line([{
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 2) +
                        (j * (width * 0.8)) / (data.length - 2),
                    y: 25
                },
                {
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 2) +
                        (j * (width * 0.8)) / (data.length - 2),
                    y: 15
                }
            ])
        });
    if (user_data['history_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }

}

var create_recurrence_timeline = (svg, data, datalimit) => {
    // LINE

    // startdate = data[0].Year
    // if (startdate.includes('Mon')) {
    //     data = make_schedule_proportional(data)
    // } else if (startdate.includes('Spring')) {} else {
    //     data = make_history_proportional(data)
    // }
    console.log("recurrence")

    linegraph = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    svg
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 50)
        .attr("markerHeight", 50)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");

    //主线
    l = linegraph
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr(
            "d",
            line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
        )
        .attr("marker-start", "url(#triangle)")
        .attr("marker-end", "url(#triangle)");

    delay = 0;

    //事件标签
    t = linegraph
        .selectAll(".labeltext")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "labeltext hahaha")
        .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == data.length - 2) j = 0;
                else if (i == data.length - 1) j = data.length - 3;
                else j = i + 0;
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 2) +
                    (j * (width * 0.8)) / (data.length - 2)

            }
        )
        // .attr(
        //     "x",
        //     function(d, i) {
        //         var j = 0;
        //         if (i < data.length / 2) j = i;
        //         else j = i - data.length / 2;
        //         return width * 0.1 +
        //             (0.5 * (width * 0.8)) / (data.length / 2) +
        //             (j * (width * 0.8)) / (data.length / 2)

    //     }
    // )
    .attr("y", 60 * curems)

    t.selectAll("tspan.text")
        .data(d => d.Event.split("\\n"))
        .enter()
        .append("tspan")
        .attr("class", "text")
        .text(d => d)
        .style("font-size", "14px")
        .attr("x", function() {
            return this.parentElement.x.baseVal[0].value
        })
        .attr("dx", 0)
        .attr("dy", 20);

    t
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            return delay = delay + interval
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0);


    delay = 0;

    //时间标签
    t = linegraph
        .selectAll(".yeartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "yeartext hahaha")
        .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == data.length - 2) j = 0;
                else if (i == data.length - 1) j = data.length - 3;
                else j = i + 0;
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 2) +
                    (j * (width * 0.8)) / (data.length - 2)

            }
        )
        // .attr(
        //     "x",
        //     function(d, i) {
        //         var j = 0;
        //         if (i < data.length / 2) j = i;
        //         else j = i - data.length / 2;
        //         return width * 0.1 +
        //             (0.5 * (width * 0.8)) / (data.length / 2) +
        //             (j * (width * 0.8)) / (data.length / 2)

    //     }
    // )
    .attr("text-anchor", "middle")
        .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
        .attr("font-weight", "bold")
        .style("font-size", "14px")
        .text(d => d.Year.split(" ")[0])
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            return delay = delay + interval
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0)

    //刻度
    t = linegraph
        .selectAll(".tick")
        .data(data)
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
        .attr("d", function(d, i) {
            var j = 0;
            if (i == data.length - 2) j = 0;
            else if (i == data.length - 1) j = data.length - 3;
            else j = i + 0;
            return line([{
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 2) +
                        (j * (width * 0.8)) / (data.length - 2),
                    y: 25
                },
                {
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 2) +
                        (j * (width * 0.8)) / (data.length - 2),
                    y: 15
                }
            ])
        });
    //     var j = 0;
    //     if (i < data.length / 2) j = i;
    //     else j = i - data.length / 2;
    //     return line([{
    //             x: width * 0.1 +
    //                 (0.5 * (width * 0.8)) / (data.length / 2) +
    //                 (j * (width * 0.8)) / (data.length / 2),
    //             y: 25
    //         },
    //         {
    //             x: width * 0.1 +
    //                 (0.5 * (width * 0.8)) / (data.length / 2) +
    //                 (j * (width * 0.8)) / (data.length / 2),
    //             y: 15
    //         }
    //     ])
    if (user_data['history_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }
}


var create_trace_timeline = (svg, data, datalimit) => {


    // LINE

    // startdate = data[0].Year
    // if (startdate.includes('Mon')) {
    //     data = make_schedule_proportional(data)
    // } else if (startdate.includes('Spring')) {} else {
    //     data = make_history_proportional(data)
    // }
    console.log("trace-back")

    linegraph = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    svg
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 50)
        .attr("markerHeight", 50)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");

    //主线
    l = linegraph
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr(
            "d",
            line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
        )
        .attr("marker-start", "url(#triangle)")
        .attr("marker-end", "url(#triangle)");

    delay = 0;

    //事件标签

    t = linegraph
        .selectAll(".labeltext")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "labeltext hahaha")
        .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == 0) j = data.length - 2;
                else j = i - 1
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 1) +
                    (j * (width * 0.8)) / (data.length - 1)

            }
        )
        .attr("y", 60 * curems)

    t.selectAll("tspan.text")
        .data(d => d.Event.split("\\n"))
        .enter()
        .append("tspan")
        .attr("class", "text")
        .text(d => d)
        .style("font-size", "14px")
        .attr("x", function() {
            return this.parentElement.x.baseVal[0].value
        })
        .attr("dx", 0)
        .attr("dy", 20);

    t
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0);





    // .attr('x', 20)
    // .attr('dx', 10)
    // .attr('dy', 22)
    //     .attr(
    //         "x",
    //         function(d, i) {
    //             var j = 0;
    //             if (i == 0) j = data.length - 2;
    //             else j = i - 1
    //             return width * 0.1 +
    //                 (0.5 * (width * 0.8)) / (data.length - 1) +
    //                 (j * (width * 0.8)) / (data.length - 1)

    //     }
    // )
    // .attr("y", 60 * curems)
    // // .attr("y", (d, i) => data.filter(e => e.Event != '').indexOf(d) % 2 != 0 ? 60 * curems : 100 * curems)

    //     .text(function(d, i) {
    //             if (d.Event) {
    //                 if (i == 0) return "Once upon a time, " + d.Event;
    //                 if (i == data.length - 1) return "To sum up, " + d.Event;
    //                 else if (i == data.length - 1) return "Finally, " + d.Event;
    //                 else return "Then, " + d.Event;
    //             }
    //         }
    //         // d.Event.split(" ")
    //         // .slice(0, Math.round(d.Event.split(" ").length / 2))
    //         // .join(" ")
    //     )



    delay = 0;

    // //虚线
    // t = linegraph.selectAll('.dashedline')
    //     .data(data)
    //     .enter()
    //     .append('path')
    //     .attr('stroke', '#bbb')
    //     .attr("class", "hahaha")
    //     .attr('stroke-width', 2)
    //     .style("stroke-dasharray", ("7, 3"))
    //     .attr('d', function(d, i) {
    //         if (data.filter(e => e.Event != '').indexOf(d) % 2 != 0 || d.Event == '') return []
    //         else {
    //             var j = 0;
    //             if (i == 0) j = data.length - 2;
    //             else j = i - 1
    //             return line([{
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 1) +
    //                         (j * (width * 0.8)) / (data.length - 1),
    //                     y: 25
    //                 },
    //                 {
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 1) +
    //                         (j * (width * 0.8)) / (data.length - 1),
    //                     y: 65
    //                 }
    //             ])


    //         }
    //     })
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + 3000
    //         else return delay = delay + 0
    //     })
    //     .duration(500)
    //     .style("opacity", 1)
    //     .transition()
    //     .delay(2000)
    //     .style("opacity", 0)


    // delay = 0;

    //时间标签
    t = linegraph
        .selectAll(".yeartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "yeartext hahaha")
        .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == 0) j = data.length - 2;
                else j = i - 1
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 1) +
                    (j * (width * 0.8)) / (data.length - 1)

            }
        )
        .attr("text-anchor", "middle")
        .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
        .attr("font-weight", "bold")
        .style("font-size", "14px")
        .text(d => d.Year.split(" ")[0])
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0)

    //刻度
    t = linegraph
        .selectAll(".tick")
        .data(data)
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
        .attr("d", function(d, i) {
            var j = 0;
            if (i == 0) j = data.length - 2;
            else j = i - 1
            return line([{
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 1) +
                        (j * (width * 0.8)) / (data.length - 1),
                    y: 25
                },
                {
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 1) +
                        (j * (width * 0.8)) / (data.length - 1),
                    y: 15
                }
            ])
        });

    if (user_data['history_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }
}

// var create_retrograde_timeline = (svg, data, datalimit) => {

//     console.log("reverse chronological")
//         // LINE
//         // startdate = data[0].Year
//         // if (startdate.includes('Mon')) {
//         //     data = make_schedule_proportional(data)
//         // } else if (startdate.includes('Spring')) {} else {
//         //     data = make_history_proportional(data)
//         // }

//     linegraph = svg
//         .append("g")
//         .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

//     svg
//         .append("svg:defs")
//         .append("svg:marker")
//         .attr("id", "triangle")
//         .attr("refX", 6)
//         .attr("refY", 6)
//         .attr("markerWidth", 50)
//         .attr("markerHeight", 50)
//         .attr("markerUnits", "userSpaceOnUse")
//         .attr("orient", "auto")
//         .append("path")
//         .attr("d", "M 0 0 12 6 0 12 3 6")
//         .style("fill", "black");

//     //主线
//     l = linegraph
//         .append("path")
//         .attr("stroke", "black")
//         .attr("stroke-width", 3)
//         .attr(
//             "d",
//             line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
//         )
//         .attr("marker-start", "url(#triangle)")
//         .attr("marker-end", "url(#triangle)");

//     delay = interval * 13;

//     //事件标签
//     t = linegraph
//         .selectAll(".labeltext")
//         .data(data)
//         .enter()
//         .append("text")
//         .attr("text-anchor", "middle")
//         .attr("class", "labeltext hahaha")
//         .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
//         .attr(
//             "x",
//             (d, i) =>
//             width * 0.1 +
//             (0.5 * (width * 0.8)) / data.length +
//             (i * (width * 0.8)) / data.length
//         )
//         .attr("y", 60 * curems)

//     t.selectAll("tspan.text")
//         .data(d => d.Event.split("\\n"))
//         .enter()
//         .append("tspan")
//         .attr("class", "text")
//         .text(d => d)
//         .style("font-size", "14px")
//         .attr("x", function() {
//             return this.parentElement.x.baseVal[0].value
//         })
//         .attr("dx", 0)
//         .attr("dy", 20);

//     t
//         .style("opacity", 0)
//         .transition()
//         .delay(function(d, i) {
//             if (d.Year != '') return delay = delay - interval
//             else return delay = delay - 0
//         })
//         .duration(500)
//         .style("opacity", 1)
//         .transition()
//         .delay(interval - 1000)
//         .style("opacity", 0);

//     // t = linegraph
//     //     .selectAll(".labeltext")
//     //     .data(data)
//     //     .enter()
//     //     .append("text")
//     //     .attr("text-anchor", "middle")
//     //     .attr("class", "labeltext hahaha")
//     //     .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
//     //     .attr(
//     //         "x",
//     //         (d, i) =>
//     //         width * 0.1 +
//     //         (0.5 * (width * 0.8)) / data.length +
//     //         (i * (width * 0.8)) / data.length
//     //     )
//     //     .attr("y", (d, i) => data.filter(e => e.Event != '').indexOf(d) % 2 != 0 ? 60 * curems : 100 * curems)
//     //     .style("font-size", curems + "em")
//     //     .text(function(d, i) {
//     //             if (d.Event) {
//     //                 if (i == 0) return "Once upon a time, " + d.Event;
//     //                 else if (i == data.length - 1) return "Finally, " + d.Event;
//     //                 else return "Then, " + d.Event;
//     //             }
//     //         }
//     //         // d.Event.split(" ")
//     //         // .slice(0, Math.round(d.Event.split(" ").length / 2))
//     //         // .join(" ")
//     //     )
//     //     .style("opacity", 0)
//     //     .transition()
//     //     .delay(function(d, i) {
//     //         if (d.Year != '') return step = step - 3000
//     //         else return step = step + 0
//     //     })
//     //     .duration(500)
//     //     .style("opacity", 1)
//     //     .transition()
//     //     .style("opacity", 0)



//     delay = interval * 13;

//     // //虚线
//     // t = linegraph.selectAll('.dashedline')
//     //     .data(data)
//     //     .enter()
//     //     .append('path')
//     //     .attr('stroke', '#bbb')
//     //     .attr("class", "hahaha")
//     //     .attr('stroke-width', 2)
//     //     .style("stroke-dasharray", ("7, 3"))
//     //     .attr('d', (d, i) => {
//     //         if (data.filter(e => e.Event != '').indexOf(d) % 2 != 0 || d.Event == '') return []
//     //         else return line([{
//     //                 x: width * 0.1 +
//     //                     (0.5 * (width * 0.8)) / data.length +
//     //                     (i * (width * 0.8)) / data.length,
//     //                 y: 25
//     //             },
//     //             {
//     //                 x: width * 0.1 +
//     //                     (0.5 * (width * 0.8)) / data.length +
//     //                     (i * (width * 0.8)) / data.length,
//     //                 y: 65
//     //             }
//     //         ])
//     //     })
//     //     .style("opacity", 0)
//     //     .transition()
//     //     .delay(function(d, i) {
//     //         if (d.Year != '') return delay = delay - interval
//     //         else return delay = delay - 0
//     //     })
//     //     .style("opacity", 1)
//     //     .transition()
//     //     .style("opacity", 0)


//     // delay = interval * 12;

//     //时间标签
//     t = linegraph
//         .selectAll(".yeartext")
//         .data(data)
//         .enter()
//         .append("text")
//         .attr("class", "yeartext hahaha")
//         .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
//         .attr(
//             "x",
//             (d, i) =>
//             width * 0.1 +
//             (0.5 * (width * 0.8)) / data.length +
//             (i * (width * 0.8)) / data.length
//         )
//         .attr("text-anchor", "middle")
//         .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
//         .attr("font-weight", "bold")
//         .style("font-size", "14px")
//         .text(d => d.Year.split(" ")[0])
//         .style("opacity", 0)
//         .transition()
//         .delay(function(d, i) {
//             if (d.Year != '') return delay = delay - interval
//             else return delay = delay - 0
//         })
//         .duration(500)
//         .style("opacity", 1)
//         .transition()
//         .delay(interval - 1000)
//         .style("opacity", 0)

//     //刻度
//     t = linegraph
//         .selectAll(".tick")
//         .data(data)
//         .enter()
//         .append("path")
//         .attr("stroke", "black")
//         .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
//         .attr("d", (d, i) =>
//             line([{
//                     x: width * 0.1 +
//                         (0.5 * (width * 0.8)) / data.length +
//                         (i * (width * 0.8)) / data.length,
//                     y: 25
//                 },
//                 {
//                     x: width * 0.1 +
//                         (0.5 * (width * 0.8)) / data.length +
//                         (i * (width * 0.8)) / data.length,
//                     y: 15
//                 }
//             ])
//         );

//     setTimeout(function() {
//         document.getElementById('story_finish').style.display = "block"
//         document.getElementById('story_replay').style.display = "block"
//     }, interval * 13 + 2000)

// }

var create_halfway_timeline = (svg, data, datalimit) => {

    // LINE

    // startdate = data[0].Year
    // if (startdate.includes('Mon')) {
    //     data = make_schedule_proportional(data)
    // } else if (startdate.includes('Spring')) {} else {
    //     data = make_history_proportional(data)
    // }
    console.log("half-way back")

    linegraph = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    svg
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 50)
        .attr("markerHeight", 50)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");

    //主线
    l = linegraph
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr(
            "d",
            line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
        )
        .attr("marker-start", "url(#triangle)")
        .attr("marker-end", "url(#triangle)");

    delay = 0;

    //事件标签
    t = linegraph
        .selectAll(".labeltext")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "labeltext hahaha")
        .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == 0) j = 6;
                else j = i - 1
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 1) +
                    (j * (width * 0.8)) / (data.length - 1)

            }
        )
        .attr("y", 60 * curems)

    t.selectAll("tspan.text")
        .data(d => d.Event.split("\\n"))
        .enter()
        .append("tspan")
        .attr("class", "text")
        .text(d => d)
        .style("font-size", "14px")
        .attr("x", function() {
            return this.parentElement.x.baseVal[0].value
        })
        .attr("dx", 0)
        .attr("dy", 20);

    t
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0);

    // t = linegraph
    //     .selectAll(".labeltext")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("text-anchor", "middle")
    //     .attr("class", "labeltext hahaha")
    //     .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
    //     .attr(
    //         "x",
    //         function(d, i) {
    //             var j = 0;
    //             if (i == 0) j = data.length / 2 + 1;
    //             else j = i - 1
    //             return width * 0.1 +
    //                 (0.5 * (width * 0.8)) / (data.length - 1) +
    //                 (j * (width * 0.8)) / (data.length - 1)

    //         }
    //     )
    //     .attr("y", (d, i) => data.filter(e => e.Event != '').indexOf(d) % 2 != 0 ? 60 * curems : 100 * curems)
    //     .style("font-size", curems + "em")
    //     .text(function(d, i) {
    //             if (d.Event) {
    //                 if (i == 0) return "Once upon a time, " + d.Event;
    //                 if (i == data.length - 1) return "To sum up, " + d.Event;
    //                 else if (i == data.length - 1) return "Finally, " + d.Event;
    //                 else return "Then, " + d.Event;
    //             }
    //         }
    //         // d.Event.split(" ")
    //         // .slice(0, Math.round(d.Event.split(" ").length / 2))
    //         // .join(" ")
    //     )
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + interval
    //         else return delay = delay + 0
    //     })
    //     .duration(500)
    //     .style("opacity", 1)
    //     .transition()
    //     .delay(interval - 1000)
    //     .style("opacity", 0)



    delay = 0;

    // //虚线
    // t = linegraph.selectAll('.dashedline')
    //     .data(data)
    //     .enter()
    //     .append('path')
    //     .attr('stroke', '#bbb')
    //     .attr("class", "hahaha")
    //     .attr('stroke-width', 2)
    //     .style("stroke-dasharray", ("7, 3"))
    //     .attr('d', function(d, i) {
    //         if (data.filter(e => e.Event != '').indexOf(d) % 2 != 0 || d.Event == '') return []
    //         else {
    //             var j = 0;
    //             if (i == 0) j = data.length / 2 + 1;
    //             else j = i - 1
    //             return line([{
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 1) +
    //                         (j * (width * 0.8)) / (data.length - 1),
    //                     y: 25
    //                 },
    //                 {
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 1) +
    //                         (j * (width * 0.8)) / (data.length - 1),
    //                     y: 65
    //                 }
    //             ])


    //         }
    //     })
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + interval
    //         else return delay = delay + 0
    //     })
    //     .style("opacity", 1)
    //     .transition()
    //     .delay(interval-1000)
    //     .style("opacity", 0)


    // delay = 0;

    //时间标签
    t = linegraph
        .selectAll(".yeartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "yeartext hahaha")
        .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i == 0) j = 6;
                else j = i - 1
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 1) +
                    (j * (width * 0.8)) / (data.length - 1)

            }
        )
        .attr("text-anchor", "middle")
        .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
        .attr("font-weight", "bold")
        .style("font-size", "14px")
        .text(d => d.Year.split(" ")[0])
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0)

    //刻度
    t = linegraph
        .selectAll(".tick")
        .data(data)
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
        .attr("d", function(d, i) {
            var j = 0;
            if (i == 0) j = 6;
            else j = i - 1
            return line([{
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 1) +
                        (j * (width * 0.8)) / (data.length - 1),
                    y: 25
                },
                {
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 1) +
                        (j * (width * 0.8)) / (data.length - 1),
                    y: 15
                }
            ])
        });
    if (user_data['history_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }

}

// var create_parting_timeline = (svg, data, datalimit) => {

//     // LINE

//     // startdate = data[0].Year
//     // if (startdate.includes('Mon')) {
//     //     data = make_schedule_proportional(data)
//     // } else if (startdate.includes('Spring')) {} else {
//     //     data = make_history_proportional(data)
//     // }
//     console.log("parting")

//     var breaking = 6;

//     linegraph = svg
//         .append("g")
//         .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

//     svg
//         .append("svg:defs")
//         .append("svg:marker")
//         .attr("id", "triangle")
//         .attr("refX", 6)
//         .attr("refY", 6)
//         .attr("markerWidth", 50)
//         .attr("markerHeight", 50)
//         .attr("markerUnits", "userSpaceOnUse")
//         .attr("orient", "auto")
//         .append("path")
//         .attr("d", "M 0 0 12 6 0 12 3 6")
//         .style("fill", "black");

//     //主线
//     l = linegraph
//         .append("path")
//         .attr("stroke", "black")
//         .attr("stroke-width", 3)
//         .attr(
//             "d",
//             line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
//         )
//         .attr("marker-start", "url(#triangle)")
//         .attr("marker-end", "url(#triangle)");

//     delay = 0;

//     //事件标签
//     t = linegraph
//         .selectAll(".labeltext")
//         .data(data)
//         .enter()
//         .append("text")
//         .attr("text-anchor", "middle")
//         .attr("class", "labeltext hahaha")
//         .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
//         .attr(
//             "x",
//             function(d, i) {
//                 var j = 0;
//                 if (i < breaking) j = data.length - 1 - breaking + i;
//                 else j = data.length - 1 - i;
//                 return width * 0.1 +
//                     (0.5 * (width * 0.8)) / (data.length - 1) +
//                     (j * (width * 0.8)) / (data.length - 1)

//             }
//         )
//         .attr("y", 60 * curems)

//     t.selectAll("tspan.text")
//         .data(d => d.Event.split("\\n"))
//         .enter()
//         .append("tspan")
//         .attr("class", "text")
//         .text(d => d)
//         .style("font-size", curems + "em")
//         .attr("x", function() {
//             return this.parentElement.x.baseVal[0].value
//         })
//         .attr("dx", 0)
//         .attr("dy", 20);

//     t
//         .style("opacity", 0)
//         .transition()
//         .delay(function(d, i) {
//             if (d.Year != '') return delay = delay + interval
//             else return delay = delay + 0
//         })
//         .duration(500)
//         .style("opacity", 1)
//         .transition()
//         .delay(interval - 1000)
//         .style("opacity", 0);

//     // t = linegraph
//     //     .selectAll(".labeltext")
//     //     .data(data)
//     //     .enter()
//     //     .append("text")
//     //     .attr("text-anchor", "middle")
//     //     .attr("class", "labeltext hahaha")
//     //     .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
//     //     .attr(
//     //         "x",
//     //         function(d, i) {
//     //             var j = 0;
//     //             if (i < 11) j = 13 + i;
//     //             else j = 24 - i;
//     //             return width * 0.1 +
//     //                 (0.5 * (width * 0.8)) / (data.length - 1) +
//     //                 (j * (width * 0.8)) / (data.length - 1)

//     //         }
//     //     )
//     //     .attr("y", (d, i) => data.filter(e => e.Event != '').indexOf(d) % 2 != 0 ? 60 * curems : 100 * curems)
//     //     .style("font-size", curems + "em")
//     //     .text(function(d, i) {
//     //             if (d.Event) {
//     //                 if (i == 0) return "Once upon a time, " + d.Event;
//     //                 if (i == data.length - 1) return "To sum up, " + d.Event;
//     //                 else if (i == data.length - 1) return "Finally, " + d.Event;
//     //                 else return "Then, " + d.Event;
//     //             }
//     //         }
//     //         // d.Event.split(" ")
//     //         // .slice(0, Math.round(d.Event.split(" ").length / 2))
//     //         // .join(" ")
//     //     )
//     //     .style("opacity", 0)
//     //     .transition()
//     //     .delay(function(d, i) {
//     //         if (d.Year != '') return delay = delay + 3000
//     //         else return delay = delay + 0
//     //     })
//     //     .duration(500)
//     //     .style("opacity", 1)
//     //     .transition()
//     //     .delay(3000)
//     //     .style("opacity", 0)



//     delay = 0;

//     // //虚线
//     // t = linegraph.selectAll('.dashedline')
//     //     .data(data)
//     //     .enter()
//     //     .append('path')
//     //     .attr('stroke', '#bbb')
//     //     .attr("class", "hahaha")
//     //     .attr('stroke-width', 2)
//     //     .style("stroke-dasharray", ("7, 3"))
//     //     .attr('d', function(d, i) {
//     //         if (data.filter(e => e.Event != '').indexOf(d) % 2 != 0 || d.Event == '') return []
//     //         else {
//     //             var j = 0;
//     //             if (i < 11) j = 13 + i;
//     //             else j = 24 - i;
//     //             return line([{
//     //                     x: width * 0.1 +
//     //                         (0.5 * (width * 0.8)) / (data.length - 1) +
//     //                         (j * (width * 0.8)) / (data.length - 1),
//     //                     y: 25
//     //                 },
//     //                 {
//     //                     x: width * 0.1 +
//     //                         (0.5 * (width * 0.8)) / (data.length - 1) +
//     //                         (j * (width * 0.8)) / (data.length - 1),
//     //                     y: 65
//     //                 }
//     //             ])


//     //         }
//     //     })
//     //     .style("opacity", 0)
//     //     .transition()
//     //     .delay(function(d, i) {
//     //         if (d.Year != '') return delay = delay + 3000
//     //         else return delay = delay + 0
//     //     })
//     //     .style("opacity", 1)
//     //     // .transition()
//     //     // .style("opacity", 0)


//     // delay = 0;

//     //时间标签
//     t = linegraph
//         .selectAll(".yeartext")
//         .data(data)
//         .enter()
//         .append("text")
//         .attr("class", "yeartext hahaha")
//         .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
//         .attr(
//             "x",
//             function(d, i) {
//                 var j = 0;
//                 if (i < breaking) j = data.length - 1 - breaking + i;
//                 else j = data.length - 1 - i;
//                 return width * 0.1 +
//                     (0.5 * (width * 0.8)) / (data.length - 1) +
//                     (j * (width * 0.8)) / (data.length - 1)

//             }
//         )
//         .attr("text-anchor", "middle")
//         .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
//         .attr("font-weight", "bold")
//         .style("font-size", curems + "em")
//         .text(d => d.Year.split(" ")[0])
//         .style("opacity", 0)
//         .transition()
//         .delay(function(d, i) {
//             if (d.Year != '') return delay = delay + interval
//             else return delay = delay + 0
//         })
//         .duration(500)
//         .style("opacity", 1)
//         .transition()
//         .delay(interval - 1000)
//         .style("opacity", 0)

//     //刻度
//     t = linegraph
//         .selectAll(".tick")
//         .data(data)
//         .enter()
//         .append("path")
//         .attr("stroke", "black")
//         .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
//         .attr("d", function(d, i) {
//             // debugger;
//             var j = 0;
//             if (i < breaking) j = data.length - 1 - breaking + i;
//             else j = data.length - 1 - i;
//             return line([{
//                     x: width * 0.1 +
//                         (0.5 * (width * 0.8)) / (data.length - 1) +
//                         (j * (width * 0.8)) / (data.length - 1),
//                     y: 25
//                 },
//                 {
//                     x: width * 0.1 +
//                         (0.5 * (width * 0.8)) / (data.length - 1) +
//                         (j * (width * 0.8)) / (data.length - 1),
//                     y: 15
//                 }
//             ])
//         });
//     setTimeout(function() {
//         document.getElementById('story_finish').style.display = "block"
//     }, delay + 1000)

// }


var create_anchor_timeline = (svg, data, datalimit) => {

    // LINE

    // startdate = data[0].Year
    // if (startdate.includes('Mon')) {
    //     data = make_schedule_proportional(data)
    // } else if (startdate.includes('Spring')) {} else {
    //     data = make_history_proportional(data)
    // }
    console.log("anchored travel")

    linegraph = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + height * 0.5 + ")");

    svg
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 50)
        .attr("markerHeight", 50)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");

    //主线
    l = linegraph
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr(
            "d",
            line([{ x: width * 0.1, y: 20 }, { x: width - width * 0.1, y: 20 }])
        )
        .attr("marker-start", "url(#triangle)")
        .attr("marker-end", "url(#triangle)");

    delay = 0;
    var breaking = 7;


    //事件标签
    t = linegraph
        .selectAll(".labeltext")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "labeltext hahaha")
        .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i < breaking) j = data.length - breaking - i;
                else if (i == data.length - 1) j = data.length - breaking;
                else j = i - 1;
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 2) +
                    (j * (width * 0.8)) / (data.length - 2)

            }
        )
        .attr("y", 60 * curems)

    t.selectAll("tspan.text")
        .data(d => d.Event.split("\\n"))
        .enter()
        .append("tspan")
        .attr("class", "text")
        .text(d => d)
        .style("font-size", "14px")
        .attr("x", function() {
            return this.parentElement.x.baseVal[0].value
        })
        .attr("dx", 0)
        .attr("dy", 20);

    t
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0);

    // t = linegraph
    //     .selectAll(".labeltext")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("text-anchor", "middle")
    //     .attr("class", "labeltext hahaha")
    //     .attr("id", d => "ev1_" + d.Year.replace(/ /g, ""))
    //     .attr(
    //         "x",
    //         function(d, i) {
    //             var j = 0;
    //             if (i < 14) j = 13 - i;
    //             else if (i == data.length - 1) j = 13;
    //             else j = i - 1;
    //             return width * 0.1 +
    //                 (0.5 * (width * 0.8)) / (data.length - 2) +
    //                 (j * (width * 0.8)) / (data.length - 2)

    //         }
    //     )
    //     .attr("y", (d, i) => data.filter(e => e.Event != '').indexOf(d) % 2 != 0 ? 60 * curems : 100 * curems)
    //     .style("font-size", curems + "em")
    //     .text(function(d, i) {
    //             if (d.Event) {
    //                 if (i == 0) return "Once upon a time, " + d.Event;
    //                 if (i == data.length - 1) return "To sum up, " + d.Event;
    //                 else if (i == data.length - 1) return "Finally, " + d.Event;
    //                 else return "Then, " + d.Event;
    //             }
    //         }
    //         // d.Event.split(" ")
    //         // .slice(0, Math.round(d.Event.split(" ").length / 2))
    //         // .join(" ")
    //     )
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + interval
    //         else return delay = delay + 0
    //     })
    //     .duration(500)
    //     .style("opacity", 1)
    //     .transition()
    //     .style("opacity", 0)


    delay = 0;

    // //虚线
    // t = linegraph.selectAll('.dashedline')
    //     .data(data)
    //     .enter()
    //     .append('path')
    //     .attr('stroke', '#bbb')
    //     .attr("class", "hahaha")
    //     .attr('stroke-width', 2)
    //     .style("stroke-dasharray", ("7, 3"))
    //     .attr('d', function(d, i) {
    //         if (data.filter(e => e.Event != '').indexOf(d) % 2 != 0 || d.Event == '') return []
    //         else {
    //             var j = 0;
    //             if (i < 14) j = 13 - i;
    //             else if (i == data.length - 1) j = 13;
    //             else j = i - 1;
    //             return line([{
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 2) +
    //                         (j * (width * 0.8)) / (data.length - 2),
    //                     y: 25
    //                 },
    //                 {
    //                     x: width * 0.1 +
    //                         (0.5 * (width * 0.8)) / (data.length - 2) +
    //                         (j * (width * 0.8)) / (data.length - 2),
    //                     y: 65
    //                 }
    //             ])


    //         }
    //     })
    //     .style("opacity", 0)
    //     .transition()
    //     .delay(function(d, i) {
    //         if (d.Year != '') return delay = delay + 3000
    //         else return delay = delay + 0
    //     })
    //     .style("opacity", 1)
    //     // .transition()
    //     // .style("opacity", 0)


    // delay = 0;

    //时间标签
    t = linegraph
        .selectAll(".yeartext")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "yeartext hahaha")
        .attr("id", d => "yr_" + d.Year.replace(/ /g, ""))
        .attr(
            "x",
            function(d, i) {
                var j = 0;
                if (i < breaking) j = data.length - breaking - i;
                else if (i == data.length - 1) j = data.length - breaking;
                else j = i - 1;
                return width * 0.1 +
                    (0.5 * (width * 0.8)) / (data.length - 2) +
                    (j * (width * 0.8)) / (data.length - 2)

            }
        )
        .attr("text-anchor", "middle")
        .attr("y", (d, i) => d.Year.split(" ").length > 1 ? -15 : 0)
        .attr("font-weight", "bold")
        .style("font-size", "14px")
        .text(d => d.Year.split(" ")[0])
        .style("opacity", 0)
        .transition()
        .delay(function(d, i) {
            if (d.Year != '') return delay = delay + interval
            else return delay = delay + 0
        })
        .duration(500)
        .style("opacity", 1)
        .transition()
        .delay(interval - 1000)
        .style("opacity", 0)

    //刻度
    t = linegraph
        .selectAll(".tick")
        .data(data)
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
        .attr("d", function(d, i) {
            // debugger;
            var j = 0;
            if (i < breaking) j = data.length - breaking - i;
            else if (i == data.length - 1) j = data.length - breaking;
            else j = i - 1;
            return line([{
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 2) +
                        (j * (width * 0.8)) / (data.length - 2),
                    y: 25
                },
                {
                    x: width * 0.1 +
                        (0.5 * (width * 0.8)) / (data.length - 2) +
                        (j * (width * 0.8)) / (data.length - 2),
                    y: 15
                }
            ])
        });
    if (user_data['history_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, delay + 2000)
    }

}












// var make_history_proportional = (data) => {
//     startdate = data[0].Year
//     curdate = data[0].Year
//     enddate = data[data.length - 1].Year
//     for (i = parseFloat(startdate); i < parseFloat(enddate); i++) {
//         if (!data.find(e => e.Year == i)) data.splice(i - parseFloat(startdate), 0, { Year: '', Event: '' })
//     }
//     debugger;
//     return data
// }


var make_schedule_proportional = (data) => {
    newdata = []
    days = ['Mon', 'Tue', 'Wed']
    p = ['AM', 'PM']
    for (i in days) {
        for (j in p) {
            for (k = 1; k <= 12; k++) {
                if (k == 12 && p[j] == 'AM') h = 'PM'
                else if (k == 12 && p[j] == 'PM') h = 'AM'
                else h = p[j]
                s = days[i] + ' ' + (k) + ' ' + h
                if (!data.find(e => e.Year == s)) {
                    if (k % 1 == 0) newdata.push({ Year: '', Event: '' })
                } else newdata.push(data.find(e => e.Year == s))
            }
        }
    }
    return newdata
}