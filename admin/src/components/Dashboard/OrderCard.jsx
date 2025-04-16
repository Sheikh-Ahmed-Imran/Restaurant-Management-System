
  
  export const OrderCard = ({
    orderNumber,
    items,
    time,
    status,
  }) => {
    const statusColors = {
      pending: "bg-yellow-50 text-yellow-600",
      cooking: "bg-orange-50 text-orange-600",
      ready: "bg-green-50 text-green-600",
    };
  
    return (
      <div className="border-orange-200 border flex w-full mb-4 flex-col items-stretch justify-center p-[17px] rounded-lg border-solid">
        <div className="flex items-stretch gap-5 flex-wrap justify-between">
          <div className="flex flex-col text-gray-500 leading-none py-0.5">
            <div>{orderNumber}</div>
            <div className="text-black text-base font-semibold self-stretch mt-1">
              {items}
            </div>
            <div>{time}</div>
          </div>
          <div
            className={`px-4 py-2 rounded-lg capitalize ${statusColors[status]}`}
          >
            {status}
          </div>
        </div>
      </div>
    );
  };
  