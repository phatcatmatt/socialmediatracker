angular.module('socialMediaTracker')
.directive('stackedBarChartDirective', function(){

  return {
    restrict:'E',
    scope: {
      newData: '='
    },
    template: '<div class="stackedBarChartDiv"></div>',
    controller: function($scope, $state){


      // stacked bar chart

      var outerWidth = 1000;
      var outerHeight = 650;
      var margin = {left: 50, top: 50, right: 50, bottom: 200};
      var barPadding = 0.3;
      var xColumn = 'tweetID';
      var yColumn = 'responseSize';
      var colorColumn = 'responseType';
      var layerColumn = colorColumn;
      var innerWidth = outerWidth - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top - margin.bottom;
      var tooltip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return '<span>' + d.responseSize + '</span>' + ' ' + d.responseType })
      .offset([-12, 0])

      var svg = d3.select('.stackedBarChartDiv').append('svg')
        .attr('width', outerWidth)
        .attr('height', outerHeight);
      var g = svg.append('g')
        .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');
      var xAxisG = g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + innerHeight + ')');
      var yAxisG = g.append('g')
        .attr('class', 'y axis');
      var colorLegendG = g.append('g')
        .attr('class', 'color-legend')
        .attr('transform', 'translate(810, 0)');



      var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
      var yScale = d3.scale.linear().range([innerHeight, 0]);
      var colorScale = d3.scale.category20();
      var xAxis = d3.svg.axis().scale(xScale).orient('bottom')
        .outerTickSize(0);
      var yAxis = d3.svg.axis().scale(yScale).orient('left')
        .ticks(6)
        // .tickFormat(d3.format('s'))
        .outerTickSize(0);
      var colorLegend = d3.legend.color()
        .scale(colorScale)
        .shapePadding(2)
        .shapeWidth(15)
        .shapeHeight(15)
        .labelOffset(4);

        var tweettip = d3.select('.stackedBarChartDiv')
          .append('div')
          .attr('class', 'tweettip');

        tweettip.append('div')
          .attr('class', 'tweetInfo');

        // tweettip.append('div')
        //   .attr('class', 'count');
        //
        // tweettip.append('div')
        // .attr('class', 'percent');

        svg.call(tooltip)


    function render(data) {

        var nested = d3.nest()
          .key(function(d) {
            return d[layerColumn]
          })
          .entries(data)
        var stack = d3.layout.stack()
            .y(function(d) {
              return d[yColumn];
            })
            .values(function(d){
              return d.values;
            });
        var layers = stack(nested);
        xScale.domain(layers[0].values.map(function(d) {
            return d[xColumn];
        }));
        yScale.domain([
            0,
            d3.max(layers, function(layer) {
            return d3.max(layer.values, function(d) {
              return d.y;
            });
          })
        ]);
        colorScale.domain(layers.map(function(layer) {
            return layer.key;
        }));
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
        var layers = g.selectAll('.layer').data(layers);
        layers.enter().append('g').attr('class', 'layer');
        layers.exit().remove();
        layers.style('fill', function(d) {
            return colorScale(d.key);
        });
        var bars = layers.selectAll('rect').data(function(d) {
          return d.values;
        });
        var barWidth = xScale.rangeBand() / colorScale.domain().length;
        bars.enter().append('rect')
        bars.exit().remove();
        bars
          .attr('x', function(d, i, j) {
              return xScale(d[xColumn]) + barWidth * j;
          })
          .attr('y', function(d) {
              return yScale(d.y);
          })
          .attr('width', barWidth)
          .attr('height', function(d) {
              return innerHeight - yScale(d.y);
          })
          .on('click', function(d){
            tweettip.select('.tweetInfo').html(d.tweetText + '<br>' + 'date: ' + d.tweetID);
            tweettip.style('display', 'block');
          })
          // .on('click', function (){
          //   tweettip.style('display', 'none');
          // })
          .on('mouseover', tooltip.show)
          .on('mouseout', tooltip.hide)

          // d3.selectAll('.x .tick')
          //     .data(data)
          //     .on('mouseover', tooltip.show)
          //     .on('mouseout', tooltip.hide);


        colorLegendG.call(colorLegend);

      }



function type(d) {
  d.responseSize = +d.responseSize;
  return d;
}


var initiate = function() {
  var newData = type($scope.newData);
  render(newData);
};

$scope.$watch('newData', function(){
  initiate();
})
initiate();

    }
  }



})
