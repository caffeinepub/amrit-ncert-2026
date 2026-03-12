import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { importantQuestionsData } from "@/data/content";
import { useState } from "react";

export default function QuestionsPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSubject, setSelectedSubject] = useState("सभी");

  const classes = ["6", "7", "8", "9", "10", "11", "12"];
  const subjectsForClass = [
    "सभी",
    ...Array.from(
      new Set(
        importantQuestionsData
          .filter((q) => q.classNum === Number(selectedClass))
          .map((q) => q.subject),
      ),
    ),
  ];
  const filtered = importantQuestionsData.filter(
    (q) =>
      q.classNum === Number(selectedClass) &&
      (selectedSubject === "सभी" || q.subject === selectedSubject),
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
              data-ocid="questions.class.select"
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
              data-ocid="questions.subject.select"
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
        <div className="text-center py-16" data-ocid="questions.empty_state">
          <p className="text-muted-foreground">
            इस कक्षा के लिए प्रश्न उपलब्ध नहीं हैं।
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((chapter, idx) => (
            <div
              key={chapter.chapter}
              className="bg-card border border-border rounded-2xl overflow-hidden"
              data-ocid={`questions.chapter.card.${idx + 1}`}
            >
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg">⭐</span>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {chapter.chapter}
                    </div>
                    <div className="text-white/75 text-xs">
                      {chapter.subject} • कक्षा {chapter.classNum}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {chapter.questions.map((q, qi) => (
                  <div
                    key={q.slice(0, 20)}
                    className="flex items-start gap-3 bg-muted rounded-xl px-3 py-2.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {qi + 1}
                    </span>
                    <p className="text-sm text-foreground leading-snug">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
