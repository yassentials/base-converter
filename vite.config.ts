import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { type ConfigEnv, defineConfig } from "vite";

export default defineConfig((env: ConfigEnv) => ({
  plugins: [vue(), tailwindcss()],
  base: env.mode === "github" ? "/base-converter" : "/",
}));
