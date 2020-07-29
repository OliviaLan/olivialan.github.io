$(document).ready(function(){
	
	// set to center for the text on cover
	$("#things-on-cover").css({left: ($(document).width() - ($("#things-on-cover").width()+30) )/2 });
	
	// on click for logo buttons
	$("#com-logo-wrap").click(function(){
		window.open("http://www.udn.com");
	});

	$("#newmedialab-logo-wrap").click(function(){
		window.open("http://www.facebook.com/udnNewMediaLab");
	})


	// hide things with mobile class
	if (screen.width >= 768) {
		$(".mobile").css({"display": "none"});

		$("#main-container").append(
			'<div id="comments-wrap">\
				<div class="fb-comments" data-href="http://p.udn.com.tw/upf/newmedia/2015_data/20150622_linxi/index.html" data-numposts="5" data-colorscheme="light"></div>\
			</div>'
		);
	};

	// hide things with mobile class
	if (screen.width <= 767) {
		$(".mobile-hide").css({"display": "none"});
		$("#main-container").append(
				'<div class="fb-comments" data-href="http://p.udn.com.tw/upf/newmedia/2015_data/20150622_linxi/index.html" data-numposts="5" data-colorscheme="light"></div>'
		);
	};
	


	// draw the first chart
	// line chart of productivity per year
	d3.csv("data/linxi_lyrics_by_year.csv?v=2", function(data){

		var xAxisCategory = $.map(data, function(val, idx){
			if (idx == 0) {
				return val["year"];	
			}else{
				return val["year"].slice(2);
			}
			
		});

		var seriesData = $.map(data, function(val){
				return parseInt(val["songs_count"]);	
		});

		$(function () {
		    $('#productivity-chart').highcharts({
		    	chart:{
		    		type: "area",
		    		// backgroundColor: "#f8e6e0"
		    		backgroundColor: "#F4DED9"
		    	},
		    	colors:["#fefefe"],
		    	credits:{
		    		enabled: false
		    	},
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            categories: xAxisCategory,
		            title:{
		            	text: "年",
		            	margin: 8,
		            	offset: 40
		            }
		        },
		        yAxis: {
		            title: {
		                text: '' //歌曲數量
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#fefefe'
		            }],
		            gridLineWidth: 0,
		            labels: {
		            	enabled: false
		            }
		        },
		        plotOptions:{
		        	area: {
		        		fillColor: {
		        			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
		                    stops: [
		                    	[0, "#fefefe"],
		                    	[1, "rgba(254,254,254,0.4)"]
		                        //[0, Highcharts.getOptions().colors[0]],
		                        //[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
		                    ]
		        		}
		        	}
		        },
		        tooltip: {
		            valueSuffix: '首'
		        },
		        legend: {
		        	enabled: false
		        },
		        series: [{
		            name: '創作量',
		            data: seriesData
		        }]
		    });
		});


	});

	/*************************************************************/
	/********************* DRAW TOPTEN SVG ***********************/
	/*************************************************************/

	var toptenWidth = 940;
	var toptenHeight = 760;
	var paddingPercentage = 0.12;

	var tenXScale = d3.scale.ordinal().domain([1,2,3,4,5,6,7,8,9,10]).rangeBands([0, toptenWidth], paddingPercentage, 0);
	var tenbarWidth = tenXScale.rangeBand();
	// console.log(tenbarWidth);

	// seperate the songs data into three lines and calculate the number of 1.empty-song and 2. song
	d3.json("data/sortList.json?v=1", function(toptenData){

		toptenData = toptenData.reverse();

		// tackle with the first ten singers.
		// seperated means, split into three subarrays
		toptenDataSeperated = toptenData.slice(0,10);
		

		// if screen is web
		if (screen.width >= 1200) {
			for (var i = 0; i < 10; i++) {
				while(toptenDataSeperated[i]["songs"].length < 108){
					toptenDataSeperated[i]["songs"].push("");
				}
			};

			var toptenTip = d3.tip().attr('class', 'topten-tip').html(function(d) { 
				return '<div class="cooperate-tooltip">' + d + '</div>'; ; 
			});

			// filters go in defs element
			var defs = d3.select("#topten-chart-svg").append("defs");

			// create filter with id #drop-shadow
			// height=130% so that the shadow is not clipped
			var filter = defs.append("filter")
			    .attr("id", "topten-shadow")
			    .attr("height", "130%");
			// SourceAlpha refers to opacity of graphic that this filter will be applied to
			// convolve that with a Gaussian with standard deviation 3 and store result
			// in blur
			filter.append("feGaussianBlur")
			    .attr("in", "SourceAlpha")
			    .attr("stdDeviation", 10)
			    .attr("result", "blur");

			// translate output of Gaussian blur to the right and downwards with 2px
			// store result in offsetBlur
			filter.append("feOffset")
			    .attr("in", "blur")
			    .attr("dx", 5)
			    .attr("dy", 5)
			    .attr("result", "offsetBlur");

			// overlay original SourceGraphic over translated blurred opacity by using
			// feMerge filter. Order of specifying inputs is important!
			var feMerge = filter.append("feMerge");

			feMerge.append("feMergeNode")
			    .attr("in", "offsetBlur")
			feMerge.append("feMergeNode")
			    .attr("in", "SourceGraphic");


			// draw it here
			var singerGroups = d3.select("#topten-chart-svg")
				.attr("width", toptenWidth)
				.attr("height", toptenHeight)
				.attr("viewBox", "0 0 " + toptenWidth.toString() + " " + toptenHeight.toString() )
				.attr("preserveAspectRatio", "xMidYMid")
				.selectAll("g.topten-singer")
			  	.data(toptenDataSeperated).enter()
			  .append("g")
			  	.attr("class", "topten-singer")
			  	.attr("transform", function(d, i){
			  		return "translate(" + i * (tenXScale.rangeBand() * (1 + paddingPercentage) ) + ",0)";
			  	})
			  	.attr("width", tenXScale.rangeBand());

			d3.select("#topten-chart-svg").call(toptenTip);

			singerGroups.each(function(d){


				var littlePadding = 4; // padding between little rectangles.
				var littleRectHeight = 15;
				var littleRectWidth = (tenXScale.rangeBand() - littlePadding * 2)/3;
				d3.select(this).selectAll("rect.song-rect")
					.data(d["songs"].reverse()).enter()
					.append("rect")
					.attr("class", "song-rect")
					.attr("width", littleRectWidth )
					.attr("height", littleRectHeight)
					.attr("transform", function(d,i){
						return "translate(" + (i % 3) *(littleRectWidth+littlePadding) + "," + parseInt(i/3) * (littleRectHeight + littlePadding) + ")"; 
					})
					.style("fill", function(d){
						if (d != "") {
							return "#fefefe";
						}else{
							return "rgba(254,254,254, 0.3)";
						}
					})
					.on("mouseover", function(d){

						if (d != "") {
							toptenTip.show(d);
							d3.select(this).attr("filter", "url(#topten-shadow)");

							ga("send", {
								"hitType": "event",
								"eventCategory": "前十合作歌手 - 方塊",
								"eventAction": "mouse over",
								"eventLabel": "歌名：" + d
							});

						};
						
					})
					.on("mouseout", function(d){
						toptenTip.hide();
						d3.select(this).attr("filter", "none");
					});

				// write singer name
				d3.select(this).append("text")
					.attr("class", "singer-name")
					.text(d["singer"]);
				var nameWidth = d3.select(this).select(".singer-name").node().getBBox().width;
				d3.select(this).select(".singer-name")
					.attr("transform", function(d){
						return "translate(" + (tenXScale.rangeBand() - nameWidth)/2 + ",710)";
					});

				// write singer song sum line
				d3.select(this).append("rect")
					.attr("class", "fake-line")
					.attr("height", 1)
					.attr("width" , tenXScale.rangeBand() * 0.40)
					.attr("transform", function(d){
						return "translate(" + tenXScale.rangeBand() * 0.3 + ",722)";
					});

				// write songs sum
				d3.select(this).append("text")
					.attr("class", "songs-sum")
					.text(function(d){
						return d["songs"].filter(function(a){
							return a != "";
						}).length;
					});
				var songsSumWidth = d3.select(this).select(".songs-sum").node().getBBox().width;
				d3.select(this).select(".songs-sum")
					.attr("transform", function(d){
						return "translate(" + (tenXScale.rangeBand() - songsSumWidth)/2 + ",744)";
					});

			});// each	
		}// if width >= 1200 done
		else{
			// if width < 1200
			var maxBarHeight = 180;
			var y = d3.scale.linear().domain([0,103]).range([0, maxBarHeight]);
			var paddingPercentageMobile = 0.3;
			var parentWidth = $("#topten-chart-wrap").width();
			// console.log(parentWidth);
			var chartHeight = 220;
			mobileXScale = d3.scale.ordinal().domain([1,2,3,4,5,6,7,8,9,10]).rangeBands([0, parentWidth], paddingPercentageMobile, 0);
			// tenXScale = d3.scale.ordinal().domain([1,2,3,4,5,6,7,8,9,10]).rangeRoundBands([0, parentWidth], paddingPercentageMobile, 0);

			var singerGroups = d3.select("#topten-chart-svg")
				.attr("width", parentWidth)
				.attr("height", chartHeight)
				// .attr("viewBox", "0 0 " + toptenWidth.toString() + " " + toptenHeight.toString() )
				// .attr("preserveAspectRatio", "xMidYMid")
				.selectAll("g.topten-singer")
			  	.data(toptenDataSeperated).enter()
			  .append("g")
			  	.attr("class", "topten-singer")
			  	.attr("transform", function(d, i){
			  		return "translate(" + mobileXScale(i+1) + ",0)";
			  	});
			  	// .attr("width", tenXScale.rangeBand());

			singerGroups.append("rect")
				.attr("width", function(d){
					return mobileXScale.rangeBand();
				})
				.attr("height", function(d){
					return y(d["songs"].length);
				})
				.attr("x", 0)
				.attr("y", function(d){
					return maxBarHeight - y(d["songs"].length);
				})
				.attr("fill", "#fefefe");


			// $("#topten-chart-svg").width($("#topten-chart-wrap").width());
			singerGroups.each(function(d){

				// write singer name
				d3.select(this).append("text")
					.attr("class", "singer-name")
					.text(d["singer"]);
					// .style("font-size", 9);
				var nameWidth = d3.select(this).select(".singer-name").node().getBBox().width;
				d3.select(this).select(".singer-name")
					.attr("transform", function(d){
						return "translate(" + (mobileXScale.rangeBand() - nameWidth)/2 + "," + (maxBarHeight + 15) + ")";
					});

				// write singer song sum line
				d3.select(this).append("rect")
					.attr("class", "fake-line")
					.attr("height", 1)
					.attr("width" , mobileXScale.rangeBand() * 0.40)
					.attr("transform", function(d){
						return "translate(" + mobileXScale.rangeBand() * 0.3 + "," + (maxBarHeight + 24) + ")";
					});

				// write songs sum
				d3.select(this).append("text")
					.attr("class", "songs-sum")
					.text(function(d){
						return d["songs"].filter(function(a){
							return a != "";
						}).length;
					});
				var songsSumWidth = d3.select(this).select(".songs-sum").node().getBBox().width;
				d3.select(this).select(".songs-sum")
					.attr("transform", function(d){
						return "translate(" + (mobileXScale.rangeBand() - songsSumWidth)/2 + "," + (maxBarHeight + 40) + ")";
					});

			});


		}

		



	}); // load d3.json ten singer done here

	d3.json("data/tw-five.json", function(twFiveData){


		var twFiveWidth = 560;
		var twFiveHeight = 260;
		if (screen.width <= 767) {
			twFiveHeight = 210;
		};

		var twPaddingPercentage = 0.12;
		var twFiveScale = d3.scale.ordinal().domain([1,2,3,4,5]).rangeBands([0, twFiveWidth], twPaddingPercentage, 0);

		var littlePadding = 4;
		var littleRectHeight = 15;
		var littleRectWidth = (twFiveScale.rangeBand() - littlePadding * 2)/3;

		d3.select("#tw-topfive-svg")
			.attr("width", twFiveWidth)
			.attr("height", twFiveHeight);
			// .style("fill", "red");

		var twFiveDataSeperated = twFiveData;

		for (var i = 0; i < 5; i++) {
			while(twFiveDataSeperated[i]["songs"].length < 30){
				twFiveDataSeperated[i]["songs"].push("");
			}
		};

		var twFiveTip = d3.tip().attr('class', 'tw-five-tip').html(function(d) { 
			return '<div class="cooperate-tooltip">' + d + '</div>'; 
		});

		// draw it here
		var singerGroups = d3.select("#tw-topfive-svg")
			.attr("width", twFiveWidth)
			.attr("height", twFiveHeight)
			.attr("viewBox", "0 0 " + twFiveWidth.toString() + " " + twFiveHeight.toString() )
			.attr("preserveAspectRatio", "xMidYMid")
			.selectAll("g.tw-topfive-singer")
		  	.data(twFiveDataSeperated).enter()
		  .append("g")
		  	.attr("class", "tw-topfive-singer")
		  	.attr("transform", function(d, i){
		  		return "translate(" + i * (twFiveScale.rangeBand() * (1 + twPaddingPercentage) ) + ",0)";
		  	})
		  	.attr("width", twFiveScale.rangeBand());

		d3.select("#topten-chart-svg").call(twFiveTip);


		// http://bl.ocks.org/cpbotha/5200394
		// filters go in defs element
		var defs = d3.select("#tw-topfive-svg").append("defs");

		// create filter with id #drop-shadow
		// height=130% so that the shadow is not clipped
		var filter = defs.append("filter")
		    .attr("id", "drop-shadow")
		    .attr("height", "130%");
		// SourceAlpha refers to opacity of graphic that this filter will be applied to
		// convolve that with a Gaussian with standard deviation 3 and store result
		// in blur
		filter.append("feGaussianBlur")
		    .attr("in", "SourceAlpha")
		    .attr("stdDeviation", 10)
		    .attr("result", "blur");

		// translate output of Gaussian blur to the right and downwards with 2px
		// store result in offsetBlur
		filter.append("feOffset")
		    .attr("in", "blur")
		    .attr("dx", 5)
		    .attr("dy", 5)
		    .attr("result", "offsetBlur");

		// overlay original SourceGraphic over translated blurred opacity by using
		// feMerge filter. Order of specifying inputs is important!
		var feMerge = filter.append("feMerge");

		feMerge.append("feMergeNode")
		    .attr("in", "offsetBlur")
		feMerge.append("feMergeNode")
		    .attr("in", "SourceGraphic");




		singerGroups.each(function(d){

			var littlePadding = 4;
			var littleRectHeight = 15;
			var littleRectWidth = (twFiveScale.rangeBand() - littlePadding * 2)/3;

			d3.select(this).selectAll("rect.song-rect")
				.data(d["songs"].reverse()).enter()
				.append("rect")
				.attr("class", "song-rect")
				.attr("width", littleRectWidth )
				.attr("height", littleRectHeight)
				.attr("transform", function(d,i){
					return "translate(" + (i % 3) *(littleRectWidth+littlePadding) + "," + parseInt(i/3) * (littleRectHeight + littlePadding) + ")"; 
				})
				.style("fill", function(d){
					if (d != "") {
						return "#fefefe";
					}else{
						return "rgba(254,254,254, 0.6)";
					}
				})
				.on("mouseover", function(d){
					if (d != "") {
						twFiveTip.show(d);
						d3.select(this).attr("filter", "url(#drop-shadow)");
						ga("send", {
								"hitType": "event",
								"eventCategory": "台灣前五合作歌手 - 方塊",
								"eventAction": "mouse over",
								"eventLabel": "歌名：" + d
							});	
					};
					
				})
				.on("mouseout", function(d){
					twFiveTip.hide();
					d3.select(this).attr("filter", "none");
				});

			// write singer name
			d3.select(this).append("text")
				// .attr("class", "singer-name")
				.attr("class", "singer-name-tw")
				.text(d["singer"]);
			var nameWidth = d3.select(this).select(".singer-name-tw").node().getBBox().width;
			d3.select(this).select(".singer-name-tw")
				.attr("transform", function(d){
					return "translate(" + (twFiveScale.rangeBand() - nameWidth)/2 + ",220)";
				});

			// write singer song sum line
			d3.select(this).append("rect")
				.attr("class", "fake-line")
				.attr("height", 1)
				.attr("width" , twFiveScale.rangeBand() * 0.40)
				.attr("transform", function(d){
					return "translate(" + twFiveScale.rangeBand() * 0.3 + ",232)";
				});

			// write songs sum
			d3.select(this).append("text")
				// .attr("class", "songs-sum")
				.attr("class", "songs-sum-tw")
				.text(function(d){
					return d["songs"].filter(function(a){
						return a != "";
					}).length;
				});
			var songsSumWidth = d3.select(this).select(".songs-sum-tw").node().getBBox().width;
			d3.select(this).select(".songs-sum-tw")
				.attr("transform", function(d){
					return "translate(" + (twFiveScale.rangeBand() - songsSumWidth)/2 + ",252)";
				});

		});// each

		$("#tw-topfive-svg").width( $("#main-container").width());


	});

	/*************************************************************/
	/**************** DRAW SONG NAME LENGTH SVG ******************/
	/*************************************************************/
	
	d3.json("data/songname-length.json", function(songNameData){

		var songNameWidth = $("#songname-chart-wrap").width();
		var songNameHeight = 785;

		var nameLengthHeight = 65;
		var indexHeight = 40;

		var rowHeight = (songNameHeight - indexHeight)/13

		var alignRightAnchor = 36;
		var alignLeftAnchor = 70;
		// var name

		var _songNameData = songNameData.slice(0,15);
		// so that empty arrays won't be shown.
		// 13 & 15
		_songNameData = _songNameData.filter(function(a){
			return a.length > 0;
		});
		// console.log(songNameData.slice(0, 15) );
		// console.log("###############################");
		var nameLengths = d3.select("#songname-chart-svg")
			.attr("width", songNameWidth)
			.attr("height", songNameHeight)
			// .attr("viewBox", "0 0 " + songNameWidth.toString() + " " + songNameHeight.toString() )
			// .attr("preserveAspectRatio", "xMidYMid")			
			.selectAll("g.name-length")
			.data(_songNameData).enter()
		  .append("g")
		  	.attr("class", "name-length")
		  	.attr("transform", function(d, i){
		  		return "translate(0," + (indexHeight +  i * rowHeight) + ")";
		  	});

		//
		// put the index first.
		//
		var songNameChartIndex = d3.select("#songname-chart-svg")
		  .append("g")
		  	.attr("class", "songname-chart-index");

		songNameChartIndex.append("text")
			.text("字數")
			.attr("text-anchor", "end")
			.attr("transform", function(d){
				return "translate(" + alignRightAnchor + ", 20)"
			});

		songNameChartIndex.append("text")
			.text("首")
			.attr("text-anchor", "start")
			.attr("transform", function(d){
				return "translate(" + alignLeftAnchor + ", 20)";
			});

		// index done
		var barWidthPercentage = 0.4;
		if (screen.width <= 767) {
			console.log("==========================??");
			barWidthPercentage = 0.65;
		};
		var x = d3.scale.linear().domain([0, 1160]).range([0, songNameWidth * barWidthPercentage]);
		var barStartX = 115;

		// tackle every line

		// 歌名長度
		nameLengths.append("text")
			.text(function(d){
				return d[0].length.toString();	
			})
			.attr("text-anchor", "end")
			.attr("transform", function(d){
				return "translate(" + alignRightAnchor + ", 28)"
			})
			.attr("fill", "#595757");

		nameLengths.append("rect")
			.attr("width", 1)
			.attr("height", rowHeight - 26)
			.attr("transform", function(d){
				return "translate(" + 54 + ",8)";
			})
			.attr("fill", "#595757");

		// 歌曲數量
		nameLengths.append("text")
			.text(function(d, i){
				return d.length.toString();
			})
			.attr("text-anchor", "start")
			.attr("transform", function(d){
				return "translate(" + alignLeftAnchor + ", 28)";
			})
			.attr("fill", "#595757");

		nameLengths.append("rect")
			.attr("width", function(d){
				return x(d.length);
			})
			.attr("height", rowHeight - 20)
			.attr("transform", function(d){
				return "translate(" + barStartX + ",5)"; 
			})
			.style("fill", "#fefefe");

		for (var i = 0; i < 10; i++) {
		
			nameLengths.append("svg:line")
                .attr("class", 'tick-line')
                .attr("x1", songNameWidth/10 * i + i%2 * 2)
                .attr("y1", rowHeight -4)
                .attr("x2", songNameWidth/10 * (i+1))
                .attr("y2", rowHeight -4)
                .style("stroke-width", 2)
                .style("stroke-dasharray", ("1, 8"))
                // .style("stroke-opacity", 1)
				// .style("stroke", "#595757")
				.style("stroke", function(d){
					return "rgba(89,87,87," + (1 - i/10) + ")";
				})
				// .attr("fill", "#ffffff")
				.style("stroke-opacity", 1);

		};
		


		var animateSongNameLeft = 580;
		var animateSongNameRight = 800; 
/*		nameLengths.append("text")
			.attr("class", "animate-song-name")
			.attr("text-anchor", "end")
			.attr("transform", function(d){
				return "translate(" + (songNameWidth - 10) + "," + 28 + ")"; 
			});*/

		nameLengths.each(function(d, i){

			if (screen.width <= 767) {
				return;
			};

			var songNamesToAnimate = d;
			var index = 0;
			var nameLengthRow = this;

			var marqueeObject =  d3.select(nameLengthRow).append("svg")
				.attr("width", 300)
				.attr("height", rowHeight - 10)
				.attr("class", "marquee")
				// .attr("transform", "translate(" + animateSongNameLeft + ",2)");
				.attr("x", songNameWidth - 310)
				.attr("y", 2);

			var text1 = marqueeObject.append('text')
                        .text(function(d){
                        	if (d.length > 0) {
                        		if (d[0].length > 10) {
                        			return d.join("　") + "　" + d.join("　");
                        		}else{
									return d.join("　");	
                        		}
                        		 
                        	}else{
                        		return "";
                        	}
                        	
                        })
                        .attr({
                            'class': 'slider-text-1'
                        })
                        .style("fill", "#595757")
                        .attr("x", 0)
                        .attr("y", 29);

            var text2 = marqueeObject.append('text')
                        .text(function(d){
                        	if (d.length > 0) {
                        		if (d[0].length > 10) {
                        			return d.join("　") + "　" + d.join("　");
                        		}else{
									return d.join("　");	
                        		}
                        		 
                        	}else{
                        		return "";
                        	}
                        })
                        .attr({
                            'class': 'slider-text-2'
                        })
                        .style("fill", "#595757")                        
                        // .attr("id", "")
                        .attr("x", 300)
                        .attr("y", 29);

            // put two gradient rect on both sides, to make fade in and fade out effect.
            var gradLeft = marqueeObject.append("rect")
            	.attr("width", 100)
            	.attr("height", rowHeight-10)
            	.attr("class", "grad-left")
            	.attr("fill", "url(#marquee-grad-left)")
            	.attr("transform", "translate(0,0)");

            var gradRight = marqueeObject.append("rect")
            	.attr("width", 100)
            	.attr("height", rowHeight-10)
            	.attr("class", "grad-right")
            	.attr("fill", "url(#marquee-grad-right)")
            	.attr("transform", "translate(200,0)");

            var speed = 0.06;

            // start the animation here.
            function animateText(oneOrTwo){
            	var classString = ".slider-text-" + oneOrTwo.toString();

            	//
				d3.select(nameLengthRow).select(classString)
					.transition()
					.ease("linear")
					.duration(function(d){
						return (d3.select(this).node().getBBox().width - 300)/ speed;
					})
					.attr("x", function(d){
						return (-1) * d3.select(this).node().getBBox().width + 300;
					})
					.each("end", function(){
						// call back after this animation is done
						var nextAnimation = (oneOrTwo == 1) ? 2 : 1;
						var otherClassString = ".slider-text-" + nextAnimation.toString();
						// including finish the first animation
						d3.select(nameLengthRow).select(classString)
							.transition()
							.ease("linear")
							.duration(300 / speed)
							.attr("x", function(d){
								return (-1) * d3.select(this).node().getBBox().width;
							})
							.each("end", function(d){
								// after the animation is done, which means this text element is not visible in the view
								// we move it to the starting position.
								// d3.select(nameLengthRow).select(classString).transition();
								d3.select(nameLengthRow).select(classString).attr("x", 300);
							});

						// start the next animation text
						setTimeout(function(){
							// d3.select(nameLengthRow).select(otherClassString).transition();
							// d3.select(nameLengthRow).select(otherClassString).attr("x", 300);
							animateText(nextAnimation);	
						}, 1000);
						

					});

            }

            animateText(1);


		});






	});



	/*************************************************************/
	/******************** DRAW TIMELINE SVG **********************/
	/*************************************************************/


	// var timeLineWidth = 1140;
	var timeLineWidth = 940;
	var timeLineHeight = 200;
	var barHeight = 35;

	var awardStartYear = 1990;
	var thisYear = 2015;


	var svg = d3.select("#award-timeline-wrap").select("svg")
		.attr("width", timeLineWidth)
		.attr("height", timeLineHeight + 5);

	// make data for the bars.


	// a group saving the interactable bars
	var barsGroup = svg.append("g")
				.attr("id", "timeline-bars")
				.style("background-color", "red")
				.attr("transform", function(){
					return "translate(0," + (timeLineHeight - barHeight) + ")";
				});

	// Load data
	d3.csv("data/golden-melody-award.csv", function(goldenMelodyData){

		//need year data, need whether nominated(status),year, th, song, singer, company, album, youtube
		var awardData = [];

		for (var i = 0; i < goldenMelodyData.length - 1; i++) {

			awardData.push({
				"status": goldenMelodyData[i]["status"],
				"year": goldenMelodyData[i]["year"],
				"songs": [{
					"song": goldenMelodyData[i]["song"],
					"singer": goldenMelodyData[i]["singer"],
					"album": goldenMelodyData[i]["album"],
					"company": goldenMelodyData[i]["company"],
					"youtube": goldenMelodyData[i]["youtube"]
				}]
			});
		};

		// push the two awards into data
		var secondNominate = goldenMelodyData[goldenMelodyData.length-1];
		awardData[awardData.length-1]["songs"].push({
			"song": secondNominate["song"],
			"singer": secondNominate["singer"],
			"album": secondNominate["album"],
			"company": secondNominate["company"],
			"youtube": secondNominate["youtube"]
		});

		// if it's mobile version
		if (screen.width <= 767) {
			// hide the svg for web
			$("#award-timeline-wrap").css({"display":"none"});

			var awardDataM = [];
			// make data for showing the mobile award table
			for (var i = 0; i < goldenMelodyData.length; i++) {

				if (goldenMelodyData[i]["status"] == "") {
					continue;
				}

				awardDataM.push({
					"status": goldenMelodyData[i]["status"],
					"year": goldenMelodyData[i]["year"],
					"songs": [{
						"song": goldenMelodyData[i]["song"],
						"singer": goldenMelodyData[i]["singer"],
						"album": goldenMelodyData[i]["album"],
						"company": goldenMelodyData[i]["company"],
						"youtube": goldenMelodyData[i]["youtube"]
					}]
				});
			};	

			for (var j = 0; j < awardDataM.length-1; j++) {
				
				var urlHTML = '<a href="' + awardDataM[j]["songs"][0]["youtube"] + '" target="_blank">' + awardDataM[j]["songs"][0]["song"] + '</a>';
				if ( parseInt(awardDataM[j]["year"]) == 2005) {
					// this is Luo Da Yo
					urlHTML = awardDataM[j]["songs"][0]["song"];
				};

				$("#award-timeline-wrap-mobile").append(
					'<div class="timeline-row-m">\
						<div class="tl-tooltip-img-wrap fl">\
							<img class="tl-tooltip-img" src="img/album_cover/' + awardDataM[j]["year"] + '-0.jpg">\
						</div>\
						<div class="tl-tooltip-content-wrap fl">\
							<div class="tl-tooltip-status">' + awardDataM[j]["status"] + '</div>\
							<div class="tl-tooltip-th">'+ awardDataM[j]["year"] +'年 第' + (awardDataM[j]["year"] - 1989) + '屆金曲獎</div>\
							<div class="tl-tooltip-song">' + urlHTML + "／" + awardDataM[j]["songs"][0]["singer"] + awardDataM[j]["songs"][0]["album"] + "／" + awardDataM[j]["songs"][0]["company"] + '</div>\
						</div>\
					</div>'
				)

			};		

			var lastSong = awardDataM[awardDataM.length-1];
			// append the second song in 2015
			$("#award-timeline-wrap-mobile").append(
					'<div class="timeline-row-m">\
						<div class="tl-tooltip-img-wrap fl">\
							<img class="tl-tooltip-img" src="img/album_cover/' + lastSong["year"] + '-1.jpg">\
						</div>\
						<div class="tl-tooltip-content-wrap fl">\
							<div class="tl-tooltip-status">' + lastSong["status"] + '</div>\
							<div class="tl-tooltip-th">' + lastSong["year"] +'年 第' + (lastSong["year"] - 1989) + '屆金曲獎</div>\
							<div class="tl-tooltip-song">' + '<a href="' + lastSong["songs"][0]["youtube"] + '"">' + lastSong["songs"][0]["song"] + '</a>' + "／" + lastSong["songs"][0]["singer"] + lastSong["songs"][0]["album"] + "／" + lastSong["songs"][0]["company"] + '</div>\
						</div>\
					</div>'
				)


			// remove the redundant dash after drawing all of them. 
			$($(".timeline-row-m")[7]).css({"border-bottom-width":"0"});

			// reset their height
			// 0.26 is because the width of the image is set to 26% of the row width
			// check css for the value.
			console.log($(".timeline-row-m").width()*0.26);
			$(".timeline-row-m").height($(".timeline-row-m").width()*0.26 + 13);

			return;
		};


		// filters go in defs element
		var defs = d3.select("#topten-chart-svg").append("defs");

		// create filter with id #drop-shadow
		// height=130% so that the shadow is not clipped
		var filter = defs.append("filter")
		    .attr("id", "timeline-shadow")
		    .attr("height", "120%");
		// SourceAlpha refers to opacity of graphic that this filter will be applied to
		// convolve that with a Gaussian with standard deviation 3 and store result
		// in blur
		filter.append("feGaussianBlur")
		    .attr("in", "SourceAlpha")
		    .attr("stdDeviation", 15)
		    .attr("result", "blur");

		// translate output of Gaussian blur to the right and downwards with 2px
		// store result in offsetBlur
		filter.append("feOffset")
		    .attr("in", "blur")
		    .attr("dx", 5)
		    .attr("dy", 5)
		    .attr("result", "offsetBlur");

		// overlay original SourceGraphic over translated blurred opacity by using
		// feMerge filter. Order of specifying inputs is important!
		var feMerge = filter.append("feMerge");
			feMerge.append("feMergeNode")
		    .attr("in", "offsetBlur")
		feMerge.append("feMergeNode")
		    .attr("in", "SourceGraphic");

		// draw the bars here
		var bars = barsGroup.selectAll("rect")
			.data(awardData).enter()
			.append("rect")
			.attr("x", function(d){
				return ( parseInt(d["year"]) - 1990) * (timeLineWidth/(thisYear - awardStartYear + 1));
			})
			.attr("width", function(d){
				return timeLineWidth/(thisYear - awardStartYear + 1);
			})
			.attr("height", barHeight)
			.style("fill", function(d){
				
				if (d["status"] == "入圍" || d["status"] == "得獎") {
					// if nominated
					return "rgba(255,255,255,1)";
				}else{
					// not nominated
					return "rgba(255,255,255,0.4)";
				}
				
			})
			.on("mouseover", function(d){

				d3.select(this).attr("filter", "url(#timeline-shadow)");
				// d3.select(this).attr("")

				ga("send", {
					"hitType": "event",
					"eventCategory": "金曲時間軸 - 方塊",
					"eventAction": "mouse over",
					"eventLabel": d["year"]
				});


				if (d["status"] != "") {
					// console.log("mouse over " + d["year"]);

					// add float left;
					if (d["songs"].length > 1) {
						// tackle with 2015, show two songs in tooltip
						var year = parseInt(d["year"]);
						$("#tl-tooltip-2").css({"visibility": "visible", "display": "block", "float": "left"});
						$("#tl-tooltip-1").css({"visibility": "visible", "float": "left"});
						// $("#timeline-tooltips-wrap").css({"overflow": "hidden"});

						for (var i = 0; i < 2; i++) {
							
							var song = d["songs"][i];
							var tooltip = $("#tl-tooltip-" + (i+1).toString() );
							// set image
							tooltip.find(".tl-tooltip-img").attr("src",  "img/album_cover/" + d["year"] + "-" + i + ".jpg");
							tooltip.find(".tl-tooltip-status").text(d["status"]);
							tooltip.find(".tl-tooltip-year").text(d["year"]);
							tooltip.find(".tl-tooltip-th").text("第" + (year - 1989).toString() + "屆金曲獎");
							tooltip.find(".tl-tooltip-song").html(
								'<a href="' + song["youtube"] + '">' + song["song"] + '</a>' + "／" + song["singer"] + song["album"] + "／" + song["company"]
							);

						};
						

					}else{

						$("#tl-tooltip-2").css({"visibility": "hidden", "display": "none", "float": "none"});
						$("#tl-tooltip-1").css({"visibility": "visible", "float":"none"});

						var song = d["songs"][0];
						var year = parseInt(d["year"]);
						// common status, only one song engaged.
						var tooltipOne = $("#tl-tooltip-1");
						// set image
						tooltipOne.find(".tl-tooltip-img").attr("src",  "img/album_cover/" + d["year"] + "-0.jpg");
						tooltipOne.find(".tl-tooltip-status").text(d["status"]);
						tooltipOne.find(".tl-tooltip-year").text(d["year"]);
						tooltipOne.find(".tl-tooltip-th").text("第" + (year - 1989).toString() + "屆金曲獎");

						//tackle Luo Da Yo, no youtube problem here
						var urlHTML = '<a href="' + song["youtube"] + '" target="_blank">' + song["song"] + '</a>';
						if (year == 2005) {
							urlHTML = song["song"];
						};

						tooltipOne.find(".tl-tooltip-song").html(
							urlHTML + "／" + song["singer"] + song["album"] + "／" + song["company"]
						);

					}

				}else{
					// not even nominated, remove or hide the tooltip here

				}

				
			})
			.on("mouseout", function(d){
				d3.select(this).attr("filter", "none");
			});


		d3.select("#timeline-bars").selectAll("rect").each(function(d,i){
			if (i == 9){
				console.log(d);
			}
		})

		var plotLineYears = [1990, 1995, 2000, 2005, 2010, 2015];

		// Draw plotlines, six of them. Including 1990, 1995, 2000, 2005, 2010, 2015 
		// make g first
		var plotLineGroups = d3.select("#award-timeline-svg").append("g")
			.attr("id", "timeline-plotline")
			.selectAll("g")
		   	.data(plotLineYears).enter()
		   	  .append("g")
		   	  .attr("transform", function(d){
		   	  	return "translate(" + (d - 1990) *  ( timeLineWidth/(thisYear - awardStartYear + 1) ) + ", 0)";
		   	  });

		// draw line
		plotLineGroups.append("rect")
			.attr("width", 1)
			.attr("height", timeLineHeight)
			.attr("fill", "#595757");
			// .attr("x")

		// put year text
		plotLineGroups.append("text")
			.text(function(d){
				return d.toString();
			})
			.style("fill", "#595757")
			.attr("x", 5)
			.attr("y", 15);


		// append image
		var rectWidth = timeLineWidth/(thisYear - awardStartYear + 1);

		var awardIconWidth = 46;
		var awardIconHeight = 53;
		// 1999
		d3.select("#award-timeline-svg")
		  .append("svg:image")
			.attr("xlink:href", "img/time-line-mark.png")
			.attr("width", awardIconWidth)
			.attr("height", awardIconHeight)
			.attr("transform", function(d){
				return "translate(" + (9.5 * rectWidth - awardIconWidth/2) + "," + (timeLineHeight - barHeight - awardIconHeight) + ")";
			});

		//2010
		d3.select("#award-timeline-svg")
		  .append("svg:image")
			.attr("xlink:href", "img/time-line-mark.png")
			.attr("width", awardIconWidth)
			.attr("height", awardIconHeight)
			.attr("transform", function(d){
				return "translate(" + (20.5 * rectWidth - awardIconWidth/2) + "," + (timeLineHeight - barHeight - awardIconHeight) + ")";
			});
	

		// after drawing everything, we track user clicking the a
		setTimeout(function(){
			$("a").click(function(){

				ga("send", {
					"hitType": "event",
					"eventCategory": "Youtube - 超連結",
					"eventAction": "click",
					"eventLabel": $(this).text()
				});
			});

		}, 3000);


		// trigger the first tooltip of the timeline
		setTimeout(function(){

			d3.select("#timeline-bars").selectAll("rect").each(function(d,i){
				if (i == 9){
					var onClickFunc = d3.select(this).on("mouseover");
					onClickFunc.apply(this, [d, i]);
				}
			});


		}, 3000);
		

	});



}); // document ready
