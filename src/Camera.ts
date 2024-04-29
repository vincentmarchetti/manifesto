import { 
    IManifestoOptions, 
    Utils,
    AnnotationBody } from "./internal";

export class Camera extends AnnotationBody {
  constructor(jsonld?: any, options?: IManifestoOptions) {
    super(jsonld, options);
    this.isModel  = false;
    this.isLight  = false;
    this.isCamera  = true;
  }



  get isPerspectiveCamera():boolean {
    return (Utils.normaliseType(this.getProperty("type")) === "perpectivecamera");
  }
  
  getFieldOfView(): number | undefined 
  {
    if (this.isPerspectiveCamera){
        var value = this.getProperty("fieldOfView");
        if (value) return value;
        else return 45.0;
    }
    else return undefined;
  }
  
  getLookAt() : object | null {
    return this.getPropertyAsObject("lookAt" )
  }  
  get LookAt() : object | null {return this.getLookAt();}

  // TODO implement near and far properties
};
