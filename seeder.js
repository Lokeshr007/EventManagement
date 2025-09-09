import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import Event from "./src/models/Event.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/event_management";

const users = [
  { name: "Admin User", email: "admin@example.com", password: "123456", role: "admin" },
  { name: "Organizer One", email: "organizer@example.com", password: "123456", role: "organizer" },
  { name: "Normal User", email: "user@example.com", password: "123456", role: "user" },
];

const events = [
  { title: "Tech Conference", description: "A big event for engineers", date: new Date("2025-09-20"), location: "Chennai", capacity: 200 },
  { title: "Music Festival", description: "Enjoy music with top artists", date: new Date("2025-10-05"), location: "Bangalore", capacity: 500 },
  { title: "Art Exhibition", description: "Showcase your creativity", date: new Date("2025-10-15"), location: "Mumbai", capacity: 150 },
  { title: "Startup Meetup", description: "Network with entrepreneurs", date: new Date("2025-10-22"), location: "Hyderabad", capacity: 100 },
  { title: "AI & ML Workshop", description: "Hands-on AI and ML learning", date: new Date("2025-11-05"), location: "Pune", capacity: 80 },
  { title: "Cooking Masterclass", description: "Learn new recipes and techniques", date: new Date("2025-11-12"), location: "Delhi", capacity: 60 },
  { title: "Photography Tour", description: "Capture the beauty of nature", date: new Date("2025-11-20"), location: "Coorg", capacity: 40 },
  { title: "Fitness Bootcamp", description: "Get in shape with professionals", date: new Date("2025-12-01"), location: "Bangalore", capacity: 120 },
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await User.deleteMany();
    await Event.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log("👤 Users seeded");

    // Assign organizer to events
    const organizer = createdUsers.find((u) => u.role === "organizer");
    const eventsWithOrganizer = events.map((e) => ({
      ...e,
      organizer: organizer._id,  // <-- must match schema
    }));

    await Event.insertMany(eventsWithOrganizer);
    console.log("🎉 8 Events seeded successfully!");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
    process.exit(1);
  }
};

importData();
