// components/ui/Textarea.jsx
const Textarea = ({ register, name, placeholder, ...props }) => {
    return (
      <textarea
        {...register(name)}  // Register the textarea field
        placeholder={placeholder}
        className="w-full border text-base text-black px-4 py-3 rounded-lg"
        {...props}  // Spread any other props (like style, className, etc.)
      />
    );
  };
  
  export default Textarea;
  