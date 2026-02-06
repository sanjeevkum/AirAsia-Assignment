import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#dc2626", // AirAsia Red-ish
                secondary: "#1e293b",
                accent: "#f59e0b",
            },
        },
    },
    plugins: [],
};
export default config;
