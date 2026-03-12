import { SET_Alert,REMOVE_Alert } from "../action/types";

const initialstate=[];

export default function(state=initialstate,action){
    const{type,payload}=action
 switch(type){
 case SET_Alert:
  return [...state,payload]
 case REMOVE_Alert:
    return state.filter(alert=>alert.id!==payload)
 default:
    return state
 }
}