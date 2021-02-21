console.log("hello world potter/rings");

const potter = d3.csv('/myD3/01-load/data/harry_potter.csv');
const rings = d3.csv('/myD3/01-load/data/lord_of_the_rings.csv');

Promise.all([potter,rings]).then(res =>{
    console.log('Multiple requests: ', res);
    console.log('Multiple requests concat: ', [...res[0], ...res[1]]);
})
