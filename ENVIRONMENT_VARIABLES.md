# 🔐 Environment Variables Configuration

This document explains all environment variables needed for deployment.

---

## 📱 Frontend Environment Variables (Netlify)

Create these in **Netlify Dashboard** → **Site settings** → **Environment variables**

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend.up.railway.app/api` | Backend API URL from Railway |

### Example Configuration

```bash
# Production (Netlify)
REACT_APP_API_URL=https://love-dashboard-backend.up.railway.app/api
```

### Local Development

Create a `.env.development` file in the `frontend` folder:

```bash
# frontend/.env.development
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🖥️ Backend Environment Variables (Railway)

Create these in **Railway Dashboard** → **Your Service** → **Variables** tab

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `8080` | Server port |
| `DATABASE_URL` | Auto-provided by Railway MySQL | Full JDBC URL |
| `DB_USERNAME` | Auto-provided by Railway MySQL | Database username |
| `DB_PASSWORD` | Auto-provided by Railway MySQL | Database password |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.netlify.app` | Frontend URL(s) |
| `JPA_DDL_AUTO` | `update` | Hibernate DDL mode |
| `JPA_SHOW_SQL` | `false` | Show SQL in logs (use `false` in production) |
| `UPLOAD_DIR` | `./uploads` | File upload directory |

### Example Configuration

```bash
# Production (Railway)
PORT=8080
DATABASE_URL=jdbc:mysql://containers-us-west-123.railway.app:3306/railway?useSSL=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=your-generated-password
CORS_ALLOWED_ORIGINS=https://my-love-dashboard.netlify.app
JPA_DDL_AUTO=update
JPA_SHOW_SQL=false
UPLOAD_DIR=./uploads
```

### Railway MySQL Auto-Configuration

If your MySQL and Backend are in the same Railway project, you can use Railway's variable references:

```bash
DATABASE_URL=jdbc:mysql://${{MYSQL.MYSQL_HOST}}:${{MYSQL.MYSQL_PORT}}/${{MYSQL.MYSQL_DATABASE}}?useSSL=true&serverTimezone=UTC
DB_USERNAME=${{MYSQL.MYSQL_USER}}
DB_PASSWORD=${{MYSQL.MYSQL_PASSWORD}}
```

### Local Development

Create a `.env` file in the `backend` folder (DO NOT COMMIT THIS):

```bash
# backend/.env (LOCAL ONLY - DO NOT COMMIT)
PORT=8080
DATABASE_URL=jdbc:mysql://localhost:3306/love_dashboard?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=root
CORS_ALLOWED_ORIGINS=http://localhost:3000
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true
UPLOAD_DIR=./uploads
```

---

## 🔄 Multiple Frontend URLs (CORS)

If you want to allow multiple frontend URLs (e.g., local + production):

### Railway Backend

```bash
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://my-love-dashboard.netlify.app,https://love-dashboard.netlify.app
```

**Note**: Separate multiple URLs with commas (no spaces)

---

## ⚙️ Environment-Specific Settings

### Development
```bash
JPA_SHOW_SQL=true          # See SQL queries
JPA_DDL_AUTO=update        # Auto-update schema
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Production
```bash
JPA_SHOW_SQL=false         # Don't log SQL (performance)
JPA_DDL_AUTO=validate      # Only validate schema (safer)
CORS_ALLOWED_ORIGINS=https://your-app.netlify.app
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Store all sensitive values in Railway/Netlify environment variables
- Use different passwords for development and production
- Use `validate` or `none` for `JPA_DDL_AUTO` in production (after initial setup)
- Set specific CORS origins (not `*`)
- Use HTTPS URLs in production

### ❌ DON'T:
- Commit `.env` files to Git
- Share your Railway MySQL password
- Use `*` for CORS in production
- Use `JPA_SHOW_SQL=true` in production (performance impact)
- Hardcode sensitive values in code

---

## 📝 .env File Templates

### Frontend `.env.development` Template

```bash
# Frontend Development Environment
REACT_APP_API_URL=http://localhost:8080/api
```

### Frontend `.env.production` Template (Not needed for Netlify)

```bash
# Frontend Production Environment
# Set this in Netlify dashboard instead
REACT_APP_API_URL=https://your-backend.up.railway.app/api
```

### Backend `.env` Template (Local Development Only)

```bash
# Backend Local Development Environment
# DO NOT COMMIT THIS FILE!

# Server
PORT=8080

# Database (Local MySQL)
DATABASE_URL=jdbc:mysql://localhost:3306/love_dashboard?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=root

# JPA/Hibernate
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000

# File Upload
UPLOAD_DIR=./uploads
```

---

## 🔍 How to Get Your Railway URLs

### Backend API URL
1. Go to Railway dashboard
2. Click on your backend service
3. Go to **Settings** tab
4. Find **Domains** section
5. Copy the public URL (e.g., `https://your-app.up.railway.app`)
6. Add `/api` at the end for the API URL

### MySQL Connection Details
1. Go to Railway dashboard
2. Click on your MySQL service
3. Go to **Variables** tab
4. Copy the values for:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

---

## 🧪 Testing Environment Variables

### Test Frontend

```bash
cd frontend
echo $REACT_APP_API_URL
npm start
```

Check browser console (F12) for API URL being used.

### Test Backend

```bash
cd backend
# Check if variables are loaded
mvn spring-boot:run
```

Look for logs showing:
- Database connection success
- CORS configuration
- Server started on port

---

## 📚 More Resources

- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Railway Environment Variables](https://docs.railway.app/develop/variables)
- [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)
- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

**Remember**: NEVER commit `.env` files to Git! They should be in `.gitignore`.

