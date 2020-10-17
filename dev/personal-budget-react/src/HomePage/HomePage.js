//import React from 'react';
import React, { useEffect } from "react";
import Chart from "chart.js";
import axios from "axios";
import * as d3 from "d3";
import { entries } from "d3-collection";
//import "./styles.css";

function HomePage() {
  useEffect(() => {
    let title = [];
    let budget = [];

    axios.get(`http://localhost:3002/budget`).then((res) => {
      console.log(res);
      for (const dataObj of res.data.myBudget) {
        title.push(dataObj.title);
        budget.push(dataObj.budget);
      }

      // set the dimensions and margins of the graph
      var width = 450;
      var height = 450;
      var margin = 40;

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      var radius = Math.min(width, height) / 2 - margin;

      // append the svg object to the div called 'my_dataviz'
      var svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // Create data
      var data = {};
      
      for(var i = 0; i < title.length; i++){
          data[title[i]] = budget[i];
      }

      console.log("print data ", data);

      // set the color scale
      var color = d3
        .scaleOrdinal()
        .domain(title)
        .range(d3.schemeDark2);

      // Compute the position of each group on the pie:
      var pie = d3
        .pie()
        .sort(null) // Do not sort group by size
        .value(function (d) {
          return d.value;
        });
      var data_ready = pie(entries(data));

      // The arc generator
      var arc = d3
        .arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8);

      // Another arc that won't be drawn. Just for labels positioning
      var outerArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll("allSlices")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function (d) {
          return color(d.data.key);
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

      // Add the polylines between chart and labels:
      svg
        .selectAll("allPolylines")
        .data(data_ready)
        .enter()
        .append("polyline")
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", function (d) {
          var posA = arc.centroid(d); // line insertion in the slice
          var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
          var posC = outerArc.centroid(d); // Label position = almost the same as posB
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC];
        });

      // Add the polylines between chart and labels:
      svg
        .selectAll("allLabels")
        .data(data_ready)
        .enter()
        .append("text")
        .text(function (d) {
          console.log(d.data.key);
          return d.data.key;
        })
        .attr("transform", function (d) {
          var pos = outerArc.centroid(d);
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        })
        .style("text-anchor", function (d) {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });

      //other pie chart
      const ctx = document.getElementById("myChart");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: title,
          datasets: [
            {
              label: "Budget",
              data: budget,
              backgroundColor: [
                "#DAF7A6",
                "#FFC300",
                "FF5733",
                "#C70039",
                "#900C3F",
                "#581845",
                "#F0E68C",
              ],
              borderColor: [
                "DAF7A6",
                "#FFC300",
                "FF5733",
                "#C70039",
                "#900C3F",
                "#581845",
                "#F0E68C",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    });
    console.log(title, budget);
  });

  return (
    <main id="maincontent" className="center">
      <div className="page-area">
        <div className="text-box" role="Textbox">
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </div>

        <div className="text-box" role="Textbox">
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </div>

        <div className="text-box" role="Textbox">
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </div>

        <div className="text-box" role="Textbox">
          <h2>Free</h2>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </div>

        <div className="text-box" role="Textbox">
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </div>

        <div className="text-box" role="Textbox">
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </div>

        <div className="text-box" role="Textbox">
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </div>

        <div className="App">
          <canvas id="myChart" />
        </div>

        <div id="my_dataviz"></div>
      </div>
    </main>
  );
}

export default HomePage;
