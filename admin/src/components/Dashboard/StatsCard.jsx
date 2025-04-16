
  
export const StatsCard = ({ label, value, icon }) => {
    return (
      <div className="shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex w-full flex-col items-stretch leading-none justify-center p-6 rounded-xl">
        <div className="flex items-stretch gap-5 justify-between flex-col sm:flex-row">
          <div className="flex flex-col items-stretch py-px">
            <div className="text-gray-500 text-sm font-normal">{label}</div>
            <div className="text-gray-800 text-2xl sm:text-3xl font-bold">{value}</div>
          </div>
          <img
            src={icon}
            className="aspect-[1] object-contain w-6 shrink-0 mt-4 sm:mt-0"
          />
        </div>
      </div>
    );
  };
  