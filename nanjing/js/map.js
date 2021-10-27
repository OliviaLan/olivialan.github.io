var max_width = window.innerWidth
document.getElementById("story_table").style['max-width'] = max_width - 900 + "px"

var svg_map_2 = d3.select("#clickable_1")
    .append("svg")
    .attr("viewBox", "0 0 " + 700 + " " + 700)
    .attr("preserveAspectRatio", "xMinYMin")
    // .attr("width", width + margin)
    // .attr("height", height + margin)
    // .attr('fill', 'black')
    .append('g')
    .attr('class', 'map');

var svg_map_3 = d3.select("#map")
    .append("svg")
    // .call(d3.zoom()
    //     .scaleExtent([1, 4])
    //     .translateExtent([
    //         [0, 0],
    //         [700, 680]
    //     ])
    //     .on("zoom", function() {
    //         var svg_map_3 = d3.select("#map")
    //             .attr("transform", d3.event.transform)
    //     }))
    .attr("viewBox", "0 0 " + 700 + " " + 700)
    .attr("preserveAspectRatio", "xMinYMin")
    // .attr("width", width + margin)
    // .attr("height", height + margin)
    // .attr('fill', 'black')
    .append('g')
    .attr('class', 'map');

var layer1 = svg_map_3.append('g');
var layer2 = svg_map_3.append('g');
var layer3 = svg_map_3.append('g');


//设置地图映射方式
var projection_large = d3.geoMercator()
    .center([118.7789, 32.065])
    .scale(30000)
    // .translate([width / 2, height / 2]);

var projection_small = d3.geoMercator()
    .center([118.8089, 32.065])
    .scale(300000)
    // .translate([width / 2, height / 2]);


var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var sights_tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);



function draw_large_city(geo_data) {
    // "use strict";
    var margin = 30,
        // width = $(window).width() / 2.5 - margin,
        width = 700 - margin,
        height = 700 - margin;

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
    // var gradient = svg_map_2.append("defs")
    //     .append("radialGradient")
    //     .attr("id", "grad1")
    //     .attr("cx", "50%")
    //     .attr("cy", "50%")
    //     .attr("r", "50%")
    //     .attr("fx", "50%")
    //     .attr("fy", "50%")

    // gradient
    //     .append("stop")
    //     .attr("offset", "20%")
    //     .style("stop-color", "blue")


    // gradient
    //     .append("stop")
    //     .attr("offset", "100%")
    //     .style("stop-color", "rgb(43, 43, 43)")


    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var sights_tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //debugger
    //查看数据是否load好;
    var path = d3.geoPath().projection(projection_large);

    var map = svg_map_2.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', "white")
        .attr('stroke-width', 0.15)
        .attr('stroke-opacity', 0.6);

};
// d3.json("data/nanjing.json", draw_large_city);

function draw_polygon_city(polygon_data) {
    var path = d3.geoPath().projection(projection_large);
    svg_map_2.selectAll('path')
        .data(polygon_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'brown')
        .attr('opacity', 1)
        .attr('stroke', "white")
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.6);
};

// d3.json("data/anquanqu.json", draw_polygon_city);

function draw(geo_data) {
    // "use strict";
    var margin = 30,
        // width = $(window).width() / 2.5 - margin,
        width = 800 - margin,
        height = 800 - margin;

    svg_map_3
        .append("svg")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        // .attr("width", width + margin)
        // .attr("height", height + margin)
        // .attr('fill', 'black')
        .append('g')
        .attr('class', 'map');

    //生成一个渐变的defs
    var gradient = svg_map_3.append("defs")
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
        .style("stop-color", "#A13924")


    gradient
        .append("stop")
        .attr("offset", "100%")
        .style("stop-color", "rgb(43, 43, 43)")


    var gradient_2 = svg_map_3.append("defs")
        .append("radialGradient")
        .attr("id", "grad2")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")
        .attr("fx", "50%")
        .attr("fy", "50%")

    gradient_2
        .append("stop")
        .attr("offset", "20%")
        .style("stop-color", "#FCFCFC")


    gradient_2
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
    var path = d3.geoPath().projection(projection_small);

    var map = svg_map_3.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', "white")
        .attr('stroke-width', 0.3)
        .attr('stroke-opacity', 0.5);

    //debugger;
    //将小段小段的path按照名字集合，key是路名
    // var nested = d3.nest()
    //     .key(function(d) {
    //         return d.properties.name
    //     })
    //     .entries(geo_data.features);

    // streets = nested.filter(street =>
    //     street.key == "中山路" ||
    //     street.key == "西康路" ||
    //     street.key == "中山北路" ||
    //     street.key == "汉中路" ||
    //     street.key == "颐和路"
    // );
    // counter = [0, 1, 2, 3, 4];


    // for (var i in counter) {
    //     var certain_path = svg_map_2.selectAll('path streets')
    //         .data(streets[i].values)
    //         .enter()
    //         .append("path")
    //         .attr("class", "streets street_" + i)
    //         .attr('d', path)
    //         .attr('fill', 'transparent')
    //         .attr('stroke', 'white')
    //         .attr('stroke-width', '3')
    //         .attr('stroke-opacity', '1')
    //         .on("mouseover", function(d) {
    //             //选定道路出现tooltip
    //             tooltip.transition()
    //                 .duration(200)
    //                 .style("opacity", 0.9);
    //             if (d.properties.name == '西康路') {
    //                 tooltip.html('<strong >西康路</strong><br>拉贝')
    //                     .style("left", (d3.event.pageX) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             } else if (d.properties.name == '中山北路') {
    //                 tooltip.html('<strong >中山北路</strong><br>拉贝<br>')
    //                     .style("left", (d3.event.pageX) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             } else if (d.properties.name == '中山路') {
    //                 tooltip.html('<strong >中山路</strong><br>拉贝')
    //                     .style("left", (d3.event.pageX) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             } else if (d.properties.name == '汉中路') {
    //                 tooltip.html('<strong >' + d.properties.name + '</strong>' + '<br>haha' + d.properties.history)
    //                     .style("left", (d3.event.pageX) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             }
    //             //选定的道路变色
    //             d3.selectAll("." + this.className.baseVal.substring(8))
    //                 .attr('stroke', 'white')
    //                 .attr('stroke-width', '7')
    //                 .attr('stroke-opacity', '1')

    //         })
    //         .on("mouseout", function(d) {
    //             // infobox.transition()
    //             //     .duration(500)
    //             //     .style("opacity", 0);
    //             tooltip.transition()
    //                 .duration(500)
    //                 .style("opacity", 0);
    //             //debugger;
    //             d3.selectAll('.streets')
    //                 .attr('stroke', 'white')
    //                 .attr('stroke-width', '3')
    //                 .attr('stroke-opacity', '1')
    //         });

    //     //实现线条的动态加载
    //     /* certain_path
    //         .attr("stroke-dasharray", 50 + " " + 5)
    //         .attr("stroke-dashoffset", 45)
    //         .transition() // Call Transition Method
    //         .duration(1000) // Set Duration timing (ms)
    //         .ease('linear') // Set Easing option
    //         .attr("stroke-dashoffset", 0); */
    // }

    //projection初次设定后，可以画个圆检查落点; 或用于添加景点、地标等
};

