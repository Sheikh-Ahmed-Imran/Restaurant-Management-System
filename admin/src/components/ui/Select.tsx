import React from 'react';

interface SelectProps {
  options: { value: string, label: string }[];
  register: any;
  name: string;
}

export const Select: React.FC<SelectProps> = ({ options, register, name }) => {
  return (
    <select {...register(name)} className="w-full border text-base text-black px-4 py-3 rounded-lg">
      <option value="" disabled>Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
