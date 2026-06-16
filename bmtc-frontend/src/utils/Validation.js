export const validateRegistration = (formData) => {
    const errors = {};

    // Full Name
    if (!formData.fullName.trim()) {
        errors.fullName = "Full Name is required";
    }

    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } 
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
    }

    // Mobile Number
    if (!formData.mobileNumber.trim()) {
        errors.mobileNumber = "Mobile Number is required";
    } 
    else if (!/^\d{10}$/.test(formData.mobileNumber)) {
        errors.mobileNumber =
            "Mobile number must contain exactly 10 digits";
    }

    // Password
    if (!formData.password.trim()) {
        errors.password = "Password is required";
    } 
    else if (formData.password.length < 8) {
        errors.password =
            "Password must be at least 8 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword.trim()) {
        errors.confirmPassword =
            "Confirm Password is required";
    } 
    else if (
        formData.password !== formData.confirmPassword
    ) {
        errors.confirmPassword =
            "Passwords do not match";
    }

    return errors;
};