import { Input } from "@/components/ui/input";
import { useActor } from "@/hooks/useActor";
import {
  BookOpen,
  Brain,
  Clipboard,
  FileText,
  PenLine,
  Search,
  Star,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Page } from "./BottomNav";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const sections: {
  page: Page;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient: string;
}[] = [
  {
    page: "books",
    icon: <BookOpen className="w-7 h-7" />,
    title: "NCERT पुस्तकें",
    subtitle: "कक्षा 6-12",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    page: "solutions",
    icon: <PenLine className="w-7 h-7" />,
    title: "NCERT समाधान",
    subtitle: "अध्यायवार हल",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    page: "notes",
    icon: <FileText className="w-7 h-7" />,
    title: "NCERT नोट्स",
    subtitle: "संक्षिप्त नोट्स",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    page: "important",
    icon: <Star className="w-7 h-7" />,
    title: "महत्वपूर्ण प्रश्न",
    subtitle: "परीक्षा उपयोगी",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    page: "videos",
    icon: <Video className="w-7 h-7" />,
    title: "वीडियो ट्यूटोरियल",
    subtitle: "विशेषज्ञों द्वारा",
    gradient: "from-red-500 to-rose-600",
  },
  {
    page: "mcq",
    icon: <Brain className="w-7 h-7" />,
    title: "MCQ अभ्यास",
    subtitle: "स्कोर जाँचें",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    page: "papers",
    icon: <Clipboard className="w-7 h-7" />,
    title: "CBSE बोर्ड पेपर",
    subtitle: "2020–2024",
    gradient: "from-indigo-500 to-blue-700",
  },
];

const stats = [
  { n: "7", l: "विषय" },
  { n: "12", l: "कक्षाएँ" },
  { n: "100+", l: "MCQ" },
  { n: "FREE", l: "निःशुल्क" },
];

interface SearchResult {
  type: string;
  text: string;
  page: Page;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { actor } = useActor();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchQuery.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      if (!actor) return;
      setIsSearching(true);
      try {
        const [mcqs, notes, solutions, qs] =
          await actor.searchByKeyword(searchQuery);
        const results: SearchResult[] = [];
        for (const m of mcqs.slice(0, 3)) {
          results.push({ type: "MCQ", text: m.questionText, page: "mcq" });
        }
        for (const n of notes.slice(0, 3)) {
          results.push({
            type: "नोट्स",
            text: `${n.subject} — ${n.chapter}`,
            page: "notes",
          });
        }
        for (const s of solutions.slice(0, 3)) {
          results.push({ type: "समाधान", text: s.question, page: "solutions" });
        }
        for (const q of qs.slice(0, 3)) {
          results.push({ type: "प्रश्न", text: q.chapter, page: "important" });
        }
        setSearchResults(results);
        setShowResults(true);
      } catch {
        // silent
      } finally {
        setIsSearching(false);
      }
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, actor]);

  return (
    <div className="min-h-screen pb-20">
      <div
        className="relative overflow-hidden px-4 pt-6 pb-8"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.63 0.18 46), oklch(0.55 0.16 30))",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="text-8xl font-bold text-white absolute -top-2 -right-4 select-none">
            क
          </div>
          <div className="text-6xl font-bold text-white absolute bottom-2 left-2 select-none">
            ख
          </div>
          <div className="text-5xl font-bold text-white absolute top-4 left-1/3 select-none">
            ग
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📚</span>
            <h1 className="text-2xl font-bold text-white font-display tracking-tight">
              Amrit NCERT 2026
            </h1>
          </div>
          <p className="text-white/80 text-sm mb-5">
            NCERT की सम्पूर्ण तैयारी — एक ही जगह
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9 bg-white border-0 shadow-lg rounded-xl h-11"
              placeholder="खोजें... (विषय, अध्याय, प्रश्न)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              data-ocid="home.search_input"
            />
            {showResults && (
              <div
                className="absolute left-0 right-0 top-12 bg-white rounded-xl shadow-xl border border-border z-50 overflow-hidden"
                data-ocid="home.search_results.panel"
              >
                {isSearching && (
                  <div
                    className="p-3 text-center text-sm text-muted-foreground"
                    data-ocid="home.loading_state"
                  >
                    खोज रहे हैं...
                  </div>
                )}
                {!isSearching && searchResults.length === 0 && (
                  <div
                    className="p-3 text-center text-sm text-muted-foreground"
                    data-ocid="home.empty_state"
                  >
                    कोई परिणाम नहीं मिला
                  </div>
                )}
                {searchResults.map((result, i) => (
                  <button
                    type="button"
                    key={`${result.type}-${result.text.slice(0, 12)}`}
                    className="w-full text-left px-4 py-2.5 hover:bg-muted flex items-start gap-2 border-b last:border-b-0"
                    onClick={() => {
                      onNavigate(result.page);
                      setShowResults(false);
                      setSearchQuery("");
                    }}
                    data-ocid={`home.search_results.item.${i + 1}`}
                  >
                    <span className="text-xs font-semibold text-primary bg-primary/10 rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                      {result.type}
                    </span>
                    <span className="text-sm text-foreground line-clamp-2">
                      {result.text}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  className="w-full text-center py-2 text-xs text-muted-foreground hover:bg-muted"
                  onClick={() => setShowResults(false)}
                  data-ocid="home.search_results.close_button"
                >
                  बंद करें
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-border">
        <div className="flex divide-x divide-border">
          {stats.map((s) => (
            <div key={s.l} className="flex-1 py-2 text-center">
              <div className="text-sm font-bold text-primary">{s.n}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-5">
        <h2 className="text-base font-bold text-foreground mb-3">
          📂 सभी अनुभाग
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {sections.map((section, idx) => (
            <button
              type="button"
              key={section.page}
              onClick={() => onNavigate(section.page)}
              data-ocid={`home.section.card.${idx + 1}`}
              className="relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 active:scale-95 hover:shadow-card shadow-xs"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-90`}
              />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-3 text-white">
                  {section.icon}
                </div>
                <div className="text-white font-bold text-sm leading-snug">
                  {section.title}
                </div>
                <div className="text-white/75 text-xs mt-0.5">
                  {section.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-2xl bg-secondary p-4 flex items-center gap-3">
        <span className="text-3xl">🎯</span>
        <div>
          <div className="text-white font-semibold text-sm">
            परीक्षा की तैयारी शुरू करें!
          </div>
          <div className="text-white/70 text-xs mt-0.5">
            NCERT के साथ सफलता पाएँ
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-muted-foreground py-4 px-4">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
