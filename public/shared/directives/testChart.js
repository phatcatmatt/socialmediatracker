angular.module('socialMediaTracker')
  .directive('followersDirective', function() {

    return {
        restrict: 'E',
        scope: {
          newFollowersData: '='
        },
        template: '<div class="followersDirective"></div>',
        controller: function($scope, $state, $element, $window, $filter) {

        angular.element($window).on('resize', function() {
          setsize($scope.newFollowersData.followersByDate);
        })

            // followers line chart
            var outerWidth;
            var outerHeight;
            var innerWidth;
            var innerHeight;
            var margin = {top: 20, right: 50, bottom: 50, left: 50};
            var x;
            var y;
            var xAxis = d3.svg.axis()
            var yAxis = d3.svg.axis()
            var line;
            var svg = d3.select('.followersDirective').append("svg");




                function setsize(data){
                  outerWidth = window.innerWidth;
                  outerHeight = window.innerHeight/2;
                  innerWidth = outerWidth - margin.left - margin.right;
                  innerHeight = outerHeight - margin.top - margin.bottom;



                  resize(data)
                }



                function resize(data){
                  x = d3.time.scale().range([0, innerWidth]);
                  // var x = d3.scale.linear()
                  //     .range([0, width]);
                  y = d3.scale.linear()
                      .range([innerHeight, 0]);
                  xAxis
                      .scale(x)
                      .orient("bottom");
                  yAxis
                      .scale(y)
                      .orient("left")
                      .ticks(5)
                      .tickFormat(d3.format('s'));
                  line = d3.svg.line()
                      .x(function(d) {
                          return x(d.date);
                      })
                      .y(function(d) {
                          return y(d.followers);
                      });
                  svg.attr("width", outerWidth)
                  .attr("height", outerHeight)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                  render(data)
                }


            var render = function(data) {

              svg.selectAll("*").remove();
                x.domain(d3.extent(data, function(d) {
                    return d.date;
                }));
              y.domain(d3.extent(data, function(d) {
                  return d.followers;
              }));

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(" + margin.left + "," + innerHeight + ")")
                    .call(xAxis)
                    svg.select('.y.axis')

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .attr("transform", "translate(50, 0)")
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Followers");

                svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", line);
            };



            $scope.$watch('newFollowersData', function(){
              setsize($scope.newFollowersData.followersByDate);
            });

        }

      }
  })
