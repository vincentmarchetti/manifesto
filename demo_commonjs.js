"use strict";

console.log("Running demo_commnjs");
const Manifesto=require("./dist-commonjs/index.js");

const searchForAnnotations = (elem) => 
{   
    if (elem.getIIIFResourceType && elem.getIIIFResourceType())
    {
        console.log("IIITResourceType: " + elem.getIIIFResourceType());
    }
    else
    {
        if (elem.__jsonld)
            console.log("raw json" + elem.__jsonld);
        else
            console.log("unidentified type " + elem );
    }
    
    if (elem.isAnnotation && elem.isAnnotation() )
    {
        console.log("Annotation: " + elem);
    }
    else if (elem.isCanvas && elem.isCanvas() )
    {
        console.log("searching canvas " + elem.id);
        elem.getResources().forEach( (item) => searchForAnnotations(item) );
    }
    else if (elem.isManifest && elem.isManifest())
    {
        console.log("searching manifest");
        console.log( elem.getSequences() );
        //elem.getSequences().forEach( (item) => item.getCanvases().forEach( (x) => searchForAnnotations(x) ) );
        elem.getSequences().forEach( (seq) =>
        {
            console.log("seq " + seq);
            console.log("seq.getCanvases() " + seq.getCanvases() );
            console.log("Array.isArray( seq.getCanvases()) " + Array.isArray( seq.getCanvases()));
            var canv = seq.getCanvases()[0];
            console.log("canv " + canv);
            console.log("canv.getIIIFResourceType() " + canv.getIIIFResourceType() );
            var annotations = canv.getContent();
            annotations.forEach( (anno) => 
            {
                console.log("annotation " + anno.id);
                console.log("body : ");
                anno.getBody().forEach((bodyItem) => 
                {
                    console.log("  url " + bodyItem.id);
                    console.log("  format " + bodyItem.getFormat());
                });
                var target = anno.getTarget();
                if (Array.isArray(target)) target=target[0];
                
                if (typeof target === 'string' || target instanceof String)
                {
                    console.log("target : " + target);
                }
                else if ( target.type && target.type == 'SpecificResource'  && target.selector.type == "PointSelector")
                {
                    console.log("target : SpecificResource");
                    console.log("  source : " + target.source);
                    var point = target.selector;
                    var loc = [ point.x, point.y, point.z ];
                    console.log("  location: " + loc );
                }
                else
                    console.log("unidentified target : " + target);
            });
            
        });
    }
    else if (elem.isSequence && elem.isSequence())
    {
        console.log("searching sequence");
        elem.getCanvases().forEach( (item) => searchForAnnotations(item) );
    }
    else
    {
        console.log("Stopped");
    }
};

let manifest_url='https://spri-open-resources.s3.us-east-2.amazonaws.com/iiif3dtsg/manifests/20231220/whale.json';
//let manifest_url='http://localhost:8080/test/fixtures/pres3.json';
Manifesto.loadManifest(manifest_url).then(e => 
{
    const manifest = Manifesto.parseManifest(e);
    console.log("label: " + manifest.getLabel().getValue("en"));
    searchForAnnotations(manifest);
    //manifest.getSequences().forEach( (seq) => console.log(seq) );
}).catch( (error) => console.error("error loading manifest :" +error) );




