import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
    senderId: string; // User ID
    senderName: string;
    content: string;
    isRead: boolean;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema({
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
