 function draw_lanshizi() {

     var myChart2 = echarts.init(document.getElementById("lanshizi"));
     var nodes = [{
         category: '主线',
         name: '1',
         symbolSize: 23
     }, ];
     var links = [];
     var categories = [{
         name: 'Company'
     }, {
         name: 'Person'
     }, {
         name: 'Boss'
     }, ]
     var options = {
         baseOption: {
             color: ["#3EBFED", "#FFDA44", "rgb(176,83,87)"],
             tooltip: {

                 formatter: function(x) {
                     if (x.data.category == "Boss") {
                         return "<div style='background-color:white; border-radius: 10px; padding:10px;'><div style='display:inline-block;'><img style = height:80px;vertical-align:middle  src = 'test/zlq.png' > </img><div style='color:black; display: inline-block; vertical-align:middle; padding-right:0px'> <strong>ZHUO LIQIANG</strong><br> CEO of Shanghai Wanzhong Medical Co., Ltd.,<br>graduated from Department of <br>chemical engineering of Fuzhou University, <br>after that, he became DBA of Peking University.  </div><div>"
                     } else {
                         return x.data.label; //设置提示框的内容和格式 节点和边都显示name属性
                     }
                 }
             },
             timeline: {
                 data: [
                     '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
                 ],
                 show: true,
                 axisType: 'category',
                 loop: false,
                 autoPlay: false,
                 playInterval: 2000,
                 bottom: 20,
                 lineStyle: {
                     show: true,
                 },
                 symbolSize: 0,

                 label: {
                     normal: {

                         show: true,
                         padding: -5,
                         textStyle: {
                             fontSize: '14',
                             color: 'white'
                         }

                     },
                     emphasis: {
                         textStyle: {
                             fontSize: '14',
                             color: '#FFDA44'
                         }
                     }
                 },
                 checkpointStyle: {
                     color: "#3EBFED",
                     borderColor: "#FFDA44",
                     borderWidth: 2,
                 },
                 controlStyle: {
                     showPrevBtn: false,
                     showNextBtn: false,
                     itemSize: 50,
                     itemGap: 40,
                     normal: {
                         color: 'white',
                         borderColor: 'white',
                         borderWidth: 1.5,
                     },
                     emphasis: {
                         color: '#FFDA44',
                         borderColor: '#FFDA44',
                         borderWidth: 1.5,
                     },
                 }
             },
             title: {
                 left: 'center',
                 itemGap: 60,
                 text: ' Blue Cross Medical Group',
                 subtext: '*size denotes the amount of connections',
                 textStyle: {
                     fontSize: 25,
                     color: "white",
                 },
                 subtextStyle: {
                     fontSize: 14,
                     color: "white",
                     align: "right"
                 }
             },
             backgroundColor: {
                 color: {
                     type: 'linear',
                     x: 0,
                     y: 0,
                     x2: 0,
                     y2: 1,
                     colorStops: [{
                         offset: 0,
                         color: 'red' // 0% 处的颜色
                     }, {
                         offset: 1,
                         color: 'blue' // 100% 处的颜色
                     }],
                     globalCoord: false // 缺省为 false
                 }
             },
             legend: [{
                 //selectedMode: 'single',
                 top: 60,
                 left: 'center',
                 data: categories,
                 show: true,
                 //selected: selected1
                 textStyle: {
                     fontSize: 14,
                     color: "white"
                 }
             }],

             animationDurationUpdate: 2,
             animationEasingUpdate: 'quinticInOut',

             series: [{
                 type: 'graph',
                 ribbonType: true,
                 //layout: 'circular',
                 edgeSymbol: ['circle'],
                 edgeSymbolSize: [1, 50],
                 circular: {
                     rotateLabel: true
                 },

                 layout: 'force',

                 force: {
                     //initLayout: 'circular',
                     repulsion: 150,
                     gravity: 0.1,
                     edgeLength: [10, 50],
                     layoutAnimation: true,
                 },

                 // roam: true,
                 focusNodeAdjacency: false,
                 hoverAnimation: false,

                 label: {
                     normal: {
                         position: 'right',
                         color: 'transparent',
                         // fontWeight: 'bold',
                         fontSize: 0,
                     },
                     // show: false
                 },

                 draggable: true,
                 itemStyle: {
                     normal: {
                         borderColor: '#fff',
                         borderWidth: 0.5,
                     }
                 },

                 lineStyle: {
                     color: 'grey',
                     opacity: 0.5,
                     curveness: 0
                 },
                 emphasis: {
                     lineStyle: {
                         width: 3
                     }
                 },
                 categories: categories,
                 data: nodes,
                 links: links
             }]
         },
         options: null
     };

     $.getJSON("test/lanshizi2.json", function(res) {
         all_data = res;
         options.options = res;
         myChart2.setOption(options)
     })

 }