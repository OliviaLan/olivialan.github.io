var svg_network = d3.select("#network"),
    width_network = +svg_network.attr("width"),
    height_network = +svg_network.attr("height");

// var color = d3.scaleOrdinal(d3.schemeCategory20);

// const forceX = d3.forceX(width_network / 2).strength(-0.040)
// const forceY = d3.forceY(height_network / 2).strength(-0.010)

var highlited_nodes = ["日本士兵", "妇女", "难民", "日本人", "日本军官", "年轻姑娘"]

var simulation = d3.forceSimulation()
    // .force('x', forceX)
    // .force('y', forceY)
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-15))
    .force("center", d3.forceCenter(width_network / 2, height_network / 2));


// var sights_tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip_network")
    .style("opacity", 0);


d3.json("data/network.json", function(error, graph) {
    if (error) throw error;

    var link = svg_network.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke", "white"
            // function(d) {
            //     if (d.dominant_event == "强奸") {
            //         return 'red'
            //     } else if (d.dominant_event == "伤害") {
            //         return 'grey'
            //     } else if (d.dominant_event == "杀人") {
            //         return 'purple'
            //     } else if (d.dominant_event == "抢劫") {
            //         return 'yellow'
            //     } else {
            //         return 'white'
            //     }
            // }
        )
        // .attr('stroke-opacity', 0.5)
        .attr("stroke-width", function(d) { return Math.sqrt(d.value) / 2; })
        .on('mouseover.tooltip', function(d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", .8);
            tooltip.html("Source:" + d.source.id +
                    "<br>Target:" + d.target.id +
                    "<br>Strength:" + d.value +
                    "<br>Dominant event:" + d.dominant_event)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        })
        .on("mouseout.tooltip", function() {
            tooltip.transition()
                .duration(100)
                .style("opacity", 0);
        })
        .on('mouseout.fade', fade(1))
        .on("mousemove", function() {
            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        });
    // .on("mouseover", function(d) {
    //     // debugger;
    //     sights_tooltip.transition()
    //         .duration(200)
    //         .style("opacity", 0.9);
    //     sights_tooltip.html(d.dominant_event)
    //         .style("left", (d3.event.pageX) + "px")
    //         .style("top", (d3.event.pageY - 28) + "px");
    // })
    // .on("mouseout", function(d) {
    //     sights_tooltip.transition()
    //         .duration(500)
    //         .style("opacity", 0);
    // });

    var node = svg_network.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter().append("g")
        .on('mouseover.tooltip', function(d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", .8);
            tooltip.html("Name:" + d.id + "<br>group:" + d.group)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        })
        .on('mouseover.fade', fade(0.1))
        .on("mouseout.tooltip", function() {
            tooltip.transition()
                .duration(100)
                .style("opacity", 0);
        })
        .on('mouseout.fade', fade(1))
        .on("mousemove", function() {
            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        })
        .on('dblclick', releasenode)
        // .on("mouseover", function(d) {
        //     // debugger;
        //     tooltip.transition()
        //         .duration(200)
        //         .style("opacity", 0.9);
        //     tooltip.html(d.id)
        //         .style("left", (d3.event.pageX) + "px")
        //         .style("top", (d3.event.pageY - 28) + "px");
        // })
        // .on("mouseout", function(d) {
        //     tooltip.transition()
        //         .duration(500)
        //         .style("opacity", 0);
        // });


    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        //d.fx = null;
        //d.fy = null;
    }

    function releasenode(d) {
        d.fx = null;
        d.fy = null;
    }

    const linkedByIndex = {};
    graph.links.forEach(d => {
        linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
    });

    function isConnected(a, b) {
        return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
    }

    function fade(opacity) {
        return d => {
            node.style('stroke-opacity', function(o) {
                const thisOpacity = isConnected(d, o) ? 1 : opacity;
                this.setAttribute('fill-opacity', thisOpacity);
                return thisOpacity;
            });
            link.style('stroke-opacity', o => (o.source === d || o.target === d ? 1 : opacity));
        };
    }

    var circles = node.append("circle")
        .attr("r", function(d) {
            // return Math.sqrt(d.freq) + 2
            return Math.sqrt(d.degree) + 2
        })
        .attr("fill", function(d) {
            if (d.group == "中国人") {
                return "white"
            } else if (d.group == "日本人") {
                return "#A13924"
            } else {
                return "#E3B23C"
            }
            // return color(d.group); 
        })
        .attr("opacity", 0.9);

    // Create a drag handler and append it to the node object instead
    var drag_handler = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    drag_handler(node);

    var lables = node.append("text")
        .text(function(d) {
            if (highlited_nodes.includes(d.id)) {
                return d.id;
            }
        })
        .attr('x', function(d) { return -1 * Math.sqrt(d.freq) })
        .attr('y', 2)
        .attr('fill', 'white');

    node.append("title")
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
    }
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}