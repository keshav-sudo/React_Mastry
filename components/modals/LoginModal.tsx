"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react"; // <-- NextAuth ka signIn import kiya hai
import toast from "react-hot-toast"; // <-- Toast messages ke liye import kiya hai

import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

import Modal from "../Modal";
import Input from "../Input";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registermodal = useRegisterModal();

    const [email, setEmail] = useState(''); // Corrected 'setemail' to 'setEmail' for consistency
    const [password, setPassword] = useState(''); // Corrected 'setpassword' to 'setPassword' for consistency
    const [isLoading, setIsLoading] = useState(false); // Corrected 'setisloding' to 'setIsLoading' for consistency

    // `isloading` ko 'isLoading' kar diya gaya hai consistency ke liye
    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        loginModal.onClose();
        registermodal.onOpen();
    }, [isLoading, registermodal, loginModal]);

    // onSubmit function ko complete kiya gaya hai
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true); // Loading state chalu kiya

            // NextAuth ke 'credentials' provider ka use karke login karein
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false, // Redirect ko disable kar diya
            });
            
            // Agar login successful hai
            if (result?.ok) {
                toast.success("Logged in successfully!"); // Success toast message
                loginModal.onClose();
                // Yahan aap user ko homepage ya kisi aur page par redirect kar sakte hain
                // useRouter().push('/')
            }
            
            // Agar login fail ho gaya hai
            if (result?.error) {
                toast.error(result.error); // Error toast message
            }

        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred."); // General error toast
        } finally {
            setIsLoading(false); // Loading state band kiya, chahe success ho ya fail
        }
    }, [email, password, loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                type="email" // Added type for accessibility
                onChange={(e) => setEmail(e.target.value)} // setemail ko setEmail kar diya
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Password"
                type="password" // Added type for security
                onChange={(e) => setPassword(e.target.value)} // setpassword ko setPassword kar diya
                value={password}
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p> First Time Using Twitter
                <span 
                    onClick={onToggle}
                    className="text-white
                    cursor-pointer
                    hover:underline"> 
                 Create an Account 
                </span>
            </p>
        </div>
    );


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
