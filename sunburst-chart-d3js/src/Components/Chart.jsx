import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data, width = 928 }) => {
	const svgRef = useRef();
	const height = width;
	const radius = width / 6;

	useEffect(() => {
		if (!data) return;

		const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

		const hierarchy = d3
			.hierarchy(data)
			.sum(d => d.value)
			.sort((a, b) => b.value - a.value);

		const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(hierarchy);
		root.each(d => (d.current = d));

		const arc = d3
			.arc()
			.startAngle(d => d.x0)
			.endAngle(d => d.x1)
			.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
			.padRadius(radius * 1.5)
			.innerRadius(d => d.y1 * radius)
			.outerRadius(d => d.y0 * radius);

		const svg = d3
			.select(svgRef.current)
			.attr('viewBox', [-width / 2, -height / 2, width, width])
			.style('font', '10px sans-serif');

		const path = svg
			.append('g')
			.selectAll('path')
			.data(root.descendants().slice(1))
			.join('path')
			.attr('fill', d => {
				while (d.depth > 1) d = d.parent;
				return color(d.data.name);
			})
			.attr('fill-opacity', d => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
			.attr('pointer-events', 'auto')
			.attr('d', d => arc(d.current))
			.on('mouseover', (event, p) => {
				d3.select(event.target).attr('fill-opacity', 0.8);
			})
			.on('mouseout', (event, p) => {
				d3.select(event.target).attr('fill-opacity', d => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0));
			});

		path.append('title').text(
			d =>
				`${d
					.ancestors()
					.map(d => d.data.name)
					.reverse()
					.join('/')}`,
		);

		const label = svg
			.append('g')
			.attr('pointer-events', 'none')
			.attr('text-anchor', 'middle')
			.style('user-select', 'none')
			.selectAll('text')
			.data(root.descendants().slice(1))
			.join('text')
			.attr('dy', '0.35em')
			.attr('fill-opacity', d => +labelVisible(d.current))
			.attr('transform', d => labelTransform(d.current))
			.text(d => d.data.name);

		const centerLabel = svg.append('text').attr('text-anchor', 'middle').attr('dy', '-0.5em').style('font-size', '16px').text('سوالات');

		const parent = svg.append('circle').datum(root).attr('r', radius).attr('fill', 'none').attr('pointer-events', 'none');
	}, [data]);

	function arcVisible(d) {
		return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
	}

	function labelVisible(d) {
		return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
	}

	function labelTransform(d) {
		const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
		const y = ((d.y0 + d.y1) / 2) * radius;
		return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
	}

	return <svg ref={svgRef}></svg>;
};

export default SunburstChart;
