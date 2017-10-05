//Marging van de grafiek
var svg = d3.select("svg"),
    margin = {
        top: 20,
        right: 20,
        bottom: 100,
        left: 100
    },

    //Breedte van de svg - margin
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

//Schaal van de x en y axis
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function (d) {
    d.speakers = +d.speakers;
    return d;
}, function (error, data) {
    if (error) throw error;

    x.domain(data.map(function (d) {
        return d.language;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.speakers;
    })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

        //http://bl.ocks.org/d3noob/ccdcb7673cdb3a796e13
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-1.2em")
        .attr("dy", "-.3em")
        .attr("dy", "0em")
        .attr("transform", "rotate(-65)");

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Speakers");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.language);
        })
        .attr("y", function (d) {
            return y(d.speakers);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.speakers);
        });
});
