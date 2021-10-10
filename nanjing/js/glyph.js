let margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

// svg container
let svg = d3.select("#svg-grid")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let numAcross = 10;
//根据窗口大小确定icon之间的留白
let iconPadding = window.innerWidth / 40;
let squareWidth = Math.floor(width / numAcross);
let iconWidth = squareWidth - iconPadding * 2;
// let data = d3.range(10);
let numIcons = data.length;


// Define the div for the tooltip
var tooltip = d3.select("#svg-grid").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// define icon and store it in svg <defs> elements as a reusable component
svg.append("defs")
    .append("g")
    .attr("id", "iconCustom_1")
    .append("path")
    .attr("d", "M320.889263 776.084211l245.113263 234.442105s256.970105-236.570947 357.537685-466.782316l48.235789-152.306526C1015.727158 189.817263 989.022316 0 989.022316 0L249.263158 707.557053l10.778947 10.347789-220.833684 221.049263 59.365053 59.311158 222.315789-222.208z")
    .attr("transform", "scale(" + iconWidth / 1200 + ")");
svg.append("defs")
    .append("g")
    .attr("id", "iconCustom_2")
    .append("path")
    .attr("d", "M387.2 140.8h9.6l92.8 38.4h742.4c9.6 0 19.2 6.4 22.4 19.2V243.2c0 6.4 6.4 12.8 9.6 12.8h3.2c12.8 0 19.2 9.6 19.2 22.4v76.8c0 12.8-9.6 22.4-22.4 22.4h-3.2c-6.4 0-12.8 6.4-12.8 12.8v41.6c0 12.8-9.6 22.4-22.4 22.4h-272v3.2c-41.6 92.8-99.2 144-169.6 147.2h-160l-64 262.4c-3.2 6.4-6.4 12.8-12.8 16H249.6c-12.8 0-22.4-9.6-22.4-22.4v-6.4l80-320c9.6-35.2-12.8-70.4-48-80-6.4 0-9.6-3.2-16-3.2h-32c-12.8 0-22.4-9.6-22.4-22.4v-6.4l22.4-83.2L192 284.8c-3.2-6.4 0-16 6.4-22.4l3.2-3.2L246.4 224l19.2-70.4c3.2-9.6 9.6-16 16-16h3.2c0 3.2 102.4 3.2 102.4 3.2z m-6.4 41.6H304L288 243.2c0 3.2-3.2 6.4-6.4 9.6l-3.2 3.2-38.4 28.8 19.2 51.2c0 3.2 3.2 6.4 0 9.6v3.2l-16 64h22.4l6.4 3.2c57.6 16 96 73.6 80 131.2l-73.6 291.2h246.4l102.4-412.8c3.2-9.6 9.6-16 16-16h563.2v-19.2c0-25.6 16-44.8 35.2-54.4V294.4h-3.2c-19.2-9.6-32-25.6-35.2-48v-25.6h-185.6L979.2 320c-3.2 6.4-9.6 12.8-16 12.8H432c-12.8 0-22.4-9.6-22.4-22.4 0-3.2 0-6.4 3.2-9.6l38.4-92.8-70.4-25.6z m73.6 534.4c12.8 0 22.4 9.6 22.4 22.4 0 9.6-6.4 19.2-19.2 22.4H368c-12.8 0-22.4-9.6-22.4-22.4 0-9.6 6.4-19.2 19.2-22.4H454.4z m44.8-102.4c12.8 0 22.4 9.6 22.4 22.4 0 9.6-6.4 19.2-19.2 22.4H412.8c-12.8 0-22.4-9.6-22.4-22.4 0-9.6 6.4-19.2 19.2-22.4H499.2z m246.4-160h-83.2l-25.6 105.6h137.6c51.2 0 96-35.2 131.2-105.6h-118.4v51.2c0 6.4 3.2 12.8 6.4 19.2l3.2 6.4-35.2 28.8c-12.8-12.8-19.2-28.8-19.2-44.8v-6.4c3.2 0 3.2-54.4 3.2-54.4z m-204.8 60.8c12.8 0 22.4 9.6 22.4 22.4 0 9.6-6.4 19.2-19.2 22.4H454.4c-12.8 0-22.4-9.6-22.4-22.4 0-9.6 6.4-19.2 19.2-22.4H540.8z m428.8-281.6h-480l-25.6 57.6h476.8l28.8-57.6z")
    .attr("transform", "scale(" + iconWidth / 1200 + ")");
// draw icons
drawIcons(numIcons, numAcross, iconWidth, iconPadding, svg);


function drawIcons(count, row, width, padding, canvas) {
    // count: number of icons
    // nAcross: number of icons in each row
    // width: width of icon
    // padding: padding around each icon
    // canvas: canvas element to draw on

    // compute dimensions
    let nAcross = row;
    let nDown = Math.ceil(count / nAcross);
    let squareWidth = width + padding * 2;
    console.log(squareWidth);

    // width and height of icon area
    let w = nAcross * squareWidth;
    let h = nDown * squareWidth;

    // clear previously drawn chart
    d3.select("#icons").remove();

    // append group with specfied dimensions
    let area = canvas.append("g")
        .attr("id", "icons")
        .attr("width", w)
        .attr("height", h);


    // draw icons
    area.selectAll("use")
        .data(glyph_data)
        .enter()
        .append("use")
        .attr("xlink:href", function(d) {
            if (d.type == "gun") {
                return "#iconCustom_2"
            } else {
                return "#iconCustom_1"
            }
        })
        .attr("id", function(d) {
            return "icon" + d;
        })
        .attr("x", function(d) {
            return d.id % nAcross * squareWidth;
            //按日期间隔排
            // return d.date % nAcross * squareWidth;
            // 20 * Math.random()
        })
        .attr("y", function(d) {
            return Math.floor(d.id / nAcross) * squareWidth;
            //按日期间隔排
            // return Math.floor(d.date / nAcross) * squareWidth;
        })
        .style("fill", function(d) {
            if (d.death == "false") {
                return "white";
            } else {
                return "brown";
            }
        })
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("When: " + d.date + "<br/>How: " + d.type + "<br/>When: " + d.when + "<br/>Where: " + d.where)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}