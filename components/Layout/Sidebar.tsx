"use client";

import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import Sidebarlogo from "./Sidebarlogo";
import Sidebaritems from "./Sidebaritems";
import { BiLogOut } from "react-icons/bi";
import SidebarTwitteButton from "./SidebarTwitteButton";
import useCurrentUser from "../hooks/useCurrentUser";
// Correct import: The signOut function is from the client-side next-auth library
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

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
      href: currentUser ? `/users/${currentUser.id}` : '#',
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
            {currentUser && (<Sidebaritems onClick={() => signOut()} icon={BiLogOut} label="logout"/>)}

            <SidebarTwitteButton/>
        </div>
     </div>
    </div>
  );
};

export default Sidebar;
