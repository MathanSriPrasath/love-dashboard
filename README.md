# 💕 Love Dashboard

A private, full-stack web application designed for couples to celebrate their relationship. Features a secure login system and a beautiful dashboard to view declaration of loves, memories, and important dates.

## 🎯 Overview

Love Dashboard is a clean, modern web application that provides:
- **Secure Authentication**: Login using anniversary date and birth dates
- **Declaration of Loves**: Share and read heartfelt messages
- **Memories Gallery**: Store cherished moments with photos and descriptions
- **Important Dates**: Track birthdays, anniversaries, and special events

## 🛠 Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Data JPA**
- **MySQL 8.0+**
- **Maven**

### Frontend
- **React 18**
- **React Router 6**
- **Axios**
- **CSS3**

### Database
- **MySQL 8.0+**

## 📁 Project Structure

```
Mission 2026/
├── backend/                      # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/lovedashboard/
│   │       │   ├── LoveDashboardApplication.java
│   │       │   ├── config/       # Configuration
│   │       │   ├── controller/   # REST Controllers
│   │       │   ├── dto/          # Data Transfer Objects
│   │       │   ├── entity/       # JPA Entities
│   │       │   ├── repository/   # JPA Repositories
│   │       │   └── service/      # Business Logic
│   │       └── resources/
│   │           └── application.properties
│   ├── database/
│   │   ├── schema.sql           # Database schema
│   │   └── sample-data.sql      # Sample data
│   ├── pom.xml
│   └── README.md
│
├── frontend/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
└── README.md                     # This file
```

## 🚀 Quick Start Guide

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Step 1: Database Setup

```bash
# Start MySQL
mysql -u root -p

# Create database and run schema
mysql> source backend/database/schema.sql

# (Optional) Insert sample data
mysql> source backend/database/sample-data.sql
```

**Important**: Edit `backend/database/sample-data.sql` to add your real couple information before running it!

### Step 2: Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Start Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

### Step 4: Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: **http://localhost:3000**

### Step 5: Access the Application

1. Open browser to **http://localhost:3000**
2. Enter the authentication dates (from your database)
3. Enjoy your Love Dashboard!

## 🔑 Authentication

The login system validates three dates:
- **Anniversary Date**: The day you became a couple
- **Her Date of Birth**: Her birthday
- **His Date of Birth**: His birthday

All three dates must match the database records exactly.

## 📊 Database Schema

### Tables

**couples**: Stores couple information and authentication data
- `id`, `anniversary_date`, `her_name`, `her_date_of_birth`, `her_bio`, `her_favorite_quote`
- `his_name`, `his_date_of_birth`, `his_bio`, `his_favorite_quote`, `couple_photo_url`

**love_letters**: Stores declaration of loves between partners
- `id`, `couple_id`, `title`, `content`, `author`, `letter_date`

**memories**: Stores cherished memories with photos
- `id`, `couple_id`, `title`, `description`, `memory_date`, `image_url`, `location`, `tags`

**important_dates**: Tracks important events
- `id`, `couple_id`, `title`, `description`, `event_date`, `category`, `is_recurring`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate using dates

### Couple
- `GET /api/couple/{id}` - Get couple details

### Declaration of Loves
- `GET /api/love-letters/couple/{coupleId}` - Get all declaration of loves

### Memories
- `GET /api/memories/couple/{coupleId}` - Get all memories

### Important Dates
- `GET /api/important-dates/couple/{coupleId}` - Get all important dates

## 🎨 Features

### Login Page
- Beautiful gradient background
- Clean, modern form design
- Date validation
- Error handling with friendly messages

### Dashboard
- **Top Navigation Bar**: Tab-based navigation with logout
- **Couple Section**: 
  - Her card (left) with bio and favorite quote
  - Couple photo (center) with anniversary date
  - His card (right) with bio and favorite quote

### Declaration of Love Tab
- Grid layout of declaration of loves
- Shows author, date, and content
- Smooth hover animations

### Memories Tab
- Card-style layout with images
- Location and date display
- Tag support for categorization
- Drive-like appearance

### Important Dates Tab
- Chronological list of events
- Category badges (birthday, anniversary, etc.)
- Recurring event indicators

## 🔧 Customization

### Adding Data

Use MySQL to insert data directly:

```sql
-- Add a new declaration of love
INSERT INTO love_letters (couple_id, title, content, author, letter_date) 
VALUES (1, 'Title', 'Content...', 'Author Name', '2024-02-01');

-- Add a new memory
INSERT INTO memories (couple_id, title, description, memory_date, image_url, location, tags)
VALUES (1, 'Memory Title', 'Description...', '2024-01-15', 'url', 'Location', 'tag1,tag2');
```

### Styling

- **Colors**: Edit CSS files in `frontend/src/pages/`
- **Layout**: Modify grid columns in CSS files
- **Fonts**: Update `index.css`

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `SHOW DATABASES;`
- Check port 8080 is free: `lsof -i :8080`

### Frontend won't start
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check port 3000 is free
- Clear npm cache: `npm cache clean --force`

### CORS errors
- Verify backend CORS configuration in `application.properties`
- Check `CorsConfig.java` allows `http://localhost:3000`

### Login fails
- Verify dates in database match exactly (format: YYYY-MM-DD)
- Check backend logs for authentication errors
- Use browser DevTools to inspect API responses

## 📝 Development Notes

- **No hardcoded data**: All content comes from the database
- **Clean architecture**: Separation of concerns (Entity → Repository → Service → Controller)
- **Responsive design**: Works on desktop, tablet, and mobile
- **Session management**: Uses browser sessionStorage for authentication state

## 🔐 Security Notes

- This is a **private application** meant for local/personal use
- For production deployment:
  - Implement proper authentication (JWT, OAuth)
  - Use HTTPS
  - Add input sanitization
  - Implement rate limiting
  - Use environment variables for sensitive data

## 📚 Additional Documentation

- [Backend README](backend/README.md) - Detailed backend setup and API documentation
- [Frontend README](frontend/README.md) - Frontend development and customization guide

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own use!

## 📄 License

This project is for personal use. Feel free to modify and adapt it to your needs.

---

**Made with ❤️ for couples**

