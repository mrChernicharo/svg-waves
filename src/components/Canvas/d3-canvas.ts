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

  const radius = 8;

  const dot = svg
    .append('circle')
    .attr('id', 'circle-1')
    .attr('r', radius)
    .attr('cx', 300)
    .attr('cy', 200)
    .attr('fill', '#09f')
    .attr('cursor', 'grab');

  const dotDrag = d3.drag();

  dotDrag.on('start', function (d) {
    const circle = d3.select(this);
    circle.attr('fill', 'orange').attr('cursor', 'grabbing');
  });

  dotDrag.on('drag', function (d) {
    const circle = d3.select(this);

    const { width, height } = document
      .querySelector('#canvas-svg')
      ?.getBoundingClientRect() as DOMRect;

    // console.log(d.x, width, height);

    let xPos = Number(circle.attr('cx'));
    let newPosX = xPos + d.dx;

    let yPos = Number(circle.attr('cy'));
    let newPosY = yPos + d.dy;

    if (newPosX < radius) newPosX = radius;
    if (newPosX >= width - radius) newPosX = width - radius;
    if (newPosY < radius) newPosY = radius;
    if (newPosY >= height - radius) newPosY = height - radius;

    circle.attr('cx', newPosX).attr('cy', newPosY);
  });

  dotDrag.on('end', function (d) {
    const circle = d3.select(this);
    circle.attr('fill', '#09f').attr('cursor', 'grab');
  });

  dot.call(dotDrag as any);
};

//
//
//
//
export const updateCanvas = (size: ISize) => {
  const svg = d3.select('#canvas-svg');

  const dot = d3.select('#circle-1');

  const dotX = Number(dot.attr('cx'));
  const dotY = Number(dot.attr('cy'));
  const diameter = Number(dot.attr('r')) * 2;

  console.log(size);

  if (dotX >= size.width - diameter) {
    dot.attr('cx', size.width - diameter);
  }

  if (dotY >= size.height - diameter) {
    dot.attr('cy', size.height - diameter);
  }

  // svg.on('mousemove', e => console.log(e));
  // svg.on('mouseout', e => console.log(e));
  // svg.on('click', e => console.log(e));
};
