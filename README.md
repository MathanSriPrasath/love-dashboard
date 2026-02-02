# 💕 Love Dashboard

A private, full-stack web application designed for couples to celebrate their relationship. Features a secure login system and a beautiful dashboard to view declaration of loves, memories, and important dates.

## 🎯 Overview

Love Dashboard is a clean, modern web application that provides:
- **Secure Authentication**: Login using anniversary date and birth dates
- **Declaration of Loves**: Share and read heartfelt messages
- **Memories Gallery**: Store cherished moments with photos and descriptions
- **Important Dates**: Track birthdays, anniversaries, and special events
- **Fully Responsive**: Optimized for all devices - mobile, tablet, and desktop
- **Image Cropping**: Upload and crop photos for the perfect display
- **Smooth Loading**: Skeleton components for seamless transitions

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
- **react-easy-crop** (Image cropping)
- **CSS3** with advanced animations
- **Fully Responsive Design** (320px - 2560px+)

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

### 🔐 Login & Signup Pages
- Beautiful gradient background with floating emojis
- Clean, modern glass-morphism form design
- Date validation and error handling
- New couple registration system
- Fully responsive for mobile devices

### 🏠 Dashboard
- **Top Navigation Bar**: Tab-based navigation with logout
- **Couple Section**: 
  - Her card (left) with bio and favorite quote
  - Couple photo (center) with anniversary date and upload feature
  - His card (right) with bio and favorite quote
- **Dynamic Photo Upload**: Upload and crop couple photo
- **Skeleton Loaders**: Smooth loading transitions
- **Floating Background**: Animated hearts, roses, and couple names

### 💌 Declaration of Love Tab
- Beautiful card grid layout
- Modal view for full content reading
- Add new declarations dynamically
- Delete existing declarations
- Author, date, and title display
- Smooth hover animations and transitions
- Fully scrollable modal

### 📸 Memories Tab
- Card-style layout with photos
- Image upload with **cropping feature** (WhatsApp-style)
- Location, date, and tag display
- Add new memories with photos
- Delete existing memories
- Drive-like modern appearance
- Responsive grid layout

### 📅 Important Dates Tab
- Chronological list of events
- Category badges (birthday, anniversary, etc.)
- Recurring event indicators
- Add new dates dynamically
- Delete existing dates
- Icon-based visual design

### 📱 Responsive Design
- **Mobile First**: Optimized for 320px+ screens
- **Tablet Ready**: Perfect layout for iPads
- **Desktop Enhanced**: Beautiful on large screens
- **All Features Work**: Every feature is fully responsive
- **Touch Optimized**: Large tap targets for mobile
- **Performance**: Optimized animations for mobile devices
- **Breakpoints**: 10 responsive breakpoints (320px - 2560px+)

### 🎨 UI/UX Enhancements
- **Glass Morphism**: Modern frosted glass effects
- **Advanced Gradients**: Beautiful pink and cream color scheme
- **Smooth Animations**: Cubic-bezier transitions
- **Skeleton Loading**: Shimmer effect for loading states
- **Custom Scrollbar**: Branded pink gradient scrollbar
- **Accessibility**: Focus visible, reduced motion support
- **Floating Elements**: Hearts, roses, and couple names animation

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

## 🚀 Deployment

The Love Dashboard can be easily deployed to production:

### Recommended Platforms
- **Frontend**: Netlify (Free tier available)
- **Backend + Database**: Railway (Free $5 credit/month)

### Quick Deploy
1. Push your code to GitHub
2. Deploy backend to Railway (with MySQL)
3. Deploy frontend to Netlify
4. Configure environment variables
5. Your app is live! 🎉

### Detailed Guides
- 📖 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete step-by-step deployment guide
- 🔐 [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) - All environment variables explained
- ✅ [QUICK_DEPLOY_CHECKLIST.md](QUICK_DEPLOY_CHECKLIST.md) - Quick deployment checklist

### CORS Configuration
The application is configured to support cross-origin requests:
- Backend automatically reads allowed origins from environment variables
- Supports multiple frontend domains (local + production)
- Credentials enabled for authentication

## 🔐 Security Notes

- **CORS**: Properly configured for production (environment-based)
- **HTTPS**: Automatically provided by Netlify and Railway
- **Environment Variables**: All sensitive data stored securely
- **Database**: MySQL password auto-generated by Railway
- For additional security:
  - Implement JWT/OAuth for authentication
  - Add input sanitization and validation
  - Implement rate limiting
  - Regular security audits

## 📚 Additional Documentation

### Setup & Installation
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions for development
- [INSTALLATION_INSTRUCTIONS.md](INSTALLATION_INSTRUCTIONS.md) - Step-by-step installation for Windows/Mac

### API & Development
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference
- [Backend README](backend/README.md) - Backend-specific documentation
- [Frontend README](frontend/README.md) - Frontend development guide

### Responsive Design & Testing
- [RESPONSIVE_TESTING_GUIDE.md](RESPONSIVE_TESTING_GUIDE.md) - **Complete responsive design testing guide**
- [QUICK_RESPONSIVE_TEST.md](QUICK_RESPONSIVE_TEST.md) - **Quick checklist for responsive testing**
- [RESPONSIVE_FEATURES_SUMMARY.md](RESPONSIVE_FEATURES_SUMMARY.md) - **Summary of all responsive features**

### Deployment & Production
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - **Complete deployment guide for Netlify + Railway**
- [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) - **All environment variables explained**
- [QUICK_DEPLOY_CHECKLIST.md](QUICK_DEPLOY_CHECKLIST.md) - **Quick deployment checklist**

### Reference Guides
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick command reference
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete project summary

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own use!

## 📄 License

This project is for personal use. Feel free to modify and adapt it to your needs.

---

**Made with ❤️ for couples**

