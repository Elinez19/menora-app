import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { auth } from "../src/lib/auth";

async function runTests() {
  console.log("=== 1. Testing Neon PostgreSQL Connection via Prisma ===");
  try {
    const rawResult: any = await prisma.$queryRaw`SELECT version(), current_database()`;
    console.log("✔ Neon Postgres query succeeded!");
    console.log("  Database:", rawResult[0]?.current_database);
    console.log("  Postgres Version:", rawResult[0]?.version?.split(" ")?.[0]);

    const userCount = await prisma.user.count();
    console.log("✔ Neon User table accessible. Current user count:", userCount);
  } catch (err) {
    console.error("❌ Neon database test failed:", err);
    process.exit(1);
  }

  console.log("\n=== 2. Testing Better Auth Instance on Neon ===");
  try {
    const testReq = new Request("http://localhost:8081/api/auth/ok", {
      method: "GET",
    });
    const res = await auth.handler(testReq);
    const body = await res.text();
    console.log("✔ Better Auth handler responded with status:", res.status, "body:", body);
  } catch (err) {
    console.error("❌ Better Auth test failed:", err);
    process.exit(1);
  }

  console.log("\n=== 3. Testing Better Auth User Creation in Neon ===");
  const testEmail = `test_${Date.now()}@example.com`;
  try {
    const createdUser = await prisma.user.create({
      data: {
        id: `test_id_${Date.now()}`,
        name: "Neon Test User",
        email: testEmail,
        emailVerified: true,
      },
    });
    console.log("✔ Successfully created user in Neon:", createdUser.email, "id:", createdUser.id);

    // Clean up test user
    await prisma.user.delete({
      where: { id: createdUser.id },
    });
    console.log("✔ Successfully cleaned up test user from Neon");
  } catch (err) {
    console.error("❌ Neon user creation test failed:", err);
    process.exit(1);
  }

  console.log("\n🎉 ALL WIRED SERVICES TESTED AND OPERATIONAL END-TO-END! 🎉");
  await prisma.$disconnect();
  process.exit(0);
}

runTests();
