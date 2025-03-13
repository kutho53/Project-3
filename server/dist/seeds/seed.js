import db from '../config/connection.js';
import { User } from '../models/index.js';
import UserSeeds from './profileSeeds.json' with { type: "json" };
import cleanDB from './cleanDB.js';
try {
    await db();
    await cleanDB();
    await User.insertMany(UserSeeds);
    console.log('Seeding completed successfully!');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
//# sourceMappingURL=seed.js.map