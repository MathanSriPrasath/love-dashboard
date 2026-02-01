
This guide will walk you through setting up the Love Dashboard application from scratch.

## ⏱ Estimated Time: 15-20 minutes

---

## Step 1: Verify Prerequisites ✅

Open Terminal and check you have everything installed:

```bash
# Check Java (should be 17 or higher)
java -version

# Check Maven
mvn -version

# Check Node.js (should be 16 or higher)
node -version

# Check npm
npm -version

# Check MySQL
mysql --version
```

**Don't have them?** Install using Homebrew (macOS):
```bash
brew install openjdk@17 maven node mysql
```

---

## Step 2: Start MySQL 🗄️

```bash
# Start MySQL service
brew services start mysql

# Login to MySQL (enter password when prompted)
mysql -u root -p
```

---

## Step 3: Create Database and Tables 📊

While in MySQL:

```sql
-- Create the database
CREATE DATABASE love_dashboard;

-- Exit MySQL
EXIT;
```

Now run the schema script:

```bash
# Navigate to the project directory
cd "/Users/me001/Desktop/Mission 2026"

# Run the schema file
mysql -u root -p love_dashboard < backend/database/schema.sql
```

---

## Step 4: Add Your Couple Data 💑

**IMPORTANT**: Edit the sample data file first!

```bash
# Open the sample data file in a text editor
nano backend/database/sample-data.sql
```

Update these values:
- Anniversary date
- Names
- Dates of birth
- Bios
- Favorite quotes
- Photo URL (optional)

Then insert the data:

```bash
mysql -u root -p love_dashboard < backend/database/sample-data.sql
```

---

## Step 5: Configure Backend ⚙️

Edit the application properties:

```bash
nano backend/src/main/resources/application.properties
```

Update this line with your MySQL password:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Save and exit (Ctrl+O, Enter, Ctrl+X for nano)

---

## Step 6: Start the Backend 🖥️

Open a new Terminal window/tab:

```bash
cd "/Users/me001/Desktop/Mission 2026/backend"

# Build and run
mvn clean install
mvn spring-boot:run
```

**Expected output:**
```
Started LoveDashboardApplication in X.XXX seconds
```

**Keep this terminal open!** The backend is now running on http://localhost:8080

---

## Step 7: Start the Frontend 🎨

Open **another** Terminal window/tab:

```bash
cd "/Users/me001/Desktop/Mission 2026/frontend"

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

Your browser should automatically open to http://localhost:3000

**Keep this terminal open too!**

---

## Step 8: Test the Application 🎉

1. **Login Page** should appear
2. Enter your authentication dates:
   - Anniversary date
   - Her date of birth  
   - His date of birth
3. Click **"Unlock Dashboard"**
4. You should see your Love Dashboard!

---

## 🎯 What You Should See

### Login Page
- Beautiful purple gradient background
- Three date input fields
- "Unlock Dashboard" button

### Dashboard
- Top navigation with tabs
- Her card (left) with bio and quote
- Couple photo (center)
- His card (right) with bio and quote
- Tab content showing:
  - Love Letters
  - Memories
  - Important Dates

---

## 🐛 Troubleshooting

### Problem: "Port 8080 already in use"

```bash
# Find what's using port 8080
lsof -i :8080

# Kill that process (replace PID with the actual number)
kill -9 PID
```

### Problem: "Port 3000 already in use"

```bash
# Find what's using port 3000
lsof -i :3000

# Kill that process
kill -9 PID
```

### Problem: "Access denied for user 'root'@'localhost'"

Your MySQL password is incorrect. Update it in:
```
backend/src/main/resources/application.properties
```

### Problem: "Database 'love_dashboard' doesn't exist"

Run the schema script again:
```bash
mysql -u root -p love_dashboard < backend/database/schema.sql
```

### Problem: "Login fails with valid credentials"

Check your dates in the database:
```bash
mysql -u root -p

USE love_dashboard;
SELECT anniversary_date, her_date_of_birth, his_date_of_birth FROM couples;
```

Make sure dates are in YYYY-MM-DD format.

### Problem: "CORS error" in browser console

1. Check backend is running on port 8080
2. Check frontend is running on port 3000
3. Restart both servers

### Problem: "White screen" after login

Open browser DevTools (F12):
- Check Console for errors
- Check Network tab for failed API calls
- Make sure backend is responding

---

## 🔄 Restarting the Application

### Stop the Application

**Frontend Terminal**: Press `Ctrl+C`  
**Backend Terminal**: Press `Ctrl+C`

### Start Again

**Backend**:
```bash
cd "/Users/me001/Desktop/Mission 2026/backend"
mvn spring-boot:run
```

**Frontend**:
```bash
cd "/Users/me001/Desktop/Mission 2026/frontend"
npm start
```

---

## 📝 Adding More Data

### Add a Love Letter

```sql
mysql -u root -p

USE love_dashboard;

INSERT INTO love_letters (couple_id, title, content, author, letter_date) 
VALUES (
    1, 
    'Happy Valentine\'s Day', 
    'You make every day special...', 
    'John', 
    '2024-02-14'
);
```

### Add a Memory

```sql
INSERT INTO memories (couple_id, title, description, memory_date, image_url, location, tags)
VALUES (
    1,
    'Beach Sunset',
    'Amazing sunset at the beach',
    '2024-01-20',
    'https://example.com/photo.jpg',
    'Malibu Beach',
    'beach,sunset,romantic'
);
```

### Add an Important Date

```sql
INSERT INTO important_dates (couple_id, title, description, event_date, category, is_recurring)
VALUES (
    1,
    'Movie Night',
    'Our monthly movie date',
    '2024-03-15',
    'special',
    false
);
```

---

## 🎨 Customizing the Look

### Change Colors

Edit `frontend/src/pages/Dashboard.css`:

- Line ~1: Background gradient colors
- Line ~50: Her card color (`.her-card`)
- Line ~54: His card color (`.his-card`)

### Change Fonts

Edit `frontend/src/index.css` to add custom fonts.

### Change Layout

Modify grid columns in CSS files for different layouts.

---

## 🔒 Security Reminder

This application is designed for **local/personal use only**.

For production deployment:
- Implement proper authentication
- Use HTTPS
- Add environment variables
- Implement security headers
- Use a production database

---

## ✅ Success Checklist

- [ ] MySQL installed and running
- [ ] Database created with schema
- [ ] Sample data inserted (with your real information)
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Can login successfully
- [ ] Dashboard displays your data
- [ ] All three tabs working (Love Letters, Memories, Important Dates)

---

## 🎊 Congratulations!

Your Love Dashboard is now up and running! Enjoy your private space to celebrate your relationship.

**Need help?** Check the main README.md or individual README files in backend/ and frontend/ directories.

---

**Made with ❤️ for couples**

