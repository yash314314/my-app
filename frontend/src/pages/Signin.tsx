import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { z } from "zod";  // Import Zod

export function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});

    // Zod schema for validation
    const signinSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
    });

    // Function to handle sign in
    async function shoot() {
        // Validate input fields
        const validationResult = signinSchema.safeParse({ email, password });

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
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                email, password
            });

            localStorage.setItem("token", response.data.jwt);
            navigate('/blogs');
        } catch (e) {
            console.log(e);
            alert("Error while signing in, check your inputs");
        }
    }

    return (
        <>
            <div className="flex justify-center items-center bg-zinc-300 h-dvh">
                <div className="flex flex-col bg-red-5 h-full w-1/2 justify-center items-center">
                    <Heading label={"Let's Login"} />
                    <div className="flex">
                        <Subheading label={"Don't have an account?"} />
                        <Link to="/Signup" className="underline text-slate-600 pt-2">Signup</Link>
                    </div>

                    {/* Email input with validation error display */}
                    <Inputbox
                        label={"Email"}
                        placeholder={"Your email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}  {/* Display email error */}

                    {/* Password input with validation error display */}
                    <Inputbox
                        label={"Password"}
                        placeholder={"Your Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}  {/* Display password error */}

                    {/* Button to trigger the shoot function */}
                    <Button label={"Sign up"} onClick={shoot} />
                </div>
            </div>
        </>
    );
}
