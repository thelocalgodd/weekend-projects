#!/bin/sh
read -p "Enter Project Name: " project_name

npm create vite@latest $project_name -- --template react
cd $project_name
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "@tailwind base;
@tailwind components;
@tailwind utilities;" > src/index.css

echo '/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}' > tailwind.config.js

echo 'function App() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-6xl">It works !</h1>
      </div>
    </>
  )
}

export default App' > src/App.jsx

rm src/App.css
npm run dev