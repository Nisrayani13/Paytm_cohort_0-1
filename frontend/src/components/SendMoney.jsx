export function SendMoney() {
  return (
    <div className="bg-gray-400 h-screen w-screen items-center flex justify-center">
        <div className="bg-white rounded-lg shadow-md max-w-md p-6 w-full">
            <div className="font-bold text-3xl text-center mb-10">Send Money</div>
            <div className="flex">
                <div className="bg-green-500 rounded-full w-8 h-8 flex justify-center">
                    <div className="flex flex-col justify-center h-full text-xl text-white">
                    A
                    </div>
                </div>
                <div className="text-xl ml-2 pt-0.5 font-semibold mb-2">Friend's name</div>
            </div>
            <div className="text-black mt-2">Amount (in Rs)</div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Amount"
                    className="w-full p-2 border rounded border-slate-200 mt-3"
                ></input>
            </div>
            <button className="bg-green-500 text-white p-2 w-full mt-3 font-medium">Initiate transfer</button>
        </div>
    </div>
  );
}
