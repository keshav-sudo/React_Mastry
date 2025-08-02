// components/Input.tsx

interface InputProps {
    placeholder?: string; // Input field ke andar dikhne wala hint text
    value?: string;       // Input field ki current value
    type?: string;        // Input field ka type (e.g., "text", "email", "password")
    disabled?: boolean;   // Input field ko disable karna hai ya nahi
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Jab input ki value change ho toh kya function run ho
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
}) => {
    return (
        <input
            disabled={disabled} // Input field ko disabled karega
            onChange={onChange} // Input ki value change hone par yeh function call hoga
            value={value}       // Input field ki current value
            placeholder={placeholder} // Hint text
            type={type}         // Input type
            className="
                w-full
                p-4
                text-lg
                bg-black
                border-2
                border-neutral-900
                rounded-md
                outline-none
                text-white
                focus:border-sky-500
                focus:border-2
                transition
                disabled:bg-neutral-900
                disabled:opacity-70
                disabled:cursor-not-allowed
            "
        />
    );
}

export default Input;