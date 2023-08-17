"use client";

type CustomInputType = {
  type: string;
  name: string;
  placeholder: string;
  alert: string;
};

const CustomInput = ({ type, alert, name, placeholder }: CustomInputType) => {
  return (
    <div className="relative">
      <input type={type} placeholder={placeholder} name={name} className="" />
      <p>{alert}</p>
    </div>
  );
};

export default CustomInput;
