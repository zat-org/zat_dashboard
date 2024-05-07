
// export enum WorkHours {
//     FullTime = 1,
//     PartTime,
//     Flexible
// }
// export const workhours = () => {
//     return Object.entries(WorkHours).filter(([name, id]) => isNaN(Number(name))).map(([name, id]) => ({ name, id }))
// }

export interface IJobBrief {
    id: string,
    position: string,
    brief: string,
    createdSince: number
}
export interface IApplyBrief {
    id: string,
    fullName: string,
    email: string,
    brief: string

}
export interface IJobs {
    id: string
    position: string
    brief: string
    responsibilities: string
    requirements: string
    workHoursTypes: string
    location: string
    createdSince: number
}
export interface IApply {
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    city: string,
    brief: string,
    cvUrl: string,
    jobAdvertisementId: string
}
