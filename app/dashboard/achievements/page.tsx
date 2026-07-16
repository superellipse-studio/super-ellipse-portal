import { getAllData } from "@/lib/sheets";
import AchievementCircle from "../AchievementCircle";
import Collapsible from "../Collapsible";
import { cardClass, cardLabel } from "../cardStyles";

const SLOTS = [1, 2, 3, 4, 5];

export default async function AchievementsPage() {
  const { projects, achievements, team } = await getAllData();
  const teamNames = team.map((m) => m.name);

  const groups: { title: string; subtitle: string; category: string }[] = [
    { title: "Ongoing", subtitle: "Active projects in progress", category: "ongoing" },
    { title: "On Hold", subtitle: "Paused — no response from client yet", category: "on_hold" },
    { title: "Prospective", subtitle: "Potential projects being scoped", category: "prospective" },
    { title: "Completed", subtitle: "Delivered and archived", category: "completed" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">Achievements</h1>
        <p className="text-gray-500">
          Up to 5 per project — gray means assigned but not paid yet, green means paid.
        </p>
      </div>

      {groups.map((g) => {
        const list = projects.filter((p) => p.category === g.category);
        return (
          <Collapsible
            key={g.category}
            title={g.title}
            subtitle={g.subtitle}
            count={list.length}
            defaultOpen={g.category !== "completed"}
          >
            {list.length === 0 ? (
              <p className="text-gray-600">None yet.</p>
            ) : (
              <div className="space-y-4">
                {list.map((p) => {
                  const bySlot: Record<number, { member: string; paid: boolean }> = {};
                  achievements
                    .filter((a) => a.project_id === p.id)
                    .forEach((a) => (bySlot[a.slot] = { member: a.member, paid: a.paid }));

                  return (
                    <div key={p.id} className={cardClass}>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className={cardLabel}>{p.client}</p>
                          <h3 className="text-xl font-bold mt-0.5">{p.name}</h3>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          {SLOTS.map((slot) => (
                            <AchievementCircle
                              key={slot}
                              projectId={p.id}
                              slot={slot}
                              member={bySlot[slot]?.member || ""}
                              paid={bySlot[slot]?.paid || false}
                              teamNames={teamNames}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Collapsible>
        );
      })}
    </div>
  );
}
