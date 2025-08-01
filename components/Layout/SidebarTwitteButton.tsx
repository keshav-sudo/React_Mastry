"use client";
import { useRouter } from 'next/navigation'
import { FaFeather } from 'react-icons/fa6';

const SidebarTwitteButton = () => {
    const router = useRouter();
  return (
    <div onClick={() => router.push("/") }>
        <div className='
        mt-6
        lg:hidden
        rounded-full
        h-14
        w-14
        flex 
        items-center
        justify-center
        bg-sky-500
        hover:bg-opacity-80
        transition 
        cursor-pointer
        '>
            <FaFeather size={24} color='white'/>

        </div>

        <div className='
        mt-6
        hidden
        lg:flex
        px-4
        py-2
        
        gap-6
        rounded-full
        bg-sky-500
        hover:bg-opacity-10
        cursor-pointer
        transition'>
            <FaFeather size={26} color='white'  />
            <p className='hidden lg:block text-center font-semibold 
            text-[20px] text-white'>
                Tweet
            </p>
        </div>
    </div>
  )
}

export default SidebarTwitteButton