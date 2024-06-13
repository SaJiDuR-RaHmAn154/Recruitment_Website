import React from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import "../CssFiles/Banner.css"
const NewsLetter = () => {
  return (
    <div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className=" text-primary/70 mb-4">Job aspirants can contact me for various job opportunities. Send your email address now.</p>
        <div className="w-full space-y-4">
            <input type="email" name="email" id="email" placeholder="Type your email address here" className="Glow w-full py-2 pl-4 rounded-md placeholder:text-sm" />
            <input type="submit" value={"Submit"} className=" w-full py-2  rounded-sm bg-sky text-white cursor-pointer font-semi-bold hover:bg-blue-700"/>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className=" text-primary/70 mb-4">Upload your resume here to get interview calls from various job provider companies.</p>
        <div className="w-full space-y-4">
            <input type="submit" value={"Upload your resume"} className=" w-full py-2 pl-4 rounded-sm bg-sky text-white cursor-pointer font-semi-bold hover:bg-blue-700"/>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
