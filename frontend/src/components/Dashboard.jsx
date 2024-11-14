import { useEffect, useState, useCallback } from "react";
import { Users } from "../stylingComponents/Users";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";

export function Dashboard(){
    const balace=50000;
    const [userData,setUserData]=useRecoilState(userAtom);

    const token=localStorage.getItem("token");

    const fetchUserData = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
    
        try {
          const [userResponse, balanceResponse] = await Promise.all([
            axios.get('http://localhost:3000/user/find', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:3000/account/balance', {
              headers: { Authorization: `Bearer ${token}` }
            })
          ]);
    
          setUserData({
            balance: balanceResponse.data.balance,
            name: userResponse.data[0].firstName,
            id: userResponse.data[0]._id
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }, [setUserData]);
    
      useEffect(() => {
        fetchUserData();
      }, [fetchUserData]);
    

    return <div className="w-screen flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between shadow p-4">
            <div className="font-bold text-3xl">Payments App</div>
            <div className="flex">
                <div className="pt-1 text-lg">Hello, {userData.name}</div>
                <div className="ml-4 bg-slate-200 rounded-full w-10 h-10 text-center pt-1.5 text-lg text-semibold">{userData.name[0]}</div>
            </div>
        </div>
        
        <div className="px-5 flex py-4">
            <div className="font-bold text-2xl ">Your balance</div>
            <div className="ml-5 text-xl font-semibold pt-1 mb-4"> ₹ {(userData.balance).toFixed(2)} </div>   
        </div>
        <Users myId={userData.id}></Users>
    </div>
}