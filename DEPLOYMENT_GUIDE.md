# 🚀 Deployment Guide - Netlify + Railway

This guide will help you deploy the Love Dashboard application:
- **Frontend** → Netlify
- **Backend + MySQL** → Railway

---

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Netlify Account** - Sign up at https://netlify.com (free tier available)
3. **Railway Account** - Sign up at https://railway.app (free tier available with $5 credit)

---

## 🎯 Part 1: Deploy Backend + MySQL to Railway

### Step 1: Create Railway Account and Project

1. Go to https://railway.app and sign up
2. Click **"New Project"**
3. Select **"Deploy MySQL"**
4. Railway will create a MySQL database instance

### Step 2: Add Backend Service

1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Connect your GitHub account and select your `love-dashboard` repository
4. Railway will detect it's a Java Spring Boot app

### Step 3: Configure Environment Variables for Backend

In Railway dashboard, go to your backend service → **Variables** tab:

```bash
# Required Variables:
PORT=8080

# Database Configuration (auto-provided by Railway MySQL)
# Railway will automatically set these if MySQL is in the same project:
DATABASE_URL=jdbc:mysql://${{MYSQL_HOST}}:${{MYSQL_PORT}}/${{MYSQL_DATABASE}}?useSSL=true&serverTimezone=UTC
DB_USERNAME=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}

# CORS Configuration (UPDATE WITH YOUR NETLIFY URL)
CORS_ALLOWED_ORIGINS=https://your-app-name.netlify.app

# JPA Configuration
JPA_DDL_AUTO=update
JPA_SHOW_SQL=false

# File Upload
UPLOAD_DIR=./uploads
```

### Step 4: Configure Build Settings

Railway should auto-detect, but verify:

**Root Directory**: Leave blank (monorepo detected)
**Build Command**: `cd backend && mvn clean install -DskipTests`
**Start Command**: `cd backend && java -jar target/*.jar`

### Step 5: Deploy Backend

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Copy your Railway backend URL (e.g., `https://your-app.up.railway.app`)

### Step 6: Initialize Database

1. Go to Railway MySQL service → **Data** tab
2. Connect using the provided credentials
3. Run the SQL scripts:
   - First: `backend/database/schema.sql`
   - Then: `backend/database/sample-data.sql` (optional)

---

## 🌐 Part 2: Deploy Frontend to Netlify

### Step 1: Create Netlify Account

1. Go to https://netlify.com and sign up
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your GitHub repository

### Step 2: Configure Build Settings

In Netlify build configuration:

```bash
Base directory: (leave blank)
Build command: cd frontend && npm install && npm run build
Publish directory: frontend/build
```

### Step 3: Set Environment Variables

In Netlify dashboard → **Site settings** → **Environment variables**:

Add this variable:

```bash
Key: REACT_APP_API_URL
Value: https://your-backend.up.railway.app/api
```

**IMPORTANT**: Replace `your-backend.up.railway.app` with your actual Railway backend URL!

### Step 4: Deploy Frontend

1. Click **"Deploy site"**
2. Wait for build to complete (1-3 minutes)
3. Your site will be live at `https://random-name.netlify.app`

### Step 5: Update Site Name (Optional)

1. Go to **Site settings** → **Site details**
2. Click **"Change site name"**
3. Choose a custom name like `my-love-dashboard`
4. Your URL will be `https://my-love-dashboard.netlify.app`

---

## 🔧 Part 3: Update CORS Settings

### Update Railway Backend CORS

1. Go back to Railway backend service
2. Update the `CORS_ALLOWED_ORIGINS` variable:

```bash
CORS_ALLOWED_ORIGINS=https://your-app-name.netlify.app
```

3. Redeploy the backend

---

## ✅ Part 4: Verify Deployment

### Test Your Deployed App

1. Visit your Netlify URL: `https://your-app-name.netlify.app`
2. Try to login with the credentials from sample data
3. Check browser console (F12) for any errors
4. Verify all features work:
   - ✅ Login/Signup
   - ✅ Dashboard loading
   - ✅ Declaration of Love
   - ✅ Memories
   - ✅ Important Dates
   - ✅ Photo uploads

### Troubleshooting

#### ❌ "Network Error" or "CORS Error"

**Problem**: Backend not allowing requests from frontend

