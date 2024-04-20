export const useRoletransform = () => {
  const Roles:{id:number,name:string,color:string}[] = [{ id: 1, name: "Supre",color:"amber" }, { id: 2, name: "Staff",color:"indigo" }]
  const transform = (id: number) => {
    return Roles.find(role => role.id === id)

  }
  return { transform,Roles }
}
