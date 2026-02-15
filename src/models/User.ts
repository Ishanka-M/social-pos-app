import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISocialAccounts {
    facebook?: {
        connected: boolean;
        pageId?: string;
        pageName?: string;
        accessToken?: string;
        connectedAt?: Date;
    };
    instagram?: {
        connected: boolean;
        accountId?: string;
        username?: string;
        accessToken?: string;
        connectedAt?: Date;
    };
    tiktok?: {
        connected: boolean;
        accountId?: string;
        username?: string;
        accessToken?: string;
        connectedAt?: Date;
    };
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    webhookUrl?: string; // User's personal Make.com or Zapier webhook
    socialAccounts?: ISocialAccounts;
    createdAt: Date;
}

const SocialAccountsSchema = new Schema({
    facebook: {
        connected: { type: Boolean, default: false },
        pageId: { type: String },
        pageName: { type: String },
        accessToken: { type: String },
        connectedAt: { type: Date }
    },
    instagram: {
        connected: { type: Boolean, default: false },
        accountId: { type: String },
        username: { type: String },
        accessToken: { type: String },
        connectedAt: { type: Date }
    },
    tiktok: {
        connected: { type: Boolean, default: false },
        accountId: { type: String },
        username: { type: String },
        accessToken: { type: String },
        connectedAt: { type: Date }
    }
}, { _id: false });

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    webhookUrl: { type: String }, // User-specific webhook URL
    socialAccounts: { type: SocialAccountsSchema, default: () => ({}) },
    createdAt: { type: Date, default: Date.now }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
