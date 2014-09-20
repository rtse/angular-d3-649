sixFortyNineApp.directive('drawNumbers', ['luckyNumbers', '$timeout', function(luckyNumbers, $timeout) {
    return {
    	link: function (scope, element, attrs) {
    		scope.$watch(attrs.drawNumbers, function(value) {
    			var svg,y,xAxis,yAxis = null, numbers = [];
    			if(value) {
    				$timeout(function(){
    					
    					scope.isSorted = false;
    					scope.draw = function() {
    						if(svg != null && typeof(svg) !== 'undefined') {
                				svg.selectAll("*").remove();
                				luckyNumbers.clear();
                			}
                			
                			numbers = luckyNumbers.load(scope.fromDate, scope.toDate);
                			
                			var margin = {top: 20, right: 20, bottom: 30, left: 40},
                				maxWidth = 1000,
                	    		width = maxWidth - margin.left - margin.right,
                	    		barheight = 20,
                	    		height = barheight * numbers.length;
                			var max = d3.max(numbers, function(d) { return d.total; });
                			
                			var calcTicks = function(maxNumber) {
                				var sMax = maxNumber.toString();
                				return (sMax.length === 1) ? maxNumber : (10 * sMax.length);
                			};
                			var x = d3.scale.linear()
                		    	.domain([0, max])
                		    	.rangeRound([0, maxWidth]);

                			y = d3.scale.ordinal()
                				.domain(numbers.map(function(d) { return d.num; }))
                				.rangeBands([0, height], 0.1);

                			xAxis = d3.svg.axis()
                				.scale(x)
                				.orient("top").ticks( calcTicks(max) ).tickSize(2);
                			
                			yAxis = d3.svg.axis()
                				.scale(y)
                				.orient("left").tickSize(2);

                			svg = d3.select(".bar")
                					.attr("width", width + margin.left + margin.right)
                					.attr("height", height + margin.top + margin.bottom)
                					.append("g")
                					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                			svg.append("g").attr("class", "x-axis").call(xAxis);
                			svg.append("g").attr("class", "y-axis").call(yAxis);
                			
                			var bar = svg.selectAll("rect").data(numbers).enter().append("g");
                			bar.append("rect")
                				.attr("x", 0)
                				.attr("y", function(d,i) { return i*barheight; })
                				.attr("width", function(d) { return x(d.total); })
                				.attr("height", barheight-1)
                				.style("fill", "steelblue");

                			bar.append("text")
                				.attr("class", "value")
                				.attr("x", function(d) { return x(d.total); })
                				.attr("y", function(d,i) { return i*barheight; })
                				.attr("dx", -3)
                				.attr("dy", "1.2em")
                				.attr("text-anchor", "end")
                				.attr("fill", "white")
                				.text(function(d) { return (d.total === 0) ? "" : d.total; });
    					};
            		
        	    		// sorting
        	    		var fnSort = function() {
        	    			var isChecked = this.checked;
        	    		    var sorted = numbers.sort(function(a, b) { 
        	    		    	return isChecked ? d3.descending(a.total, b.total) : (a.num - b.num);
        	    		    }).map(function(d) { return d.num; });
        	    		        
        	    		    var y0 = y.domain(sorted).copy();
        	    		
        	    		    var transition = svg.transition().duration(750),
        	    			  delay = function(d, i) { return i * 20; };
        	    			
        	    		    transition.selectAll("rect").delay(delay)
        	    		    	.attr("y", function(d) { return y0(d.num); });
        	    		
        	    		    transition.selectAll("text").delay(delay)
        	    		    	.attr("y", function(d) { return y0(d.num); });
        	    		
        	    		    transition.select(".y-axis")
        	    		    	.call(yAxis)
        	    		    	.selectAll("g")
        	    		    	.delay(delay);
        	    		
        	    		    transition.select(".x-axis")
        	    		    	.call(xAxis)
        	    		    	.selectAll("g")
        	    		    	.delay(delay);
        	    		};
        	    		d3.select(".sortCheck").on("change", fnSort);
        	    		scope.draw();
        	    		
    				}, 500);
    			} // end if("true" === value)
    			
    		});
	    }
    };
}]);