//生成贝塞尔曲线，然后排列
var r = 20
    //     points = [];
    // for (var i = 0; i < 10; i++) {
    //     points.push({
    //         x: (400 / 10) * i,
    //         y: Math.random() * 400
    //     });
    // }
var line = d3.line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .curve(d3.curveCardinal);

var svg_curve = d3.select("#curve")

var path = svg_curve.append("g")
    .datum(data)
    .append("path")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "white")
    .node();

// var pathLength = path.getTotalLength();
svg_curve.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("transform", function(d) {
        var p = path.getPointAtLength(d.id * 120);
        return "translate(" + p.x + "," + p.y + ")";
    })
    .attr("r", r / 2)
    .style("fill", "white");