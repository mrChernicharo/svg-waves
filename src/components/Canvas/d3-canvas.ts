import * as d3 from 'd3';
import { ISize } from '../../hooks/useWindowSize';

export const drawCanvas = () => {
  const canvas = d3
    .select('#canvas')
    .style('width', '100vw')
    .style('height', '60vh')
    .style('border', '1px solid red');

  const svg = canvas
    .append('svg')
    .attr('id', 'canvas-svg')
    .attr('width', '100%')
    .attr('height', '100%');
};

export const updateCanvas = (size: ISize) => {
  const svg = d3.select('#canvas-svg');

  // svg.on('mousemove', e => console.log(e));
  // svg.on('mouseout', e => console.log(e));
  // svg.on('click', e => console.log(e));
};
