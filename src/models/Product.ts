import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    userId: string; // User who created this product
    merchantId: string; // Could be ObjectId ref to Merchant, or simple string ID
    title: string;
    price: string;
    description: string;
    imageUrl: string;
    platforms: {
        fb: boolean;
        ig: boolean;
        tt: boolean;
    };
    scheduledFor?: Date; // When to post (if scheduled)
    isScheduled: boolean; // Is this a scheduled post?
    isPosted: boolean; // Has this been posted to social media?
    postedAt?: Date; // When was it actually posted
    createdAt: Date;
}

const ProductSchema: Schema = new Schema({
    userId: { type: String, required: true }, // Track which user created this
    merchantId: { type: String, required: true }, // Keeping it simple as per requirement
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    platforms: {
        fb: { type: Boolean, default: false },
        ig: { type: Boolean, default: false },
        tt: { type: Boolean, default: false }
    },
    scheduledFor: { type: Date }, // Scheduled date/time
    isScheduled: { type: Boolean, default: false },
    isPosted: { type: Boolean, default: false },
    postedAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
