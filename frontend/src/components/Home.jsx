import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      {/* Header */}
      <div className="flex justify-between border-b p-2">
        <div className="text-3xl font-semibold">Paytm</div>
        <div className="flex gap-2">
          <button
            className="bg-green-500 text-white"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </button>
          <button
            className="bg-green-500 text-white"
            onClick={() => {
              if(localStorage.getItem("token")){
                navigate("/dashboard")
              }
              else { navigate("/signin");}
            }}
          >
            Signin
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-between px-4">
        <div className="text-2xl">
          Welcome to Paytm — Your trusted partner for secure and effortless payments
        </div>
        <img src="/transactions.jpeg" alt="transactions" className="w-1/2 h-auto" />
      </div>

      {/* Footer */}
      <footer className="border-t p-2 text-center">
        © 2024 Paytm. All rights reserved.
      </footer>
    </div>
  );
}
