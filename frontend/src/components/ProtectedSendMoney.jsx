import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SendMoney } from "./SendMoney";

function ProtectedSendMoney() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchParams.get("id") || !searchParams.get("name")) {
            console.log("in protectedSendMoney");
            navigate("/dashboard");
            console.log("navigated to /dashboard");
        }
    }, [searchParams, navigate]); // Depend on searchParams and navigate

    // Only render SendMoney if the required parameters are present
    if (!searchParams.get("id") || !searchParams.get("name")) {
        return null; // Render nothing while redirecting
    }

    return <SendMoney />;
}

export default ProtectedSendMoney;
