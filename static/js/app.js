//create plots for belly button biodiversity data:

function init() {
    let dropdown = d3.select("#selDataset");
    //create dropdown using sample ID numbers 
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        console.log(data);
        let sampleIDs = data.names;
        // loop through sample IDs to add each number 
        for (let i = 0; i < sampleIDs.length; i++){
            dropdown.append("option").text(sampleIDs[i]).property("value", sampleIDs[i]);
        };
        //build first plot using the first sample number. use selectSample to do the rest. 
        let firstSample = sampleIDs[0];
        createBarChart(firstSample);
        createBubbleChart(firstSample);
        demographicInfo(firstSample);
    });
}
//repeat for other sample IDs
function selectSample(nextID) {
    createBarChart(nextID);
    createBubbleChart(nextID);
    demographicInfo(nextID);
}


//create the demographics table for each sample ID on dropdown menu
function demographicInfo(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let metadata = data.metadata;
      //filter data for the specific sample ID no. 
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      //select the demographic data from the dropdown with the sample ID of interest 
      let demographics = d3.select("#sample-metadata");
      //need this to reset the table
      demographics.html("");
  
      //get the values for each ID to match in the table info for rach sample
      for (r in result) {
        demographics.append("h6").text(`${r.toUpperCase()}: ${result[r]}`);
      };
    });
}


//create the bar chart for top 10 OTUs
  function createBarChart(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let sampleIDs = data.samples;
      //filter data for specific sample ID no. 
      let resultArray = sampleIDs.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      //need these variables for the charts per instructions 
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;

      // info for how bar chart will look 
      let chartSpecs = [
        {
          y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }];
      //plot the bar chart using chartSpecs
      Plotly.newPlot("bar", chartSpecs, {title: "Top 10 Microbial Species (OTUs) Found in Sample", xaxis: {title: "Sample Values"}});
    });
  }

  
  //make the bubble chart to display OTU data for each sample
  function createBubbleChart(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let sampleIDs = data.samples;
        //filter data for specific sample ID no. 
        let resultArray = sampleIDs.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        //need these variables for the charts per instructions 
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        //chart layout info for bubble chart 
        let dataSpecs = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
            size: sample_values,
            color: otu_ids,
            }
        }];
        let chartSpecs = {
            title: "Bubble Chart of Microbial Species (OTUs) Found in Sample",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        };
        Plotly.newPlot("bubble", dataSpecs, chartSpecs);
    });
  }
  
// Initialize the belly button dashboard
init();
  