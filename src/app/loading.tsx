import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

const Loading = () => {
   return (
      <div className="w-full h-screen flex items-center justify-center">
         <RiseLoader color="#3BD64A" />
      </div>
   );
};

export default Loading;
