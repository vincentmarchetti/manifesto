"use strict";

console.log("Running demo_commnjs");
const Manifesto=require("./public/manifesto.js");

// generator function
function* AnnotationsFromManifest( manifest )
{
	for (const seq of manifest.getSequences())
	{
		const canv = seq.getCanvases()[0];
		for (const anno of canv.getContent()) yield anno;
	}
}

//const manifests = []
for (var manifest_url of ["https://raw.githubusercontent.com/IIIF/3d/main/manifests/model_origin.json",
                          "https://raw.githubusercontent.com/IIIF/3d/main/manifests/model_position.json"])
{

Manifesto.loadManifest(manifest_url).then(e => 
{
    
    console.log("manifest " + e.id + " downloaded");
    const manifest = Manifesto.parseManifest(e);
    console.log("manifest parsed");
    
    const canvases = manifest.getSequences()[0].getCanvases();
    console.log("canvases " + canvases.length);
    
    const scenes = manifest.getSequences()[0].Scenes;
    console.log("scenes " + scenes.length);
    
    
    for (const annotation of scenes[0].Content )
    {
        var target = annotation.getTarget();
       
    	if (target.isSpecificResource )
    	{
    	    console.log("SpecificResource source: " + target.Source);
    	    
    		
    		
    		var location = target.Selector.Location;
    		
    		// dev note : following expression uses javascript template literal
		    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting
		    var positionString = `${location.x}, ${location.y}, ${location.z}`
    		
    		console.log("PointSelector( " + positionString +  " )");
    	}
    		
    	else if (typeof(target) == "string")
    	{	
    		console.log("target.id " + target );
    	}
    }
    console.log();
}).catch( (error) => console.error("error loading manifest :" +error) );
}



