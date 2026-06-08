import { model, Schema } from 'mongoose';

const historyDataSchema = new Schema(
  {
    userId: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
    ip: {
      type: String,
      required: true,
    },
    range: {
      type: [Number],
      default: [],
    },
    ll: {
      type: [Number],
      default: [],
    },
    country: {
      type: String,
      default: 'Unknown',
    },
    city: {
      type: String,
      default: 'Unknown',
    },
    area: {
      type: String,
      default: 'Unknown',
    },
    deviceType: {
      type: String,
      default: 'Unknown',
    },
    os: {
      type: String,
      default: 'Unknown',
    },
    browser: {
      type: String,
      default: 'Unknown',
    },
  },
  { timestamps: true, versionKey: false },
);

export const HistoryDataCollection = model('histoty', historyDataSchema);

