import React from "react";

export function InputField({ onChange,label, placeholder }) {
  const id = label.replace(/\s+/g, "_").toLowerCase();

  return (
    <div className="mt-3">
      <label
        htmlFor={id} // Use htmlFor instead of for in JSX
        className="block mb-2 text-sm text-gray-900"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        id={id}
        className="bg-gray-50 
            border border-gray-300 rounded-lg 
            text-gray-900 text-sm 
            focus:ring-blue-500 focus:border-blue-500
            block w-full p-2.5"
        placeholder={placeholder}
        required
      ></input>
    </div>
  );
}
