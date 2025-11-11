# How to Create a GitHub Repository - Step by Step

Complete beginner-friendly guide to create your first GitHub repository.

---

## 📋 Prerequisites

Before you start, you need:
- [ ] A computer with internet access
- [ ] A web browser (Chrome, Firefox, Safari, Edge)
- [ ] 10 minutes of time

**Don't have a GitHub account?** See "Create GitHub Account" section at the bottom.

---

## 🚀 Step-by-Step: Create Repository

### Step 1: Go to GitHub Website

1. Open your web browser
2. Go to: **https://github.com**
3. You should see the GitHub homepage

---

### Step 2: Sign In to Your Account

1. Look at the top-right corner of the page
2. Click the **"Sign in"** button
3. Enter your credentials:
   - **Username or email**: Your GitHub username or email
   - **Password**: Your GitHub password
4. Click **"Sign in"**

**✅ You're now logged in!**

---

### Step 3: Start Creating a New Repository

There are 2 ways to do this:

#### Option A (Easier):
1. Look at the top-right corner
2. You'll see a **"+"** (plus) icon
3. Click the **"+"** icon
4. From the dropdown menu, click **"New repository"**

#### Option B (Alternative):
1. Click on your profile picture (top-right)
2. Select **"Your repositories"**
3. Click the green **"New"** button

**Either way works!** You'll now see the "Create a new repository" page.

---

### Step 4: Fill in Repository Details

Now you'll see a form with several fields. Fill them in:

#### 4.1 Repository Name (Required) ⭐
```
Enter: nasz-dentysta-website
```

**Rules for repository names:**
- ✅ Use lowercase letters
- ✅ Use hyphens (-) instead of spaces
- ✅ Can include numbers
- ❌ No spaces allowed
- ❌ No special characters (except - and _)

**Examples:**
- ✅ Good: `nasz-dentysta-website`
- ✅ Good: `dentysta-zielona-gora`
- ❌ Bad: `Nasz Dentysta Website` (has spaces)
- ❌ Bad: `dentysta/website` (has slash)

---

#### 4.2 Description (Optional but Recommended)
```
Enter: Official website for Nasz Dentysta dental clinic in Zielona Góra, Poland
```

This helps people understand what your repository is about.

---

#### 4.3 Repository Visibility ⭐ IMPORTANT

You'll see two options:

**Option 1: Public** 🌍 (RECOMMENDED)
- ✅ Anyone can see this repository
- ✅ Can use GitHub Pages for FREE hosting
- ✅ Good for websites you want to publish
- ✅ Professional and transparent
- **Choose this if**: You want to host your website for free

**Option 2: Private** 🔒
- ✅ Only you can see this repository
- ✅ Can invite specific people to collaborate
- ❌ GitHub Pages requires paid plan for private repos
- **Choose this if**: You want to keep the code private

**For your website, we recommend: PUBLIC** ✅

---

#### 4.4 Initialize Repository Section

You'll see checkboxes for:

**❌ Add a README file**
- **UNCHECK THIS** - We already have a README.md

**❌ Add .gitignore**
- **UNCHECK THIS** - We already have a .gitignore

**❌ Choose a license**
- **LEAVE THIS AS "None"** - Not needed for now

**IMPORTANT: Make sure ALL THREE are UNCHECKED/NONE**

---

### Step 5: Create the Repository

1. Double-check all your entries:
   - Repository name: `nasz-dentysta-website`
   - Description: Added ✅
   - Public: Selected ✅
   - Initialize options: All unchecked ✅

2. Scroll down to the bottom of the page

3. Click the big green button: **"Create repository"**

**🎉 Congratulations! Your repository is created!**

---

## 📝 What You'll See After Creating

After clicking "Create repository", you'll see a page with:

1. **Repository URL** at the top:
   ```
   https://github.com/YOUR-USERNAME/nasz-dentysta-website
   ```

