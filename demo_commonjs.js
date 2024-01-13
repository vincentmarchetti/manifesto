"use strict";

console.log("Running demo_commnjs");
const Manifesto=require("./dist-commonjs/index.js");

// generator function
function* AnnotationsFromManifest( manifest )
{
	for (const seq of manifest.getSequences())
	{
		const canv = seq.getCanvases()[0];
		for (const anno of canv.getContent()) yield anno;
	}
}


let manifest_url='https://spri-open-resources.s3.us-east-2.amazonaws.com/iiif3dtsg/manifests/20231220/astronaut.json';
//let manifest_url='http://localhost:8080/test/fixtures/pres3.json';
Manifesto.loadManifest(manifest_url).then(e => 
{
    const manifest = Manifesto.parseManifest(e);
    
    console.log("label: " + manifest.getLabel().getValue("zh"));
    var generator = AnnotationsFromManifest( manifest );
    
    while (true)
    {
    	var iter = generator.next();
    	if (iter.done)  break;
    	var annotation = iter.value;
    	
    	var target = annotation.getTarget();
    	if (target.IsSpecificResource && target.getSelector().IsPointSelector )
    	{
    		var sel = target.getSelector();
    		
    		var location = sel.getLocation();
    		
    		console.log("PointSelector( " 	+ location.x.toString() + " , " 
    										+ location.y.toString() + " , " 
    										+ location.z.toString() + " )");
    	}
    		
    	else if (typeof(target) == "string")
    	{	
    		console.log("target.id " + target );
    	}
    }
}).catch( (error) => console.error("error loading manifest :" +error) );




