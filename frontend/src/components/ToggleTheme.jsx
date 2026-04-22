import { useTheme } from "../hooks/useTheme";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ToggleTheme;