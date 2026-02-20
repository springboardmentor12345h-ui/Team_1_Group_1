import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("🔍 Checking for existing super admin...");

    // Check if any super admin already exists
    const existingSuperAdmin = await User.findOne({ role: "super_admin" });

    if (existingSuperAdmin) {
      console.log("✅ Super admin already exists.");
      process.exit(0); // Exit safely
    }

    console.log("🚀 No super admin found. Creating one...");

    // Create first super admin from env variables
    const superAdmin = await User.create({
      name: process.env.SUPER_ADMIN_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: "super_admin",
    });

    console.log("🎉 Super admin created successfully!");
    console.log(`👤 Email: ${superAdmin.email}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding super admin:", error.message);
    process.exit(1);
  }
};

seedSuperAdmin();
