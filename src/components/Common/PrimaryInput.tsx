// "use client";

// import { InputHTMLAttributes } from 'react';

// interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   placeholder: string;
// }

// export default function PrimaryInput({ label, id, value, onChange, placeholder, required }: PrimaryInputProps) {
//   const formatPhoneNumber = (input: string) => {
//     const digits = input.replace(/\D/g, ''); // remove non-numbers
//     const groups = digits.match(/.{1,3}/g); // split into groups of 3
//     return groups ? groups.join(' ') : '';
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value);
//     if (onChange) {
//       onChange({
//         ...e,
//         target: {
//           ...e.target,
//           value: formatted,
//         },
//       });
//     }
//   };

//   return (
//     <div className="relative w-full">
//       {/* Floating Label */}
//       <label
//         htmlFor={id}
//         className="absolute text-gray-500 bg-white px-1 text-[13px] left-4 -top-[10px]"
//       >
//         {label}
//       </label>

//       {/* Input wrapper */}
//       <div className="flex items-center border border-gray-300 rounded-lg w-full bg-white mt-4">
//         {/* Actual input */}
//         <input
//           id={id}
//           type="tel"
//           value={value}
//           onChange={handleChange}
//           placeholder={placeholder}
//           className="w-full h-[56px] px-4 text-PrimaryBg text-[16px] bg-transparent outline-none peer"
//           maxLength={12}
//           required={required}
//         />
//       </div>
//     </div>
//   );
// }




"use client";

import { InputHTMLAttributes } from "react";

interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
}

export default function PrimaryInput({ label, id, value, onChange, placeholder, required }: PrimaryInputProps) {
  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <label
        htmlFor={id}
        className="absolute text-gray-500 bg-white px-1 text-[13px] left-4 -top-[10px]"
      >
        {label}
      </label>

      {/* Input wrapper */}
      <div className="flex items-center border border-gray-300 rounded-lg w-full bg-white mt-4">
        {/* Actual input */}
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-[56px] px-4 text-PrimaryBg text-[16px] bg-transparent outline-none peer"
          required={required}
        />
      </div>
    </div>
  );
}
