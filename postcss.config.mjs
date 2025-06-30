const config = {
  plugins: ["@tailwindcss/postcss"],
};

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},  // ← this is important
  },
}

export default config;
