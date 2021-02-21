
console.log("my NewMovie Dos");
const parseNA = string => (string === 'NA' ? undefined:string);
const parseDate = string => d3.timeParse('%Y-%m-%d')(string);
//Type Conversion
function type(d){
    return{
        budget:+d.budget, 
        genre:parseNA(d.genre), 
        genres: JSON.parse(d.genres).map(d => d.name), 
        homepage:parseNA(d.homepage), 
        id:+d.id, 
        imdb_id:parseNA(d.imdb_id), 
        original_language:d.original_language, 
        overview:parseNA(d.overview), 
        popularity:+d.popularity, 
        poster_path:parseNA(d.poster_path), 
        production_countries: JSON.parse(d.production_countries), 
        release_date: parseDate(d.release_date), 
        revenue:+d.revenue, 
        runtime:+d.runtime, 
        tagline:parseNA(d.tagline), 
        title:parseNA(d.title), 
        vote_average:+d.vote_average, 
        vote_count:d.vote_count, 
    };
}
//Load data.
d3.csv('/myD3/03/demos/module-03/before/02-prepare/data/movies.csv', type).then(res =>{
    console.log(res);
})
