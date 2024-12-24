import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const RegistrationForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); 
  
  const userDetails = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(userDetails);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ 
      ...prevData,
       [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(); 
    setErrors(validationErrors); 

  
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setOpenDialog(true);
    }

    try{
      const response = await axios.post(
        "http://localhost:5000/api/users/registeruser",
        {
          name:formData.name,
          email:formData.email,
          password:formData.password,
        }
      )

    }catch(error){
        setErrorMessage("Error registering user: " + error.message);
    }

  };
  
  const handleClose = () => {
    setOpenDialog(false); 
    navigate('/login'); 

  };


  return (
    <div
      className="flex justify-center  font-[sans-serif] h-full min-h-screen p-4"
      style={{
        backgroundImage: `url('/images/—Pngtree—girl in the library_4483612.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="bg-lightblue2 rounded-2xl bg-white shadow-lg  max-w-screen-xl  p-6"
        style={{
          backgroundColor: "#BCD7F6",
        }}
      >
        <form onSubmit={handleSubmit} className="justify-start w-full max-w-screen-xl ">
          <h2 className="text-2xl font-extrabold text-center text-bluedark mb-6">
            User Registration
          </h2>

          
            
            {/* Name and Username in the same line */}
            <div className="flex gap-3 mt-2">
              <div className="flex-1">
                <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              </div>

            {/* Email in the second line */}
            <div className="mt-4">
              <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

          
          {/* Password Section */}
          <div className="mb-6">
             
             {/* Password and Confirm Password in Same Line */}
             <div className="flex gap-4 mt-4">
               <div className="flex-1">
                 <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">Password</label>
                 <input
                   type={showPassword ? "text" : "password"}
                   name="password"
                   value={formData.password}
                   onChange={handleInputChange}
                   className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                 />
                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
               </div>

               <div className="flex-1">
                 <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">Confirm Password</label>
                 <input
                   type={showPassword ? "text" : "password"}
                   name="confirmPassword"
                   value={formData.confirmPassword}
                   onChange={handleInputChange}
                   className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                 />
                 {errors.confirmPassword && (
                   <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                 )}
               </div>
             </div>

             <div className="flex items-center mt-2">
               <input
                 type="checkbox"
                 onChange={() => setShowPassword(!showPassword)}
                 className="mr-2"
               />
               <span className="text-sm text-gray-700 font-bold">Show Password</span>
             </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mb-2 py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full bg-black text-white hover:bg-grey hover:text-black focus:outline-none"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Dialog Box */}
        <Dialog  open={openDialog} onClose={handleClose} 
        PaperProps={{style: { borderRadius: '20px' },  }}>
          <DialogTitle 
            className="bg-blue-800 text-white" // Tailwind CSS classes
            style={{ backgroundColor: "#1E3A8A", color: "#FFFFFF" }} // Inline styles as fallback
          >
           User Registration Successfully
          </DialogTitle>
          <DialogContent 
            className="bg-gray-100 text-gray-800" 
            style={{ backgroundColor: "#F3F4F6", color: "#1F2937" }}
          >
            <p>The User Details has been  saved to the system.</p>
            <p>
              <strong>User Name:</strong> {formData.name}
            </p>
            
          </DialogContent>
          <DialogActions 
            className="bg-gray-100" 
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <Button 
              onClick={handleClose} 
              className="bg-blue-600 text-white hover:bg-blue-700" 
              style={{
                backgroundColor: "#2563EB", 
                color: "#FFFFFF", 
                borderRadius: "20px", 
                padding: "8px 16px",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default RegistrationForm;
