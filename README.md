# Uploadify-Frontend
This Next.js application provides a user-friendly interface for uploading files and generating short links using the File Upload and Short Link Generation API. It communicates with the backend API built with Spring Boot, MongoDB, and JWT authentication.

# Setup
1. Clone the repository:
   ```
   git clone <repository-url>
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Add .env
   ```
   touch .env
   ```
   Add the backend url
   ```
   BACKEND_URL=<backend-url>
   ```

# functionality
* Login and Register
* Upload file - login user can only upload the file
* Manage the files - login user can only manage the file
* Delete the file - login user can only delete the file
* Download the file - anyone can download the file
