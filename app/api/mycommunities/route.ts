import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clerkUser = await currentUser();
  if (!clerkUser) return NextResponse.json([], { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    include: {
      memberships: {
        include: { community: true },
      },
    },
  });

  const communities = user?.memberships.map((m) => ({
    id: m.community.id,
    name: m.community.name,
  })) ?? [];

  return NextResponse.json(communities);
}