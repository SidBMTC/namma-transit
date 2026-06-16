import { useState } from "react";
import InputField from "../components/InputField";
import { validateRegistration } from "../utils/validation";
import { registerUser } from "../services/authService";

function RegistrationPage() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Remove error for the field user is currently editing
    const updatedErrors = { ...errors };
    delete updatedErrors[name];
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors =
    validateRegistration(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }

    console.log("Validation Passed");
    try {
        const response = await registerUser(formData);

        console.log("Registration successful:", response.data);
    } 
    catch (error) {
        console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Register to continue
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <InputField
            name="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <InputField
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            name="mobileNumber"
            label="Mobile Number"
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={errors.mobileNumber}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="
              w-full 
              bg-blue-600 
              text-white 
              py-2 
              rounded-lg 
              hover:bg-blue-700 
              transition
            "
          >
            Register
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 font-medium">
              Login
            </a>
          </p>

        </form>

      </div>

    </div>
  );
}

export default RegistrationPage;