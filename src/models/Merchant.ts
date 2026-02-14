import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMerchant extends Document {
    businessName: string;
    email: string;
    makeWebhookUrl: string;
}

const MerchantSchema: Schema = new Schema({
    businessName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    makeWebhookUrl: { type: String, required: true }
});

const Merchant: Model<IMerchant> = mongoose.models.Merchant || mongoose.model<IMerchant>('Merchant', MerchantSchema);

export default Merchant;
