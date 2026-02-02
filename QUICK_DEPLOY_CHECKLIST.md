# ✅ Quick Deployment Checklist

Use this checklist to deploy Love Dashboard to Netlify + Railway.

---

## 🚀 Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All features tested locally
- [ ] Database schema and sample data ready
- [ ] `.gitignore` includes `.env` files

---

## 🖥️ Railway Backend Setup (15 minutes)

### 1. Create Railway Project
- [ ] Sign up at https://railway.app
- [ ] Create new project
- [ ] Add MySQL database service

### 2. Deploy Backend
- [ ] Click "+ New" → "GitHub Repo"
- [ ] Select your repository
- [ ] Wait for initial deploy

### 3. Configure Environment Variables
- [ ] Set `PORT=8080`
- [ ] Set `CORS_ALLOWED_ORIGINS=https://your-app.netlify.app` (update later)
- [ ] Set `JPA_DDL_AUTO=update`
- [ ] Set `JPA_SHOW_SQL=false`
- [ ] Verify MySQL variables are auto-set

### 4. Initialize Database
- [ ] Go to MySQL service → Data tab
- [ ] Run `backend/database/schema.sql`
- [ ] Run `backend/database/sample-data.sql` (optional)

### 5. Get Backend URL
- [ ] Copy Railway backend URL
- [ ] Example: `https://love-dashboard-backend.up.railway.app`
- [ ] Save this URL for frontend configuration

---

## 🌐 Netlify Frontend Setup (10 minutes)

### 1. Create Netlify Site
- [ ] Sign up at https://netlify.com
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Connect to GitHub repository

### 2. Configure Build
- [ ] Base directory: (leave blank)
- [ ] Build command: `cd frontend && npm install && npm run build`
- [ ] Publish directory: `frontend/build`

### 3. Set Environment Variables
- [ ] Go to Site settings → Environment variables
- [ ] Add `REACT_APP_API_URL` = `https://your-backend.up.railway.app/api`
- [ ] Use your actual Railway URL!

### 4. Deploy
- [ ] Click "Deploy site"
- [ ] Wait 2-3 minutes for build
- [ ] Copy your Netlify URL

### 5. Custom Domain (Optional)
- [ ] Go to Site settings → Domain management
- [ ] Click "Change site name"
- [ ] Choose custom name (e.g., `my-love-dashboard`)

---

## 🔄 Update CORS (Important!)

### 6. Update Railway CORS
- [ ] Go back to Railway backend service
- [ ] Update `CORS_ALLOWED_ORIGINS` variable
- [ ] Use your actual Netlify URL: `https://your-app.netlify.app`
- [ ] Redeploy backend

---

## ✅ Testing Deployment

### 7. Test Live App
- [ ] Visit your Netlify URL
- [ ] Open browser DevTools (F12)
- [ ] Try login with sample credentials
- [ ] Check console for errors
- [ ] Test Declaration of Love tab
- [ ] Test Memories tab (with photo upload)
- [ ] Test Important Dates tab
- [ ] Test logout

### 8. Common Issues
- [ ] If CORS error: Check `CORS_ALLOWED_ORIGINS` in Railway
- [ ] If API error: Check `REACT_APP_API_URL` in Netlify
- [ ] If 404 on refresh: Check `netlify.toml` is in root directory
- [ ] If database error: Check MySQL is running in Railway

---

## 🎉 Deployment Complete!

### Your Live URLs:
- **Frontend**: `https://_____________.netlify.app`
- **Backend**: `https://_____________.up.railway.app`

### Share With:
- [ ] Your loved one 💕
- [ ] Friends and family
- [ ] Social media

---

## 📊 Post-Deployment

### Monitor Your App
- [ ] Check Railway metrics (CPU, memory)
- [ ] Check Netlify analytics (visits, bandwidth)
- [ ] Review logs for errors

### Backups
- [ ] Export MySQL database from Railway
- [ ] Save exported SQL file securely
- [ ] Schedule regular backups

### Security
- [ ] Verify HTTPS is enabled (both sites)
- [ ] Check CORS is not set to `*`
- [ ] Review environment variables

---

## 🔄 Future Updates

When you push code to GitHub:
- ✅ Netlify auto-deploys frontend
- ✅ Railway auto-deploys backend

To disable auto-deploy:
- Netlify: Site settings → Build & deploy → Stop auto publishing
- Railway: Service settings → Disable auto-deploy

---

## 💡 Quick Commands

### Redeploy Manually

**Netlify**:
1. Go to Deploys tab
2. Click "Trigger deploy"

**Railway**:
1. Go to service
2. Click "Deploy"

### View Logs

**Netlify**:
- Deploys tab → Click on deploy → View logs

**Railway**:
- Service → Deployments → Click deployment → View logs

---

## 📚 Resources

- [ ] `DEPLOYMENT_GUIDE.md` - Full deployment guide
- [ ] `ENVIRONMENT_VARIABLES.md` - All environment variables explained
- [ ] `TROUBLESHOOTING.md` - Common issues and solutions

---

**Time Estimate**: 25-30 minutes total ⏱️
**Difficulty**: Easy 🟢
**Cost**: FREE (with free tiers) 💰

**Happy Deploying! 🚀💖**

