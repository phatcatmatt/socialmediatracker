angular.module('socialMediaTracker')
.directive('stackedBarChartDirective', function(){

  return {
    restrict:'E',
    scope: {
      newData: '='
    },
    template: '<div class="stackedBarChartDiv"></div>',
    controller: function($scope, $state, $element, $window, $filter){

  angular.element($window).on('resize', function(){
    setsize($scope.newData);
  });
      // stacked bar chart


      var outerWidth;
      var outerHeight;
      var margin = {top: 10, right: 30, bottom: 10, left: 45};
      var barPadding;
      // var outerWidth = 960;
      // var outerHeight = 550;
      // var margin = {left: 80, top: 50, right: 50, bottom: 200};
      // var barPadding = 0.2;
      var xColumn = 'date';
      var yColumn = 'responseSize';
      var colorColumn = 'responseType';
      var layerColumn = colorColumn;
      var siFormat = d3.format('s');
      var customTick = function (d) {
        return siFormat(d).replace('m','');
      };

      var tooltip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return '<span>' + d.responseSize + '</span>' + ' ' + d.responseType })
      .offset([-12, 0])
      var svg = d3.select('.stackedBarChartDiv').append('svg')

      var g = svg.append('g')
        .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');
      var xAxisG = g.append('g')
        .attr('class', 'x axis')
      var yAxisG = g.append('g')
        .attr('class', 'y axis');
      var colorLegendG = g.append('g')
        .attr('class', 'color-legend');
      var colorScale = d3.scale.ordinal()
      .range(['#6ebedd','#d3ecf5']);
      var xAxis;
      var yAxis;
      var colorLegend = d3.legend.color()
        .scale(colorScale)
        .shapePadding(2)
        .shapeWidth(15)
        .shapeHeight(15)
        .labelOffset(4);
      var tweettip = d3.select('.stackedBarChartDiv')
        .append('div')
        .attr('class', 'tweettip');
      var innerWidth;
      var innerHeight;
      var xScale;
      var yScale;


        tweettip.append('div')
          .attr('class', 'tweetInfo');

        function setsize(data){
          outerWidth = window.innerWidth;
          outerHeight = window.innerHeight/1.7;
          if (outerWidth < 425){
            barPadding = .1;
            smallData = $filter('limitTo')(data, -12);
            resize(smallData)
          } else if (outerWidth < 600){
            barPadding = .2;
            medSmallData = $filter('limitTo')(data, -20)
            resize(medSmallData)
          } else if (outerWidth < 700){
            barPadding = .2;
            medData = $filter('limitTo')(data, -26)
            resize(medData)
          } else if (outerWidth < 900){
            barPadding = .2;
            medLargeData = $filter('limitTo')(data, -32)
            resize(medLargeData)
          } else {
            barPadding = .2;
            resize(data)
          }

        }

        function resize(newData){
          innerWidth = outerWidth - margin.left - margin.right;
          innerHeight = outerHeight - margin.top - margin.bottom;
          svg.attr('width', outerWidth).attr('height', outerHeight);
          xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
          yScale = d3.scale.linear().range([innerHeight, 0]);
          colorLegendG.attr('transform', 'translate(15, 0)');  //fix 200 later
          xAxisG.attr('transform', 'translate(0,' + innerHeight + ')');
          xAxis = d3.svg.axis().scale(xScale).orient('bottom')
            .outerTickSize(0)
            .tickFormat('');
          yAxis = d3.svg.axis().scale(yScale).orient('left')
            .ticks(6)
            .tickFormat(customTick)
            .outerTickSize(0);
          render(newData);
        }

        // tweettip.append('div')
        //   .attr('class', 'count');
        //
        // tweettip.append('div')
        // .attr('class', 'percent');

        svg.call(tooltip)


    function render(data) {
      tooltip.hide();
      tweettip.style('display', 'none');

      // margin.right = screen.width <= 750 ? 0 : 50;

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
        bars.enter().append('rect').attr('height', '0px').attr('y', yScale(0))
        .on('click', function(d){
          tweettip.select('.tweetInfo').html(d.tweetText + '<br>' + d.tweetDate);
          tweettip.style('display', 'block');
        })
        // .on('click', function (){
        //   tweettip.style('display', 'none');
        // })
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide)
        bars.exit().remove();
        bars
          .transition().duration(1000)
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
          // d3.selectAll('.x .tick')
          //     .data(data)
          //     .on('mouseover', tooltip.show)
          //     .on('mouseout', tooltip.hide);

        colorLegendG.call(colorLegend);

      }


      $scope.$watch('newData', function(){
        setsize($scope.newData);
      })


      $element.on('$destroy', function(){
        tooltip.hide();
      })


    }
  }


})
