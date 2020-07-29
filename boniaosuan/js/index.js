;
(function() {
    var data = {
        lineChart: [{
                date: '1985',
                label: '1985',
                value: 1
            },
            {
                date: '1986',
                label: '1986',
                value: 6
            },
            {
                date: '1987',
                label: '1987',
                value: 52
            },
            {
                date: '1988',
                label: '1988',
                value: 104
            },
            {
                date: '1989',
                label: '1989',
                value: 103
            },
            {
                date: '1990',
                label: '1990',
                value: 88
            },
            {
                date: '1991',
                label: '1991',
                value: 73
            },
            {
                date: '1992',
                label: '1992',
                value: 75
            },
            {
                date: '1993',
                label: '1993',
                value: 97
            },
            {
                date: '1994',
                label: '1994',
                value: 128
            },
            {
                date: '1995',
                label: '1995',
                value: 128
            },
            {
                date: '1996',
                label: '1996',
                value: 128
            },
            {
                date: '1997',
                label: '1997',
                value: 166
            },
            {
                date: '1998',
                label: '1998',
                value: 159
            },
            {
                date: '1999',
                label: '1999',
                value: 161
            },
            {
                date: '2000',
                label: '2000',
                value: 216
            },
            {
                date: '2001',
                label: '2001',
                value: 186
            },
            {
                date: '2002',
                label: '2002',
                value: 206
            },
            {
                date: '2003',
                label: '2003',
                value: 199
            },
            {
                date: '2004',
                label: '2004',
                value: 173
            },
            {
                date: '2005',
                label: '2005',
                value: 126
            },
            {
                date: '2006',
                label: '2006',
                value: 178
            },
            {
                date: '2007',
                label: '2007',
                value: 127
            },
            {
                date: '2008',
                label: '2008',
                value: 109
            },
            {
                date: '2009',
                label: '2009',
                value: 88
            },
            {
                date: '2010',
                label: '2010',
                value: 44
            },
            {
                date: '2011',
                label: '2011',
                value: 67
            },
            {
                date: '2012',
                label: '2012',
                value: 51
            },
            {
                date: '2013',
                label: '2013',
                value: 60
            },
            {
                date: '2014',
                label: '2014',
                value: 54
            },
            {
                date: '2015',
                label: '2015',
                value: 16
            },

        ],
        pieChart: [{
                color: 'blue',
                description: '林夕',
                title: 'online',
                value: 3370
            },
            {
                color: 'red',
                description: '黄伟文',
                title: 'retail',
                value: 1608
            }
        ]
    };
    var data1 = {
        lineChart: [{
                date: '1985',
                label: '1985',
                value: 0
            },
            {
                date: '1986',
                label: '1986',
                value: 0
            },
            {
                date: '1987',
                label: '1987',
                value: 0
            },
            {
                date: '1988',
                label: '1988',
                value: 0
            },
            {
                date: '1989',
                label: '1989',
                value: 0
            },
            {
                date: '1990',
                label: '1990',
                value: 0
            },
            {
                date: '1991',
                label: '1991',
                value: 0
            },
            {
                date: '1992',
                label: '1992',
                value: 0
            },
            {
                date: '1993',
                label: '1993',
                value: 4
            },
            {
                date: '1994',
                label: '1994',
                value: 21
            },
            {
                date: '1995',
                label: '1995',
                value: 53
            },
            {
                date: '1996',
                label: '1996',
                value: 118
            },
            {
                date: '1997',
                label: '1997',
                value: 137
            },
            {
                date: '1998',
                label: '1998',
                value: 89
            },
            {
                date: '1999',
                label: '1999',
                value: 42
            },
            {
                date: '2000',
                label: '2000',
                value: 75
            },
            {
                date: '2001',
                label: '2001',
                value: 152
            },
            {
                date: '2002',
                label: '2002',
                value: 156
            },
            {
                date: '2003',
                label: '2003',
                value: 145
            },
            {
                date: '2004',
                label: '2004',
                value: 166
            },
            {
                date: '2005',
                label: '2005',
                value: 116
            },
            {
                date: '2006',
                label: '2006',
                value: 76
            },
            {
                date: '2007',
                label: '2007',
                value: 47
            },
            {
                date: '2008',
                label: '2008',
                value: 48
            },
            {
                date: '2009',
                label: '2009',
                value: 53
            },
            {
                date: '2010',
                label: '2010',
                value: 38
            },
            {
                date: '2011',
                label: '2011',
                value: 23
            },
            {
                date: '2012',
                label: '2012',
                value: 11
            },
            {
                date: '2013',
                label: '2013',
                value: 14
            },
            {
                date: '2014',
                label: '2014',
                value: 24
            },
            {
                date: '2015',
                label: '2015',
                value: 24
            },

        ],
        pieChart: [{
                color: 'blue',
                description: '林夕',
                title: 'online',
                value: 3370
            },
            {
                color: 'red',
                description: '黄伟文',
                title: 'retail',
                value: 1608
            }
        ]
    };
    var DURATION = 1000;
    var DELAY = 500;

    /**
     * draw the fancy line chart
     *
     * @param {String} elementId elementId
     * @param {Array}  data      data
     */
    function drawLineChart(elementId, data) {
        // parse helper functions on top
        var parse = d3.time.format('%Y').parse;
        // data manipulation first
        data = data.map(function(datum) {
            datum.date = parse(datum.date);

            return datum;
        });

        console.log(data);
        // TODO code duplication check how you can avoid that
        var containerEl = document.getElementById(elementId),
            // width = containerEl.clientWidth,
            width = 600,
            height = 300,
            margin = {
                top: 10,
                right: 10,
                left: 10
            },

            detailWidth = 98,
            detailHeight = 55,
            detailMargin = 10,

            container = d3.select(containerEl),
            svg = container.select('svg')
            .attr('width', width)
            .attr('height', height + margin.top),

            x = d3.time.scale().range([0, width - detailWidth]),
            xAxis = d3.svg.axis().scale(x)
            .ticks(8)
            .tickSize(-height),
            xAxisTicks = d3.svg.axis().scale(x)
            .ticks(6)
            .tickSize(-height)
            .tickFormat(''),
            y = d3.scale.linear().range([height, -500]),
            yAxisTicks = d3.svg.axis().scale(y)
            .ticks(5)
            .tickSize(width)
            .tickFormat('')
            .orient('right'),

            area = d3.svg.area()
            .interpolate('linear')
            .x(function(d) { return x(d.date) + detailWidth / 2; })
            .y0(height)
            .y1(function(d) { return y(d.value); }),

            line = d3.svg.line()
            .interpolate('linear')
            .x(function(d) { return x(d.date) + detailWidth / 2; })
            .y(function(d) { return y(d.value); }),

            startData = data.map(function(datum) {
                return {
                    date: datum.date,
                    value: 0
                };
            }),

            circleContainer;

        // Compute the minimum and maximum date, and the maximum price.
        x.domain([data[0].date, data[data.length - 1].date]);
        // hacky hacky hacky :(
        y.domain([0, d3.max(data, function(d) { return d.value; }) + 700]);

        svg.append('g')
            .attr('class', 'lineChart--xAxisTicks')
            .attr('transform', 'translate(' + detailWidth / 2 + ',' + height + ')')
            .call(xAxisTicks);

        svg.append('g')
            .attr('class', 'lineChart--xAxis')
            .attr('transform', 'translate(' + detailWidth / 2 + ',' + (height + 7) + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'lineChart--yAxisTicks')
            .call(yAxisTicks);

        // Add the line path.
        svg.append('path')
            .datum(startData)
            .attr('class', 'lineChart--areaLine')
            .attr('d', line)
            .transition()
            .duration(DURATION)
            .delay(DURATION / 2)
            .attrTween('d', tween(data, line))
            .each('end', function() {
                drawCircles(data);
            });


        // Add the area path.
        svg.append('path')
            .datum(startData)
            .attr('class', 'lineChart--area')
            .attr('d', area)
            .transition()
            .duration(DURATION)
            .attrTween('d', tween(data, area));

        // Helper functions!!!
        function drawCircle(datum, index) {
            circleContainer.datum(datum)
                .append('circle')
                .attr('class', 'lineChart--circle')
                .attr('r', 0)
                .attr(
                    'cx',
                    function(d) {
                        return x(d.date) + detailWidth / 2;
                    }
                )
                .attr(
                    'cy',
                    function(d) {
                        return y(d.value);
                    }
                )
                .on('mouseenter', function(d) {
                    d3.select(this)
                        .attr(
                            'class',
                            'lineChart--circle lineChart--circle__highlighted'
                        )
                        .attr('r', 7);

                    d.active = true;

                    showCircleDetail(d);
                })
                .on('mouseout', function(d) {
                    d3.select(this)
                        .attr(
                            'class',
                            'lineChart--circle'
                        )
                        .attr('r', 4);

                    if (d.active) {
                        hideCircleDetails();

                        d.active = false;
                    }
                })
                .on('click touch', function(d) {
                    if (d.active) {
                        showCircleDetail(d)
                    } else {
                        hideCircleDetails();
                    }
                })
                .transition()
                .delay(DURATION / 10 * index)
                .attr('r', 4);
        }

        function drawCircles(data) {
            circleContainer = svg.append('g');

            data.forEach(function(datum, index) {
                drawCircle(datum, index);
            });
        }

        function hideCircleDetails() {
            circleContainer.selectAll('.lineChart--bubble')
                .remove();
        }

        function showCircleDetail(data) {
            var details = circleContainer.append('g')
                .attr('class', 'lineChart--bubble')
                .attr(
                    'transform',
                    function() {
                        var result = 'translate(';

                        result += x(data.date);
                        result += ', ';
                        result += y(data.value) - detailHeight - detailMargin;
                        result += ')';

                        return result;
                    }
                );

            details.append('path')
                .attr('d', 'M2.99990186,0 C1.34310181,0 0,1.34216977 0,2.99898218 L0,47.6680579 C0,49.32435 1.34136094,50.6670401 3.00074875,50.6670401 L44.4095996,50.6670401 C48.9775098,54.3898926 44.4672607,50.6057129 49,54.46875 C53.4190918,50.6962891 49.0050244,54.4362793 53.501875,50.6670401 L94.9943116,50.6670401 C96.6543075,50.6670401 98,49.3248703 98,47.6680579 L98,2.99898218 C98,1.34269006 96.651936,0 95.0000981,0 L2.99990186,0 Z M2.99990186,0')
                .attr('width', detailWidth)
                .attr('height', detailHeight);

            var text = details.append('text')
                .attr('class', 'lineChart--bubble--text');

            text.append('tspan')
                .attr('class', 'lineChart--bubble--label')
                .attr('x', detailWidth / 2)
                .attr('y', detailHeight / 3)
                .attr('text-anchor', 'middle')
                .text(data.label);

            text.append('tspan')
                .attr('class', 'lineChart--bubble--value')
                .attr('x', detailWidth / 2)
                .attr('y', detailHeight / 4 * 3)
                .attr('text-anchor', 'middle')
                .text(data.value);
        }

        function tween(b, callback) {
            return function(a) {
                var i = (function interpolate() {
                    return function(t) {
                        return a.map(function(datum, index) {
                            return {
                                date: datum.date,
                                value: datum.value + b[index].value * t
                            };
                        });
                    };
                })();

                return function(t) {
                    return callback(i(t));
                };
            };
        }
    }

    /**
     * draw the fancy pie chart
     *
     * @param {String} elementId elementId
     * @param {Array}  data      data
     */
    function drawPieChart(elementId, data) {
        // TODO code duplication check how you can avoid that
        var containerEl = document.getElementById(elementId),
            width = 900,
            // width = containerEl.clientWidth,
            height = width * 0.4,
            radius = Math.min(width, height) / 2,
            container = d3.select(containerEl),
            svg = container.select('svg')
            .attr('width', width)
            .attr('height', height);
        var pie = svg.append('g')
            .attr(
                'transform',
                'translate(' + width / 2 + ',' + height / 2 + ')'
            );

        var detailedInfo = svg.append('g')
            .attr('class', 'pieChart--detailedInformation');

        var twoPi = 2 * Math.PI;
        var pieData = d3.layout.pie()
            .value(function(d) { return d.value; });

        var arc = d3.svg.arc()
            .outerRadius(radius - 20)
            .innerRadius(0);

        var pieChartPieces = pie.datum(data)
            .selectAll('path')
            .data(pieData)
            .enter()
            .append('path')
            .attr('class', function(d) {
                return 'pieChart__' + d.data.color;
            })
            .attr('filter', 'url(#pieChartInsetShadow)')
            .attr('d', arc)
            .each(function() {
                this._current = { startAngle: 0, endAngle: 0 };
            })
            .transition()
            .duration(DURATION)
            .attrTween('d', function(d) {
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);

                return function(t) {
                    return arc(interpolate(t));
                };
            })
            .each('end', function handleAnimationEnd(d) {
                drawDetailedInformation(d.data, this);
            });

        drawChartCenter();

        function drawChartCenter() {
            var centerContainer = pie.append('g')
                .attr('class', 'pieChart--center');

            centerContainer.append('circle')
                .attr('class', 'pieChart--center--outerCircle')
                .attr('r', 0)
                .attr('filter', 'url(#pieChartDropShadow)')
                .transition()
                .duration(DURATION)
                .delay(DELAY)
                .attr('r', radius - 50);

            centerContainer.append('circle')
                .attr('id', 'pieChart-clippy')
                .attr('class', 'pieChart--center--innerCircle')
                .attr('r', 0)
                .transition()
                .delay(DELAY)
                .duration(DURATION)
                .attr('r', radius - 55)
                .attr('fill', '#fff');
        }

        function drawDetailedInformation(data, element) {
            var bBox = element.getBBox(),
                infoWidth = width * 0.3,
                anchor,
                infoContainer,
                position;

            if ((bBox.x + bBox.width / 2) > 0) {
                infoContainer = detailedInfo.append('g')
                    .attr('width', infoWidth)
                    .attr(
                        'transform',
                        'translate(' + (width - infoWidth) + ',' + (bBox.height + bBox.y) + ')'
                    );
                anchor = 'end';
                position = 'right';
            } else {
                infoContainer = detailedInfo.append('g')
                    .attr('width', infoWidth)
                    .attr(
                        'transform',
                        'translate(' + 0 + ',' + (bBox.height + bBox.y) + ')'
                    );
                anchor = 'start';
                position = 'left';
            }

            infoContainer.data([data.value])
                .append('text')
                .text('0')
                .attr('class', 'pieChart--detail--percentage')
                .attr('x', (position === 'left' ? 0 : infoWidth))
                .attr('y', 120)
                .attr('text-anchor', anchor)
                .transition()
                .duration(DURATION)
                .tween('text', function(d) {
                    var i = d3.interpolateRound(+this.textContent.replace(/\s%/ig, ''),
                        d
                    );

                    return function(t) {
                        this.textContent = i(t) + ' 首';
                    };
                });

            infoContainer.append('line')
                .attr('class', 'pieChart--detail--divider')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', 0)
                .transition()
                .duration(DURATION)
                .attr('x2', infoWidth);

            infoContainer.data([data.description])
                .append('foreignObject')
                .attr('width', infoWidth)
                .attr('height', 200)
                .append('xhtml:body')
                .attr(
                    'class',
                    'pieChart--detail--textContainer ' + 'pieChart--detail__' + position
                )
                .html(data.description);
        }
    }

    function ಠ_ಠ() {
        drawPieChart('pieChart', data.pieChart);
        drawLineChart('lineChart1', data.lineChart);

        drawLineChart('lineChart', data1.lineChart);
    }

    // yeah, let's kick things off!!!
    ಠ_ಠ();

})();