import * as d3 from 'd3';

export const drawCanvas = () => {
  const canvas = d3
    .select('#canvas')
    .style('width', '100%')
    .style('height', '600px')
    .style('border', '1px solid red');

  const svg = canvas
    .append('svg')
    .attr('id', 'svg')
    .attr('width', '100%')
    .attr('height', '100%');
};
