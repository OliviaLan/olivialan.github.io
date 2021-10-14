var displayYear = 1970,
    isPlaying = false,
    animationInterval = 1000;

/* Event handling */

function initializeEventHandlers(sights_data) {
    d3.select("#year-input")
        .on("input", function() {
            isPlaying = false;
            displayYear = +this.value;
            updateChart(sights_data);
        });

    d3.select("#play-button")
        .on("click", function() {
            isPlaying = !isPlaying;
        });
}

/* Initialization */
// function initializeAxes() {
//     let tickSize = 420;

//     var axis = d3.axisBottom()
//         .scale(maleScale)
//         .ticks(7)
//         .tickSize(tickSize)
//         .tickFormat(function(d) {
//             return d / 10000;
//         });

//     d3.select(".male.axis")
//         .call(axis);

//     axis.scale(femaleScale);
//     d3.select(".female.axis")
//         .call(axis);
// }

function initializeAnimation(sights_data) {
    window.setInterval(function() {
        if (!isPlaying) {
            d3.select("#play-button").node().innerText = "Play"
            return;
        } else {
            d3.select("#play-button").node().innerText = "Pause"
        }
        displayYear += 1;
        if (displayYear > 1980) {
            displayYear = 1970;
        }
        updateChart(sights_data);
    }, animationInterval);


}


/* Data handling */
// function initializeData(csv) {
//     data = csv.map(function(d) {
//         return {
//             year: +d.year,
//             age: d.age,
//             male_pop: +d.male_pop,
//             female_pop: +d.female_pop
//         }
//     });

//     data = data.filter(function(d) {
//         return d.age !== "Total";
//     });
// }

var svg_map = d3.select("#clickable_3")

//设置地图映射方式
var projection = d3.geoMercator()
    .center([118.7789, 32.065])
    .scale(300000)
    //整个上海.scale(23000)
    // .translate([width / 2, height / 2]);


function draw(geo_data) {
    // "use strict";
    var margin = 30,
        // width = $(window).width() / 2.5 - margin,
        width = 800 - margin,
        height = 800 - margin;

    svg_map
        .append("svg")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        // .attr("width", width + margin)
        // .attr("height", height + margin)
        // .attr('fill', 'black')
        .append('g')
        .attr('class', 'map');

    //生成一个渐变的defs
    var gradient = svg_map.append("defs")
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
    var path = d3.geoPath().projection(projection);

    var map = svg_map.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', "white")
        .attr('stroke-width', 0.3)
        .attr('stroke-opacity', 0.6);

    //debugger;
    //将小段小段的path按照名字集合，key是路名
    // var nested = d3.nest()
    //     .key(function(d) {
    //         return d.properties.name
    //     })
    //     .entries(geo_data.features);

    // streets = nested.filter(street =>
    //     street.key == "中山路" ||
    //     street.key == "广州路" ||
    //     street.key == "小粉桥"
    // );
    // counter = [0, 1, 2];


    // for (var i in counter) {
    //     var certain_path = svg_map.selectAll('path streets')
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
    //             if (d.properties.name == '广州路') {
    //                 tooltip.html('<strong >广州路</strong><br>拉贝')
    //                     .style("left", (d3.event.pageX) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             } else if (d.properties.name == '小粉桥') {
    //                 tooltip.html('<strong >小粉桥</strong><br>拉贝<br>')
    //                     .style("left", (d3.event.pageX) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             } else if (d.properties.name == '中山路') {
    //                 tooltip.html('<strong >中山路</strong><br>拉贝')
    //                     .style("left", (d3.event.pageX) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             } else if (d.properties.name == '方浜西路') {
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


//下面是画散点的
function updateChart(sights_data) {

    var yearData = sights_data.filter(function(d) {
        return d.year === displayYear;
    });

    svg_map.selectAll("circle")
        .remove();

    var sights = svg_map
        .selectAll("circle")
        .data(yearData)


    sights
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return projection(d.coordinate)[0]
        })
        .attr('cy', function(d) {
            return projection(d.coordinate)[1]
        })
        .attr('fill', "url(#grad1)")
        .attr('opacity', 0.7)
        .attr("r", 0)
        .transition()
        .duration(animationInterval - 200)
        .attr("r", function(d) {
            return d.value + 30
        });


    // Update main title
    d3.select("#time").node().innerText = displayYear;
    // .text("中国人口结构金字塔 (" + displayYear + ")");

    // Update slider
    d3.select("#year-input")
        .node().value = displayYear;

}

d3.json("data/animated_spot.json", function(sights_data) {
    initializeEventHandlers(sights_data)
    initializeAnimation(sights_data)
        // initializeAxes
    updateChart(sights_data)
});