**Solution**:
1. Check `CORS_ALLOWED_ORIGINS` in Railway includes your Netlify URL
2. Make sure URL doesn't have trailing slash
3. Redeploy backend after changing environment variables

#### ❌ "Failed to fetch"

**Problem**: Wrong API URL in frontend

**Solution**:
1. Check `REACT_APP_API_URL` in Netlify environment variables
2. Make sure it points to your Railway backend URL with `/api` at the end
3. Redeploy frontend after changing

#### ❌ Database Connection Error

**Problem**: Backend can't connect to MySQL

**Solution**:
1. Verify MySQL service is running in Railway
2. Check database environment variables are correct
3. Ensure both services are in the same Railway project

#### ❌ 404 on Page Refresh

**Problem**: React Router not working

**Solution**:
- This should be handled by `netlify.toml` file
- Verify `netlify.toml` is in the root directory
- Check Netlify redirects are configured

---

## 💾 Database Management on Railway

### Access MySQL Database

**Option 1: Railway Dashboard**
1. Go to MySQL service in Railway
2. Click **"Data"** tab
3. Use the built-in SQL editor

**Option 2: MySQL Workbench**
1. Get connection details from Railway:
   - Host: `MYSQL_HOST`
   - Port: `MYSQL_PORT` (usually 3306)
   - Username: `MYSQL_USER`
   - Password: `MYSQL_PASSWORD`
   - Database: `MYSQL_DATABASE`
2. Connect using MySQL Workbench

### Backup Database

```bash
# From Railway MySQL Data tab, export all tables
# Or use mysqldump if connecting remotely
```

---

## 🔄 Continuous Deployment

Both Netlify and Railway support **automatic deployments**:

### Auto-Deploy on Git Push

1. **Netlify**: Automatically deploys when you push to `main` branch
2. **Railway**: Automatically deploys when you push to `main` branch

### Manual Deploy

**Netlify**:
- Go to **Deploys** → Click **"Trigger deploy"**

**Railway**:
- Go to your service → Click **"Deploy"**

---

## 💰 Cost Estimation

### Railway (Free Tier)
- ✅ $5 free credit per month
- ✅ MySQL database included
- ✅ Enough for hobby projects
- ⚠️ Sleeps after inactivity (restart on request)

### Netlify (Free Tier)
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic SSL (HTTPS)
- ✅ Custom domain support
- ✅ No sleeping

**Total Cost**: **FREE** for small projects!

---

## 🌟 Optional: Custom Domain

### Add Custom Domain to Netlify

1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow instructions to update DNS records
4. SSL certificate will be auto-provisioned

### Add Custom Domain to Railway

1. Go to backend service → **Settings**
2. Add custom domain
3. Update DNS records as instructed

**Then update CORS**:
- Update `CORS_ALLOWED_ORIGINS` in Railway
- Update `REACT_APP_API_URL` in Netlify

---

## 🔐 Security Best Practices

### Production Checklist

- [ ] Use strong MySQL password on Railway
- [ ] Set `JPA_SHOW_SQL=false` in production
- [ ] Enable Railway's environment variable encryption
- [ ] Use HTTPS only (both Netlify and Railway provide this)
- [ ] Set proper CORS origins (don't use `*`)
- [ ] Review Railway's security settings
- [ ] Enable Netlify's security headers (already in `netlify.toml`)

### Environment Variables to NEVER commit

- ❌ Database passwords
- ❌ API keys
- ❌ JWT secrets (if you add authentication later)

All sensitive data should be in Railway/Netlify environment variables only!

---

## 📊 Monitoring

### Railway Monitoring

- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: Build and deploy history

### Netlify Monitoring

- **Analytics**: Page views, bandwidth
- **Deploy logs**: Build success/failure
- **Functions**: Serverless function metrics (if used)

---

## 🎉 Deployment Complete!

Your Love Dashboard is now live! 🚀💖

**Your URLs**:
- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-backend.up.railway.app`

Share your app with your loved one! 💕

---

## 📚 Additional Resources

- [Railway Docs](https://docs.railway.app/)
- [Netlify Docs](https://docs.netlify.com/)
- [Spring Boot on Railway](https://docs.railway.app/guides/spring-boot)
- [React on Netlify](https://docs.netlify.com/frameworks/react/)

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub!

