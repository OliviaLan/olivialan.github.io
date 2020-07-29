function draw(geo_data) {
    // "use strict";
    var margin = 30,
        // width = $(window).width() / 2.5 - margin,
        width = 400 - margin,
        height = 400 - margin;

    var svg = d3.select("#clickable_1")
        .append("svg")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        // .attr("width", width + margin)
        // .attr("height", height + margin)
        // .attr('fill', 'black')
        .append('g')
        .attr('class', 'map');

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var sights_tooltip = d3.select("body").append("div")
        .attr("class", "sights_tooltip")
        .style("opacity", 0);

    //debugger
    //查看数据是否load好;
    //设置地图映射方式
    var projection = d3.geo.mercator()
        .center([121.505049, 31.220435])
        //.center([121.7, 31.2])
        .scale(900000)
        //整个上海.scale(23000)
        // .translate([width / 2, height / 2]);
    var path = d3.geo.path().projection(projection);

    var map = svg.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', "#505ab5")
        .attr('stroke-width', '1.5')
        .attr('stroke-opacity', '1');

    //debugger;
    //将小段小段的path按照名字集合，key是路名
    var nested = d3.nest()
        .key(function(d) {
            return d.properties.name
        })
        .entries(geo_data.features);

    streets = nested.filter(street =>
        street.key == "中华路" ||
        street.key == "人民路" ||
        street.key == "方浜中路" ||
        street.key == "方浜西路"
    );
    counter = [0, 1, 2, 3];

    //debugger;

    for (var i in counter) {
        var certain_path = svg.selectAll('path streets')
            .data(streets[i].values)
            .enter()
            .append("path")
            .attr("class", "streets street_" + i)
            .attr('d', path)
            .attr('fill', 'transparent')
            .attr('stroke', '#fed73c')
            .attr('stroke-width', '3')
            .attr('stroke-opacity', '1')
            .on("mouseover", function(d) {
                //选定道路出现tooltip
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                if (d.properties.name == '中华路') {
                    tooltip.html('<strong >中华路</strong><br>路基原为上海城墙外的城壕（护城河）<br>1912年拆城填河，兴筑环城马路，1914年冬竣工<br>南半圈定名为中华路，又称环城圆路<br>小东门、小南门、老西门是沿路三大商业网点。')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '人民路') {
                    tooltip.html('<strong >人民路</strong><br>东起东门路，西迄方浜西路，呈半圆形<br>路基原为上海城墙外城城壕（护城河）的北半部<br>1913年（民国2年）6月拆城填河筑路<br><strong>——改名历史——</strong><br>?-1914:法华民国路<br>1914-1949:民国路<br>1949-今:人民路<br>')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '方浜中路') {
                    tooltip.html('<strong >方浜中路</strong><br>全长1469米，宽6.1米到17.6米。<br>东起小东门中华路，西迄人民路、中华路交会处。<br>1913年筑，填方浜筑路。<br><strong>——改名历史——</strong><br>1913-?:宝带路<br>?-1946:方浜路<br>1946-今:方浜中路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '方浜西路') {
                    tooltip.html('<strong >' + d.properties.name + '</strong>' + '<br>东起人民路、中华路交会处，西迄西藏南路。' + '<br><strong>——改名历史——</strong>' + '<br>' + d.properties.history)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }
                //选定的道路变色
                d3.selectAll("." + this.className.baseVal.substring(8))
                    .attr('stroke', '#fed73c')
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
                    .attr('stroke', '#fed73c')
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

    //下面是画散点的
    function draw_sights(sights_data) {

        var sights = svg.append('g')
            .selectAll("circle")
            .data(sights_data.sights)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return projection(d.coordinate)[0]
            })
            .attr('cy', function(d) {
                return projection(d.coordinate)[1]
            })
            .attr('fill', 'red')
            .attr('opacity', 0.7)
            .attr("r", 2)
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
            });
        repeat();

        function repeat() {
            sights.attr("r", 3)
                .transition()
                .duration(1000)
                .attr('r', 4)
                .transition()
                .duration(1000)
                .attr('r', 3)
                //version4里面each变成了on
                .each("end", repeat)
        }
    }

    d3.json("data/sights_1.json", draw_sights);
};

