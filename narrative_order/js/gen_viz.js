var line = d3
    .line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    });

//Animation speed
var interval = 4000

function gen_question(text, pattern, dataset) {

    var path = "./datasets/";
    if (dataset == "history") {
        if (pattern == "1") path += "history_chronology.csv";
        else if (pattern == "2") path += "history_trace.csv";
        else if (pattern == "3") path += "history_trailer.csv";
        else if (pattern == "4") path += "history_recurrence.csv";
        else if (pattern == "5") path += "history_halfway.csv";
        else if (pattern == "6") path += "history_anchor.csv";
    } else if (dataset == "population") {
        if (pattern == "1") path += "line_chronology.csv";
        else if (pattern == "2") path += "line_trace.csv";
        else if (pattern == "3") path += "line_trailer.csv";
        else if (pattern == "4") path += "line_recurrence.csv";
        else if (pattern == "5") path += "line_halfway.csv";
        else if (pattern == "6") path += "line_anchor.csv";
    } else if (dataset == "diary") {
        if (pattern == "1") path += "diary_chronology.csv";
        else if (pattern == "2") path += "diary_trace.csv";
        else if (pattern == "3") path += "diary_trailer.csv";
        else if (pattern == "4") path += "diary_recurrence.csv";
        else if (pattern == "5") path += "diary_halfway.csv";
        else if (pattern == "6") path += "diary_anchor.csv";
    }

    d3.csv(path).then(data => {
        var divquestion = document.createElement("div")
        divquestion.setAttribute("id", "replayable")
        divquestion.style.position = 'relative'
        divquestion.style.height = height + 'px'
        divquestion.style.marginTop = '3%'

        var svg = d3
            .select(divquestion)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("position", "absolute")
            .style("left", "0px")

        var divradio = document.createElement("form");
        divradio.style.textAlign = "left";
        divradio.id = "divradio";
        divradio.innerHTML = "<b>Story " + (current_question + 1) + ": " + text + "</b>" + "<p>The animation will start in about 3 seconds</p>";
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

        if (pattern == "1") create_chronological_timeline(svg, data);
        else if (pattern == "2") create_trace_timeline(svg, data);
        else if (pattern == "3") create_trailer_timeline(svg, data);
        else if (pattern == "4") create_recurrence_timeline(svg, data);
        else if (pattern == "5") create_halfway_timeline(svg, data);
        else if (pattern == "6") create_anchor_timeline(svg, data);

    });
}

var clearvis = () => {
    //delete the whole div
    d3.select('#replayable').remove();
}


var create_chronological_timeline = (svg, data) => {

    console.log("chronological")

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
    if (user_data['history_replay'] == 0 || user_data['population_replay'] == 0 || user_data['diary_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, 12 * interval + 2000)
    }

}

var create_trailer_timeline = (svg, data) => {

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


    delay = 0;

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
    if (user_data['history_replay'] == 0 || user_data['population_replay'] == 0 || user_data['diary_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, 14 * interval + 2000)
    }

}

var create_recurrence_timeline = (svg, data) => {

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
    if (user_data['history_replay'] == 0 || user_data['population_replay'] == 0 || user_data['diary_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, 14 * interval + 2000)
    }
}


var create_trace_timeline = (svg, data) => {

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



    delay = 0;

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

    if (user_data['history_replay'] == 0 || user_data['population_replay'] == 0 || user_data['diary_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, 13 * interval + 2000)
    }
}

var create_halfway_timeline = (svg, data) => {

    console.log("halfway-back")

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

    delay = 0;

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
    if (user_data['history_replay'] == 0 || user_data['population_replay'] == 0 || user_data['diary_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, 13 * interval + 2000)
    }

}

var create_anchor_timeline = (svg, data) => {

    console.log("anchor")

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
                else j = i - 1;
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

    delay = 0;

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
                else j = i - 1;
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

    t = linegraph
        .selectAll(".tick")
        .data(data)
        .enter()
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", (d, i) => d.Event == '' ? 1 : 3)
        .attr("d", function(d, i) {
            var j = 0;
            if (i < breaking) j = data.length - breaking - i;
            else j = i - 1;
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
    if (user_data['history_replay'] == 0 || user_data['population_replay'] == 0 || user_data['diary_replay'] == 0) {
        setTimeout(function() {
            document.getElementById('story_finish').style.display = "block"
            document.getElementById('story_replay').style.display = "block"
        }, 13 * interval + 2000)
    }

}