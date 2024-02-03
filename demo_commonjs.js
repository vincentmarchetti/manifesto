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


let manifest_url='https://raw.githubusercontent.com/IIIF/3d/main/manifests/model_origin.json';

Manifesto.loadManifest(manifest_url).then(e => 
{
    console.log("manifest downloaded");
    const manifest = Manifesto.parseManifest(e);
    console.log("manifest parsed");
    
    const canvases = manifest.getSequences()[0].getCanvases();
    console.log("canvases " + canvases.length);
    
    const scenes = manifest.getSequences()[0].Scenes;
    console.log("scenes " + scenes.length);
    console.log("scenes[0].Content " + scenes[0].Content );
    
    for (const annotation of scenes[0].Content )
    {
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




