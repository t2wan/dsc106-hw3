// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
  orderHistory: []
};

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

function readEntries(){


	var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];

	var i;
	for (i = 0; i < generateEntries().length; i++) {
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = generateEntries()[i][0];
		cell2.innerHTML = generateEntries()[i][1];
		cell3.innerHTML = generateEntries()[i][2];
		cell4.innerHTML = generateEntries()[i][3];
		cell5.innerHTML = "$"+ Number(Number(generateEntries()[i][2]*DINGUS_PRICE)+Number(generateEntries()[i][3]*WIDGET_PRICE)).toFixed(2);
	  }
	  var Dingus = 0;
	  var Widget = 0;
	  var j;
	  for (j = 0; j < generateEntries().length; j++){
		  Dingus = Dingus + generateEntries()[j][2];
		  Widget = Widget + generateEntries()[j][3];
	  }
	  var Sales = (Dingus *DINGUS_PRICE + Widget*WIDGET_PRICE).toFixed(2)
	  document.getElementById("st1").textContent = Dingus;
	  document.getElementById("st2").textContent = Widget;
	  document.getElementById('st4').innerHTML = Sales;


	try{

	

	store = JSON.parse(localStorage['orderHistory'])
	let orders = store.orderHistory;
	for (let i=0;i<orders.length;i++){
		let row = table.insertRow();
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		cell1.innerHTML = orders[i][0];
		cell2.innerHTML = orders[i][1];
		cell3.innerHTML = orders[i][2];
		cell4.innerHTML = orders[i][3];
		cell5.innerHTML = orders[i][4];
		document.getElementById("st1").textContent = (Number(document.getElementById("st1").textContent) + Number(cell3.innerHTML));
		document.getElementById("st2").textContent = (Number(document.getElementById("st2").textContent) + Number(cell4.innerHTML));
		document.getElementById("st4").textContent = (Number(document.getElementById("st4").textContent) + Number(cell5.innerHTML.substring(1,))).toFixed(2);

	}
}
catch(e){

}

	var newData = [ {
		count: document.getElementById("st1").innerHTML,
		emote: "Dingus"
	  },{
		count: document.getElementById("st2").innerHTML,
		emote: "Widget"
	  },
	
	]
	
	// Define size & radius of donut pie chart
	var width = 450,
	  height = 450,
	  radius = Math.min(width, height) / 2;
	
	// Define arc colours
	var colour = d3.scale.category20();
	
	// Define arc ranges
	var arcText = d3.scale.ordinal()
	  .rangeRoundBands([0, width], .1, .3);
	
	// Determine size of arcs
	var arc = d3.svg.arc()
	  .innerRadius(0)
	  .outerRadius(radius - 35);
	
	// Create the donut pie chart layout
	var pie = d3.layout.pie()
	  .value(function(d) {
		return d.count;
	  })
	  .sort(null);
	
	// Append SVG attributes and append g to the SVG
	var mySvg = d3.select('#my_dataviz')
	.append("svg")
	  .attr("width", width)
	  .attr("height", height);
	  
	
	var svg = mySvg
	  .append("g")
	  .attr("transform", "translate(" + radius + "," + radius + ")");
	
	var svgText = mySvg
	  .append("g")
	  .attr("transform", "translate(" + radius + "," + radius + ")");
	
	// Define inner circle
	svg.append("circle")
	  .attr("cx", 0)
	  .attr("cy", 0)
	  .attr("r", 100)
	  .attr("fill", "#fff");
	
	// Calculate SVG paths and fill in the colours
	var g = svg.selectAll(".arc")
	  .data(pie(newData))
	  .enter().append("g")
	  .attr("class", "arc");
	
	// Append the path to each g
	g.append("path")
	  .attr("d", arc)
	  .attr("fill", function(d, i) {
		return colour(i);
	  });
	
	var textG = svg.selectAll(".labels")
	  .data(pie(newData))
	  .enter().append("g")
	  .attr("class", "labels");
	
	// Append text labels to each arc
	textG.append("text")
	  .attr("transform", function(d) {
		return "translate(" + arc.centroid(d) + ")";
	  })
	  .attr("dy", ".35em")
	  .style("text-anchor", "middle")
	  .attr("fill", "#fff")
	  .text(function(d, i) {
		return d.data.count > 0 ? d.data.emote : '';
	  });
	  
	  var legendG = mySvg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
	.data(pie(newData))
	.enter().append("g")
	.attr("transform", function(d,i){
	return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
	})
	.attr("class", "legend");   
	
	legendG.append("rect") // make a matching color rect
	.attr("width", 10)
	.attr("height", 10)
	.attr("fill", function(d, i) {
	return colour(i);
	});
	
	legendG.append("text") // add the text
	.text(function(d){
	return d.value + "  " + d.data.emote;
	})
	.style("font-size", 12)
	.attr("y", 10)
	.attr("x", 11);
	
	
	svg.append("text")
		.attr("x", 0)             
		.attr("y", -200)
		.attr("text-anchor", "middle")  
		.style("font-size", "16px") 
		.text("Dingus and Widget Pie Chart");

	
	/* Bar Chart */


