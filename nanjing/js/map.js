var svg_map_2 = d3.select("#clickable_1")
    .append("svg")
    .attr("viewBox", "0 0 " + 700 + " " + 700)
    .attr("preserveAspectRatio", "xMinYMin")
    // .attr("width", width + margin)
    // .attr("height", height + margin)
    // .attr('fill', 'black')
    .append('g')
    .attr('class', 'map');

//设置地图映射方式
var projection_2 = d3.geoMercator()
    .center([118.7831, 32.065])
    .scale(1200000)
    //整个上海.scale(23000)
    // .translate([width / 2, height / 2]);

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var sights_tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


function draw(geo_data) {
    // "use strict";
    var margin = 30,
        // width = $(window).width() / 2.5 - margin,
        width = 800 - margin,
        height = 800 - margin;

    svg_map_2
        .append("svg")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        // .attr("width", width + margin)
        // .attr("height", height + margin)
        // .attr('fill', 'black')
        .append('g')
        .attr('class', 'map');

    //生成一个渐变的defs
    var gradient = svg_map_2.append("defs")
        .append("radialGradient")
        .attr("id", "grad1")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")
        .attr("fx", "50%")
        .attr("fy", "50%")

    gradient
        .append("stop")
        .attr("offset", "20%")
        .style("stop-color", "brown")


    gradient
        .append("stop")
        .attr("offset", "100%")
        .style("stop-color", "rgb(43, 43, 43)")


    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var sights_tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //debugger
    //查看数据是否load好;
    var path = d3.geoPath().projection(projection_2);

    var map = svg_map_2.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', "white")
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.6);

    //debugger;
    //将小段小段的path按照名字集合，key是路名
    var nested = d3.nest()
        .key(function(d) {
            return d.properties.name
        })
        .entries(geo_data.features);

    streets = nested.filter(street =>
        street.key == "中山路" ||
        street.key == "广州路" ||
        street.key == "小粉桥"
    );
    counter = [0, 1, 2];


    for (var i in counter) {
        var certain_path = svg_map_2.selectAll('path streets')
            .data(streets[i].values)
            .enter()
            .append("path")
            .attr("class", "streets street_" + i)
            .attr('d', path)
            .attr('fill', 'transparent')
            .attr('stroke', 'white')
            .attr('stroke-width', '3')
            .attr('stroke-opacity', '1')
            .on("mouseover", function(d) {
                //选定道路出现tooltip
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                if (d.properties.name == '广州路') {
                    tooltip.html('<strong >广州路</strong><br>拉贝')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '小粉桥') {
                    tooltip.html('<strong >小粉桥</strong><br>拉贝<br>')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '中山路') {
                    tooltip.html('<strong >中山路</strong><br>拉贝')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '方浜西路') {
                    tooltip.html('<strong >' + d.properties.name + '</strong>' + '<br>haha' + d.properties.history)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }
                //选定的道路变色
                d3.selectAll("." + this.className.baseVal.substring(8))
                    .attr('stroke', 'white')
                    .attr('stroke-width', '7')
                    .attr('stroke-opacity', '1')

            })
            .on("mouseout", function(d) {
                // infobox.transition()
                //     .duration(500)
                //     .style("opacity", 0);
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                //debugger;
                d3.selectAll('.streets')
                    .attr('stroke', 'white')
                    .attr('stroke-width', '3')
                    .attr('stroke-opacity', '1')
            });

        //实现线条的动态加载
        /* certain_path
            .attr("stroke-dasharray", 50 + " " + 5)
            .attr("stroke-dashoffset", 45)
            .transition() // Call Transition Method
            .duration(1000) // Set Duration timing (ms)
            .ease('linear') // Set Easing option
            .attr("stroke-dashoffset", 0); */
    }

    //projection初次设定后，可以画个圆检查落点; 或用于添加景点、地标等
};
d3.json("data/nanjing.json", draw);




//下面是画散点的
function draw_sights(sights_data) {
    var sights = svg_map_2
        .selectAll("circle")
        .data(sights_data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return projection_2(d.coordinate)[0]
        })
        .attr('cy', function(d) {
            return projection_2(d.coordinate)[1]
        })
        .attr('fill', function(d) {
            if (d.name == "拉贝故居") {
                // return "orange"
                return "url(#grad1)"
            } else {
                return "url(#grad1)"
            }
        })
        .attr('opacity', 0.7)
        .attr("r", function(d) {
            return d.value * 2
        })
        // .attr('stroke', '#505ab5')
        // .attr('stroke-opacity', '1')
        // .attr('stroke-width', '3')
        .on("mouseover", function(d) {
            // debugger;
            sights_tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            sights_tooltip.html('<strong>' + d.name + '</strong><br>' + d.history)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            sights_tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", function(d) {
            document.getElementById("map").style['background-image'] = 'url("./img/' + (d.id + 1) + '.jpeg")'
        });

    repeat();

    //点点放大缩小动画
    function repeat() {
        sights.attr("r", function() {
                return this.__data__.value * 2
            })
            .transition()
            .duration(1200)
            .attr('r', function() {
                return this.__data__.value * 2 + 5
            })
            .transition()
            .duration(1200)
            .attr('r', function() {
                return this.__data__.value * 2
            })
            //version4里面each变成了on
            .on("end", repeat)
    }
}

d3.json("data/sights_1.json", draw_sights);