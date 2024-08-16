import { Users } from "../stylingComponents/Users";
export function Dashboard(){
    const balace=50000;
    return <div className="flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between shadow p-4">
            <div className="font-bold text-3xl">Payments App</div>
            <div className="flex">
                <div className="pt-1 text-lg">Hello, User</div>
                <div className="ml-4 bg-slate-200 rounded-full w-10 h-10 text-center pt-1.5">U</div>
            </div>
        </div>
        
        <div className="px-5 flex py-4">
            <div className="font-bold text-2xl ">Your balance</div>
            <div className="ml-5 text-xl font-semibold pt-1 mb-4"> ${balace} </div>   
        </div>
        <Users></Users>
    </div>
}