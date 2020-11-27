const canvas = d3.select("#canvas");
const URL =
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";

let data = [];

d3.json(URL).then((dataRta) => {
  data = dataRta;

  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 50 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  let maxPP = 0;
  let maxLE = 0;
  let maxP = 0;
  for (let i in data) {
    maxPP = Math.max(maxPP, data[i].purchasingpower);
    maxLE = Math.max(maxLE, data[i].lifeexpectancy);
    maxP = Math.max(maxP, data[i].population);
  }

  const x = d3
    .scaleLinear()
    .domain([0, maxPP + maxPP * 0.2])
    .range([0, iwidth]);

  const y = d3
    .scaleLinear()
    .domain([0, maxLE + maxLE * 0.2])
    .range([iheight, 0]);

  const z = d3
    .scaleLinear()
    .domain([0, maxP + maxP * 0.2])
    .range([0, 100]);

  const circles = g.selectAll("circle").data(data).enter().append("circle");

  circles
    .style("fill", "green")
    .attr("cx", (d) => x(d.purchasingpower))
    .attr("cy", (d) => y(d.lifeexpectancy))
    .attr("r", (d) => z(d.population));

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
});
