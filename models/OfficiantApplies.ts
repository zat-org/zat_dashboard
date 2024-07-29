// apply 
export interface OfficiantApply {
    id:string,
    fullName:string,  //important
    experienceYears:number, // important
    anyPreviousExperience:boolean, // important 
    residenceCity:string, // important 
    
    email:string,
    phoneNumber:string,
    birthDateUtc:string|Date, 
}