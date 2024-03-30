<div align="center">

# 🔼 PayUp

A PayPal like web app built using the MERN stack.

![screenshot](./public/payup-dashboard.png)

**Try it here 👉** https://payup-hxd.netlify.app/

</div>

<br>

## 🧰Tech used

- 💻Frontend
  - React
  - React Router
  - TypeScript
  - Shadcn UI
  - TailwindCSS
- 🗃 Backend
  - Express.js
  - Mongoose
  - Zod

## 🛠 Setup locally

**Prerequisite:** - [pnpm](https://pnpm.io/)

1. **Clone the project**

```bash
git clone https://github.com/buneeIsSlo/payup
```

2. **Navigate to project directory**

```bash
cd payup
```

3. **Navigate to backend directory and install the dependencies**

```bash
cd backend
pnpm install
```

4. **Create a .env file with the following variables and add your credentials**

```bash
touch .env
```

```bash
MONGO_URL="YOUR_MONGO_URL_HERE"
PORT=5001
FRONTEND_URL="http://localhost:5173"
JWT_SECRET="YOUR_SUPER_SECRET_CODE_HERE"
```

5. **Start the server**

```bash
npm run server
```

6. **Seed the Database(optional)**

- _Open a new terminal and make sure you're in the backend directory_

```bash
npm run seed
```

6. **Navigate to frontend directory and install the dependencies**

```bash
cd frontend
pnpm install
```

7. **Create a .env file with the following variables and add your credentials**

```bash
touch .env
```

```bash
VITE_API_BASE_URL="YOUR_BACKEND_URL_HERE"
```

8. **Start the frontend**

```bash
npm run dev
```

## 🧠Takeaways

This was my first time using libraries like mongoose, zod, react-router, and shadcn-ui. I've learned a lot while creating this project and, honestly a little difficult for me to unpack it all in a github readme. I'd love to write a blog about all my learnings sometime soon, and once I do, I'll be sure to post a link to it on here. Additionally, I want to thank [@hkirat](https://github.com/hkirat) for his amazing 100xdevs cohort.

<br>

<div align="center">

<strong>⭐ Leave a star maybe? ⭐</strong><br>

<a href="https://github.com/buneeIsSlo/payup">Source</a>
| <a href="https://twitter.com/slo_bunee" target="_blank">Twitter </a>
| <a href="https://www.linkedin.com/in/bunee-dev/" target="_blank">LinkedIn </a>
| <a href="https://github.com/buneeIsSlo" target="_blank">Other Projects </a>

</div>
