"use client";

import { useCallback, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Buttton";

interface ModalProps {
    isOpen?: boolean; // Modal dikhana hai ya nahi (true/false)
    onClose: () => void; // Jab modal close ho toh kya function call kare
    onSubmit: () => void; // Jab modal ka main action submit ho toh kya function call kare
    title?: string; // Modal ka title text
    body?: React.ReactElement; // Modal ke andar ka main content (JSX format mein)
    footer?: React.ReactElement; // Modal ke neeche ka extra content (JSX format mein)
    actionLabel: string; // Modal ke primary action button ka text (e.g., "Submit", "Tweet")
    disabled?: boolean; // Agar koi action pending ho toh modal ke buttons ko disable karega

    // IMPORTANT: 'outline', 'secondary', 'large' props are NOT part of ModalProps.
    // They belong to the 'Button' component that is used inside the Modal's footer.
    // The Modal component should NOT concern itself with these styling props.
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    return (
        <div
            className="
                justify-center
                items-center
                flex
                overflow-x-hidden
                overflow-y-auto
                fixed
                inset-0
                z-50
                outline-none
                focus:outline-none
                bg-neutral-800/70
            "
        >
            <div
                className="
                    relative
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto
                    h-full
                    lg:h-auto
                    md:h-auto
                "
            >
                {/* INNER CONTENT */}
                <div
                    className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    <div
                        className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0
                            rounded-lg
                            shadow-lg
                            relative
                            flex
                            flex-col
                            w-full
                            bg-black
                            outline-none
                            focus:outline-none
                        "
                    >
                        {/* HEADER */}
                        <div
                            className="
                                flex
                                items-center
                                justify-between /* Adjusted based on visual */
                                p-6
                                rounded-t
                                relative
                                border-b-[1px]
                                border-neutral-700
                            "
                        >
                            <button
                                onClick={handleClose}
                                className="
                                    p-1
                                    border-0
                                    hover:opacity-70
                                    transition
                                    ml-auto /* Adjusted */
                                "
                            >
                                <AiOutlineClose size={20} color="white" />
                            </button>
                            {/* Title Div - adjusted placement based on visual, not perfectly centered */}
                            <div className="text-xl font-semibold text-white ml-auto">
                                {title}
                            </div>
                        </div>

                        {/* BODY */}
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>

                        {/* FOOTER */}
                        <div className="flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {/* THIS IS WHERE THE IMPORTED BUTTON COMPONENT IS USED */}
                                <Button
                                    disabled={disabled}
                                    label={actionLabel} // The 'actionLabel' prop for Modal becomes 'label' for Button
                                    onClick={handleSubmit} // Modal's 'onSubmit' becomes Button's 'onClick'
                                    // You would pass Button-specific styling props here if needed, e.g.:
                                    secondary
                                    fullWidth
                                    large
                                    // outline
                                />
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;