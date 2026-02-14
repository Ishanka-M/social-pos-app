import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
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
    createdAt: Date;
}

const ProductSchema: Schema = new Schema({
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
    createdAt: { type: Date, default: Date.now }
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
