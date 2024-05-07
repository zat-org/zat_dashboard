export interface messagequery {
    pageNumber: number,
    pageSize: number,
    isArchived: boolean,
    isHandled: boolean,

}
export enum MessageColor {
    lime = 1,
    indigo,
    red
}
export enum MessageType {
    اقتراح = 1,
    تحدي,
    نقد,
}
export const types = [
    { name: 'اقتراح', id: 1 }
    ,
    { name: 'تحدي', id: 2 }
    ,
    { name: 'نقد', id: 3 }

]
export const messagesTypes = () => {
    return Object.entries(MessageType).filter(([name, id]) => isNaN(Number(name))).map(([name, id]) => ({ name, id }))

}
// TODO add note to model
export interface IMessage {
    id: string,
    name: string,
    email: string,
    content: string,
    type: MessageType,
    isHandled: boolean,
    isArchived: boolean,
    notes?: string

}