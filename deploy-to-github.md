# Deploy Kanguru Practice App to GitHub Pages

## Quick Deployment Guide

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `kanguru-math-practice` (or any name you like)
3. Description: "Interactive math practice app for grade 3/4 students"
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Your Code

Open terminal/command prompt in the `kanguru-practice` folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Kanguru math practice app with difficulty levels"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/kanguru-math-practice.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** → **/ (root)**
   - Click **Save**

### Step 4: Wait & Access

- Wait 1-2 minutes for deployment
- Your app will be live at: `https://YOUR_USERNAME.github.io/kanguru-math-practice/`
- GitHub will show the URL in the Pages settings

---

## Verification Checklist

After deployment, test these features:

- ✅ Home page loads correctly
- ✅ Language toggle works (DE ↔ EN)
- ✅ Difficulty selection modal appears
- ✅ Questions display properly
- ✅ Answer submission works
- ✅ Review wrong answers works
- ✅ Test history saves (localStorage)
- ✅ Regenerate button appears in review mode
- ✅ All styling loads correctly

---

## Updating Your App

When you make changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

---

## Custom Domain (Optional)

Want to use your own domain like `kanguru.example.com`?

1. Add a file named `CNAME` with your domain name
2. Configure DNS at your domain provider:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
3. In GitHub Pages settings, enter your custom domain

---

## Troubleshooting

**Problem: Page shows 404**
- Solution: Wait 2-3 minutes after enabling Pages
- Check that `index.html` is in the root directory

**Problem: Styles don't load**
- Solution: All file paths are relative (already correct in your app)
- No changes needed!

**Problem: localStorage doesn't work**
- Solution: GitHub Pages uses HTTPS, which localStorage supports
- Should work automatically

**Problem: Questions don't appear**
- Solution: Check browser console (F12) for JavaScript errors
- Verify all .js files were uploaded

---

## Why This Works

Your app is **100% client-side**:
- ✅ No server needed
- ✅ No database required
- ✅ No backend API
- ✅ All data in browser localStorage
- ✅ Perfect for static hosting (GitHub Pages)

GitHub Pages is ideal for:
- Static websites (HTML/CSS/JS)
- Single Page Applications (SPAs)
- Client-side apps like yours!

---

## Next Steps After Deployment

1. Share the link with students/teachers
2. Test on mobile devices
3. Gather feedback
4. Make improvements and push updates

Enjoy your deployed app! 🦘📊
