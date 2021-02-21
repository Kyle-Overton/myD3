console.log("hello world2");
d3.json("https://api.themoviedb.org/3/movie/550?api_key=3da51145ce2ec4a7e006cbba91c0f016"
).then(res =>{
    console.log('API json', res);
})