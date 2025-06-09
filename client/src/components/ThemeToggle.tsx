import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gray-700 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tron focus:ring-offset-2 focus:ring-offset-background"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 0 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.i
          className={`${
            theme === "dark" ? "fas fa-moon" : "fas fa-sun"
          } text-xs text-gray-800`}
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-tron opacity-0 transition-opacity duration-300"
        whileHover={{ opacity: 0.2 }}
      />
    </motion.button>
  );
}