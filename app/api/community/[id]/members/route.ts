import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;

  // Récupère les membres de la communauté avec les infos utilisateur et la date d'adhésion
  const members = await prisma.userCommunity.findMany({
    where: { communityId },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          pseudo: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: { joinedAt: "asc" },
  });

  return NextResponse.json(members);
}