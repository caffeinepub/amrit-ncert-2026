import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { notesData } from "@/data/content";
import { useState } from "react";

const colorMap: Record<string, { bg: string; dot: string; border: string }> = {
  blue: { bg: "bg-blue-50", dot: "bg-blue-500", border: "border-blue-200" },
  green: { bg: "bg-green-50", dot: "bg-green-500", border: "border-green-200" },
  orange: {
    bg: "bg-orange-50",
    dot: "bg-orange-500",
    border: "border-orange-200",
  },
  purple: {
    bg: "bg-violet-50",
    dot: "bg-violet-500",
    border: "border-violet-200",
  },
  teal: { bg: "bg-teal-50", dot: "bg-teal-500", border: "border-teal-200" },
  red: { bg: "bg-red-50", dot: "bg-red-500", border: "border-red-200" },
};

export default function NotesPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSubject, setSelectedSubject] = useState("सभी");

  const classes = ["6", "7", "8", "9", "10", "11", "12"];
  const subjectsForClass = [
    "सभी",
    ...Array.from(
      new Set(
        notesData
          .filter((n) => n.classNum === Number(selectedClass))
          .map((n) => n.subject),
      ),
    ),
  ];
  const filtered = notesData.filter(
    (n) =>
      n.classNum === Number(selectedClass) &&
      (selectedSubject === "सभी" || n.subject === selectedSubject),
  );

  return (
    <div className="pb-20 px-4 py-4">
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <Select
            value={selectedClass}
            onValueChange={(v) => {
              setSelectedClass(v);
              setSelectedSubject("सभी");
            }}
          >
            <SelectTrigger
              className="rounded-xl"
              data-ocid="notes.class.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c} value={c}>
                  कक्षा {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger
              className="rounded-xl"
              data-ocid="notes.subject.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjectsForClass.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16" data-ocid="notes.empty_state">
          <p className="text-muted-foreground">
            इस कक्षा के लिए नोट्स उपलब्ध नहीं हैं।
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((note, idx) => {
            const c = colorMap[note.color] || colorMap.blue;
            return (
              <div
                key={note.chapter}
                className={`rounded-2xl border ${c.border} ${c.bg} p-4 animate-fade-in`}
                data-ocid={`notes.card.${idx + 1}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-3 h-3 rounded-full ${c.dot}`} />
                  <div>
                    <div className="font-bold text-sm text-foreground">
                      {note.chapter}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {note.subject} • कक्षा {note.classNum}
                    </div>
                  </div>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {note.points.map((pt) => (
                    <li
                      key={pt.slice(0, 18)}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
