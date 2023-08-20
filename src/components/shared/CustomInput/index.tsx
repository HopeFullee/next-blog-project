"use client";

interface Props extends React.ComponentProps<"input"> {
  alert: string;
}

const CustomInput = ({ alert, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <input {...rest} className="w-full p-5 outline-none" />
      <p className="absolute bottom-[-25px] left-5 text-red-500 text-13">
        {alert}
      </p>
    </div>
  );
};

export default CustomInput;
