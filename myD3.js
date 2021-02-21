console.log("hello worlds");
d3.csv("/01-load/data/harry_potter.csv").then(res =>{
    console.log('Local csv:', res);
});

d3.csv("harry_potter_local.csv").then(res =>{
    console.log('Local csv:', res);
});