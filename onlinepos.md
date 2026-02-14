# Role: Senior Full-Stack SaaS Architect

# Project Goal: 
Build a Multi-tenant Social Media Management & POS Dashboard for merchants. The platform allows users to upload products, save them to a database, and trigger a Make.com Webhook to post the content automatically to Facebook, Instagram, and TikTok.

# Tech Stack:
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Shadcn/UI
- Database: MongoDB (via Mongoose)
- Image Hosting: Cloudinary (to generate direct image URLs)
- Automation: Make.com Webhooks

# Key Components to Build:

1. **Database Schema**:
   - `Merchant`: Store business name, email, and Make.com Webhook URL.
   - `Product`: Store title, price, description, imageURL, and timestamp.

2. **Image Upload Logic**:
   - Integrate Cloudinary Upload Widget or API to handle image uploads and return a direct HTTPS URL.

3. **Product Dashboard UI**:
   - A modern sidebar navigation.
   - A "New Post" page with:
     - Input fields for Title, Price, and Description.
     - An Image upload area.
     - Toggle switches for "Post to Facebook", "Post to Instagram", and "Post to TikTok".
     - A "Submit & Post" button.

4. **API Integration (The Core)**:
   - Create a Next.js API Route (`/api/publish`) that:
     a) Saves the product to MongoDB.
     b) Sends a POST request to the Make.com Webhook with the following JSON structure:
        {
          "merchantId": "ID",
          "title": "Product Name",
          "price": "5000",
          "description": "Details",
          "imageUrl": "Cloudinary_URL",
          "platforms": { "fb": true, "ig": true, "tt": true }
        }

# UI/UX Requirements:
- Use a clean, professional "Dark Mode" aesthetic.
- Include a "Social Media Preview" card that updates in real-time as the user types.
- Success/Error notifications using 'sonner' or 'toast' library.

# Output Instructions:
- Provide the folder structure first.
- Provide the code for the Product Upload Form.
- Provide the API route logic to connect with MongoDB and Make.com.
