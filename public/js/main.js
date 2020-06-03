const margin = {
    left: 80,
    right: 20,
    top: 100,
    bottom: 100
};

const width = 900 - margin.left - margin.right
const height = 350 - margin.top - margin.bottom;

const g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

const xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

const yAxisGroup = g.append("g")
    .attr("class", "y axis");

// X Scale
const x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);

// Y Scale
const y = d3.scaleLinear()
    .range([height, 0]);

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Days Past Due");

// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Customers");

const colorBarGraph = d3.scaleOrdinal(d3.schemeDark2);
reset();



function update(data, area = "the United States", accounts = service.length) {

    //count of all deliquent customers
    const deliquentCustomer = data.reduce((p, c) => {
        return p + c.count.length;
    }, 0)

    //Remove old data
    d3.select("#topLegend").remove();

    g.append("text")
        .attr("y", -30)
        .attr("id", "topLegend")
        .attr("x", 350)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(`Total accounts in ${area} is ${accounts} with
            customers diliquent (${deliquentCustomer}) at ${(100 * (deliquentCustomer/accounts)).toFixed(2  )}% `);



    x.domain(data.map(function(d) {
        return d.days
    }));

    y.domain([0, d3.max(data, function(d) {
        return d.count.length
    })])

    // X Axis
    const xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);

    // Y Axis
    const yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d) {
            if (d % 1 === 0) {
                return d;
            }

        });
    yAxisGroup.call(yAxisCall);

    // Tooltip
    const tip = d3.tip().attr('class', 'd3-tip')
        .html(function(d) {
            const pastDue = d['count'].reduce((p, c) => {
                return p + c.pastdueamt;
            }, 0)
            let text = "<strong>" + d.count.length + " customers deliquent:</strong> <span style='color:red'> " + d.days + "-" + (d.days + 30) + "days</span><br>"
            text += "<strong>Average amount past due: </strong> <span style='color:red'> " + (pastDue / d.count.length).toFixed(2) + "</span><br>";
            return text;
        });
    g.call(tip);
    // Bars
    const rects = g.selectAll("rect")
        .data(data)

    // EXIT old elements not present in new data.
    rects.exit().remove();

    //Reset with new data
    rects
        .attr("y", function(d) {
            return y(d.count.length);
        })
        .attr("x", function(d) {
            return x(d.days)
        })
        .attr("height", function(d) {
            return height - y(d.count.length);
        })
        .attr("width", x.bandwidth);


    rects.enter()
        .append("rect")
        .attr("y", function(d) {
            return y(d.count.length);
        })
        .attr("x", function(d) {
            return x(d.days)
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .style("fill", function(d, i) {
            return colorBarGraph.range()[i]
        })
        .attr("height", function(d) {
            return height - y(d.count.length);
        })
        .attr("width", x.bandwidth);
}