d3.json("data/labei.json", draw);


function draw_polygon(polygon_data) {
    var path = d3.geoPath().projection(projection_small);

    layer1.selectAll('path')
        .data(polygon_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'white')
        .attr('opacity', 0.2)
        .attr('stroke', "white")
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1);
};

d3.json("data/anquanqu.json", draw_polygon);




//下面是画散点的

//可以把难民营和其他sights分开，两次append


function draw_refugee(refugee_data) {
    var sights = layer3
        .selectAll("circle")
        .data(refugee_data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return projection_small(d.coordinate)[0]
        })
        .attr('cy', function(d) {
            return projection_small(d.coordinate)[1]
        })
        .attr('fill', "url(#grad2)")
        //"url(#grad2)"
        .attr('opacity', 0.9)
        .attr("r", function(d) {
            return d.value + 4
        })
        // .attr('stroke', '#505ab5')
        // .attr('stroke-opacity', '1')
        // .attr('stroke-width', '3')
        .on("mouseover", function(d) {
            // debugger;
            sights_tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            sights_tooltip.html('<strong>' + d.name + '</strong><br>' + d.value + "条犯罪记录")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            sights_tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", function(d) {
            document.getElementById("story_table").innerHTML = ''
                // document.getElementById("story_table").style['background-color'] = 'red'
            for (i = 0; i < d.story.length; i++) {
                document.getElementById("story_table").innerHTML += "<br><hr color='#A13924' size='0.5'>" + d.story[i]
            }
        });




    repeat();

    //点点放大缩小动画
    function repeat() {
        sights.attr("r", function() {
                return this.__data__.value + 4
            })
            .transition()
            .duration(1200)
            .attr('r', function() {
                return this.__data__.value + 6
            })
            .transition()
            .duration(1200)
            .attr('r', function() {
                return this.__data__.value + 4
            })
            //version4里面each变成了on
            .on("end", repeat)
    }
}
d3.json("data/refugee.json", draw_refugee);


function draw_spot(spot_data) {
    var spots = layer2
        .append('g')
        .attr('class', 'spot')
        .selectAll("circle")
        .data(spot_data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return projection_small(d.coordinate)[0]
        })
        .attr('cy', function(d) {
            return projection_small(d.coordinate)[1]
        })
        .attr('fill', "url(#grad1)")
        //"url(#grad1)"
        .attr('opacity', 0.9)
        .attr("r", function(d) {
            return d.value + 4
        })
        // .attr('stroke', '#505ab5')
        // .attr('stroke-opacity', '1')
        // .attr('stroke-width', '3')
        .on("mouseover", function(d) {
            // debugger;
            sights_tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            sights_tooltip.html('<strong>' + d.name + '</strong><br>' + d.value + "条犯罪记录")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            sights_tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", function(d) {
            document.getElementById("story_table").innerHTML = ''
                // document.getElementById("story_table").style['background-color'] = 'red'
            for (i = 0; i < d.story.length; i++) {
                document.getElementById("story_table").innerHTML += "<br><hr color='#A13924' size='0.5'>" + d.story[i]
            }
        });

    // .on("click", function(d) {
    //     document.getElementById("map").style['background-image'] = 'url("./img/' + (d.id + 1) + '.jpeg")'
    // });
}

d3.json("data/spot.json", draw_spot);