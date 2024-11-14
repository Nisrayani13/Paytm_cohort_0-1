import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

export function SendMoney() {
  const navigate=useNavigate();
  const [searchParams] = useSearchParams();
  const [userData,setUserData] =useRecoilState(userAtom);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  const frndName = searchParams.get("name") || "";
  const frndId = searchParams.get("id") || "";

  const handleTransfer = async () => {
    setIsLoading(true);
    setConfirmationStatus(null);

    try {
      await axios.post(
        "http://localhost:3000/account/transfer",
        {
          to: frndId,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setConfirmationStatus("success");
      setUserData((userData)=>{
        return {
          ...userData,
          balance:userData.balance-amount
        }
      })
    } catch (error) {
      console.error(`Error while amount transfer: ${error}`);
      setConfirmationStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const renderConfirmation = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500" />
        </div>
      );
    }

    if (confirmationStatus === "success") {
      return (
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <p className="text-lg font-semibold mb-2 text-green-600">Payment successful!</p>
          <p className="text-gray-600 mb-4">₹{amount} sent to {frndName}</p>
        </div>
      );
    }

    if (confirmationStatus === "error") {
      return (
        <div className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <p className="text-lg font-semibold mb-2 text-red-600">Payment failed. Please try again.</p>
          <p className="text-gray-600 mb-4">No amount deducted from your account.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-md p-6 w-full">
        {!isLoading && confirmationStatus === null ? (
          <>
            <h1 className="font-bold text-3xl text-center mb-6">Send Money</h1>
            <div className="flex items-center mb-4">
              <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-xl text-white">{frndName[0]}</span>
              </div>
              <div className="text-xl ml-3 font-semibold">{frndName}</div>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (in Rs)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                min="0.01"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleTransfer}
              disabled={!amount || isLoading || parseFloat(amount)<=0}
              className="bg-green-500 text-white p-2 w-full rounded font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Initiate transfer
            </button>
          </>
        ) : (
          <div className="py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Payment Confirmation</h2>
            {renderConfirmation()}
            {confirmationStatus && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    setAmount("");
                    setConfirmationStatus(null);
                  }}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mb-2"
                >
                  Back to Send Money
                </button>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}