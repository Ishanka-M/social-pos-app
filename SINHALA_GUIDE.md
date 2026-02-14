# Admin Panel භාවිතා කිරීමේ මාර්ගෝපදේශකය (Sinhala Guide)

## මූලික පරිපාලක තොරතුරු (Admin Credentials)

**පරිපාලක ගිණුම:**
- Email: `ishankamadusanka61@gmail.com`
- Password: `Isha@1996`

⚠️ **වැදගත්:** මෙම පරිපාලක ගිණුම database එකේ නැත්නම් ඔබ පළමු වරට login වන විට automatically create වේ.

## Admin Panel එකට පිවිසීම

1. `/login` page එකට යන්න
2. ඔබගේ admin email සහ password භාවිතා කරලා login වන්න
3. Sidebar එකේ **"Admin Console"** click කරන්න
4. හෝ directly `/admin` page එකට යන්න

## Admin Panel Features

### 1. Users Manage කිරීම

**නව Users එකතු කිරීම:**
- "Users" tab එක click කරන්න
- User විස්තර fill කරන්න:
  - නම (Name)
  - Email
  - Password
  - Role (User හෝ Admin)
- "Add User" click කරන්න

**සියලුම Users බලන්න:**
- Users list එකේ සියලුම registered users පෙන්වයි
- User name, email, role සහ creation date පෙන්වයි

**Users Delete කිරීම:**
- කැමති user කෙනෙකුගේ delete icon එක click කරන්න
- ඔබේම account එක delete කරන්න බැහැ

### 2. User Messages බලන්න

**Messages Tab:**
- Users ලා එවපු සියලුම messages මෙතන පෙන්වයි
- නව messages highlight වෙලා තියෙනවා
- "Mark as Read" click කරලා read කරපු බව mark කරන්න පුළුවන්
- Messages වල:
  - එවූ person ගේ නම
  - Message content
  - Time
  - Read status

### 3. Password වෙනස් කිරීම

**Password Change Tab:**
- දැන් තියන password එක enter කරන්න
- අලුත් password එක enter කරන්න (අවම අකුරු 6 ක්)
- අලුත් password එක තවත් වරක් confirm කරන්න
- "Change Password" click කරන්න

**ආරක්ෂාව:**
- දැන් තියන password එක verify කරනවා
- Passwords bcrypt භාවිතා කරලා hash කරනවා
- Password changes එකම immediately වෙනවා

### 4. Automation Configuration

**Automation Tab:**
- Make.com Webhook URL configure කරන්න
- මේක social media වලට products post කරන්න use කරනවා
- Admin අයට විතරයි මේක modify කරන්න පුළුවන්
- Last updated time එක පෙන්වයි

**භාවිතය:**
1. ඔබගේ Make.com webhook URL එක ගන්න
2. Webhook URL field එකේ paste කරන්න
3. "Update Webhook URL" click කරන්න
4. System එක මේ URL එක සියලුම social media posts වලට use කරයි

## සාමාන්‍ය Users වලට හැකියාවන්

### Users කරන්න පුළුවන්:
- ඔවුන්ගේ account එකට login වෙන්න
- Products හදන්න සහ manage කරන්න
- Social media වලට post කරන්න
- Admin ට messages යවන්න
- Dashboard එක බලන්න
- Profile settings manage කරන්න

### Users කරන්න බැහැ:
- Admin panel එකට access කරන්න
- අනිත් users add හෝ delete කරන්න
- Automation configuration වෙනස් කරන්න
- අනිත් users ගේ data බලන්න

## ආරම්භ කරන්නේ කොහොමද

### Admin වශයෙන් Login වෙන්න
1. `/login` page එකට යන්න
2. Email: `ishankamadusanka61@gmail.com`
3. Password: `Isha@1996`
4. Admin account එක නැත්නම් automatic create වෙයි

### Admin Panel Access කරන්න
1. Sidebar එකේ "Admin Console" click කරන්න
2. හෝ browser එකේ `/admin` type කරන්න

### Admin Password වෙනස් කරන්න
1. Admin Panel → "Change Password" tab එකට යන්න
2. දැන් තියන password: `Isha@1996` enter කරන්න
3. අලුත් password එකක් enter කරන්න (අවම අකුරු 6)
4. Confirm කරන්න
5. "Change Password" click කරන්න

### Users Add කරන්න
1. Admin Panel → "Users" tab එකට යන්න
2. User විස්තර fill කරන්න
3. Role select කරන්න (Admin හෝ User)
4. "Add User" click කරන්න

### Messages බලන්න
1. Admin Panel → "Messages" tab එකට යන්න
2. සියලුම user messages බලන්න
3. Unread messages වලට "Mark as Read" click කරන්න

### Automation Configure කරන්න
1. Admin Panel → "Automation" tab එකට යන්න
2. Make.com webhook URL එක paste කරන්න
3. "Update Webhook URL" click කරන්න

## වැදගත් සටහන්

- පළමු වරට login වන විට admin account automatic create වෙයි
- සියලුම pages authentication middleware එකෙන් protect කරලා තියෙනවා
- Admin panel එක admin role එකට විතරයි access කරන්න පුළුවන්
- MongoDB connection එක configure කරන්න ඕනේ
- Environment variables (.env file) configure කරන්න අමතක කරන්න එපා

## Problems තියෙනවා නම්

### Admin Panel එකට Access කරන්න බැහැ
- Admin account එකෙන් login වෙලා තියෙනවාද බලන්න
- Database එකේ role එක check කරන්න
- Browser cache එක clear කරලා ආයේ login වෙන්න

### Admin Password අමතකයි නම්
1. MongoDB database එකට directly access කරන්න
2. Admin user ගේ password hash එක update කරන්න
3. හෝ admin user entry එක delete කරන්න - ඊළඟ login එකේදී default password එකත් එක්ක create වෙයි

### Messages පෙන්වන්නේ නැහැ නම්
- Users authenticated වෙලා messages එවනවාද කියලා බලන්න
- MongoDB connection එක check කරන්න
- Message API endpoints work කරනවාද බලන්න

## සියලු Features Success ✅

ඔබ ඉල්ලූ සියලු features implement කරලා complete කරලා තියෙනවා:
- ✅ User Login System
- ✅ Admin Password වෙනස් කරන්න පුළුවන්
- ✅ Admin Panel
- ✅ Users Add, View, Delete කරන්න පුළුවන්
- ✅ User Messages Admin Panel එකේ පෙන්වයි
- ✅ Automation Configuration Admin Panel එකෙන් විතරක් add කරන්න පුළුවන්

## Server Run කරන්නේ කොහොමද

Terminal එකේ:
```bash
npm run dev
```

Server run වෙනකොට මේ link එකට යන්න: http://localhost:3000

පළමු වරට admin login password එක වෙනස් කරගන්න අමතක කරන්න එපා!
