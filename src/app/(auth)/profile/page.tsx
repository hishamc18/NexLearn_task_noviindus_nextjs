"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createProfileThunk } from "@/redux/slices/authSlice";
import { toast } from "sonner";

import PrimaryInput from "@/components/Common/PrimaryInput";
import PrimaryButton from "@/components/Common/PrimaryButton";
import Image from "next/image";

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        qualification: "",
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, mobile, success } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!success) {
            router.push("/login");
        }
    }, [router, success]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.qualification) {
            toast.error("Name and Qualification are required.");
            return;
        }

        if (!mobile) {
            toast.error("Something went wrong. Please login again.");
            router.push("/login");
            return;
        }

        if (!profileImage) {
            toast.error("Please upload your profile image.");
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            qualification: formData.qualification,
            mobile: mobile,
            profile_image: profileImage,
        };

        try {
            const result = await dispatch(createProfileThunk(payload)).unwrap();

            if (result.success) {
                toast.success(result.message || "Profile created successfully!");
                router.push("/instruction");
            }
        } catch (error) {
            const errorMessage = (error as { message?: string })?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full w-full px-6 py-6 overflow-scroll md:overflow-hidden font-poppins text-PrimaryBg"
        >
            {/* Header */}
            <h2 className="text-[24px] font-semibold mb-4">Add Your Details</h2>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-auto no-scrollbar space-y-6">
                {/* Profile Picture Upload */}
                <label
                    htmlFor="profileImage"
                    className="flex flex-col items-center justify-center w-36 h-36 mx-auto border-2 border-dashed border-gray-300 rounded-lg cursor-pointer overflow-hidden"
                >
                    {profileImage ? (
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src={URL.createObjectURL(profileImage)}
                                alt="Profile Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <>
                            <div className="relative w-8 h-8">
                                <Image src="/auth/cameraPlus.png" alt="Add Profile" fill className="object-contain" />
                            </div>
                            <p className="mt-2 text-[10px] text-gray-400 text-center">Add Your Profile picture</p>
                        </>
                    )}
                    <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>

                {/* Input Fields */}
                <div className="space-y-6">
                    <PrimaryInput
                        id="name"
                        label="Name"
                        placeholder="Enter your Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <PrimaryInput
                        id="email"
                        label="Email"
                        placeholder="Enter your Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <PrimaryInput
                        id="qualification"
                        label="Your qualification"
                        placeholder="Enter your Qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Fixed Button at Bottom */}
            <div className="mt-6">
                <PrimaryButton type="submit" text={loading ? "Saving..." : "Get Started"} />
            </div>
        </form>
    );
}
