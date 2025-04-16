
  
  const ProgressBar = ({ label, value, progress }) => (
    <div className="py-0.5">
      <div className="flex w-full flex-col text-xs font-semibold leading-none">
        <div className="flex items-stretch gap-[11px] py-1.5">
          <div className="text-gray-600 grow">{label}</div>
          <div className="text-orange-600">{value}</div>
        </div>
      </div>
      <div className="rounded bg-orange-100 flex flex-col overflow-hidden">
        <div
          className="bg-orange-500 flex shrink-0 h-2"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
  
  export const Overview = ({count,avgTime}) => {
    return (
      <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-6 rounded-xl">
        <div className="text-lg text-black font-semibold py-1">
          Today's Overview
        </div>
        <div className="mt-4">
          <ProgressBar label="Orders Count" value="100" progress={count} />
          <div className="mt-4">
            <ProgressBar label="Avg. Prep Time" value="15 mins" progress={avgTime} />
          </div>
        </div>
      </div>
    );
  };
  