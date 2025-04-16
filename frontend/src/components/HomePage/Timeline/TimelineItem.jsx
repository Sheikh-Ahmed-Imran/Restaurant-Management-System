import React from "react";
import { TimelineIcon } from "./TimelineIcon";


export const TimelineItem = ({
  title,
  description,
  icon,
  image,
  imageAlt,
  isReversed = false,
}) => {
  const TextContent = () => (
    <div
      className={`text-${isReversed ? "right" : "left"} max-w-[280px] max-sm:text-center max-sm:mx-auto max-sm:my-0`}
    >
      <div className="text-xl font-bold text-black mb-3">{title}</div>
      <div className="text-base text-gray-600">{description}</div>
    </div>
  );

  const ImageContent = () => (
    <img
      src={image}
      alt={imageAlt}
      className="w-64 h-64 shadow-[0px_4px_6px_rgba(0,0,0,0.1),0px_10px_15px_rgba(0,0,0,0.1)] rounded-lg max-md:w-[200px] max-md:h-[200px] max-sm:w-full max-sm:max-w-[300px] max-sm:h-auto"
    />
  );

  return (
    <div className="flex justify-between items-center relative mb-12 max-sm:flex-col max-sm:mb-8">
      <div className="w-6/12 flex items-center justify-end pr-4 max-sm:w-full max-sm:justify-center max-sm:mb-4 max-sm:p-0">
        {isReversed ? <TextContent /> : <ImageContent />}
      </div>
      <TimelineIcon icon={icon} />
      <div className="w-6/12 flex items-center justify-start pl-4 max-sm:w-full max-sm:justify-center max-sm:mb-4 max-sm:p-0">
        {isReversed ? <ImageContent /> : <TextContent />}
      </div>
    </div>
  );
};
