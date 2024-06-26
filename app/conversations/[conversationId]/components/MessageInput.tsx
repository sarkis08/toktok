"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  required?: boolean;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  register,
  type,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        className="text-black font-light py-4 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
