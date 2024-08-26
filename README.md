# assessment_writo_education

Introduction :-

This project is a full-stack user registration application designed to provide a seamless and secure user authentication experience. The primary functionality of this application is to allow users to register via a signup form and receive a One-Time Password (OTP) for email verification.

Key Features:
User Registration: Users can create a new account by filling out a registration form with their details. The system validates the provided information to ensure data integrity and security.

Email Verification with OTP: Upon successful registration, users receive an OTP sent to their email address. This step is crucial to verify the authenticity of the provided email address and to prevent unauthorized access.

OTP Verification: Users must enter the received OTP to verify their email address. Once the OTP is verified, the user is redirected to a welcome page, confirming their successful registration.

User Login and Logout: After registration and verification, users can log in to their accounts. The application also supports secure logout functionality to ensure user sessions are properly terminated.

This project utilizes modern web development technologies, including a backend built with Node.js and Express, a frontend developed with React, and a MongoDB database for data storage. By implementing secure email verification and session management, this project aims to provide a robust foundation for user authentication in web applications.

Technologies Used
This project utilizes a variety of modern technologies and libraries to create a secure and user-friendly registration system:

Frontend:

React: A JavaScript library for building user interfaces, particularly for single-page applications.
Axios: A promise-based HTTP client for making requests to the server from the frontend.
Backend:

Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine, used to build the server-side application.
Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
Database:

MongoDB: A NoSQL database used for storing user data, including registration details and OTPs.
Security and Authentication:

JWT (JSON Web Token): Used for securely transmitting information between the client and server as a JSON object. It is used to manage user sessions and authentication.
Bcrypt: A library for hashing passwords. It ensures that user passwords are securely stored and protected against potential breaches.
Email Services:

Nodemailer: A module for Node.js applications that makes it easy to send emails. In this project, it is used to send OTPs to users for email verification.
Middleware:

CORS (Cross-Origin Resource Sharing): A mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. This is used to handle requests from different origins securely.
Other Tools:

Environment Variables: Used to manage sensitive data such as API keys and database credentials securely.
These technologies work together to provide a full-stack solution for user registration, authentication, and secure email verification.

Installation:-

1. Step-by-step instructions to set up the project locally.
    Clone the repository:[text](https://github.com/surya489/assessment_writo_education.git)
2. Navigate to the project directory:
    cd frontend
    cd backend
3. Install dependencies:
    npm install    --> For frontend
    node server.js --> for backend

Usage:-

To use this project, follow the steps below to set up and run the application on your local machine.

Prerequisites
Ensure you have the following software installed on your system:

Node.js (version 14 or above)
npm (Node Package Manager) or yarn
MongoDB (Ensure you have MongoDB running locally or have access to a MongoDB Atlas cluster)
Setup Instructions
Clone the repository:

First, clone the repository to your local machine using the following command:
    https://github.com/surya489/assessment_writo_education.git

Change into the project directory:
    cd repository-name

Install dependencies:

Install the required dependencies for both the frontend and backend by running the following commands:

For the backend:
    cd backend
    npm install

For the frontend:
    cd ../frontend
    npm install

Set up environment variables:

Create a .env file in the root of your backend directory (backend/.env) and add the following environment variables:
    PORT=5000
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password

    * PORT: The port number where your backend server will run.
    * MONGO_URI: The connection string for your MongoDB database.
    * JWT_SECRET: A secret key for signing JWT tokens.
    * EMAIL_USER: Your email address or username for sending emails.
    * EMAIL_PASS: Your email account password or app-specific password.

Start the backend server:

Navigate to the backend directory and start the server:
    cd backend
    nodemon server.js / npm start
This will start the backend server on the port specified in your .env file (default is 5000).

Start the frontend server:

Open a new terminal, navigate to the frontend directory, and start the React development server:
    cd frontend
    npm start   
This will start the frontend server on http://localhost:3000 by default.

Accessing the Application
Once both servers are running, open your web browser and visit http://localhost:3000 to access the application. From here, you can register a new user, verify the email using OTP, and access the welcome page.

Additional Commands
Build the frontend for production:

To build the React frontend for production, run the following command in the frontend directory:
    npm run build
This will create an optimized build of your application in the build folder.

Environment Variables:- 
    Ensure your environment variables are correctly set in the .env file in the backend directory. This file should not be included in version control (.gitignore) to protect sensitive information.

Features:-

This project is designed to provide a secure and user-friendly user registration and authentication system. The key features include:

    1. User Registration: Allows new users to register by filling out a signup form with their personal details.

    2. Data Storage: User information is securely stored in a MongoDB database, ensuring data integrity and availability.

    3. Email Notifications: Automatically sends an email to the user with a One-Time Password (OTP) for verification purposes.

    4. OTP Verification: Validates the user's email address by requiring them to enter the OTP sent to their email, enhancing security and preventing unauthorized access.

    5. User Authentication: Allows verified users to log in and access a welcome page, providing a personalized user experience.

    6. Logout Functionality: Users can securely log out, ensuring their session is properly terminated.


Known Issues:-

While this project is designed to work seamlessly, there are a few known issues that users should be aware of:

    1. CORS Issues: The application may experience Cross-Origin Resource Sharing (CORS) errors in certain environments, particularly when running the frontend and backend on different domains or ports. A workaround is to ensure that the backend server is configured to allow requests from the frontend domain.

    2. Deployment Errors: There may be issues when deploying the application to certain hosting providers due to environment-specific configurations or limitations. Ensure all environment variables are properly set and the deployment environment matches the development environment.

    3. Email Delivery Delays: Depending on the email service provider and network conditions, there might be a delay in receiving the OTP email. If the email does not arrive within a few minutes, users are advised to check their spam folder or retry registration.

    4. Limited Error Handling: The application currently has limited error handling and may not gracefully handle all types of errors or edge cases. Future improvements will focus on enhancing the robustness and user feedback.

If you encounter any other issues, please feel free to open an issue on the GitHub repository or contact me using the information provided below.

License:-

This project does not currently have a license, as it was created for an assessment and is not intended for public distribution or use.

Contact
    Keep In Touch !
    Name     : Jaya Surya
    Email    : suryajaya4899@gmail.com
    LinkedIn : https://www.linkedin.com/in/jayasurya4899/
    GitHub   : https://github.com/surya489