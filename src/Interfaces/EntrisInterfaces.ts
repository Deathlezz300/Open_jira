
export interface entry{
    _id?:string,
    description:string,
    createdAt:number,
    status:entryStatus
}

export type entryStatus='pending' | 'in-progress' | 'finished';