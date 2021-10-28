//沿直线排列的气泡
svg_bubble = d3.select('#bubble');

// rscale = d3.scaleLinear().domain([0, 5])
//     .range([0, 60]);
xscale = d3.scaleLinear()
    .domain([0, 55])
    .range([100, 900]);
// yscale = d3.scaleLinear().domain([0, 5])
//     .range([240, 0]);
xaxis = d3.axisBottom(xscale)
    //tick的长短
    .tickSizeInner(10)
    //文字离线的距离
    .tickPadding(0);

//上下间隔
interval = 70

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);



function DrawBubbles(data, type, index) {

    // crime_type = type
    // Circles now easily reusable

    svg_bubble.append('g')
        .attr("class", "axis")
        .attr('transform', 'translate(0,' + interval * index + ')')
        .call(xaxis)


    circles_group = svg_bubble
        .append('g')
        .selectAll('g.circle')
        // .data(data.filter(function(d) {
        //     return d.type == type;
        // }))
        .data(data)
        .enter()

    circles_group.append('circle')
        // .attr('r', d => d.crime_type)
        .attr('r', function(d) {
            return d[type] * 2;
        })
        .attr('cx', function(d) {
            return xscale(d.date);
        })
        .attr('cy', function(d) {
            return interval * index;
        })
        .attr('class', type)
        .attr('opacity', 0.3)
        .on("mouseover", function(d) {
            // debugger;
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html("发生" + d[type] + "次")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    axis_label = svg_bubble
        .append('g')

    axis_label.append("text")
        .attr("class", "x label")
        // .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", function(d) {
            return interval * index + 10;
        })
        .text(function() {
            if (type == "rape") {
                return "强奸"
            } else if (type == "rape_fail") {
                return "强奸未遂"
            } else if (type == "rob") {
                return "抢劫"
            } else if (type == "hurt") {
                return "伤害"
            } else if (type == "force_labor") {
                return "强迫劳动"
            } else if (type == "kill") {
                return "杀人"
            } else {
                return "逮捕"
            }
        })
        .attr("fill", "white")
        .attr("font-size", "14px");

}

// DrawBubbles("kill", 1)
// DrawBubbles("hurt", 2)
// DrawBubbles("rape", 3)


d3.json("data/bubble.json", function(data) {
    DrawBubbles(data, "rape", 1)
    DrawBubbles(data, "rape_fail", 2)
    DrawBubbles(data, "rob", 3)
    DrawBubbles(data, "hurt", 4)
    DrawBubbles(data, "force_labor", 5)
    DrawBubbles(data, "kill", 6)
    DrawBubbles(data, "arrest", 7)
});