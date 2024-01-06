import {
  IManifestoOptions,
  JSONLDResource,
  PointSelector
} from "./internal";


export class SpecificResource extends JSONLDResource  {

  options: IManifestoOptions;
  
  IsSpecificResource : boolean = true;

  constructor(jsonld: any, options?: IManifestoOptions) {
    super(jsonld);
    this.options = <IManifestoOptions>options;
  }
  
  getSource() : string 
  {
  	return this.getProperty("source");  	  	
  }
  
  getSelector() : PointSelector | undefined
  {
  	const sel = this.getProperty("selector");
  	if ( sel.type && sel.type == "PointSelector")
  	{
  		return new PointSelector( sel );
  	}
  	else{
  		return sel;
  	}
  }
  
}