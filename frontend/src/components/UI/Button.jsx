const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
}) => {
  const baseStyles =
    "w-full py-2 rounded font-medium transition";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;