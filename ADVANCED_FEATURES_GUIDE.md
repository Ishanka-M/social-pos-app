# Advanced Features Guide - User Webhooks, Social Tracking & Scheduling

## 🎉 නව Features

මම දැන් තව advanced features 3ක් add කරලා දීලා තියෙනවා:

### 1. **User-Specific Webhooks** ✅
සෑම user කෙනෙකුටම තමන්ගේම Make.com හෝ Zapier webhook URL එකක් add කරන්න පුළුවන්!

### 2. **Social Account Status Tracking** ✅
Facebook, Instagram, TikTok accounts connected/disconnected කියලා track කරන්න පුළුවන්!

### 3. **Post Scheduling** ✅
Products schedule කරලා future දිනයක, වේලාවක post කරන්න පුළුවන්!

---

## 🔧 භාවිතා කරන්නේ කොහොමද

### Feature 1: තමන්ගේම Webhook URL එකක් Add කරන්න

#### User විදිහට:

1. **Settings Page එකට යන්න:**
   - Sidebar එකේ "Settings" click කරන්න
   - හෝ `/settings` visit කරන්න

2. **ඔබේ Webhook URL එක Add කරන්න:**
   ```
   Make.com හෝ Zapier webhook URL එක copy කරන්න
   ↓
   "Your Webhook URL" section එකේ paste කරන්න
   ↓
   "Save Webhook" click කරන්න
   ```

3. **Webhook Priority Order:**
   - පළමුව system එක check කරයි: User ගේ personal webhook
   - එක නැත්නම්: Admin ගේ system webhook
   - එකත් නැත්නම්: Environment variable එකේ webhook

#### Admin විදිහට:

Admin Panel → "Automation" tab → Global webhook URL කියලා add කරන්න
- මේක **fallback** එකක් විදිහට වැඩ කරයි
- User කෙනෙකුට webhook නැත්නම් මේ URL එක use වෙනවා

---

### Feature 2: Social Account Status Track කරන්න

#### Settings Page එකෙන්:

1. Settings → "Social Media Accounts" පිළිතුර
2. සෑම platform එකක්ම connect/disconnect කරන්න පුළුවන්:

**Facebook Connect කරන විදිහ:**
```
"Connect" button click කරන්න
↓
Facebook page name එක type කරන්න
↓
Connected! ✅ Green checkmark පෙන්වයි
```

**Instagram Connect කරන විදිහ:**
```
"Connect" button click කරන්න
↓
Instagram username එක (without @) type කරන්න
↓
Connected! ✅
```

**TikTok Connect කරන විදිහ:**
```
"Connect" button click කරන්න
↓
TikTok username එක type කරන්න
↓
Connected! ✅
```

#### Connection Status:
- ✅ **Connected**: Green checkmark with account name
- ❌ **Not Connected**: Gray X mark

#### Disconnect කරන්න:
- "Disconnect" button click කරන්න
- Confirm කරන්න
- Status "Not connected" වෙනවා

---

### Feature 3: Post Scheduling (Products Schedule කරන්න)

#### New Product Page එකෙන්:

1. **New Product Form Fill කරන්න:**
   - Product වල විස්තර (Title, Price, Description)
   - Image upload කරන්න
   - Platforms select කරන්න (FB, IG, TikTok)

2. **Schedule Post Toggle Enable කරන්න:**
   ```
   "Schedule Post" toggle එක on කරන්න
   ↓
   Date picker සහ Time picker පෙන්වයි
   ```

3. **දිනය සහ වේලාව Select කරන්න:**
   - **Date**: කැමති දිනයක් select කරන්න (අද හෝ ඒ පස්සේ)
   - **Time**: කැමති වේලාවක් select කරන්න

4. **"Schedule Product" Click කරන්න:**
   ```
   Button text වෙනස් වෙනවා: "Publish Product" → "Schedule Product"
   Submit කරනකොට:
   - Product database එකේ save වෙනවා
   - `scheduledFor` date/time එක save වෙනවා
   - `isScheduled = true` mark වෙනවා
   - Webhook trigger වෙන්නේ නැහැ (scheduled posts cron job එකකින් handle වෙයි)
   ```

5. **Toast Message:**
   ```
   🎉 "Product scheduled successfully!"
   Description: "Product scheduled for [date & time]"
   ```

#### Post Right Away (Schedule නැතිව):

- Schedule Post toggle එක **off** තියාගෙන submit කරන්න
- Product එකම post වෙනවා
- Webhook immediately trigger වෙනවා

---

## 📊 Database Structure

### User Model (Updated):
```typescript
{
  name: string,
  email: string,
  password: string (hashed),
  role: 'admin' | 'user',
  webhookUrl?: string, // 🆕 User's personal webhook
  socialAccounts?: {     // 🆕 Social account tracking
    facebook?: {
      connected: boolean,
      pageName?: string,
      connectedAt?: Date
    },
    instagram?: {
      connected: boolean,
      username?: string,
      connectedAt?: Date
    },
    tiktok?: {
      connected: boolean,
      username?: string,
      connectedAt?: Date
    }
  },
  createdAt: Date
}
```

