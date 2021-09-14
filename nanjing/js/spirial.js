//做螺旋形排布
const checkIntersection = (nodes, node, angle, radius) => {
    const x = radius * Math.sin(angle);
    const y = radius * -Math.cos(angle);
    return nodes.some(n => Math.hypot(n.x - x, n.y - y) <= n.value + node.value);
};

const buildSpiralLayout = nodes => {
    const ordered = nodes.sort((a, b) => a.value - b.value);
    let angle = 0;
    let radius = 10;
    return ordered.reduce((all, node, index) => {
        angle = (index === 0) ? 0 : angle + Math.PI / 3;
        while (checkIntersection(all, node, angle, radius)) radius++;
        const x = radius * Math.sin(angle);
        const y = radius * -Math.cos(angle);
        all.push({...node,
            x,
            y
        });
        return all;
    }, []);
}

data.map((item, index) => ({...item,
    id: index
}));

const layout = buildSpiralLayout(data);
const svg_spirial = d3.select('#spirial');
const g = svg_spirial.append('g').attr('transform', 'translate(200,200)');

const items = g.selectAll('g.item')
    .data(layout, d => d.id)
    .enter()
    .append('g')
    .classed('item', true)
    .attr('transform', d => `translate(${d.x},${d.y})`)

items.append('circle')
    .attr('r', d => d.value)
    .style('fill', 'white');

items.append('text')
    .text(d => d.type)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')