2. **Quick setup section** with two URL options:
   - **HTTPS** (easier): `https://github.com/YOUR-USERNAME/nasz-dentysta-website.git`
   - **SSH** (advanced): `git@github.com:YOUR-USERNAME/nasz-dentysta-website.git`

3. **Commands to push existing repository** - This is what you need! ⭐

---

## 🔗 Copy Your Repository URL

You'll need this URL in the next step:

### To Copy the HTTPS URL:

1. Look for the "Quick setup" section
2. You'll see two buttons: **HTTPS** and **SSH**
3. Make sure **HTTPS** is selected (it should be blue/highlighted)
4. You'll see a URL like: `https://github.com/YOUR-USERNAME/nasz-dentysta-website.git`
5. Click the **📋 copy icon** next to the URL (or select and copy it manually)

**Save this URL!** You'll need it in the next step.

---

## 💻 Connect Your Local Repository to GitHub

Now that your GitHub repository is created, connect your local files:

### Commands to Run:

Open your terminal and run these commands **ONE BY ONE**:

```bash
# Navigate to your website folder
cd /home/ubuntu/website/uploads

# Add GitHub as the remote origin
# REPLACE "YOUR-USERNAME" with your actual GitHub username!
git remote add origin https://github.com/YOUR-USERNAME/nasz-dentysta-website.git

# Rename branch to main (GitHub's standard)
git branch -M main

# Push your files to GitHub
git push -u origin main
```

---

## 🔐 Authentication When Pushing

When you run `git push`, you'll be asked for credentials:

### You'll see:
```
Username for 'https://github.com':
```

**Enter**: Your GitHub username (exactly as it appears on GitHub)

### Then you'll see:
```
Password for 'https://YOUR-USERNAME@github.com':
```

**⚠️ IMPORTANT**: Do NOT enter your GitHub password!

**Instead, use a Personal Access Token (PAT)**

---

## 🔑 Create a Personal Access Token (If Needed)

If you don't have a token yet:

### Step 1: Go to Token Settings
1. While logged into GitHub, go to: https://github.com/settings/tokens
2. Or: Click your profile picture → Settings → Developer settings → Personal access tokens → Tokens (classic)

### Step 2: Generate New Token
1. Click **"Generate new token"** button
2. Select **"Generate new token (classic)"**

### Step 3: Configure Token
1. **Note**: Enter `Nasz Dentysta Website Upload`
2. **Expiration**: Select `90 days` (or your preference)
3. **Select scopes**: Check **✅ repo** (this gives full repo access)
4. Scroll down and click **"Generate token"**

### Step 4: Save Your Token ⚠️
1. You'll see your token: `ghp_xxxxxxxxxxxxxxxxxxxx`
2. **COPY IT IMMEDIATELY** 📋
3. **SAVE IT SOMEWHERE SAFE** - You won't see it again!
4. This is what you'll use as your "password" when pushing

### Step 5: Use Token When Pushing
```bash
Username: your-github-username
Password: ghp_xxxxxxxxxxxxxxxxxxxx  (paste your token here)
```

---

## ✅ Verify Upload Success

After pushing, you should see output like:
```
Enumerating objects: 20, done.
Counting objects: 100% (20/20), done.
Delta compression using up to 4 threads
Compressing objects: 100% (18/18), done.
Writing objects: 100% (20/20), 150.00 KiB | 5.00 MiB/s, done.
Total 20 (delta 1), reused 0 (delta 0)
To https://github.com/YOUR-USERNAME/nasz-dentysta-website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

**✅ Success!** Your files are now on GitHub!

---

## 🌐 View Your Repository Online

1. Go to: `https://github.com/YOUR-USERNAME/nasz-dentysta-website`
2. You should see:
   - ✅ All your files listed
   - ✅ README.md displayed at the bottom
   - ✅ 16 files
   - ✅ docs/ folder

**🎉 Your website is now on GitHub!**

---

## 🆘 Troubleshooting

### Problem 1: "Repository name already exists"

