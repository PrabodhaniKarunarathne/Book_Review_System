# Book Review System Setup

This guide will help you set up the back-end and front-end for the Book Review System, including all necessary dependencies and configurations.

---

## Back-End Setup

### Install Dependencies

Run the following command to install all required dependencies at once:

```bash
npm install -g firebase-tools
npm install express dotenv bcryptjs body-parser cors firebase-admin jsonwebtoken uuid xlsx nodemon --save-dev
```

### .env File Structure

Create a `.env` file in the root directory and add the following variables:

```env
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_PATH=../firebase-service-account.json
FIREBASE_DATABASE_URL=https://your-firebase-database-url.firebaseio.com
PORT=5000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1h
```

### Generate Firebase Access Service File

Generate a Firebase service account key file. Follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Navigate to **Project Settings > Service Accounts**.
4. Click **Generate New Private Key** and download the JSON file.
5. Save the file to a secure location, and update the `FIREBASE_PRIVATE_KEY_PATH` in your `.env` file to point to this file.

---

## Front-End Setup

### Core Dependencies

Install the core dependencies:

```bash
npm install react react-dom
npm install react-router-dom
npm install @reduxjs/toolkit
npm install react-redux
npm install redux-persist
npm install axios
```

### Styling & UI Dependencies

Install dependencies for styling and UI:

```bash
npm install @emotion/react @emotion/styled
npm install @mui/material
npm install @material-tailwind/react
npm install react-icons
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/line-clamp
npm install react-tailwindcss-datepicker
```

### Development Dependencies

Install development dependencies:

```bash
npm install -D vite @vitejs/plugin-react
npm install -D eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D @types/react @types/react-dom
```

---

## Notes

- Ensure you have Node.js and npm installed.
- After setting up, configure the Firebase database and authentication rules to align with the system requirements.
- Use `nodemon` for easier back-end development.

For further assistance, refer to the official documentation of the respective tools and libraries.
