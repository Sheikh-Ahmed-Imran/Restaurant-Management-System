// components/ui/Input.jsx
const Input = ({ register, name, placeholder, ...props }) => {
    return (
      <input
        {...register(name)}
        placeholder={placeholder}
        className="w-full border text-base text-black px-4 py-3 rounded-lg"
        {...props}
      />
    );
  };
  
  export default Input;
  