import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://social_db_user:0jpl4ly9SJRK6nuK@gama-main-site.11y5jkz.mongodb.net";

async function run() {
  console.log('Connecting to MongoDB Atlas...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully!');

    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();

    console.log('\n--- DATABASES FOUND ---');
    for (const dbInfo of dbs.databases) {
      console.log(`Database: ${dbInfo.name} (${(dbInfo.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      for (const col of collections) {
        const count = await db.collection(col.name).countDocuments();
        console.log(`  └─ Collection: ${col.name} -> ${count} documents`);
      }
    }
  } catch (err) {
    console.error('Error connecting to Atlas:', err);
  } finally {
    await client.close();
  }
}

run();
