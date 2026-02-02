# Love Dashboard - Frontend

React frontend for the Love Dashboard application.

## Tech Stack
- **React 18**
- **React Router 6**
- **Axios**
- **CSS3**

## Project Structure
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── LoginPage.js         # Login/authentication page
│   │   ├── LoginPage.css
│   │   ├── Dashboard.js         # Main dashboard page
│   │   └── Dashboard.css
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.js                   # Main app component
│   ├── App.css
│   ├── index.js                 # Entry point
│   └── index.css
├── package.json
└── README.md
```

## Setup Instructions

### 1. Prerequisites
- Node.js 16 or higher
- npm or yarn

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Configure API Endpoint

The API endpoint is configured in `src/services/api.js`. By default, it points to:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

If your backend runs on a different port, update this value.

### 4. Run the Application

```bash
npm start
```

The frontend will start on **http://localhost:3000**

## Features

### Login Page
- Clean, modern authentication interface
- Date input validation
- Error handling with friendly messages
- Smooth animations

### Dashboard
- **Top Navigation**: Tabs for Declaration of Love, Memories, and Important Dates
- **Couple Cards**: Her details, couple photo, his details
- **Dynamic Content**: All data fetched from backend APIs
- **Responsive Design**: Works on desktop, tablet, and mobile

### Tab Views

**Declaration of Love Tab:**
- Displays all declaration of loves in a card grid
- Shows author, date, and content
- Empty state message if no letters exist

**Memories Tab:**
- Drive-like card layout
- Memory images (if available)
- Date, location, description
- Tags for categorization

**Important Dates Tab:**
- List of upcoming and past events
- Category badges
- Recurring event indicators
- Sortable by date

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000).

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

## API Integration

The frontend communicates with the backend through the following endpoints:

| Function | Endpoint | Method |
|----------|----------|--------|
| Login | `/api/auth/login` | POST |
| Get Couple | `/api/couple/{id}` | GET |
| Get Declaration of Loves | `/api/love-letters/couple/{coupleId}` | GET |
| Get Memories | `/api/memories/couple/{coupleId}` | GET |
| Get Important Dates | `/api/important-dates/couple/{coupleId}` | GET |

## Customization

### Colors
The main color scheme is defined in the CSS files:
- Primary: `#667eea` (purple-blue)
- Secondary: `#764ba2` (purple)
- Her card: `#ff6b9d` (pink)
- His card: `#4dabf7` (blue)

### Layout
- Modify `Dashboard.css` to change the layout
- Adjust grid columns in `.couple-section`, `.letters-grid`, `.memories-grid`

## Troubleshooting

**CORS errors:**
- Make sure the backend CORS configuration allows `http://localhost:3000`
- Check `backend/src/main/resources/application.properties`

**API connection failed:**
- Verify the backend is running on port 8080
- Check the API_BASE_URL in `src/services/api.js`

**Blank dashboard:**
- Ensure sample data exists in the database
- Check browser console for error messages

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

