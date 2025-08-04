"use client"; // This page uses hooks like useRouter, so it must be a Client Component

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error'); // Get the NextAuth error code from the URL

  const [errorMessage, setErrorMessage] = useState("Something went wrong during authentication.");

  useEffect(() => {
    // You can customize these messages based on the NextAuth error codes
    switch (error) {
      case 'OAuthAccountNotLinked':
        setErrorMessage('This email is already registered with a different provider. Try signing in with a different method.');
        break;
      case 'CredentialsSignin':
        setErrorMessage('Invalid username or password.');
        break;
      case 'AccessDenied':
        setErrorMessage('Access denied. You do not have permission to sign in.');
        break;
      case 'Verification':
        setErrorMessage('The sign in link is no longer valid. Please try again.');
        break;
      case 'EmailCreateAccount':
        setErrorMessage('An account with this email already exists. Try signing in.');
        break;
      default:
        setErrorMessage('An unexpected error occurred during authentication.');
    }
  }, [error]);

  const handleGoBack = () => {
    // Redirect to your login page
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 rounded-lg shadow-md bg-gray-800 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="mb-6">{errorMessage}</p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default AuthErrorPage;