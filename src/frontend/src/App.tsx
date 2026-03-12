import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import BooksPage from "./components/BooksPage";
import BottomNav, { type Page } from "./components/BottomNav";
import HomePage from "./components/HomePage";
import MCQPage from "./components/MCQPage";
import NotesPage from "./components/NotesPage";
import PapersPage from "./components/PapersPage";
import QuestionsPage from "./components/QuestionsPage";
import SolutionsPage from "./components/SolutionsPage";
import VideosPage from "./components/VideosPage";

const pageTitles: Record<Page, string> = {
  home: "Amrit NCERT 2026",
  books: "📚 NCERT पुस्तकें",
  solutions: "✏️ NCERT समाधान",
  notes: "📝 NCERT नोट्स",
  important: "⭐ महत्वपूर्ण प्रश्न",
  videos: "🎥 वीडियो ट्यूटोरियल",
  mcq: "🧠 MCQ अभ्यास",
  papers: "📄 CBSE बोर्ड पेपर",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isHome = currentPage === "home";

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border shadow-xs">
        <div className="flex items-center h-14 px-4 gap-3">
          {!isHome && (
            <button
              type="button"
              onClick={() => navigate("home")}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              data-ocid="header.back.button"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          {isHome ? (
            <>
              <span className="text-2xl">📚</span>
              <div>
                <div className="font-bold text-foreground text-sm font-display leading-none">
                  Amrit NCERT 2026
                </div>
                <div className="text-xs text-muted-foreground">
                  कक्षा 6–12 • हिंदी माध्यम
                </div>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-foreground text-base">
              {pageTitles[currentPage]}
            </h1>
          )}
        </div>
      </header>

      <main className="pt-14">
        {currentPage === "home" && <HomePage onNavigate={navigate} />}
        {currentPage === "books" && <BooksPage />}
        {currentPage === "solutions" && <SolutionsPage />}
        {currentPage === "notes" && <NotesPage />}
        {currentPage === "important" && <QuestionsPage />}
        {currentPage === "videos" && <VideosPage />}
        {currentPage === "mcq" && <MCQPage />}
        {currentPage === "papers" && <PapersPage />}
      </main>

      <BottomNav currentPage={currentPage} onNavigate={navigate} />
    </div>
  );
}