var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 450,
	height = 450;

var svg = d3.select("#barbar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [
  { date: "01/01/2020", Dingus: "1", Widget: "1" },
  { date: "01/02/2020", Dingus: "2", Widget: "2" },
];



try{

	store = JSON.parse(localStorage['orderHistory'])
	let orders = store.orderHistory; 

	var dates = []

	for (let i=0;i<orders.length;i++){
		dates.push(orders[i][1])
	}
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	}

	var unique = dates.filter( onlyUnique ).slice(-7);

	for(let i=0;i<unique.length;i++){
		var ds = [];
		var ws = [];
		for(let j=0;j<orders.length;j++){
			if(orders[j][1]==unique[i]){
				ds.push(Number(orders[j][2]));
				ws.push(Number(orders[j][3]));
			}
		}
		var sumd = ds.reduce(function(a, b){
			return a + b;
		}, 0);
		var sumw = ws.reduce(function(a, b){
			return a + b;
		}, 0);

		var item = { date: unique[i], Dingus: sumd.toString(), Widget: sumw.toString()}
		data.push(item)
	}

}
catch(err){

}







// Transpose the data into layers
var dataset = d3.layout.stack()(["Dingus", "Widget"].map(function(t) {
  return data.map(function(d) {
	return {x: d.date, y: +d[t]};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);


var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["#f2b447", "#d9d574"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(function(d) { return d } );



svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  svg.append("text")
  .attr("x", 220)             
  .attr("y", -5)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .text("Dingus and Widget Stacked Bar Chart");


// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
	var xPosition = d3.mouse(this)[0] - 15;
	var yPosition = d3.mouse(this)[1] - 25;
	tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
	tooltip.select("text").text(d.y);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
	switch (i) {
	  case 0: return "Widget";
	  case 1: return "Dingus";
	}
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
	
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");

}






function update() {
	var Dingus = document.getElementById('Dingus')
	document.getElementById("st1").textContent = Number(document.getElementById("st1").textContent)+Number(Dingus.value)
	var Widget = document.getElementById('Widget')
	document.getElementById("st2").textContent = Number(document.getElementById("st2").textContent)+Number(Widget.value)
	var Sales =  (DINGUS_PRICE * Dingus.value + WIDGET_PRICE * Widget.value).toFixed(2)
	document.getElementById('st4').innerHTML = (Number(document.getElementById('st4').innerHTML) + Number(Sales)).toFixed(2)
		// Find a <table> element with id="myTable":
	var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];

	// Create an empty <tr> element and add it to the 1st position of the table:
	var row = table.insertRow();

	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);

	// Add some text to the new cells:
	var currentdate = new Date();
	var Monthlength = (currentdate.getMonth()+1).toString().length;
	if (Monthlength<2){
		var month = '0' + (currentdate.getMonth()+1).toString();
	}
	else{
		var month = currentdate.getMonth()+1;
	}

	var Daylength = (currentdate.getDate()).toString().length;
	if (Daylength<2){
		var date = '0' + (currentdate.getDate()).toString();
	}
	else{
		var date = currentdate.getDate();
	}

	var datetime =   month  + "/" + date + "/" + currentdate.getFullYear()
	cell1.innerHTML = store.orderHistory.length+3;
	cell2.innerHTML = datetime;
	cell3.innerHTML = Dingus.value;
	cell4.innerHTML = Widget.value;
	cell5.innerHTML = "$"+ Sales;


	store.orderHistory.push([cell1.innerHTML,cell2.innerHTML,cell3.innerHTML,cell4.innerHTML,cell5.innerHTML])
	localStorage.setItem('orderHistory',JSON.stringify(store))


	document.getElementById('Dingus').value = 0
	document.getElementById('Widget').value = 0
	document.getElementById('DingusTotal').value = 0.00
	document.getElementById('WidgetTotal').value = 0.00
	document.getElementById('Total').value = 0.00
	document.getElementById('Order').disabled = true;


	document.getElementById('my_dataviz').innerHTML = ""
	document.getElementById('barbar').innerHTML = ""

	var newData = [{
        count: document.getElementById("st1").innerHTML,
        emote: "Dingus"
      },{
        count: document.getElementById("st2").innerHTML,
        emote: "Widget"
      },

    ]

    // Define size & radius of donut pie chart
    var width = 450,
      height = 450,
      radius = Math.min(width, height) / 2;

    // Define arc colours
    var colour = d3.scale.category20();

    // Define arc ranges
    var arcText = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1, .3);

    // Determine size of arcs
    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius - 35);

    // Create the donut pie chart layout
    var pie = d3.layout.pie()
      .value(function(d) {
        return d.count;
      })
      .sort(null);

    // Append SVG attributes and append g to the SVG
	var mySvg = d3.select('#my_dataviz')
	.append("svg")
      .attr("width", width)
	  .attr("height", height);
	  

    var svg = mySvg
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    var svgText = mySvg
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    // Define inner circle
    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 100)
      .attr("fill", "#fff");

    // Calculate SVG paths and fill in the colours
    var g = svg.selectAll(".arc")
      .data(pie(newData))
      .enter().append("g")
      .attr("class", "arc");

    // Append the path to each g
    g.append("path")
      .attr("d", arc)
      .attr("fill", function(d, i) {
        return colour(i);
      });

    var textG = svg.selectAll(".labels")
      .data(pie(newData))
      .enter().append("g")
      .attr("class", "labels");

    // Append text labels to each arc
    textG.append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .attr("fill", "#fff")
      .text(function(d, i) {
        return d.data.count > 0 ? d.data.emote : '';
	  });
	  
	  var legendG = mySvg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
  .data(pie(newData))
  .enter().append("g")
  .attr("transform", function(d,i){
    return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
  .attr("class", "legend");   

legendG.append("rect") // make a matching color rect
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", function(d, i) {
    return colour(i);
  });

