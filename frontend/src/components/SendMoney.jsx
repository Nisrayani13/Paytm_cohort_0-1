import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function SendMoney() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);

  const frndName = searchParams.get("name");

  const handleTransfer = async () => {
    try {
      console.log("Backend Call initiated")
      await axios.post("http://localhost:3000/account/transfer", {
        to: searchParams.get("id"),
        amount: amount,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch (error) {
      console.log(`Error while amount transfer, error: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-400 h-screen w-screen items-center flex justify-center">
      <div className="bg-white rounded-lg shadow-md max-w-md p-6 w-full">
        <div className="font-bold text-3xl text-center mb-10">Send Money</div>
        <div className="flex">
          <div className="bg-green-500 rounded-full w-8 h-8 flex justify-center">
            <div className="flex flex-col justify-center h-full text-xl text-white">
              {frndName[0]}
            </div>
          </div>
          <div className="text-xl ml-2 pt-0.5 font-semibold mb-2">
            {frndName}
          </div>
        </div>
        <div className="text-black mt-2">Amount (in Rs)</div>
        <div>
          <input
            onChange={(event) => {
              setAmount(event.target.value);
            }}
            type="text"
            placeholder="Enter Amount"
            className="w-full p-2 border rounded border-slate-200 mt-3"
          ></input>
        </div>
        <button
          onClick={handleTransfer}
          className="bg-green-500 text-white p-2 w-full mt-3 font-medium"
        >
          Initiate transfer
        </button>
      </div>
    </div>
  );
}
