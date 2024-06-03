import mongoose from 'mongoose';

const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database is connected');
    } catch (error) {
        console.log('Database connection error:', error.message);
    }
};

export default databaseConnection;
