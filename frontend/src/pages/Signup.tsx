import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { z } from "zod";  // Import Zod
export function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string, email?: string, password?: string }>({});

  // Zod schema for validation
  const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  // Function to handle sign up
  const handleSignup = async () => {
    // Validate input fields
    const validationResult = signupSchema.safeParse({ username, email, password });

    if (!validationResult.success) {
      // Extract error messages
      const fieldErrors: any = {};
      validationResult.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);  // Set validation errors in state
      return;  // Stop execution if validation fails
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        email,
        password,
      });

      const token = response.data.jwt;
      localStorage.setItem("token", token);
      navigate('/blogs');
    } catch (error) {
      alert("Error while signing up, please check your inputs");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <> 
      <div className="h-dvh">
        <div className="flex h-full">
          <div className="flex flex-col bg-red-5 h-full w-full md:w-1/2 justify-center items-center">

            <Heading label={"Create an account"} />
            <div className="flex">
              <Subheading label={"Don't have an account ?"} />
              <Link to="/Signin" className="underline text-slate-600 pt-2">Login</Link>
            </div>

            {/* Input fields with onChange handlers */}
            <Inputbox 
              label={"Username"} 
              placeholder={"Your username"} 
              value={username} 
              type={Text}
              onChange={(e) => setUsername(e.target.value)} 
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}  {/* Display username error */}

            <Inputbox 
              label={"Email"} 
              type={email}
              placeholder={"Your Email"} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}  {/* Display email error */}

            <Inputbox 
            type={"password"}
              label={"Password"} 
              placeholder={"Your Password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}  {/* Display password error */}

            {/* Pass handleSignup to Button's onClick */}
            <Button label={"Sign up"} onClick={handleSignup} />

          </div>

          {/* Quote block - hidden on small screens */}
          <div className="hidden md:flex flex-col w-1/2 bg-slate-200 h-full justify-center items-center">
            <div className="pl-9 ml-6 text-3xl font-bold text-balance flex flex-col justify-center items-center ">
              "The customer service that I received was exceptional, the support team went above and beyond to address my concerns."
            </div>
            <div className="mt-5 text-lg font-semibold">Jules Winnfield</div>
            <div className="text-slate-500">CEO, Acme Inc</div>
          </div>
        </div>
      </div>
    </>
  );
}
