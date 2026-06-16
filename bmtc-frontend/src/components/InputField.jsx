import { useState } from "react";

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  name
}) {

  // This state belongs only to this InputField
  const [showPassword, setShowPassword] = useState(false);

  // Decide what input type should actually be displayed
  const inputType =
    type === "password"
      ? (showPassword ? "text" : "password")
      : type;

  return (
    <div>

      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full 
          border 
          border-gray-300 
          rounded-lg 
          px-3 
          py-2 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500
        "
      />

      {/* Show this button only for password fields */}
      {
        type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-1 text-sm text-blue-600"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        )
      }

      {
        error && (
          <p className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )
      }

    </div>
  );
}

export default InputField;