### Product Model (Updated):
```typescript
{
  userId: string,           // 🆕 Which user created this
  merchantId: string,
  title: string,
  price: string,
  description: string,
  imageUrl: string,
  platforms: { fb, ig, tt },
  scheduledFor?: Date,      // 🆕 When to post
  isScheduled: boolean,     // 🆕 Is it scheduled?
  isPosted: boolean,        // 🆕 Posted to social media?
  postedAt?: Date,          // 🆕 When was it posted
  createdAt: Date
}
```

---

## 🔐 API Endpoints (New)

### User Settings:
```
GET    /api/user-settings          - Get user's settings
POST   /api/user-settings          - Update webhook URL
POST   /api/user-settings/social   - Connect/disconnect social accounts
```

### Enhanced Publish:
```
POST   /api/publish
  
  Body (FormData):
    - title, price, description, image
    - platforms (JSON string)
    - scheduledFor (optional ISO date string) 🆕
```

---

## 🎯 Use Cases

### Use Case 1: Client කෙනෙකුට Webhook දෙන්න

**Scenario:** Client එකක් Make.com එකක් හදලා තියෙනවා

```
1. Client ට system එකට login කරන්න කියන්න
2. Settings page එකට යන්න කියන්න
3. Make.com webhook URL copy කරලා paste කරන්න කියන්න
4. Save කරන්න කියන්න
Done! දැන් client ගේ posts client ගේම webhook එකට යනවා
```

### Use Case 2: Schedule කරපු Posts

**Scenario:** සතියකට products 5ක් schedule කරන්න ඕනේ

```
Monday    - 9.00 AM: Product A schedule කරන්න
Tuesday   - 2.00 PM: Product B schedule කරන්න
Wednesday - 5.00 PM: Product C schedule කරන්න
Thursday  - 10.00 AM: Product D schedule කරන්න
Friday    - 4.00 PM: Product E schedule කරන්න

සියල්ලම advance එකේ create කරන්න පුළුවන්!
```

### Use Case 3: Multi-User Setup

**Scenario:** Users 3ක් සමග system එකක්

```
User A: Make.com එකක් use කරයි → webhookUrl_A
User B: Zapier එකක් use කරයි → webhookUrl_B
User C: Webhook නැහැ → fallback to admin webhook

සෑම user කෙනෙකුගේම posts එයාගේම automation වලට යනවා!
```

---

## 💡 වැදගත් සටහන්

### Scheduling සඳහා:
- දැන් තියෙන්නේ **database structure** එක
- **Cron job** එකක් හෝ **scheduler** එකක් implement කරන්න ඕනේ scheduled posts trigger කරන්න
- මට කැමතිනම් Node.js cron හෝ external scheduler එකක් add කරන්න පුළුවන්

### Social Account Connection:
- දැන් තියෙන්නේ **manual connection** (user types account name)
- Production වලට **OAuth flow** use කරන්න හොඳයි:
  - Facebook Graph API
  - Instagram Graph API
  - TikTok Content Posting API

### Webhook Fallback Logic:
```
1. Check: User ගේ webhookUrl තියෙනවාද?
   ↓ Yes → Use එක
   ↓ No
2. Check: System admin webhook තියෙනවාද?
   ↓ Yes → Use එක
   ↓ No
3. Check: Environment variable webhook?
   ↓ Yes → Use එක
   ↓ No → No webhook trigger (product saved only)
```

---

## 🚀 Next Steps (Optional Enhancements)

### 1. Cron Scheduler add කරන්න (Scheduled Posts Trigger කරන්න)
```bash
npm install node-cron
```

Create: `/src/lib/scheduler.ts`
```typescript
import cron from 'node-cron';
import Product from '@/models/Product';

// Run every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const pendingPosts = await Product.find({
    isScheduled: true,
    isPosted: false,
    scheduledFor: { $lte: now }
  });

  for (const post of pendingPosts) {
    // Trigger webhook
    // Mark as posted
  }
});
```

### 2. OAuth Integration (Real Social Account Connection)
- Facebook Login SDK
- Instagram Graph API
- TikTok Login Kit

### 3. Scheduled Posts Dashboard
- View all scheduled posts
- Edit/Delete scheduled posts
- Calendar view

---

## 📝 Summary

දැන් ඔබේ system එකේ තියෙන්නේ:

✅ User-specific webhooks (each user can have their own)
✅ Social account connection tracking (FB, IG, TikTok)
✅ Post scheduling with date/time picker
✅ Smart webhook fallback (user → admin → env)
✅ Database structure හදලා ready
✅ Full API endpoints
✅ Beautiful UI with settings page
✅ Toast notifications
✅ Form validation

සියල්ල ready! 🎊

කැමතිනම් cron scheduler එක හෝ OAuth integration එක add කරන්න කියන්න! 😊
