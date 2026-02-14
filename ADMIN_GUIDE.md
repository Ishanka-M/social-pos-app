# Admin Panel Guide

## Admin Credentials

**Default Admin Account:**
- Email: `ishankamadusanka61@gmail.com`
- Password: `Isha@1996`

⚠️ **Important:** This admin account will be automatically created on first login if it doesn't exist in the database.

## Accessing the Admin Panel

1. Login with admin credentials at `/login`
2. Once logged in, click on **"Admin Console"** in the sidebar
3. Or navigate directly to `/admin`

## Admin Panel Features

### 1. User Management

**Add New Users:**
- Click on the "Users" tab
- Fill in the user details:
  - Name
  - Email
  - Password
  - Role (User or Admin)
- Click "Add User"

**View All Users:**
- All registered users are displayed in the Users list
- Shows user name, email, role, and creation date

**Delete Users:**
- Click the delete icon next to any user
- You cannot delete your own account

### 2. View User Messages

**Messages Tab:**
- All messages sent by users appear here
- New messages are highlighted
- Click "Mark as Read" to mark messages as viewed
- Messages show:
  - Sender name
  - Message content
  - Timestamp
  - Read status

### 3. Change Password

**Password Change Tab:**
- Enter your current password
- Enter new password (minimum 6 characters)
- Confirm new password
- Click "Change Password"

**Security:**
- Current password verification is required
- Passwords are hashed using bcrypt
- Password changes are immediate

### 4. Automation Configuration

**Automation Tab:**
- Configure Make.com Webhook URL
- This URL is used for posting products to social media
- Only admins can modify this setting
- Shows last updated timestamp

**How to use:**
1. Get your Make.com webhook URL
2. Paste it in the Webhook URL field
3. Click "Update Webhook URL"
4. The system will use this URL for all social media posts

## User Features

### Regular Users Can:
- Login to their account
- Create and manage products
- Post to social media (using the configured webhook)
- Send messages to admin
- View their dashboard
- Manage their profile settings

### Users CANNOT:
- Access the admin panel
- Add or delete other users
- Change automation configuration
- View other users' data

## API Endpoints

### User Management
- `GET /api/users` - List all users (Admin only)
- `POST /api/users` - Create new user (Admin only)
- `DELETE /api/users?id={userId}` - Delete user (Admin only)

### Messages
- `GET /api/messages` - Get all messages (Admin only)
- `POST /api/messages` - Send message to admin (Authenticated users)
- `PUT /api/messages?id={messageId}` - Mark as read (Admin only)

### Password Management
- `POST /api/change-password` - Change password (Authenticated users)

### System Configuration
- `GET /api/system-config` - Get configuration (Admin only)
- `POST /api/system-config` - Update configuration (Admin only)

## Security Features

1. **Role-based Access Control:**
   - Middleware protects admin routes
   - API endpoints verify user roles
   - Unauthorized access redirects to home

2. **Password Security:**
   - Passwords hashed with bcrypt
   - Current password verification required for changes
   - Minimum password length enforced

3. **Session Management:**
   - NextAuth JWT sessions
   - Automatic session expiry
   - Secure cookie handling

## Troubleshooting

### Cannot Access Admin Panel
- Verify you're logged in with admin account
- Check your role in the database
- Clear browser cache and login again

### Forgot Admin Password
1. Access MongoDB database directly
2. Update the admin user's password hash
3. Or delete the admin user entry - it will be recreated on next login with default password

### Messages Not Appearing
- Ensure users are authenticated when sending
- Check MongoDB connection
- Verify message API endpoints are working

### Webhook Not Working
- Verify Make.com webhook URL is correct
- Check network connectivity
- Review Make.com scenario configuration

## Best Practices

1. **Change Default Password Immediately**
   - Use the "Change Password" feature on first login

2. **Regular User Audits**
   - Periodically review user list
   - Remove inactive users

3. **Monitor Messages**
   - Check user messages regularly
   - Respond to user queries promptly

4. **Backup Configuration**
   - Save webhook URL externally
   - Document any custom configurations

5. **Security**
   - Don't share admin credentials
   - Use strong, unique passwords
   - Monitor login activity

## Development Notes

- Admin account auto-creation happens in `/api/auth/[...nextauth]/route.ts`
- Middleware protection in `/src/middleware.ts`
- Admin panel UI in `/src/app/admin/page.tsx`
- All API routes verify authentication and authorization
