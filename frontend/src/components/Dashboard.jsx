import { useEffect, useState } from "react";
import { Users } from "../stylingComponents/Users";
import axios from "axios";

export function Dashboard(){
    const balace=50000;
    const [balance,setBalance]=useState();
    const [name,setName]=useState("");
    const [myId,setmyId]=useState();

    const token=localStorage.getItem("token");

    useEffect(()=>{
        const userResponse=async ()=>{
            const response=await axios.get("http://localhost:3000/user/find",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            // console.log('userResponse:', response.data);
            // console.log(`name set to : ${response.data[0].firstName}`)
            setName(response.data[0].firstName);
            setmyId(response.data[0]._id);
        }
        const balanceResponse=async ()=>{
            const response=await axios.get("http://localhost:3000/account/balance",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            // console.log('balanceResponse:',response.data)
            // console.log('balance set to: ', response.data.balance)
            setBalance(response.data.balance);
        }
        userResponse();
        balanceResponse();
    },[token])

    return <div className="flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between shadow p-4">
            <div className="font-bold text-3xl">Payments App</div>
            <div className="flex">
                <div className="pt-1 text-lg">Hello, {name}</div>
                <div className="ml-4 bg-slate-200 rounded-full w-10 h-10 text-center pt-1.5">{name[0]}</div>
            </div>
        </div>
        
        <div className="px-5 flex py-4">
            <div className="font-bold text-2xl ">Your balance</div>
            <div className="ml-5 text-xl font-semibold pt-1 mb-4"> ${balance} </div>   
        </div>
        <Users myId={myId}></Users>
    </div>
}