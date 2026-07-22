import { useState } from "react";
import { loginUser } from "../services/loginService";
import { getProfile } from "../services/profileService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(formData);

      const token = response.data.token;

      localStorage.setItem("token", token);
        toast.success("Login Successful!");
        setTimeout(() => {
            navigate("/profile");
        }, 1000);
    }
    catch(error){

      toast.error("Login Failed:", error);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>


        <form 
          className="space-y-4"
          onSubmit={handleSubmit}
        >


          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />


          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />


          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              py-2
              rounded
            "
          >
            Login
          </button>


        </form>
        <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
            >
                Register
            </Link>
        </p>
      </div>
       
    </div>

  );
}


export default LoginPage;