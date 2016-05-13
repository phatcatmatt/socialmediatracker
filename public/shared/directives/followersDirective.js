angular.module('socialMediaTracker')
  .directive('followersDirective', function() {

    return {
        restrict: 'E',
        template: '<div class="followersDirective"></div>',
        controller: function($scope, $state) {


            // followers line chart


            var margin = {top: 30, right: 20, bottom: 30, left: 50},
                width = 600 - margin.left - margin.right,
                height = 270 - margin.top - margin.bottom;

            // Parse the date / time
            var parseDate = d3.time.format("%d-%b-%y").parse;

            // Set the ranges
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);

            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            // Define the line
            var valueline = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.followers); });

            // Adds the svg canvas
            var svg = d3.select("body")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                          "translate(" + margin.left + "," + margin.top + ")");

            // Get the data
            var render = function(data) {
                data.forEach(function(d) {
                  console.log(d.date);
                    d.date = parseDate(d.date);
                    console.log(d.date);
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.date; }));
                y.domain([0, d3.max(data, function(d) { return d.followers; })]);

                // Add the valueline path.
                svg.append("path")
                    .attr("class", "line")
                    .attr("d", valueline(data));

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

            };

            render($scope.followersData.followersByDate)

















            // var margin = {
            //         top: 20,
            //         right: 20,
            //         bottom: 30,
            //         left: 50
            //     },
            //     width = 960 - margin.left - margin.right,
            //     height = 500 - margin.top - margin.bottom;
            //
            //
            //
            // var x = d3.scale.linear()
            //     .range([0, width]);
            //
            // var y = d3.scale.linear()
            //     .range([height, 0]);
            //
            // var xAxis = d3.svg.axis()
            //     .scale(x)
            //     .orient("bottom");
            //
            // var yAxis = d3.svg.axis()
            //     .scale(y)
            //     .orient("left");
            //
            // var line = d3.svg.line()
            //     .x(function(d) {
            //         return x(d.date);
            //     })
            //     .y(function(d) {
            //         return y(d.followers);
            //     });
            //
            // var svg = d3.select('.followersDirective').append("svg")
            //     .attr("width", width + margin.left + margin.right)
            //     .attr("height", height + margin.top + margin.bottom)
            //     .append("g")
            //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            //
            // var render = function(data) {
            //
            //     x.domain(d3.extent(data, function(d) {
            //         return d.date;
            //     }));
            //     y.domain(d3.extent(data, function(d) {
            //         return d.followers;
            //     }));
            //
            //     svg.append("g")
            //         .attr("class", "x axis")
            //         .attr("transform", "translate(0," + height + ")")
            //         .call(xAxis);
            //
            //     svg.append("g")
            //         .attr("class", "y axis")
            //         .call(yAxis)
            //         .append("text")
            //         .attr("transform", "rotate(-90)")
            //         .attr("y", 6)
            //         .attr("dy", ".71em")
            //         .style("text-anchor", "end")
            //         .text("Followers");
            //
            //     svg.append("path")
            //         .datum(data)
            //         .attr("class", "line")
            //         .attr("d", line);
            // };

            // var type = function(d) {
            //   console.log(d);
            //   for (var i = 0; i < d.length; i++){
            // d[i].date = i;
            // }
            // console.log(d);
            //   return d;
            // }


            // var initiate = function(data){
            //   // type(data);
            //   render(data);
            //   // console.log(data);
            // }
            //
            // initiate($scope.followersData.followersByDate)
        }

      }
  })
