import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { solutionsData } from "@/data/content";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SolutionsPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSubject, setSelectedSubject] = useState("सभी");

  const classes = ["6", "7", "8", "9", "10", "11", "12"];
  const subjectsForClass = [
    "सभी",
    ...Array.from(
      new Set(
        solutionsData
          .filter((s) => s.classNum === Number(selectedClass))
          .map((s) => s.subject),
      ),
    ),
  ];
  const filtered = solutionsData.filter(
    (s) =>
      s.classNum === Number(selectedClass) &&
      (selectedSubject === "सभी" || s.subject === selectedSubject),
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
              data-ocid="solutions.class.select"
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
              data-ocid="solutions.subject.select"
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
        <div className="text-center py-16" data-ocid="solutions.empty_state">
          <ChevronDown className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            इस कक्षा के लिए समाधान उपलब्ध नहीं हैं।
          </p>
        </div>
      ) : (
        <Accordion type="multiple" className="flex flex-col gap-2">
          {filtered.map((chapter, idx) => (
            <AccordionItem
              key={chapter.chapter}
              value={`item-${idx}`}
              className="bg-card border border-border rounded-2xl overflow-hidden"
              data-ocid={`solutions.chapter.item.${idx + 1}`}
            >
              <AccordionTrigger className="px-4 py-3 font-semibold text-sm text-left hover:no-underline">
                <span className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">📘</span>
                  <span>{chapter.chapter}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="flex flex-col gap-3">
                  {chapter.qa.map((item) => (
                    <div
                      key={item.q.slice(0, 20)}
                      className="bg-muted rounded-xl p-3"
                    >
                      <p className="font-semibold text-sm text-foreground mb-1">
                        {item.q}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
