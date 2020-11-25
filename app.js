const canvas = d3.select("#canvas");
const URL =
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";

let data = [];

d3.json(URL)
  .then((dataRta) => {
    data = dataRta;
  })
  .then(function (rta) {
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 1000000]).range([0, iwidth]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iheight])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", (d) => x(0))
      .attr("y", (d) => y(d.name))
      .attr("height", y.bandwidth())
      .attr("width", (d) => iwidth - x(1000000 - d.value));

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

    return rta;
  });
