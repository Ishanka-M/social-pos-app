# Deploy to Vercel (Free) - Step-by-Step Guide

මේ project එක ලේසියෙන්ම සහ නොමිලේම live දාන්න පුළුවන් හොඳම විදිහ තමයි **Vercel** පාවිච්චි කරන එක. Database එකට **MongoDB Atlas** සහ Images වලට **Cloudinary** පාවිච්චි කරමු.

පහත පියවර අනුගමනය කරන්න:

---

## 1. Database එක හදාගන්න (MongoDB Atlas - Free)

1.  [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) වෙබ් අඩවියට ගිහින් Account එකක් හදාගන්න.
2.  "Deploy a cloud database" තෝරගන්න.
3.  **M0 Sandbox (Free Tier)** තෝරලා "Create" කරන්න.
4.  **Database Access** මෙනුවට ගිහින් User කෙනෙක් හදන්න (Username & Password මතක තියාගන්න).
5.  **Network Access** මෙනුවට ගිහින් "Allow Access from Anywhere" (IP: `0.0.0.0/0`) ලබා දෙන්න.
6.  Database එක හැදුණාම "Connect" -> "Connect your application" ඔබලා Connection String එක copy කරගන්න.
    *   එකේ `<password>` තියන තැනට ඔයා දීපු password එක replace කරන්න.

---

## 2. Image Hosting හදාගන්න (Cloudinary - Free)

1.  [Cloudinary](https://cloudinary.com/users/register/free) එකේ Free account එකක් හදන්න.
2.  Dashboard එකේ තියන පහත විස්තර Copy කරගන්න:
    *   `Cloud Name`
    *   `API Key`
    *   `API Secret`
3.  "Settings" -> "Upload" ගිහින් "Add upload preset" click කරන්න.
    *   **Signing Mode**: `Unsigned` විදිහට වෙනස් කරන්න.
    *   **Folder**: `onlinepos_products` කියලා දෙන්න.
    *   Save කරන්න.

---

## 3. Automation හදාගන්න (Make.com - Free)

1.  [Make.com](https://www.make.com/en/register) එකේ account එකක් හදාගන්න.
2.  New Scenario එකක් පටන් අරන් "Webhooks" -> "Custom Webhook" තෝරගන්න.
3.  Copy address ඔබලා URL එක ගන්න.

---

## 4. Code එක GitHub එකට දාන්න

1.  GitHub එකේ අලුත් Repository එකක් හදන්න (Ex: `social-pos-app`).
2.  ඔයාගේ පරිගණකයේ Terminal එකේ පහත විධාන run කරන්න:

    ```bash
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <YOUR_GITHUB_REPO_URL>
    git push -u origin main
    ```
    *(GitHub URL එක ඔයාගේ repo එකෙන් ගන්න)*

---

## 5. Vercel එකට Deploy කරන්න

1.  [Vercel](https://vercel.com/signup) එකට ගිහින් GitHub ගිණුමෙන් log වෙන්න.
2.  "Add New..." -> "Project" තෝරගන්න.
3.  ඔයා දැන් හදපු GitHub Repository එක තෝරලා "Import" කරන්න.
4.  **Environment Variables** කියන තැන පහත ඒවා ඇතුළත් කරන්න (මේවා `.env.local` එකේ තියන ඒවා):

    | Name | Value (Example) |
    |------|-----------------|
    | `MONGODB_URI` | `mongodb+srv://user:pass@cluster...` |
    | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dhfd7sfs` |
    | `CLOUDINARY_API_KEY` | `8374837483` |
    | `CLOUDINARY_API_SECRET` | `sdfjhksdf8787` |
    | `MAKE_WEBHOOK_URL` | `https://hook.make.com/...` |

5.  "Deploy" ඔබන්න.
6.  විනාඩියකින් ඔයාගේ site එක live වෙයි! 🎉

---

## ගැටළු ආවොත්?
- **Build Fail වුනොත්:** Vercel Logs බලන්න. ගොඩක් වෙලාවට Environment Variables වැරදි වුනාම තමයි අවුල් යන්නෙ.
- **Image Upload අවුල් නම්:** Cloudinary Preset එක `Unsigned` ද කියල බලන්න.
