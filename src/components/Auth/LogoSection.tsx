import Image from "next/image";

export default function LogoSection() {
    return (
        <div className="flex w-full items-center justify-center gap-3 text-white font-poppins py-6 md:py-0 bg-PrimaryBg md:bg-transparent">
          <Image 
            src="/auth/authLogo.svg" 
            alt="Logo" 
            width={64} 
            height={64} 
            className="h-16 w-16 object-contain" 
          />
          <div className="flex flex-col">
            <h2 className="text-[32px] font-bold">NexLearn</h2>
            <h3 className="text-[13px] -mt-[6px] font-medium">futuristic learning</h3>
          </div>
        </div>
      );
  }