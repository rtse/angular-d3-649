var sixFortyNineApp = angular.module('sixFortyNineApp', ['ui.bootstrap']);
sixFortyNineApp.provider('luckyNumbers', function() {
	var res = [];
	var d = null;
	return {
	    init: function () {
			d3.csv("resources/649.csv", function(d) {
				return {
					num1: d["NUMBER DRAWN 1"],
					num2: d["NUMBER DRAWN 2"],
					num3: d["NUMBER DRAWN 3"],
					num4: d["NUMBER DRAWN 4"],
					num5: d["NUMBER DRAWN 5"],
					num6: d["NUMBER DRAWN 6"],
					drawDate: d["DRAW DATE"],
			  };
			}, function(error, data) {
				d = data;
			});
	    },
	    $get: function () {
	      return {
	    	clear: function() {
	    		res = [];
	    	},
	        load: function(fromDate, toDate) {
	        	var a = {};
				var count = function(n) {
					return ((n == null || typeof(n) === 'undefined') ? 1 : n+1);
				};
				d.forEach(function(d) {
					if(new Date(d.drawDate) < fromDate ||
							new Date(d.drawDate) > toDate) {
						return;
					}
					var num1 = a[d.num1];
					a[d.num1] = count(num1);
					
					var num2 = a[d.num2];
					a[d.num2] = count(num2);
					
					var num3 = a[d.num3];
					a[d.num3] = count(num3);
					
					var num4 = a[d.num4];
					a[d.num4] = count(num4);
					
					var num5 = a[d.num5];
					a[d.num5] = count(num5);
					
					var num6 = a[d.num6];
					a[d.num6] = count(num6);
					
				});
				for(var i=1; i<=49; i++) {
					res.push({
						'num': i,
						'total': (typeof(a[i]) === 'undefined') ? 0 : a[i]
					});
				}
				return res;
	        }
	      };
	    }
	  };
}).config(['luckyNumbersProvider', function(luckyNumbersProvider){
	luckyNumbersProvider.init();
}]);