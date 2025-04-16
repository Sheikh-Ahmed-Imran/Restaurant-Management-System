// components/ui/Button.jsx
const Button = ({ children, type, variant, className, ...props }) => {
    return (
      <button
        type={type}
        className={`${variant === "outline" ? "border text-orange-500" : "bg-orange-500 hover:bg-orange-600"} ${className} py-2 px-4 rounded-lg`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  