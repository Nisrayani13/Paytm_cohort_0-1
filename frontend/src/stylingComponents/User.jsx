import { useNavigate } from "react-router-dom"

export function User({id,firstName,lastName}){
    const navigate=useNavigate();
    return <div className="flex justify-between mt-4 px-5">
        <div className="flex">
            <div className="w-8 h-8 bg-slate-200 rounded-full pt-0.5 pl-2.5 text-lg">{firstName[0]}</div>
            <div className="ml-2 pt-0.5 text-lg">{firstName} {lastName}</div>
        </div>
        <button onClick={(event)=>{
            navigate("/send?id="+id+"&name="+firstName)
        }} className="bg-gray-800 text-slate-100 text-sm">Send Money</button>
    </div>  
}