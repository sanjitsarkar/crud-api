import mongoose from 'mongoose';
const connectMongo = async () => {
  await mongoose.connect(
    process.env.MONGO_DB_URL as string,
  );
};

export default connectMongo;