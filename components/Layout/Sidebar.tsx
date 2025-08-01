import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import Sidebarlogo from "./Sidebarlogo";
import Sidebaritems from "./Sidebaritems";
import { BiLogOut } from "react-icons/bi";
import SidebarTwitteButton from "./SidebarTwitteButton";

const Sidebar = () => {
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notification",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: FaUser,
    },
  ];
  return (
    <div className=" col-span-1 h-full pr-4 md:pr-6" >
      <div className=" flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
            <Sidebarlogo/>  
            { items.map((item) => (
                <Sidebaritems
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                />
            ))
            }
            <Sidebaritems onClick={()=> {}} icon={BiLogOut} label="logout"/>
            <SidebarTwitteButton/>
        </div>
     </div>
    </div>
  );
};

export default Sidebar;
