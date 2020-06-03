

    //Get the states for the customers that are deliquent
    const userAccounts = deliquency.map(element => element.loanid)
    const statesAccounts = loans.filter((item) => {
      if(userAccounts.find(element => element === item.loanid)){
        return item;
      }
    })
    const states = {};
    for(let i = 0; i < statesAccounts.length; i++){
      const st = statesAccounts[i].state;
      if(!states[st]){
          states[st] = st;
      }
    }


		//Width and height of map
		const widthMap = 960;
		const heightMap = 500;

		// D3 Projection
		const projection = d3.geoAlbersUsa()
			.translate([widthMap / 2, heightMap / 2]) // translate to center of screen
			.scale([1000]); // scale things down so see entire US

		// Define path generator
		const path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
			.projection(projection); // tell path generator to use albersUsa projection

    const color = d3.scaleOrdinal(d3.schemeCategory10);


		//Create SVG element and append map to the SVG
		const svg = d3.select("#map-area")
			.append("svg")
			.attr("width", widthMap)
			.attr("height", heightMap);

		// Append Div for tooltip to SVG
		const div = d3.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);
			// Load GeoJSON data and merge with states data
			d3.json("data/usa.json").then(function(json) {
				// Loop through each state data value in the .csv file

				// Bind the data to the SVG and create one path per GeoJSON feature
				svg.selectAll("path")
					.data(json.features)
					.enter()
					.append("path")
          .on("mouseover", function(d) {
            if(d.properties.name in states){
              d3.select(this).style("cursor", "pointer");
            }
          })
          .on("mouseout", function(d) {
             d3.select(this).style("cursor", "default");
          })
          .on("click", function(d) {
            if(d.properties.name in states){
              getStateDataForBarGraph(d.properties.name);
            }
          })
					.attr("d", path)
					.style("stroke", "#fff")
					.style("stroke-width", "1")
					.style("fill", function(d) {
              if(d.properties.name in states){
                  return color.range()[Math.floor((Math.random() * 9) + 1)]
              }
					});
			});

      
