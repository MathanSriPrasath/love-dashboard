# 💕 Love Dashboard - Quick Reference Card

> Keep this handy for quick access to commands and information!

---

## 🚀 Start Application

### Terminal 1 - Backend
```bash
cd "/Users/me001/Desktop/Mission 2026/backend"
mvn spring-boot:run
```
**Running on**: http://localhost:8080

### Terminal 2 - Frontend
```bash
cd "/Users/me001/Desktop/Mission 2026/frontend"
npm start
```
**Running on**: http://localhost:3000

---

## 🛑 Stop Application

Press `Ctrl+C` in each terminal window

---

## 🗄️ Database Commands

### Login to MySQL
```bash
mysql -u root -p
```

### Common Queries
```sql
-- View all couples
USE love_dashboard;
SELECT * FROM couples;

-- View all love letters
SELECT * FROM love_letters WHERE couple_id = 1;

-- View all memories
SELECT * FROM memories WHERE couple_id = 1;

-- View all important dates
SELECT * FROM important_dates WHERE couple_id = 1;
```

### Add New Love Letter
```sql
INSERT INTO love_letters (couple_id, title, content, author, letter_date) 
VALUES (1, 'Title Here', 'Content here...', 'Author Name', '2024-02-01');
```

### Add New Memory
```sql
INSERT INTO memories (couple_id, title, description, memory_date, image_url, location, tags)
VALUES (1, 'Title', 'Description', '2024-02-01', 'url', 'Location', 'tag1,tag2');
```

### Add New Important Date
```sql
INSERT INTO important_dates (couple_id, title, description, event_date, category, is_recurring)
VALUES (1, 'Event Name', 'Description', '2024-02-01', 'special', false);
```

---

## 🌐 API Endpoints

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"anniversaryDate":"2020-02-14","herDateOfBirth":"1995-05-20","hisDateOfBirth":"1993-08-15"}'
```

### Get Couple
```bash
curl http://localhost:8080/api/couple/1
```

### Get Love Letters
```bash
curl http://localhost:8080/api/love-letters/couple/1
```

### Get Memories
```bash
curl http://localhost:8080/api/memories/couple/1
```

### Get Important Dates
```bash
curl http://localhost:8080/api/important-dates/couple/1
```

---

## 🔧 Troubleshooting

### Port 8080 in use
```bash
lsof -i :8080
kill -9 <PID>
```

### Port 3000 in use
```bash
lsof -i :3000
kill -9 <PID>
```

### MySQL not running
```bash
brew services start mysql
```

### Backend errors
```bash
cd backend
mvn clean install
```

### Frontend errors
```bash
cd frontend
rm -rf node_modules
npm install
```

---

## 📁 Important File Locations

### Configuration
- Backend config: `backend/src/main/resources/application.properties`
- Frontend API: `frontend/src/services/api.js`

### Database
- Schema: `backend/database/schema.sql`
- Sample data: `backend/database/sample-data.sql`

### Main Components
- Login page: `frontend/src/pages/LoginPage.js`
- Dashboard: `frontend/src/pages/Dashboard.js`

---

## 🎨 Customization Quick Tips

### Change Colors
Edit `frontend/src/pages/Dashboard.css`:
- Line 1-2: Background colors
- Line 50: Her card color
- Line 54: His card color

### Change MySQL Password
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.password=YOUR_PASSWORD
```

### Change API URL
Edit `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 🐛 Quick Fixes

### Login not working?
1. Check dates format: YYYY-MM-DD
2. Verify backend is running
3. Check browser console (F12)

### Blank dashboard?
1. Check backend is running
2. Verify data exists in database
3. Check network tab in DevTools

### CORS errors?
1. Verify backend on port 8080
2. Verify frontend on port 3000
3. Restart both servers

---

## 📚 Documentation

| What | File |
|------|------|
| Project Overview | README.md |
| Setup Guide | SETUP_GUIDE.md |
| API Reference | API_DOCUMENTATION.md |
| Project Summary | PROJECT_SUMMARY.md |
| Backend Guide | backend/README.md |
| Frontend Guide | frontend/README.md |
| This Reference | QUICK_REFERENCE.md |

---

## 📝 Useful Links

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Backend Health**: http://localhost:8080/actuator/health (if enabled)

---

## ⌨️ Keyboard Shortcuts

### Browser DevTools
- Open DevTools: `F12` or `Cmd+Option+I` (Mac)
- Console: `Cmd+Option+J` (Mac)
- Network: `Cmd+Option+N` then select Network tab

### Terminal
- Stop process: `Ctrl+C`
- Clear terminal: `Cmd+K` (Mac) or `clear`
- New tab: `Cmd+T` (Mac)

---

## 🆘 Emergency Reset

### Complete Restart
```bash
# Stop all processes
# Press Ctrl+C in both terminals

# Restart MySQL
brew services restart mysql

# Restart Backend
cd backend
mvn clean install
mvn spring-boot:run

# Restart Frontend (in new terminal)
cd frontend
npm start
```

### Database Reset
```bash
mysql -u root -p

DROP DATABASE love_dashboard;
CREATE DATABASE love_dashboard;
EXIT;

mysql -u root -p love_dashboard < backend/database/schema.sql
mysql -u root -p love_dashboard < backend/database/sample-data.sql
```

---

## 📊 Health Checks

### Backend Health
```bash
# Test if backend is responding
curl http://localhost:8080/api/couple/1

# Expected: JSON response or error
```

### Frontend Health
```bash
# Check if frontend is running
curl http://localhost:3000

# Expected: HTML response
```

### Database Health
```bash
mysql -u root -p -e "USE love_dashboard; SELECT COUNT(*) FROM couples;"
```

---

## 💡 Pro Tips

1. **Keep both terminals open** while using the app
2. **Check backend logs** for API errors
3. **Use browser DevTools** to debug frontend issues
4. **Backup your database** before major changes
5. **Test API endpoints** with curl before frontend testing

---

## 🎯 Common Tasks

### Update Couple Photo
```sql
UPDATE couples SET couple_photo_url = 'NEW_URL' WHERE id = 1;
```

### Update Bio
```sql
UPDATE couples SET her_bio = 'New bio...' WHERE id = 1;
```

### Delete a Memory
```sql
DELETE FROM memories WHERE id = <memory_id>;
```

### View Latest Love Letters
```sql
SELECT * FROM love_letters ORDER BY letter_date DESC LIMIT 5;
```

---

## 📞 Support Checklist

Before asking for help, check:
- [ ] Backend running? (localhost:8080)
- [ ] Frontend running? (localhost:3000)
- [ ] MySQL running? (`brew services list`)
- [ ] Database exists? (`SHOW DATABASES;`)
- [ ] Data exists? (`SELECT * FROM couples;`)
- [ ] Console errors? (F12 in browser)
- [ ] Backend logs? (check terminal)

---

**Keep this file bookmarked for quick reference!**

💕 Happy dashboarding!

