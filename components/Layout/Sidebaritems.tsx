"use client"; // ✅ Needed if you later use hooks like useRouter in this file

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string; // ✅ Fixed typo: was "lable"
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const Sidebaritems: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  const router = useRouter();
  const handleback = useCallback(() => {
    if(onClick){
      return onClick();
    }
    if(href){
      router.push(href); 
    }
  }, [router , onClick , href])
  return (
    <div
      className="flex flex-row items-center"
      onClick={handleback}
    >
      {/* Mobile icon view */}
      <div
        className="
          relative 
          rounded-full
          h-14
          w-14
          flex
          items-center
          justify-center
          p-4
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
          lg:hidden
        "
      >
        <Icon size={28} color="white" />
      </div>

      {/* Desktop view with label */}
      <div
        className="
          relative
          hidden
          lg:flex
          items-center
          rounded-full
          gap-4
          p-4
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
        "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-xl text-white">{label}</p>
      </div>
    </div>
  );
};

export default Sidebaritems;
