import { prisma } from "@/lib/prisma";

export async function getCommunityById(id: string) {
  return prisma.community.findUnique({
    where: { id },
    include: {
      members: { include: { user: true } },
      votes: { include: { restaurant: true } },
    },
  });
}