import React from "react";

const Loader = () => {
  return (
    <div className="h-screen flex text-PrimaryBg justify-center items-center">
      <div className="flex space-x-2">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    </div>
  );
};

export default Loader;
