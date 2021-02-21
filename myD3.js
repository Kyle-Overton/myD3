console.log("filtered Data");
// Data preparation.
function filterData(data){
    return data.filter(d =>{
        return( 
            d.release_year > 1999 &&
            d.release_year < 2010 &&
            d.revenue > 0 &&
            d.budget > 0 &&
            d.genre &&
            d.title
        );
        
    })
}

function prepareBarChartData(data){
    const dataMap = d3.rollup(
        data,
        v => d3.sum(v,leaf => leaf.revenue),
        d => d.genre
    )
    const dataArray = Array.from(dataMap,d =>({genre: d[0],revenue: d[1]}));
    return dataArray;
}
//Main function.
function ready(movies){
    const moviesClean = filterData(movies);
    const barChartData = prepareBarChartData(moviesClean).sort((a,b) =>{
        return d3.descending(a.revenue - b.revenue);
    });
    console.log(barChartData);
}
// Data utilities.
const parseNA = string => (string === 'NA' ? undefined : string);
const parseDate = string => d3.timeParse('%Y-%m-%d')(string);
//Type Conversion
function type(d) {
    const date=parseDate(d.release_date);
    return {
        budget: +d.budget,
        genre: parseNA(d.genre),
        genres: JSON.parse(d.genres).map(d => d.name),
        homepage: parseNA(d.homepage),
        id: +d.id,
        imdb_id: parseNA(d.imdb_id),
        original_language: d.original_language,
        overview: parseNA(d.overview),
        popularity: +d.popularity,
        poster_path: parseNA(d.poster_path),
        production_countries: JSON.parse(d.production_countries),
        release_date: date,
        release_year: date.getFullYear(),
        revenue: +d.revenue,
        runtime: +d.runtime,
        tagline: parseNA(d.tagline),
        title: parseNA(d.title),
        vote_average: +d.vote_average,
        vote_count: d.vote_count
    };
}
// Margin convention.
const margin = {top: 40, right: 40, bottom: 40, left: 40};
const width = 400 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Scales.
const xMax = d3.max(barChartData, d => d.revenue);

const xScale = d3
    .scaleLinear()
    .domain(xMax )
    .range([0,width]);

const yScale = d3.scaleBand()
    .domain(barChartData.map(d => d.genre))
    .rangeRound([0,height]);

debugger;
// Draw base.
d3.select('.bar-chart-container')
    .append('svg')
    .attr('width',width+margin.left+margin.right)
    .attr('height',height+margin.top+margin.bottom)
    .append('g')
    .attr('transform',`translate(${margin.left},${margin.top})`)
//Load data.
d3.csv('/myD3/03/demos/module-03/before/02-prepare/data/movies.csv', type).then(res => {
    ready(res);
})