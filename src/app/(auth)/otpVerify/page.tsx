"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendOtpThunk, verifyOtpThunk, setMobile } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import PrimaryButton from "@/components/Common/PrimaryButton";
import OtpInput from "@/components/Auth/OtpInput";
import Loader from "@/components/Common/Loader";

export default function Page() {
    const [otp, setOtp] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, mobile, success, isAuthenticated } = useAppSelector((state) => state.auth);

    // Load mobile from localStorage if not available
    useEffect(() => {
        if (mobile) return;

        const storedMobile = localStorage.getItem("mobile");
        if (storedMobile) {
            dispatch(setMobile(storedMobile));
        } else {
            router.push("/login");
        }
    }, [mobile, dispatch, router]);

    // After OTP verification navigation
    useEffect(() => {
        if (loading) return;

        if (isAuthenticated) {
            localStorage.removeItem("mobile");
            router.push("/instruction");
        } else if (success) {
            router.push("/profile");
        }
    }, [loading, success, isAuthenticated, router]);

    const handleResend = () => {
        if (!mobile) {
            toast.error("Mobile number not found. Please login again.");
            router.push("/login");
            return;
        }
        dispatch(sendOtpThunk({ mobile }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast.success("OTP resent successfully!");
                } else {
                    toast.error(res.message || "Failed to resend OTP.");
                }
            });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.replace(/\s/g, "").length !== 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }
        dispatch(verifyOtpThunk({ otp: otp.replace(/\s/g, ""), mobile }));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full h-full flex flex-col justify-between px-6 py-6 text-PrimaryBg font-poppins">
            <div className="space-y-4">
                <div>
                    <h2 className="text-[22px] md:text-[24px] font-semibold">Enter the code we texted you</h2>
                    <p className="mt-4 mb-8 text-[14px] md:text-[16px]">We&rsquo;ve sent an SMS to {mobile}</p>
                </div>

                <OtpInput
                    label="SMS code"
                    placeholder="Enter your 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <p className="text-[12px] font-thin text-[#5C5C5C] text-left">
                    Your 6-digit code is on its way. This can sometimes take a few moments to arrive.
                </p>

                <p onClick={handleResend} className="font-semibold text-[14px] underline cursor-pointer">
                    Resend Code
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
                <PrimaryButton type="submit" text={loading ? "Verifying..." : "Get Started"} />
            </form>
        </div>
    );
}
