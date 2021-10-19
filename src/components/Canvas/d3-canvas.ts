import * as d3 from 'd3';
import { ISize } from '../../hooks/useWindowSize';

export const drawCanvas = () => {
  const canvas = d3
    .select('#canvas')
    .style('width', '100vw')
    .style('height', '60vh')
    .style('border', '1px solid #08f');

  const svg = canvas
    .append('svg')
    .attr('id', 'canvas-svg')
    .attr('width', '100%')
    .attr('height', '100%');

  const radius = 8;

  const dotsData = [
    { x: 300, y: 200 },
    { x: 600, y: 500 },
    { x: 100, y: 400 },
    { x: 700, y: 50 },
  ];

  const linePath = svg.append('g').attr('id', 'line').append('path');

  dotsData.forEach((dotItem, dotIndex) => {
    const dot = svg
      .append('circle')
      .attr('id', `circle-${dotIndex}`)
      .attr('r', radius)
      .attr('cx', dotItem.x)
      .attr('cy', dotItem.y)
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

      let xPos = Number(circle.attr('cx'));
      let newPosX = xPos + d.dx;

      let yPos = Number(circle.attr('cy'));
      let newPosY = yPos + d.dy;

      if (newPosX < radius) newPosX = radius;
      if (newPosX >= width) newPosX = width;
      if (newPosY < radius) newPosY = radius;
      if (newPosY >= height) newPosY = height;

      circle.attr('cx', newPosX).attr('cy', newPosY);

      updateCanvas({ width, height });
    });

    dotDrag.on('end', function (d) {
      const circle = d3.select(this);
      circle.attr('fill', '#09f').attr('cursor', 'grab');
    });

    dot.call(dotDrag as any);
  });
};

//
//
//
export const updateCanvas = (size: ISize) => {
  const svg = d3.select('#canvas-svg');

  const dots = d3.selectAll('circle');

  const dotsArray = Array.from(dots);
  const dotsData: [number, number][] = [];

  dots.each((item, index) => {
    const dot = d3.select(`#circle-${index}`);

    const dotX = Number(dot.attr('cx'));
    const dotY = Number(dot.attr('cy'));
    const radius = Number(dot.attr('r'));
    const diameter = radius * 2;

    console.log(size);

    if (dotX >= size.width - radius) {
      dot.attr('cx', size.width - radius);
    }

    if (dotY >= size.height - radius) {
      dot.attr('cy', size.height - radius);
    }

    dotsData.push([dotX, dotY]);
  });

  console.log(dots, dotsArray, dotsData);

  const lineGen = d3
    .line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveCardinal.tension(0.2));

  d3.select('#line')
    .data(dotsData)
    .enter()
    .select('path')
    .attr('d', d => lineGen(dotsData))
    .attr('stroke', '#08f')
    .attr('stroke-width', 3)
    .attr('fill', 'none');

  // svg.on('mousemove', e => console.log(e));
  // svg.on('mouseout', e => console.log(e));
  // svg.on('click', e => console.log(e));
};
