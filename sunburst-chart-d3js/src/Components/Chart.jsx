import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data, width = 500, height = 500 }) => {
	const svgRef = useRef();

	const outerRadius = width / 3;
	const innerRadius = outerRadius * 0.7;

	// محاسبه بخش‌های دایره‌ای و رنگ‌ها
	const { arcOuter, arcInner, colorScale, root } = useMemo(() => {
		if (!data) return { arcOuter: null, arcInner: null, colorScale: null, root: null };

		const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 100000]);

		const hierarchy = d3
			.hierarchy(data)
			.sum(d => d.value)
			.sort((a, b) => b.value - a.value);

		const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(hierarchy);
		root.each(d => (d.current = d));

		const arcOuter = d3
			.arc()
			.startAngle(d => d.x0)
			.endAngle(d => d.x1)
			.innerRadius(outerRadius * 0.9)
			.outerRadius(outerRadius)
			.padAngle(0.01);

		const arcInner = d3
			.arc()
			.startAngle(d => d.x0)
			.endAngle(d => d.x1)
			.innerRadius(innerRadius * 0.3)
			.outerRadius(innerRadius)
			.padAngle(0.01);

		return { arcOuter, arcInner, colorScale, root };
	}, [data]);

	useEffect(() => {
		if (!root) return;

		const svg = d3
			.select(svgRef.current)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.style('font', '12px sans-serif');

		const outerGroup = svg.selectAll('.outer-group').data([root]).join('g').attr('class', 'outer-group');

		const innerGroup = svg.selectAll('.inner-group').data([root]).join('g').attr('class', 'inner-group');

		const outerPaths = outerGroup
			.selectAll('path')
			.data(root.descendants().filter(d => d.depth === 1))
			.join('path')
			.attr('fill', 'Moccasin')
			.attr('d', arcOuter)
			.style('transition', 'fill 0.3s ease, filter 0.3s ease')
			.on('mouseover', function (event, d) {
				const color = d3.interpolateOranges(0.6);
				d3.select(this).attr('fill', color).style('filter', 'drop-shadow(0 0 10px rgba(255, 165, 0, 0.8))');

				innerGroup
					.selectAll('path')
					.filter(inner => inner.parent === d)
					.attr('fill', inner => colorScale(inner.value))
					.style('filter', 'drop-shadow(0 0 5px rgba(255, 165, 0, 0.6))');
			})
			.on('mouseout', function () {
				d3.select(this).attr('fill', 'Moccasin').style('filter', 'none');
				innerGroup.selectAll('path').attr('fill', 'white').style('filter', 'none');
			});

		const innerPaths = innerGroup
			.selectAll('path')
			.data(root.descendants().filter(d => d.depth === 2))
			.join('path')
			.attr('fill', 'white')
			.attr('d', arcInner)
			.style('transition', 'fill 0.3s ease, filter 0.3s ease');
	}, [root, arcOuter, arcInner, colorScale]);

	return <svg ref={svgRef}></svg>;
};

export default SunburstChart;