legendG.append("text") // add the text
  .text(function(d){
    return d.value + "  " + d.data.emote;
  })
  .style("font-size", 12)
  .attr("y", 10)
  .attr("x", 11);


  svg.append("text")
        .attr("x", 0)             
        .attr("y", -200)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
		.text("Dingus and Widget Pie Chart");


	

/* Bar Chart */


var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 450,
	height = 450;

var svg = d3.select("#barbar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [
  { date: "01/01/2020", Dingus: "1", Widget: "1" },
  { date: "01/02/2020", Dingus: "2", Widget: "2"},
];



try{

	store = JSON.parse(localStorage['orderHistory'])
	let orders = store.orderHistory; 

	var dates = []

	for (let i=0;i<orders.length;i++){
		dates.push(orders[i][1])
	}
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	}

	var unique = dates.filter( onlyUnique ).slice(-7);

	for(let i=0;i<unique.length;i++){
		var ds = [];
		var ws = [];
		for(let j=0;j<orders.length;j++){
			if(orders[j][1]==unique[i]){
				ds.push(Number(orders[j][2]));
				ws.push(Number(orders[j][3]));
			}
		}
		var sumd = ds.reduce(function(a, b){
			return a + b;
		}, 0);
		var sumw = ws.reduce(function(a, b){
			return a + b;
		}, 0);

		var item = { date: unique[i], Dingus: sumd.toString(), Widget: sumw.toString()}
		data.push(item)
	}

}
catch(err){

}







// Transpose the data into layers
var dataset = d3.layout.stack()(["Dingus", "Widget"].map(function(t) {
  return data.map(function(d) {
	return {x: d.date, y: +d[t]};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);


var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["#f2b447", "#d9d574"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(function(d) { return d } );



svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  svg.append("text")
  .attr("x", 220)             
  .attr("y", -5)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .text("Dingus and Widget Stacked Bar Chart");


// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
	var xPosition = d3.mouse(this)[0] - 15;
	var yPosition = d3.mouse(this)[1] - 25;
	tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
	tooltip.select("text").text(d.y);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
	switch (i) {
	  case 0: return "Widget";
	  case 1: return "Dingus";
	}
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
	
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
		

	



}


function lala(){
	document.getElementById('DingusTotal').value = (Number(document.getElementById('Dingus').value)*DINGUS_PRICE).toFixed(2)
	document.getElementById('Total').value = (Number(document.getElementById('DingusTotal').value) + Number(document.getElementById('WidgetTotal').value)).toFixed(2);
	if (document.getElementById('Dingus').value > 0){
		document.getElementById('Order').disabled = false;
	}

}

function lalala(){
	document.getElementById('WidgetTotal').value = (Number(document.getElementById('Widget').value)*WIDGET_PRICE).toFixed(2)
	document.getElementById('Total').value = (Number(document.getElementById('DingusTotal').value) + Number(document.getElementById('WidgetTotal').value)).toFixed(2);
	if (document.getElementById('Widget').value > 0){
		document.getElementById('Order').disabled = false;
}
}

function clearr(){
	document.getElementById('Dingus').value = 0
	document.getElementById('Widget').value = 0
	document.getElementById('DingusTotal').value = 0.00
	document.getElementById('WidgetTotal').value = 0.00
	document.getElementById('Total').value = 0.00
	document.getElementById('Order').disabled = true;
}
