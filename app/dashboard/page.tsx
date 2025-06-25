"use client";
import CommunityList from "@/components/community/CommunityList";
import VoteList from "@/components/community/VoteList";
import AddRestaurantForm from "@/components/restaurant/AddRestaurantForm";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-text">Mon tableau de bord</h1>
      <CommunityList />
      <VoteList />
      <AddRestaurantForm />
    </div>
  );
}