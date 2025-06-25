"use client";
import { useEffect, useState } from "react";

export default function VoteList() {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch("/api/user/votes").then(res => res.json()).then(setVotes);
  }, []);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-text mb-4">Mes votes</h2>
      {votes.length === 0 ? (
        <p className="text-gray-500">Tu n’as pas encore voté pour un resto.</p>
      ) : (
        <ul className="space-y-3">
          {Array.isArray(votes) && votes.map((v: any) => (
            <li key={v.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <span className="font-medium text-text">{v.restaurantName}</span>
              <span className="text-accent font-bold">{v.score} / 5</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