function draw_2(geo_data) {
    // "use strict";
    var margin = 30,
        width = 400 - margin,
        height = 400 - margin;

    var svg = d3.select("#clickable_2")
        .append("svg")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .append('g')
        .attr('class', 'map');

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var sights_tooltip = d3.select("body").append("div")
        .attr("class", "sights_tooltip")
        .style("opacity", 0);

    //debugger
    //查看数据是否load好;
    //设置地图映射方式
    var projection = d3.geo.mercator()
        .center([121.4949863, 31.2338942])
        .scale(800000)
    var path = d3.geo.path().projection(projection);

    var map = svg.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', "#505ab5")
        .attr('stroke-width', '1.5')
        .attr('stroke-opacity', '1');

    //debugger;
    //将小段小段的path按照名字集合，key是路名
    var nested = d3.nest()
        .key(function(d) {
            return d.properties.name
        })
        .entries(geo_data.features);

    streets = nested.filter(street =>
        street.key == "南京东路" || street.key == "南京西路" ||
        street.key == "九江路" || street.key == "汉口路" ||
        street.key == "福州路" || street.key == "广东路" ||
        street.key == "北海路" || street.key == "延安东路" ||
        street.key == "南京路步行街"
    );

    counter = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    //debugger;

    for (var i in counter) {
        var certain_path = svg.selectAll('path streets')
            .data(streets[i].values)
            .enter()
            .append("path")
            .attr("class", "streets street_" + i)
            .attr('d', path)
            .attr('fill', 'transparent')
            .attr('stroke', '#fed73c')
            .attr('stroke-width', '3')
            .attr('stroke-opacity', '1')
            .on("mouseover", function(d) {
                //选定道路出现tooltip
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                //这里必须要分开写
                if (d.properties.name == '南京西路') {
                    tooltip.html('<strong >南京西路</strong><br><br><strong>——改名历史——</strong><br>1862-1945:涌泉路(静安寺路)<br>1945-今:南京西路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '南京东路') {
                    tooltip.html('<strong >南京东路（大马路）</strong><br>原南京路，开辟为租界后，形成最早的商业街<br>先施、永安、新新、大新等四大百货公司集聚于此<br>还有老介福、老凤祥、亨达利、张小泉、邵万生等数以百计的特色店<br><strong>——改名历史——</strong><br>1851-1865:派克弄、花园弄<br>1865-1945:南京路、大马路<br>1945-今:南京东路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '南京路步行街') {
                    tooltip.html('<strong >南京路步行街（大马路）</strong><br>原南京路，开辟为租界后，形成最早的商业街<br>先施、永安、新新、大新等四大百货公司集聚于此<br>还有老介福、老凤祥、亨达利、张小泉、邵万生等数以百计的特色店<br><strong>——改名历史——</strong><br>1851-1865:派克弄、花园弄<br>1865-1945:南京路、大马路<br>1945-今:南京路步行街')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '延安东路') {
                    tooltip.html('<strong >延安东路（七马路）</strong><br>东起中山东一路，中山东二路连接处<br>西迄成都北路，与延安中路相连接<br>最初是黄浦江的一条支流“洋泾浜”<br>1849年后一度是英、法租界的界限<br>1915年洋泾浜被填平，并着两岸原有的小马路一起<br>修建成了为全上海最宽阔的马路，成为南北租界分界线<br><strong>——改名历史——</strong><br>1941-1943:爱多亚路(西藏中路以东)、孟纳拉路(连云路以西)<br>1943-1945:大上海路<br>1945-1950:中正路<br>1950-今:延安东路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '九江路') {
                    tooltip.html('<strong >九江路（二马路）</strong><br>东起中山东一路，西迄西藏中路<br>这条路曾被称为“东方华尔街”<br>当时,九江路东段起有19世纪开设的阿加刺银行、有利银行<br>20世纪初开设的美资花旗、大通银行，日资三井、荷资安达银行<br>德资德华银行、华资的华侨银行等<br>以及中源、仁德、等银号<br>现在的九江路是各大酒店聚集地<br><strong>——改名历史——</strong><br>约1850-1865:縴道路、杭州路<br>1865-1949:二马路<br>1949-今:九江路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '汉口路') {
                    tooltip.html('<strong >汉口路（三马路）</strong><br>东起中山东一路，西迄西藏中路<br>1846年，汉口路开辟外滩到河南路一段<br>因为靠近江海北关，所以命名为“海关路”<br>1865年，工部局以长江中游港口汉口的名称，正式命名为汉口路<br>这里诞生了沪上第一张中文报纸《上海新报》<br>后来成为了上海滩“报业街”的中心地带<br>1910年起，《申报》、《新闻报》和《时报》<br>成为了上海最重要的三份报纸<br><strong>——改名历史——</strong><br>约1850-1865:山海关路<br>1865-1949:三马路<br>1949-今:汉口路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '福州路') {
                    tooltip.html('<strong >福州路（四马路）</strong><br>东起中山东一路，西迄西藏中路<br>福州路素有“文化街”的雅称<br>1843年冬，英国传教士麦都思在该路相近的山东中路<br>创办中国第一家机器印刷厂墨海书馆<br>以后，上海近百家出版机构以及文化用品商店均集中在这条路上<br>以中华书局和商务印书馆为代表<br>上海人把其东段的文化街称作为“福州路文化街”<br>而把其西段的妓院娱乐场称作为“四马路”<br><strong>——改名历史——</strong><br>约1850-1860:布道路、教会路<br>1860-1865:布道路<br>1865-今:福州路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '广东路') {
                    tooltip.html('<strong >广东路（五马路）</strong><br>东起中山东一路，西迄西藏中路<br>最早的时候，五马路不是一条路<br>而是由北门路、宝善路、东正丰街、西正丰街四条路<br>1865年工部局将全路统一改名为广东路<br><strong>——改名历史——</strong><br>1850-1865:宝善街<br>1865-今:广东路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '北海路') {
                    tooltip.html('<strong >北海路（六马路）</strong><br>东起福建中路，西迄西藏中路<br>圆弧形马路，1862年改建原第二跑马场部分跑道筑成路<br>上海第二跑马道<br><strong>——改名历史——</strong><br>1883-1949:六马路<br>1949-今:北海路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else {
                    tooltip.html('<strong >' + d.properties.name + '</strong>' + '<br>' + d.properties.history)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }
                //debugger;选定的道路变色
                d3.selectAll("." + this.className.baseVal.substring(8))
                    .attr('stroke', '#fed73c')
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
                    .attr('stroke', '#fed73c')
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

    //下面是画散点的
    function draw_sights_2(sights_data) {

        var sights = svg.append('g')
            .selectAll("circle")
            .data(sights_data.sights)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return projection(d.coordinate)[0]
            })
            .attr('cy', function(d) {
                return projection(d.coordinate)[1]
            })
            .attr('fill', 'red')
            .attr('opacity', 0.7)
            .attr("r", 3)
            // .attr('stroke', '#505ab5')
            // .attr('stroke-opacity', '1')
            // .attr('stroke-width', '3')
            .on("mouseover", function(d) {

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
            });
        repeat();

        function repeat() {
            sights.attr("r", 3)
                .transition()
                .duration(1000)
                .attr('r', 4)
                .transition()
                .duration(1000)
                .attr('r', 3)
                //version4里面each变成了on
                .each("end", repeat)
        }
    }

    d3.json("data/sights_2.json", draw_sights_2);
};

function draw_3(geo_data) {
    // "use strict";
    var margin = 30,
        width = 400 - margin,
        height = 400 - margin;

    var svg = d3.select("#clickable_3")
        .append("svg")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .append('g')
        .attr('class', 'map');

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var sights_tooltip = d3.select("body").append("div")
        .attr("class", "sights_tooltip")
        .style("opacity", 0);

    var projection = d3.geo.mercator()
        .center([121.6349990, 31.2755935])
        .scale(180000)
    var path = d3.geo.path().projection(projection);

    var map = svg.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'transparent')
        .attr('stroke', "#505ab5")
        .attr('stroke-width', '1.5')
        .attr('stroke-opacity', '1');

    //debugger;
    //将小段小段的path按照名字集合，key是路名
    var nested = d3.nest()
        .key(function(d) {
            return d.properties.name
        })
        .entries(geo_data.features);

    streets = nested.filter(street =>
        street.key == "杨树浦路" || street.key == "军工路"
        // ||street.key == "隆昌路" || street.key == "黄兴路" 
        // ||street.key == "长阳路"
    );

    counter = [0, 1];

    //debugger;

    for (var i in counter) {
        var certain_path = svg.selectAll('path streets')
            .data(streets[i].values)
            .enter()
            .append("path")
            .attr("class", "streets street_" + i)
            .attr('d', path)
            .attr('fill', 'transparent')
            .attr('stroke', '#fed73c')
            .attr('stroke-width', '3')
            .attr('stroke-opacity', '1')
            .on("mouseover", function(d) {
                //选定道路出现tooltip
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                //这里必须要分开写
                if (d.properties.name == '杨树浦路') {
                    tooltip.html('<strong >杨树浦路</strong><br>西起东大名路提篮桥，东迄黎平路<br>清同治八年修筑（1869年）<br>因经杨树浦港得名<br><strong>——改名历史——</strong><br>1869-2018:杨树浦路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.properties.name == '军工路') {
                    tooltip.html('<strong >军工路</strong><br>军工路修筑于1918年<br>孙中山领导的二次革命失败后，上海为军阀卢永祥所控制<br>为排挤皖系军阀齐燮元的势力<br>卢永祥调拨大量军款修筑从张华滨到黎平路的马路<br>随着军工路筑成，工厂建厂很快兴起<br>对沟通吴淞和上海的交通和发展，起到很大作用<br><strong>——改名历史——</strong><br>1919-1940:大维路、衣周塘路<br>1940-1945:东华路<br>1945-今:军工路')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } //debugger;选定的道路变色
                d3.selectAll("." + this.className.baseVal.substring(8))
                    .attr('stroke', '#fed73c')
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
                    .attr('stroke', '#fed73c')
                    .attr('stroke-width', '3')
                    .attr('stroke-opacity', '1')
            });
    }

    function draw_sights_3(sights_data) {

        var sights = svg.append('g')
            .selectAll("circle")
            .data(sights_data.sights)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return projection(d.coordinate)[0]
            })
            .attr('cy', function(d) {
                return projection(d.coordinate)[1]
            })
            .attr('fill', 'red')
            .attr('opacity', 0.7)
            .attr("r", 3)
            // .attr('stroke', '#505ab5')
            // .attr('stroke-opacity', '1')
            // .attr('stroke-width', '3')
            .on("mouseover", function(d) {

                sights_tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                //sights_tooltip.html('<strong>' + d.name + '</strong>' + '<br>' + d.history)
                sights_tooltip.html('<strong>' + d.name + '</strong><br>' + d.history)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                sights_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        repeat();

        function repeat() {
            sights.attr("r", 3)
                .transition()
                .duration(1000)
                .attr('r', 4)
                .transition()
                .duration(1000)
                .attr('r', 3)
                //version4里面each变成了on
                .each("end", repeat)
        }
    }

    d3.json("data/sights_3.json", draw_sights_3);
};

d3.json("data/xiancheng2.json", draw);
d3.json("data/zujie2.json", draw_2);
d3.json("data/beian.json", draw_3);