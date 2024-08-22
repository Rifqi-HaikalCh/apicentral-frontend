export class Api {
    id: number;          
    projectName: string;   
    name: string;        
    url: string;         
    description: string;  
  
    constructor(
      id: number,
      projectName: string,
      name: string,
      url: string,
      description: string  
    ) {
      this.id = id;
      this.projectName = projectName;
      this.name = name;
      this.url = url;
      this.description = description;  
    }
  }
  