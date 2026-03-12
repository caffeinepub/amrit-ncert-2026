import { BookOpen, Brain, FileText, Home, PenLine } from "lucide-react";

export type Page =
  | "home"
  | "books"
  | "solutions"
  | "notes"
  | "important"
  | "videos"
  | "mcq"
  | "papers";

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: {
  page: Page;
  icon: React.ReactNode;
  label: string;
  ocid: string;
}[] = [
  {
    page: "home",
    icon: <Home className="w-5 h-5" />,
    label: "होम",
    ocid: "nav.home.link",
  },
  {
    page: "books",
    icon: <BookOpen className="w-5 h-5" />,
    label: "पुस्तकें",
    ocid: "nav.books.link",
  },
  {
    page: "solutions",
    icon: <PenLine className="w-5 h-5" />,
    label: "समाधान",
    ocid: "nav.solutions.link",
  },
  {
    page: "mcq",
    icon: <Brain className="w-5 h-5" />,
    label: "MCQ",
    ocid: "nav.mcq.link",
  },
  {
    page: "papers",
    icon: <FileText className="w-5 h-5" />,
    label: "पेपर",
    ocid: "nav.papers.link",
  },
];

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <button
              type="button"
              key={item.page}
              onClick={() => onNavigate(item.page)}
              data-ocid={item.ocid}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span
                className={`transition-transform ${isActive ? "scale-110" : ""}`}
              >
                {item.icon}
              </span>
              <span
                className={`text-xs font-medium ${isActive ? "text-primary" : ""}`}
              >
                {item.label}
              </span>
              {isActive && <span className="w-1 h-1 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
