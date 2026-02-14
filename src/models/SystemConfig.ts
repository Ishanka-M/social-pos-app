import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISystemConfig extends Document {
    makeWebhookUrl?: string;
    updatedAt: Date;
}

const SystemConfigSchema: Schema = new Schema({
    makeWebhookUrl: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

const SystemConfig: Model<ISystemConfig> = mongoose.models.SystemConfig || mongoose.model<ISystemConfig>('SystemConfig', SystemConfigSchema);

export default SystemConfig;
