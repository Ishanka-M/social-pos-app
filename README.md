# SocialPOS Dashboard

A modern POS and Social Media Management dashboard built with Next.js 14, Tailwind CSS, Shadcn/UI, MongoDB, and Cloudinary.

## Features
- **Product Management**: Create and list products.
- **Social Integration**: Publish products directly to Facebook, Instagram, and TikTok via Make.com webhooks.
- **Image Upload**: Server-side upload to Cloudinary.
- **Dark Mode**: Sleek, professional UI.
- **Dashboard**: Real-time stats and activity.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Copy `.env.example` to `.env.local` and fill in your details:
    ```bash
    cp .env.example .env.local
    ```
    - `MONGODB_URI`: Your MongoDB connection string.
    - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
    - `CLOUDINARY_API_KEY`: Key.
    - `CLOUDINARY_API_SECRET`: Secret.
    - `MAKE_WEBHOOK_URL`: Your Make.com webhook URL.

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open** [http://localhost:3000](http://localhost:3000).

## Architecture
- `src/app/api/publish`: API route handling uploads and webhooks.
- `src/components/ProductForm.tsx`: Main form with live social preview.
- `src/lib/db.ts`: Database connection.
- `src/models`: Mongoose schemas.
