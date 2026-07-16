"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AchievementCircle({
  projectId,
  slot,
  member,
  paid,
  teamNames,
}: {
  projectId: string;
  slot: number;
  member: string;
  paid: boolean;
  teamNames: string[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  async function save(newMember: string, newPaid: boolean) {
    setSaving(true);
    try {
      const res = await fetch("/api/achievements/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, slot, member: newMember, paid: newPaid }),
      });
      if (res.ok) router.refresh();
    } finally {
      setSaving(false);
      setMenuOpen(false);
    }
  }

  const initial = member ? member.trim().charAt(0).toUpperCase() : "";

  function handleCircleClick() {
    if (!member) {
      setMenuOpen((o) => !o);
    } else {
      // Assigned already — a plain click just toggles paid/unpaid.
      save(member, !paid);
    }
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        onClick={handleCircleClick}
        disabled={saving}
        title={
          member ? `${member} — ${paid ? "paid" : "not paid"} · click to toggle` : "Unassigned — click to set"
        }
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base font-bold transition-transform hover:scale-105 ${
          member ? (paid ? "bg-accent text-white" : "bg-gray-400 text-white") : "border-2 border-dashed border-black/25 text-black/25"
        } ${saving ? "opacity-50" : ""}`}
      >
        {initial}
      </button>

      {member && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            save("", false);
          }}
          title="Clear"
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] leading-none flex items-center justify-center hover:bg-black/70"
        >
          ×
        </button>
      )}

      {menuOpen && (
        <div className="absolute z-20 top-full mt-1 left-1/2 -translate-x-1/2 bg-white border border-black/15 rounded-xl shadow-xl py-1 min-w-[120px]">
          {teamNames.length === 0 ? (
            <p className="px-3 py-2 text-xs text-black/40 whitespace-nowrap">
              No names — check the Team tab
            </p>
          ) : (
            teamNames.map((name) => (
              <button
                key={name}
                onClick={() => save(name, false)}
                className="w-full text-left px-3 py-1.5 text-sm text-black hover:bg-black/5 whitespace-nowrap"
              >
                {name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
