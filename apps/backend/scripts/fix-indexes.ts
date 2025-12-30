
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const dropIndex = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/realtygenie";
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined');
        }

        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const collection = mongoose.connection.collection('leadmodels'); // Mongoose pluralizes 'LeadModel' to 'leadmodels' usually, or 'leads' if specified. Based on model name 'LeadModel', it's likely 'leadmodels'.

        // List indexes to find the correct one
        const indexes = await collection.indexes();
        console.log('Current indexes:', indexes);

        const emailIndex = indexes.find((idx: any) => idx.key.email === 1 && Object.keys(idx.key).length === 1);

        if (emailIndex && emailIndex.name) {
            console.log(`Found email index: ${emailIndex.name}. Dropping...`);
            await collection.dropIndex(emailIndex.name);
            console.log('Successfully dropped email index.');
        } else {
            console.log('No global email index found.');
        }

        // Verify
        const updatedIndexes = await collection.indexes();
        console.log('Updated indexes:', updatedIndexes);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

dropIndex();
