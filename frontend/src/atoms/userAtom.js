import {atom} from "recoil"
export const userAtom=atom({
    key:"userAtom",
    default:{
        balance:0,
        name:"",
        id:""
    }
})