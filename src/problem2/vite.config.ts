import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "istanbul",
      exclude: [
        ...configDefaults.exclude,
        "**/node_modules/**",
        "**/dist/**",
        "postcss.config.cjs",
        ".eslintrc.cjs",
      ],
    },
  },
});
