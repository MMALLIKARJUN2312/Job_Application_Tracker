const Input = ({
  label,
  error,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;