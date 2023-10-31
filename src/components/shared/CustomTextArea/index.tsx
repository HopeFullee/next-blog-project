"use client";

interface Props extends React.ComponentProps<"textarea"> {
  regexWarning: string;
  height: string;
}

const CustomTextArea = ({ regexWarning, height, ...rest }: Props) => {
  return (
    <div className={`relative w-full ${height}`}>
      <textarea
        {...rest}
        className="w-full text-[#15202B] p-5 outline-none resize-none h-full"
      />
      {regexWarning && (
        <p className="absolute bottom-[-25px] left-5 text-red-500 text-13">
          {regexWarning}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
