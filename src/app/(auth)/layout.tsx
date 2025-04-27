import { ReactNode } from "react";
import Image from "next/image";
import LogoSection from "@/components/Auth/LogoSection";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/auth/authBg.png')] bg-cover bg-center">
      
      {/* Dark overlay bg */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Main container */}
      <div
        className="relative z-10 flex w-full max-w-[866px] min-h-[525px] max-h-[525px] rounded-xl overflow-hidden p-2"
        style={{
          background: "linear-gradient(190deg, #1C3141 70%, #487EA7 100%)",
        }}
      >
        {/* Left side for desktop */}
        <div className="hidden md:flex flex-col justify-center items-center w-full gap-20 p-6">
          <LogoSection />
          <Image 
            src="/auth/authLeft.svg" 
            alt="Login Illustration" 
            width={300} 
            height={300} 
            className="max-h-80 object-contain" 
          />
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-center items-center w-full bg-white rounded-[6px] md:p-2 relative">
          
          {/* Logo on mobile */}
          <div className="flex md:hidden flex-col items-center justify-center mb-6 w-full">
            <LogoSection />
          </div>

          {/* auth children */}
          {children}
        </div>
      </div>
    </div>
  );
}
