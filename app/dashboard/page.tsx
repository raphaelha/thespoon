import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Top10GlobalList from "@/components/restaurant/Top10GlobalList";
import MyCommunities from "@/components/community/MyCommunities";
import DashboardCard from "@/components/layout/DashboardCard";

export default async function DashboardPage() {
   

    return (
        <div className="max-w-4xl mx-auto font-sans">
            <DashboardCard>
                <Top10GlobalList />
                <MyCommunities />
            </DashboardCard>
        </div>
    );
}
