import {formatDistanceToNow} from 'date-fns'
import {es} from 'date-fns/locale'

export const GetFormatTiem=(time:number)=>{

    const frontNow=formatDistanceToNow(time,{locale:es});

    return frontNow;
}