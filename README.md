# Webboard App

A modern web-based discussion board where users can ask questions, browse posts, and interact through comments.  
Built with Node.js, Express, EJS, and MongoDB, with image upload, CAPTCHA, and pagination features.

##  Core Features

###  Ask a New Question
Users can submit a question with the following fields:
- `question`: Title or subject of the post
- `detail`: Full description or explanation
- `questioner`: Name or alias of the person posting
- `picture`: Optional image upload
- `captcha`: To prevent spam or bots

### Question Listing with Pagination
- Displays a paginated list of questions (using `mongoose-paginate-v2`)
- "Previous" and "Next" buttons allow navigation between pages

### Question Details & Answers
- Clicking on a question opens a detailed view
- Displays full content, image (if any), and related comments/answers

### Answer a Question
- Visitors can post replies under each question
- May include their name and response text
- CAPTCHA is used to validate before submission

## Tech Stack

- **Frontend**:
  - HTML, CSS, [Bootstrap 5.3.7](https://getbootstrap.com/)
  - [EJS](https://ejs.co/) for server-side rendering

- **Backend**:
  - [Express.js 5](https://expressjs.com/)
  - [Mongoose](https://mongoosejs.com/) for MongoDB
  - [formidable](https://www.npmjs.com/package/formidable) for file uploads
  - [sharp](https://www.npmjs.com/package/sharp) for image resizing
  - [svg-captcha](https://www.npmjs.com/package/svg-captcha) for CAPTCHA
  - [express-session](https://www.npmjs.com/package/express-session) for sessions
  - [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) for pagination
