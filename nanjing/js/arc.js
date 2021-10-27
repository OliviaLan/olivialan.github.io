var i,
    // width = 960,
    // height = 500,
    transitionTime = 2500,
    spacing = 24,
    arc_margin = 140,
    nodeY = 420,
    nodes = miserables.nodes,
    links = miserables.links,
    colors = d3.scaleOrdinal(["#A13924", "white", "#E3B23C", "grey", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]),
    τ = 2 * Math.PI;


var svg_arc = d3.select("#arc")
    // .attr("width", width)
    // .attr("height", height)

function mapRange(value, inMin, inMax, outMin, outMax) {
    var inVal = Math.min(Math.max(value, inMin), inMax);
    return outMin + (outMax - outMin) * ((inVal - inMin) / (inMax - inMin));
}

// Set each node's value to the sum of all incoming and outgoing link values
var nodeValMin = 100000000,
    nodeValMax = 0;
for (i = 0; i < nodes.length; i++) {
    nodes[i].value = 0;
    nodes[i].displayOrder = i;
}
for (i = 0; i < links.length; i++) {
    var link = links[i];
    value = link.value;
    nodes[link.source].value += link.value;
    nodes[link.target].value += link.value;
}
for (i = 0; i < nodes.length; i++) {
    nodeValMin = Math.min(nodeValMin, nodes[i].value);
    nodeValMax = Math.max(nodeValMax, nodes[i].value);
}

var arcBuilder = d3.arc()
    .startAngle(-τ / 4)
    .endAngle(τ / 4);

arcBuilder.setRadii = function(d) {
    var arcHeight = 0.5 * Math.abs(d.x2 - d.x1);
    this
        .innerRadius(arcHeight - d.thickness / 2)
        .outerRadius(arcHeight + d.thickness / 2);
};

function arcTranslation(d) {
    return "translate(" + (d.x1 + d.x2) / 2 + "," + nodeY + ")";
}

function nodeDisplayX(node) {
    return node.displayOrder * spacing + arc_margin;
}

var path;

function update() {
    // DATA JOIN
    path = svg_arc.selectAll("path")
        .data(links);
    // UPDATE
    path.transition()
        .duration(transitionTime)
        .call(pathTween, null);
    // ENTER
    path.enter()
        .append("path")
        .attr("class", "arcPath")
        .attr("fill", "white")
        .attr("opacity", 0.3)
        .attr("transform", function(d, i) {
            d.x1 = nodeDisplayX(nodes[d.target]);
            d.x2 = nodeDisplayX(nodes[d.source]);
            return arcTranslation(d);
        })
        .attr("d", function(d, i) {
            //设定arc的粗细
            d.thickness = 1 + d.value / 6;
            arcBuilder.setRadii(d);
            return arcBuilder();
        });

    // DATA JOIN
    var circle = svg_arc.selectAll("circle")
        .data(nodes);
    // UPDATE
    circle.transition()
        .duration(transitionTime)
        .attr("cx", function(d, i) { return nodeDisplayX(d); });
    // ENTER
    circle.enter()
        .append("circle")
        .attr("cy", nodeY)
        .attr("cx", function(d, i) { return nodeDisplayX(d); })
        //配置圆圈大小区间
        .attr("r", function(d, i) { return mapRange(d.value, nodeValMin, nodeValMax, 3, 13); })
        .attr("fill", function(d, i) { return colors(d.group); })
        .attr("stroke", function(d, i) { return d3.rgb(colors(d.group)).darker(1); });

    function textTransform(node) {
        return ("rotate(90 " + (nodeDisplayX(node) - 5) + " " + (nodeY + 12) + ")");
    }
    // DATA JOIN
    var text = svg_arc.selectAll("text")
        .data(nodes);
    // UPDATE
    text.transition()
        .duration(transitionTime)
        .attr("x", function(d, i) { return nodeDisplayX(d) + 10; })
        .attr("transform", function(d, i) { return textTransform(d); });
    // ENTER
    text.enter()
        .append("text")
        .attr("y", nodeY + 12)
        .attr("x", function(d, i) { return nodeDisplayX(d) + 10; })
        .attr("transform", function(d, i) { return textTransform(d); })
        .attr("font-size", "14px")
        .attr("fill", "white")
        .text(function(d, i) { return d.nodeName; });
}

//默认按什么sort
doSort(0);
update();

function pathTween(transition, dummy) {
    transition.attrTween("d", function(d) {
        var interpolateX1 = d3.interpolate(d.x1, nodeDisplayX(nodes[d.target]));
        var interpolateX2 = d3.interpolate(d.x2, nodeDisplayX(nodes[d.source]));
        return function(t) {
            d.x1 = interpolateX1(t);
            d.x2 = interpolateX2(t);
            arcBuilder.setRadii(d);
            return arcBuilder();
        };
    });

    transition.attrTween("transform", function(d) {
        var interpolateX1 = d3.interpolate(d.x1, nodeDisplayX(nodes[d.target]));
        var interpolateX2 = d3.interpolate(d.x2, nodeDisplayX(nodes[d.source]));
        return function(t) {
            d.x1 = interpolateX1(t);
            d.x2 = interpolateX2(t);
            return arcTranslation(d);
        };
    });
}

d3.select(".selectSort").on("change", function() {
    doSort(this.selectedIndex);
    update();
});

function doSort(sortMethod) {
    var nodeMap = [],
        sortFunciton;

    for (i = 0; i < nodes.length; i++) {
        var node = $.extend({ index: i }, nodes[i]); // Shallow copy
        nodeMap.push(node);
    }

    if (sortMethod == 0) {
        // GROUP
        sortFunction = function(a, b) {
            return b.group - a.group;
        };
    } else if (sortMethod == 1) {
        // FREQUENCY
        sortFunction = function(a, b) {
            return b.value - a.value;
        };
    } else if (sortMethod == 2) {
        // ALPHABETICAL
        sortFunction = function(a, b) {
            return a.nodeName.localeCompare(b.nodeName)
        };
    }

    nodeMap.sort(sortFunction);
    for (i = 0; i < nodeMap.length; i++) {
        nodes[nodeMap[i].index].displayOrder = i;
    }
}