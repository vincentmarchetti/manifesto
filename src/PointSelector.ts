import {

  JSONLDResource,

} from "./internal";


export class PointSelector extends JSONLDResource  {

  IsPointSelector : boolean = true;

  constructor(jsonld: any ) {
    super(jsonld);
  }
  
  getLocation() : Object {
  	return { x:Number(this.__jsonld.x),
  	         y:Number(this.__jsonld.y),
  	         z:Number(this.__jsonld.z)
  	       }
  }
}
