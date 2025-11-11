# GitHub Upload Instructions - Nasz Dentysta Website

✅ **Git Repository Ready!** All files are committed and ready to upload to GitHub.

---

## 🚀 Quick Upload to GitHub

### Method 1: Create New Repository on GitHub (Recommended)

Follow these steps:

#### Step 1: Create Repository on GitHub

1. Go to https://github.com
2. Log in to your account
3. Click the **"+"** icon (top right) → **"New repository"**
4. Fill in the details:
   - **Repository name**: `nasz-dentysta-website` (or your preferred name)
   - **Description**: `Official website for Nasz Dentysta dental clinic in Zielona Góra`
   - **Visibility**:
     - ✅ **Public** (recommended - can use GitHub Pages for free)
     - ⚠️ **Private** (if you want to keep it private)
   - **Initialize**: ❌ Do NOT check "Add a README" (we already have one)
   - ❌ Do NOT add .gitignore (we already have one)
   - ❌ Do NOT choose a license
5. Click **"Create repository"**

#### Step 2: Copy the Repository URL

After creating, GitHub will show you commands. Copy your repository URL:
- **HTTPS**: `https://github.com/YOUR-USERNAME/nasz-dentysta-website.git`
- **SSH**: `git@github.com:YOUR-USERNAME/nasz-dentysta-website.git`

Use HTTPS if you're unsure.

#### Step 3: Connect and Push

Run these commands in your terminal:

```bash
cd /home/ubuntu/website/uploads

# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/nasz-dentysta-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace** `YOUR-USERNAME` with your actual GitHub username!

#### Step 4: Verify Upload

1. Go to your GitHub repository page
2. You should see all files uploaded
3. The README.md will be displayed automatically

---

## 🌐 Enable GitHub Pages (Optional - Free Hosting)

To host your website for FREE on GitHub:

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Scroll to **"Pages"** (left sidebar)
4. Under **"Source"**:
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**
6. Wait 1-2 minutes
7. Your site will be live at: `https://YOUR-USERNAME.github.io/nasz-dentysta-website/`

**Note**: Remember to update Google Analytics Measurement ID before deploying!

---

## 📋 What's Been Prepared

✅ **16 files committed** including:
- `index.html` - Main website (trilingual)
- `privacy-policy.html` - Polish privacy policy
- `privacy-policy-en.html` - English privacy policy
- `privacy-policy-ua.html` - Ukrainian privacy policy
- `sitemap.xml` - SEO sitemap
- `robots.txt` - Search engine directives
- `README.md` - Comprehensive documentation
- `.gitignore` - Git ignore rules
- `docs/` - 7 documentation files

✅ **Git configured**:
- User: Nasz Dentysta
- Email: naszdentystazgora@gmail.com
- Branch: master (can be renamed to main)

✅ **Initial commit created** with full change log

---

## 🔑 GitHub Authentication

### If Using HTTPS (Recommended for Beginners)

You'll be prompted for:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)

#### Create Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Note: `Nasz Dentysta Website Upload`
4. Expiration: Choose duration (90 days recommended)
5. Select scopes:
   - ✅ **repo** (full control of private repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

### If Using SSH (Advanced)

1. Generate SSH key: `ssh-keygen -t ed25519 -C "naszdentystazgora@gmail.com"`
2. Add to GitHub: https://github.com/settings/ssh/new
3. Use SSH URL when adding remote

---

## 📝 Repository Files Structure

```
nasz-dentysta-website/
├── index.html                    # Main website
├── privacy-policy.html           # Privacy (PL)
├── privacy-policy-en.html        # Privacy (EN)
├── privacy-policy-ua.html        # Privacy (UA)
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search robots
├── README.md                     # Documentation
├── .gitignore                    # Git ignore rules
├── naszdentysta-fixed (2).html   # Backup copy
└── docs/
    ├── FINAL_DEPLOYMENT_SUMMARY.txt
    ├── GA4_OPTIMIZATION_SUMMARY.txt
    ├── GA4_QUICK_START.txt
    ├── GOOGLE_ANALYTICS_SETUP_GUIDE.txt
    ├── POLISH_COMPLIANCE_CHECKLIST.txt
    ├── QUICK_DEPLOYMENT_GUIDE.txt
    └── TRANSLATION_VERIFICATION_REPORT.txt
```

---

## 🔄 Making Updates Later

When you need to update the website:

```bash
# Navigate to directory
cd /home/ubuntu/website/uploads

# Make your changes to files...

# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Update: describe what you changed"

# Push to GitHub
git push
```

---

## 🆘 Troubleshooting

### Problem: "fatal: remote origin already exists"

**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/nasz-dentysta-website.git
```

### Problem: Authentication failed

**Solution:** Make sure you're using a Personal Access Token, not your password.

### Problem: "src refspec main does not match any"

**Solution:**
```bash
git branch -M main
git push -u origin main
```

### Problem: "Updates were rejected"

**Solution:**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 🎯 Next Steps

After uploading to GitHub:

1. ✅ Verify all files are on GitHub
2. 📝 Update README.md with your repository link
3. 🔧 Set up GitHub Pages (optional)
4. 📊 Configure Google Analytics Measurement ID
5. 🌐 Deploy to your actual domain
6. 🧪 Test everything works
7. 📈 Monitor with Google Analytics

---

## 📞 Repository Information

**Repository Name**: nasz-dentysta-website (suggested)
**Owner**: [Your GitHub username]
**Description**: Official website for Nasz Dentysta dental clinic
**Website**: https://www.naszdentystazgora.com
**Languages**: Polish, English, Ukrainian

**Company Info**:
- **NIP**: 9291794899
- **REGON**: 081081188

---

## 🔗 Useful Links

- **GitHub Docs**: https://docs.github.com
- **GitHub Pages**: https://pages.github.com
- **Personal Access Tokens**: https://github.com/settings/tokens
- **Git Documentation**: https://git-scm.com/doc

---

## ✅ Checklist

Before pushing to GitHub:

- [x] Git repository initialized
- [x] All files added and committed
- [x] Git user configured
- [x] README.md created
- [ ] GitHub repository created
- [ ] Remote origin added
- [ ] Files pushed to GitHub
- [ ] Repository verified online
- [ ] GitHub Pages enabled (optional)

---

## 💡 Tips

1. **Keep repository public** if you want to use GitHub Pages for free
2. **Enable 2FA** on your GitHub account for security
3. **Create releases/tags** for different versions
4. **Use branches** for testing new features
5. **Write descriptive commit messages** for easy tracking

---

**Created**: November 11, 2025
**Status**: ✅ Ready to Upload
**Files**: 16 files, 6,525 lines of code
**Commit**: Initial commit created

🤖 Prepared by Claude Code
