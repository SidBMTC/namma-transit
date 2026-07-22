import { logoutUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

    const navigate = useNavigate();
   const handleLogout = () => {

       toast.success("Logged out successfully!");
        navigate("/login");
        logoutUser();

    };


    return (

        <div className="min-h-screen flex items-center justify-center">

            <div>

                <h1 className="text-3xl font-bold">
                    Welcome to Namma Transit
                </h1>


                <button
                    onClick={handleLogout}
                    className="
                    mt-5
                    bg-red-600
                    text-white
                    px-5
                    py-2
                    rounded
                    "
                >
                    Logout
                </button>


            </div>

        </div>

    );

}


export default ProfilePage;