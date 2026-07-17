import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function listDbs() {
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    console.error('DATABASE_URI is not set in environment.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas...');
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected successfully.');

    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('Databases on this cluster:');
    for (const db of dbs.databases) {
      console.log(`- ${db.name} (size: ${db.sizeOnDisk} bytes)`);
      const dbInstance = client.db(db.name);
      const collections = await dbInstance.listCollections().toArray();
      console.log('  Collections:');
      for (const col of collections) {
        console.log(`    * ${col.name}`);
      }
    }
  } catch (err) {
    console.error('Error listing databases:', err);
  } finally {
    await client.close();
  }
}

listDbs();
