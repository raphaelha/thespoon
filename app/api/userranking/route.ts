import { NextResponse } from "next/server";
import { getUserGlobalRestaurantRankingForCurrentUser } from "@/utils/userUtils";

export async function GET() {
  const ranking = await getUserGlobalRestaurantRankingForCurrentUser();
  return NextResponse.json(ranking);
}