//create plot displays for belly button biodiversity data

function init() {
    let selector = d3.select("#selDataset");
  
    //create samples from samples data file 
    d3.json("samples.json").then((data) => {
        let sampleIDs = data.names;
        console.log(data)
        for (let i = 0; i < sampleIDs.length; i++){
            selector
            .append('option')
            .text(sampleIDs[i])
            .property('value', sampleIDs[i]);
        }
        //build first plot with first sample 
        let firstSample = sampleIDs[0];
        //buildCharts(firstSample);
        getData(firstSample);
    });
  }


  //repeat for other sample IDs when selected from drop down 
  function selectSample(nextID) {
    //buildCharts(nextID); THIS
    getData(nextID);
  }

function getData(sample) {
    let metadata = data.metadata; 
    //filter and specify data for specific sample ID number 
    let resultArray = metadata.filter(sampleObj => sampleObj.id ==sample);
    let resultID = resultArray[0];
    //select panel with the sample ID 
    let panel = d3.select('#sample-metadata');
    panel.html(''); 

    for (r in resultID) {
        panel.append('h6').text(`${r.toUpperCase()}: ${resultID[r]}`);
    };
  }




// function to make the charts to display on dashboard panel
function createCharts(sample) {
    d3.json('samples.json').then((data) => {
        let sampleIDs = data.samples;
        // get the sample id of interest to plot 
        let sampleOfInterest = sampleIDs.filter(sampleObj => sampleObj.id == sample);
        let resultArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
        //get the iD number 
        let sampleNo = sampleOfInterest[0];
        let result = resultArray[0];


        //Create a bubble chart that displays each sample. Need the following variables for axis, markers, and text. 
        let otu_ids = sampleNo.otu_ids;
        let otu_labels = sampleNo.otu_labels;
        let sample_values = sampleNo.sample_values;
        

        //create bar chart for the sample. 
        let barChartData = [{
            type: 'bar',
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuId => `OTU: ${otuId}`).reverse(),
            orientation: 'h',
            text: otu_lables.slice(0,10).reverse()
        }];
        let barChartLayout = {
            title: "Top 10 Bacteria Cultur OTUs Found in Sample",
            margin: {t: 30, l: 150}
        };
        //plot the data on bar chart 
        Plotly.newPlot('bar', barChartData, barChartLayout);
        

        //create the bubble chart for data:
    })
}

  // Initialize and display the dashboard
  init();
