

import React from "react";

interface ButtonProps {
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: () => void; // Function jo button click pe run hogi
    disabled?: boolean;
    outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    secondary,
    fullWidth,
    large,
    onClick,
    disabled,
    outline,
}) => {
    return (
        <button
            disabled={disabled} // Jab disabled ho toh button click nahi hoga
            onClick={onClick}
            className={`
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-full
                font-semibold
                hover:opacity-80
                transition
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'} // Full width ya content ke hisaab se width
                ${secondary ? 'bg-white' : 'bg-sky-500'} // Secondary style white bg, else sky-blue
                ${secondary ? 'text-black' : 'text-white'} // Secondary text black, else white
                ${secondary ? 'border-white' : 'border-sky-500'} // Secondary border white, else sky-blue
                ${large ? 'py-3' : 'py-2'} // Large button ka padding
                ${large ? 'px-6' : 'px-4'} // Large button ka padding
                ${outline ? 'bg-transparent' : ''} // Outline button ka bg transparent
                ${outline ? 'border-white' : ''} // Outline button ka border white
                ${outline ? 'text-white' : ''} // Outline button ka text white
            `}
        >
            {label} 
        </button>
    );
};

export default Button;