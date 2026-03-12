import { SET_Alert,REMOVE_Alert } from "./types";
import { v4 as uuid} from "uuid"
export const Set_alert=(msg,alertType)=>dispatch=>{
const id=uuid();
dispatch({
    type:SET_Alert,
    payload:{msg,alertType,id}
})
setTimeout(()=>{
dispatch({
    type: REMOVE_Alert,
    payload:id
})
},4000)
}



