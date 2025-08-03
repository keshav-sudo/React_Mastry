"use client";

import { useCallback, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Buttton";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
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
    // This is the crucial fix: the early return for `isOpen` must be
    // before any hooks are called (like useState or useCallback).
    if (!isOpen) {
        return null;
    }

    // FIX: We explicitly tell TypeScript that showModal is of type `boolean`.
    // This prevents the state from being inferred as a literal `true` type.
    const [showModal, setShowModal] = useState<boolean>(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

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
                                p-6
                                rounded-t
                                justify-center
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
                                    absolute
                                    left-9
                                "
                            >
                                <AiOutlineClose size={20} color="white" />
                            </button>
                            <div className="text-xl font-semibold text-white">
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
                                <Button
                                    disabled={disabled}
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                    secondary
                                    fullWidth
                                    large
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