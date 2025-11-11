# Upload Your Website to GitHub - EASY VERSION

**Time needed**: 10 minutes
**Difficulty**: Beginner

---

## Part 1: Create GitHub Account (Skip if you already have one)

### 1. Go to GitHub
- Open browser and go to: **https://github.com**
- Click **"Sign up"** button (top right corner)

### 2. Fill in Your Information
- **Email**: Your email address
- **Password**: Create a password
- **Username**: Choose a username (example: `jankowalski`)
- Click **"Continue"**

### 3. Verify Your Email
- Check your email inbox
- Click the verification link from GitHub
- Done! ✅

---

## Part 2: Create Repository (This is where your website will live)

### 1. Sign In to GitHub
- Go to: **https://github.com**
- Click **"Sign in"** (top right)
- Enter your username and password

### 2. Create New Repository

**Look at the top right corner of the page. You'll see a "+" sign.**

Click it, then click **"New repository"**

### 3. Fill in This Form

```
Repository name: nasz-dentysta-website
Description: My dental clinic website
```

### 4. Choose "Public"
**Click the circle next to "Public"** (this lets you host for free)

### 5. IMPORTANT: Don't Check Any Boxes
**Make sure these are NOT checked:**
- ❌ Add a README file
- ❌ Add .gitignore
- ❌ Choose a license

### 6. Click the Big Green Button
**Click: "Create repository"**

**🎉 Done! Your repository is created!**

---

## Part 3: Get Your Personal Access Token (This is your password)

### 1. Go to Token Page
**Copy and paste this link**: https://github.com/settings/tokens

### 2. Click "Generate new token"
**Then click**: "Generate new token (classic)"

### 3. Fill in:
```
Note: My Website Upload
Expiration: 90 days
```

### 4. Check the "repo" Box
**Scroll down and check the box that says**: ✅ **repo**

### 5. Scroll Down and Click "Generate token"

### 6. COPY YOUR TOKEN RIGHT NOW! 📋
You'll see something like: `ghp_abc123xyz789...`

**IMPORTANT**: Copy this and save it in a text file! You won't see it again!

---

## Part 4: Upload Your Website Files

### 1. Copy Your GitHub Username
**Go to**: https://github.com
Your username is shown in the top right corner. Copy it.

### 2. Run These Commands

**Open your terminal and copy-paste these commands ONE BY ONE:**

```bash
cd /home/ubuntu/website/uploads
```
Press Enter. Then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/nasz-dentysta-website.git
```
**⚠️ STOP! Replace `YOUR-USERNAME` with your actual GitHub username!**

Example: If your username is `jankowalski`, type:
```bash
git remote add origin https://github.com/jankowalski/nasz-dentysta-website.git
```

Press Enter. Then:

```bash
git branch -M main
```
Press Enter. Then:

```bash
git push -u origin main
```

### 3. Enter Your Credentials

**You'll be asked for:**

```
Username:
```
Type your GitHub username and press Enter.

```
Password:
```
**⚠️ DON'T type your password!**
**PASTE your token** (the `ghp_...` thing you saved earlier) and press Enter.

### 4. Wait...

You'll see text scrolling. Wait until it stops.

### 5. Done! ✅

You should see: `Branch 'main' set up to track remote branch 'main' from 'origin'.`

---

## Check If It Worked

### Go to your repository:
```
https://github.com/YOUR-USERNAME/nasz-dentysta-website
```
(Replace YOUR-USERNAME with your actual username)

**You should see all your files!** 🎉

---

## Troubleshooting

### Problem: "Authentication failed"
**Solution**: You probably entered your password instead of the token. Run the push command again and paste your token.

### Problem: "remote origin already exists"
**Run this first**:
```bash
git remote remove origin
```
Then try the git remote add command again.

### Problem: "Permission denied"
**Solution**: Your token doesn't have the right permissions. Go back to https://github.com/settings/tokens and create a new token with the "repo" box checked.

---

## 📸 Visual Guide

### Step 2.2 - What you'll see:
- Top right corner: **+** button
- Click it
- Menu appears
- Click: **"New repository"**

### Step 2.3 - The form:
- **Repository name** box: Type `nasz-dentysta-website`
- **Description** box: Type anything you want
- Two circles: **Public** and Private - Click **Public**
- Three checkboxes below - **LEAVE THEM ALL EMPTY**
- Big green button at bottom: **"Create repository"**

### Step 3.4 - The token page:
- Scroll down the page
- Find a section with checkboxes
- Look for: **repo** (it has sub-items under it)
- **Check that box**
- Keep scrolling down
- Green button: **"Generate token"**

---

## What's Next?

After your website is on GitHub, you can:

1. **Host it for FREE** with GitHub Pages (I can help with this)
2. **Update it anytime** by making changes and pushing again
3. **Share the link** with anyone

---

**Need help?** Just ask me:
- "How do I enable GitHub Pages?"
- "How do I update my website later?"
- "Something went wrong, help!"

---

**Created**: November 11, 2025
**For**: Nasz Dentysta Website
**Difficulty**: ⭐ Very Easy

🤖 Made simple with Claude Code
