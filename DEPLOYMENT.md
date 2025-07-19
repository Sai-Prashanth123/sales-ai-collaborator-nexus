# Sales AI Collaborator Nexus - Vercel Deployment Guide

This guide will help you deploy your Sales AI Collaborator application to Vercel with both frontend and backend components.

## 🚨 **QUICK FIX FOR 404 ERRORS**

If you're getting 404 errors after deployment, the configuration has been updated to fix this issue:

1. **Push the latest changes**:
   ```bash
   git add .
   git commit -m "Fix Vercel API routing - remove 404 errors"
   git push origin main
   ```

2. **Redeploy**: Vercel will automatically redeploy, or trigger a manual redeploy in the dashboard

3. **Test**: Visit `https://your-app.vercel.app/api/test` - you should see "API Test Endpoint Working!"

**What was fixed**: Removed `/api/` prefix from Express routes since Vercel handles that routing automatically.

## 🏗️ Architecture Overview

- **Frontend**: React + Vite + TypeScript (deployed as static site)
- **Backend**: Express.js API (deployed as Vercel serverless functions)
- **Video**: LiveKit integration for real-time communication
- **Deployment**: Single Vercel project (monorepo structure)

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **LiveKit Account**: Your LiveKit credentials
4. **Environment Variables**: Prepare your production environment variables

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Ensure your code is pushed to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify your project structure**:
   ```
   sales-ai-collaborator-nexus/
   ├── src/              # Frontend React code
   ├── api/              # Backend Express server
   ├── vercel.json       # Vercel configuration ✅
   ├── package.json      # Frontend dependencies
   └── api/package.json  # Backend dependencies
   ```

### Step 2: Deploy to Vercel

1. **Log in to Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Login" and authenticate with GitHub

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your `sales-ai-collaborator-nexus` repository
   - Click "Import"

3. **Configure Project Settings**
   - **Project Name**: `sales-ai-collaborator-nexus` (or your preferred name)
   - **Framework Preset**: Select "Vite" 
   - **Root Directory**: Leave as "./" (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

### Step 3: Environment Variables

**Add these environment variables in Vercel Dashboard**:

#### Backend Environment Variables
```bash
# LiveKit Configuration (keep these secure!)
LIVEKIT_WS_URL=wss://gaap-xh71ra4n.livekit.cloud
LIVEKIT_API_KEY=APIYT4h6NUqk4TF
LIVEKIT_API_SECRET=eJUnjALM2DEyZKf90BjfPdlfoOikZyIjd6Pf1RtnTqmB

# Node Environment
NODE_ENV=production
```

#### Frontend Environment Variables (Optional)
```bash
# If you need frontend environment variables, prefix with VITE_
VITE_LIVEKIT_WS_URL=wss://gaap-xh71ra4n.livekit.cloud
```

**How to add them in Vercel**:
1. In project settings, scroll to "Environment Variables"
2. Add each variable:
   - **Name**: `LIVEKIT_WS_URL`
   - **Value**: `wss://gaap-xh71ra4n.livekit.cloud`
   - **Environment**: All (Production, Preview, Development)
3. Repeat for all variables

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (usually 2-3 minutes)
3. You'll get a deployed URL like: `https://sales-ai-collaborator-nexus.vercel.app`

## 🔧 Configuration Details

### Vercel Configuration (`vercel.json`)

The project includes a `vercel.json` file that configures:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "functions": {
    "api/server.js": {
      "memory": 1024
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### API Routes

Your Express server will be available at:
- Frontend: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api/*`

## 🧪 Testing Your Deployment

### 1. Test Frontend
- Visit your Vercel URL
- Verify the dashboard loads correctly
- Check navigation between pages

### 2. Test API Endpoints
- **Simple test**: `https://your-app.vercel.app/api/test` - Should show "API Test Endpoint Working!"
- **Health check**: `https://your-app.vercel.app/api/health`
- **API info**: `https://your-app.vercel.app/api/` - Shows available endpoints
- **LiveKit token**: `https://your-app.vercel.app/api/livekit/token` (POST request)

### 3. Test Video Conferencing
- Create a new meeting
- Start/join a meeting
- Verify video/audio functionality
- Test AI assistant features

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data like API keys
2. **LiveKit Credentials**: Keep API secrets secure in Vercel environment variables
3. **CORS**: The backend is configured to handle CORS automatically
4. **HTTPS**: Vercel provides HTTPS by default

## 📊 Monitoring & Debugging

### Vercel Dashboard
- **Functions**: Monitor API performance
- **Analytics**: Track frontend usage
- **Logs**: Debug serverless function issues

### Common Issues & Solutions

#### 1. API Routes Not Working (404 Errors)
- **Problem**: Getting 404 for `/api/*` routes like "Failed to load resource: the server responded with a status of 404"
- **Root Cause**: Vercel serverless functions expect routes without `/api/` prefix in Express app
- **Solution**: ✅ **FIXED** - Updated configuration:
  - Express routes now use `/livekit/token` instead of `/api/livekit/token`
  - Vercel routing handles the `/api/` prefix automatically
  - Added proper `api/index.js` entry point for serverless functions

#### 2. Environment Variables Not Loading
- **Problem**: LiveKit connection failing
- **Solution**: Double-check environment variables in Vercel dashboard

#### 3. Build Failures
- **Problem**: Deployment fails during build
- **Solution**: Check build logs for missing dependencies or TypeScript errors

#### 4. Video Connection Issues
- **Problem**: Can't connect to LiveKit rooms
- **Solution**: Verify LiveKit credentials and WebSocket URL

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to your GitHub repository:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update features"
   git push origin main
   ```
3. Vercel automatically builds and deploys the new version

## 📝 Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] LiveKit credentials are secure and working
- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly
- [ ] Video conferencing functionality works
- [ ] AI assistant features are operational
- [ ] Meeting creation/joining works
- [ ] Custom domain configured (optional)

## 🆘 Need Help?

1. **Vercel Documentation**: [docs.vercel.com](https://docs.vercel.com)
2. **LiveKit Documentation**: [docs.livekit.io](https://docs.livekit.io)
3. **Check Vercel Logs**: Dashboard → Functions → View Details
4. **GitHub Issues**: Report bugs in your repository

---

**Your Sales AI Collaborator is now live! 🎉**

Visit your deployed application and start enhancing your sales meetings with AI assistance. 