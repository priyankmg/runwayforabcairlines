"use client";

import { badgesForExpert } from "@/services/badge-service";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";
import { BadgeMedal } from "@/components/badges/BadgeMedal";
import { getBadgeIcon } from "@/components/badges/badge-icons";

export default function BadgesPage() {
  const expert = getExpert(JORDAN_ID)!;
  const list = badgesForExpert(expert);

  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Badge case</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          Same medal frame for every achievement — unique emblem inside. Earned badges shine; locked ones stay dim.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
        {list.map((b, index) => {
          const Icon = getBadgeIcon(b.id);
          return (
            <BadgeMedal
              key={b.id}
              index={index}
              name={b.name}
              description={b.description}
              earnCondition={b.earnCondition}
              reward={b.reward}
              earned={b.earned}
              Icon={Icon}
            />
          );
        })}
      </div>
    </div>
  );
}
