"use strict";

console.log("Running demo_commnjs");
const Manifesto=require("./dist-commonjs/index.js");

Manifesto.loadManifest('https://iiif.wellcomecollection.org/presentation/v2/b18035723').then(e => 
{
 if (e.structures)
 {
    e.structures.forEach( (x) =>
    {
        console.log("structure");
        console.log(x);
    });
 }
 
});