**Solution**:
- Someone already used that name on your account
- Try a different name: `dentysta-website` or `naszdentysta-site`

---

### Problem 2: "Authentication failed"

**Solution**:
- Make sure you're using a Personal Access Token, not your password
- Create a new token if you lost yours
- Check your username is correct (case-sensitive)

---

### Problem 3: "remote origin already exists"

**Solution**:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/nasz-dentysta-website.git
```

---

### Problem 4: Can't see the "New repository" button

**Solution**:
- Make sure you're signed in
- Look for the "+" icon in the top-right corner
- Try going directly to: https://github.com/new

---

### Problem 5: "Permission denied"

**Solution**:
- Check your token has "repo" scope enabled
- Generate a new token with correct permissions
- Make sure you're using HTTPS URL, not SSH (unless you set up SSH keys)

---

## 📱 Create GitHub Account (If You Don't Have One)

### Step 1: Sign Up
1. Go to: https://github.com
2. Click **"Sign up"** (top-right corner)

### Step 2: Enter Details
1. **Email**: Your email address
2. **Password**: Create a strong password (min 15 chars or 8 chars with number and lowercase)
3. **Username**: Choose a username (this will be in your repository URL)
4. **Email preferences**: Choose yes/no for updates
5. Click **"Continue"**

### Step 3: Verify
1. Solve the puzzle/captcha
2. Click **"Create account"**

### Step 4: Verify Email
1. Check your email inbox
2. Find the email from GitHub
3. Click the verification link
4. Your account is ready! ✅

### Step 5: Choose Plan
1. Select **"Free"** plan (it's enough for your website)
2. Click **"Continue for free"**

**Now you can create your repository!** Go back to the top of this guide.

---

## 📊 Summary Checklist

Complete this checklist as you go:

- [ ] Have GitHub account (or created one)
- [ ] Signed in to GitHub
- [ ] Clicked "+" → "New repository"
- [ ] Entered repository name: `nasz-dentysta-website`
- [ ] Entered description
- [ ] Selected "Public"
- [ ] Left all checkboxes UNCHECKED
- [ ] Clicked "Create repository"
- [ ] Copied repository URL
- [ ] Ran `git remote add origin` command
- [ ] Created Personal Access Token
- [ ] Ran `git push -u origin main`
- [ ] Verified files are on GitHub
- [ ] Can see repository online

---

## 🎯 Quick Command Reference

After creating the repository on GitHub:

```bash
# Navigate to folder
cd /home/ubuntu/website/uploads

# Add remote (REPLACE YOUR-USERNAME!)
git remote add origin https://github.com/YOUR-USERNAME/nasz-dentysta-website.git

# Rename branch
git branch -M main

# Push to GitHub
git push -u origin main

# Enter credentials when prompted:
# Username: your-github-username
# Password: your-personal-access-token
```

---

## 🔗 Important Links

- **GitHub**: https://github.com
- **Sign Up**: https://github.com/signup
- **Sign In**: https://github.com/login
- **New Repository**: https://github.com/new
- **Personal Access Tokens**: https://github.com/settings/tokens
- **GitHub Help**: https://docs.github.com

---

## 💡 Tips

1. **Choose a meaningful repository name** - it will be in your URL
2. **Add a description** - helps people understand your project
3. **Use Public visibility** - enables free GitHub Pages hosting
4. **Save your Personal Access Token** - you can't see it again after creation
5. **Don't initialize with README** - since we already have one

---

## ✨ What's Next?

After uploading to GitHub:

1. ✅ Enable GitHub Pages (free website hosting)
2. 📊 Add Google Analytics Measurement ID
3. 🌐 Connect your custom domain
4. 📈 Monitor your website analytics
5. 🔄 Make updates by pushing new commits

---

**Created**: November 11, 2025
**For**: Nasz Dentysta Website
**Difficulty**: Beginner-friendly
**Time Required**: 10-15 minutes

Need more help? Read the other documentation files in the `docs/` folder!

🤖 Created with Claude Code
