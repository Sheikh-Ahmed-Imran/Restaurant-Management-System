import React from "react";


export const FloatingActionButton = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed w-12 h-12 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] flex items-center justify-center cursor-pointer bg-orange-500 rounded-[50%] border-none right-8 bottom-8 hover:bg-orange-600 transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.75322 1.19392C5.0626 1.47205 5.0876 1.94392 4.80947 2.2533L2.55947 4.7533C2.42197 4.90642 2.22822 4.99705 2.02197 5.00017C1.81572 5.0033 1.61885 4.92517 1.47197 4.78142L0.218848 3.53142C-0.0717774 3.23767 -0.0717774 2.76267 0.218848 2.46892C0.509473 2.17517 0.987598 2.17517 1.27822 2.46892L1.96885 3.15955L3.69072 1.24705C3.96885 0.937674 4.44072 0.912674 4.7501 1.1908L4.75322 1.19392ZM4.75322 6.19392C5.0626 6.47205 5.0876 6.94392 4.80947 7.2533L2.55947 9.7533C2.42197 9.90642 2.22822 9.99705 2.02197 10.0002C1.81572 10.0033 1.61885 9.92517 1.47197 9.78142L0.218848 8.53142C-0.0749023 8.23767 -0.0749023 7.76267 0.218848 7.47205C0.512598 7.18142 0.987598 7.1783 1.27822 7.47205L1.96885 8.16267L3.69072 6.25017C3.96885 5.9408 4.44072 5.9158 4.7501 6.19392H4.75322ZM7.0001 3.00017C7.0001 2.44705 7.44697 2.00017 8.0001 2.00017H15.0001C15.5532 2.00017 16.0001 2.44705 16.0001 3.00017C16.0001 3.5533 15.5532 4.00017 15.0001 4.00017H8.0001C7.44697 4.00017 7.0001 3.5533 7.0001 3.00017ZM7.0001 8.00017C7.0001 7.44705 7.44697 7.00017 8.0001 7.00017H15.0001C15.5532 7.00017 16.0001 7.44705 16.0001 8.00017C16.0001 8.5533 15.5532 9.00017 15.0001 9.00017H8.0001C7.44697 9.00017 7.0001 8.5533 7.0001 8.00017ZM5.0001 13.0002C5.0001 12.447 5.44697 12.0002 6.0001 12.0002H15.0001C15.5532 12.0002 16.0001 12.447 16.0001 13.0002C16.0001 13.5533 15.5532 14.0002 15.0001 14.0002H6.0001C5.44697 14.0002 5.0001 13.5533 5.0001 13.0002ZM1.5001 11.5002C1.89792 11.5002 2.27945 11.6582 2.56076 11.9395C2.84206 12.2208 3.0001 12.6023 3.0001 13.0002C3.0001 13.398 2.84206 13.7795 2.56076 14.0608C2.27945 14.3421 1.89792 14.5002 1.5001 14.5002C1.10227 14.5002 0.720742 14.3421 0.439437 14.0608C0.158133 13.7795 9.76473e-05 13.398 9.76473e-05 13.0002C9.76473e-05 12.6023 0.158133 12.2208 0.439437 11.9395C0.720742 11.6582 1.10227 11.5002 1.5001 11.5002Z"
          fill="white"
        />
      </svg>
    </button>
  );
};
