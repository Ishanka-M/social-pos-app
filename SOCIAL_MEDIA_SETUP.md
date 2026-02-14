# Social Media Account Linking Guide

## දැනට තියන System (Make.com වලින්)

### 🔄 වැඩ කරන විදිහ:

```
POS System → Make.com Webhook → Facebook/Instagram/TikTok
```

### ⚙️ Setup කරන්නේ කොහොමද:

#### 1. Make.com Account එකක් හදාගන්න
- https://www.make.com/ එකට යන්න
- FREE account එකක් create කරන්න

#### 2. Make.com Scenario එකක් හදන්න

**Step 1: Webhook Trigger**
1. Make.com dashboard එකේ "Create New Scenario" click කරන්න
2. "Webhooks" → "Custom Webhook" select කරන්න
3. Webhook එකට නමක් දෙන්න (උදා: "POS Products")
4. Webhook URL එක copy කරන්න (මේ විදිහට තියෙයි: `https://hook.us1.make.com/xxxxx`)

**Step 2: Facebook/Instagram/TikTok Configure කරන්න**

Facebook වලට post කරන්න:
1. "Add Module" → "Facebook Pages"
2. "Create a Post" select කරන්න
3. Facebook account එක connect කරන්න
4. Page එක select කරන්න
5. Post content map කරන්න:
   - Message: `{{title}} - Rs. {{price}}\n{{description}}`
   - Photo: `{{imageUrl}}`

Instagram වලට post කරන්න:
1. "Add Module" → "Instagram Business"
2. "Create a Photo" select කරන්න
3. Instagram Business account එක connect කරන්න
4. Caption සහ Image map කරන්න

TikTok වලට post කරන්න:
1. "Add Module" → "HTTP" (TikTok direct integration නැහැ)
2. TikTok API use කරන්න ඕනේ

**Step 3: Conditional Logic එකක් add කරන්න**
- `platforms.fb === true` නම් Facebook post කරන්න
- `platforms.ig === true` නම් Instagram post කරන්න
- `platforms.tt === true` නම් TikTok post කරන්න

#### 3. POS System එකට Webhook URL එක add කරන්න

**Admin විදිහට:**
1. Admin Panel එකට login වෙන්න
2. "Automation" tab එකට යන්න
3. Make.com webhook URL එක paste කරන්න
4. Save කරන්න

**හෝ .env file එකේ:**
```env
MAKE_WEBHOOK_URL=https://hook.us1.make.com/xxxxx
```

---

## 🆕 වඩා හොඳ විසඳුම - User-Level Social Accounts

### මම දැන් හදලා දෙන්නම්:

1. **User Model එකේ social account credentials save කරන්න**
2. **Each user ට තමන්ගේම accounts link කරන්න පුළුවන්**
3. **Admin ට global webhook නැතිවත් users ට post කරන්න පුළුවන්**

### විශේෂාංග:

✅ User කෙනෙකුට තමන්ගේම Facebook Page link කරන්න පුළුවන්
✅ User කෙනෙකුට තමන්ගේම Instagram Business link කරන්න පුළුවන්
✅ සෑම user කෙනෙකුටම වෙනම webhook URLs
✅ Admin webhook එකත් තියෙනවා (fallback එකක් විදිහට)

---

## 🎯 Recommended Approach for Clients

### Option 1: Zapier (වඩාත් පහසුයි)
- Make.com වගේම වැඩ කරනවා
- Setup කරන්න ලේසියි
- Facebook, Instagram, TikTok direct integrations

### Option 2: Direct API Integration (Advanced)
- Facebook Graph API
- Instagram Graph API
- TikTok Content Posting API
- වෙනම developer accounts ඕනේ

### Option 3: Buffer/Hootsuite (Ready-made)
- Third-party services
- API access හරහා posts schedule කරන්න පුළුවන්
- Monthly cost එකක් තියෙනවා

---

## 💡 Client ට පැහැදිලි කරන විදිහ

### Sinhala:
"ඔබේ Social Media accounts link කරන්න තියෙන ක්‍රම 2ක්:

**1. Make.com එකෙන් (Recommended - FREE):**
- Make.com account එකක් හදාගන්න
- ඔබේ Facebook, Instagram, TikTok accounts connect කරන්න
- System එකෙන් දෙන Webhook URL එක Make.com එකට දෙන්න
- Products add කරනකොට automatic ඔබේ social media වලට post වෙනවා

**2. Manual Posting:**
- Products system එකේ save වෙනවා
- ඔබට manually copy කරලා social media වලට post කරන්න පුළුවන්"

### English:
"There are 2 ways to connect your Social Media accounts:

**1. Using Make.com (Recommended - FREE):**
- Create a Make.com account
- Connect your Facebook, Instagram, TikTok accounts
- Add the Webhook URL from the system to Make.com
- Products will automatically post to your social media

**2. Manual Posting:**
- Products are saved in the system
- You can manually copy and post to social media"

---

## 🚀 Quick Start for Clients

1. **Create Make.com account**: https://www.make.com/
2. **Watch tutorial**: Make.com has video guides
3. **Connect social accounts**: One-time setup
4. **Add webhook to POS**: From Admin Panel
5. **Test with a product**: Create a test product and see it post automatically

---

## ⚠️ Important Notes

- **Facebook/Instagram**: Business accounts ඕනේ (personal profiles නෙවෙයි)
- **TikTok**: Business account එකත් Create API access ඕනේ
- **Security**: Access tokens regularly refresh කරන්න ඕනේ
- **Rate Limits**: Social platforms වල posting limits තියෙනවා

---

## 📞 Support

If clients need help:
1. Make.com documentation: https://www.make.com/en/help
2. Facebook Business help: https://business.facebook.com/
3. Your support (as admin)
