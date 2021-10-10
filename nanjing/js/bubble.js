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
    .tickSizeInner(0)
    //文字离线的距离
    .tickPadding(40);

//上下间隔
interval = 100

DrawBubbles("kill", 1)
DrawBubbles("hurt", 2)
DrawBubbles("rape", 3)


function DrawBubbles(type, index) {

    crime_type = type
        // Circles now easily reusable
    circles_group = svg_bubble
        .append('g')
        .selectAll('g.circle')
        // .data(data.filter(function(d) {
        //     return d.type == type;
        // }))
        .data(data)
        .enter()
        .append('g')

    circles_group.append('circle')
        // .attr('r', d => d.crime_type)
        .attr('r', function(d) {
            return d[crime_type] * 2;
        })
        .attr('cx', function(d) {
            return xscale(d.date);
        })
        .attr('cy', function(d) {
            return interval * index;
        })
        .attr('class', type)
        .attr('opacity', 0.3);


    // circles_group.append('text')
    //     .text(d => d.type)
    //     .attr('text-anchor', 'middle')
    //     .attr('alignment-baseline', 'middle')
    //     .attr('x', function(d) {
    //         return xscale(d.date);
    //     })
    //     .attr('y', function(d) {
    //         return interval * index;
    //     })
    //     .attr('fill', 'white');

    circles_group.append('g')
        .attr("class", "axis")
        .attr('transform', 'translate(0,' + interval * index + ')')
        .call(xaxis);
}