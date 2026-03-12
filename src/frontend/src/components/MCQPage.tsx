import { Button } from "@/components/ui/button";
import { mcqData } from "@/data/content";
import { useMemo, useState } from "react";

type Phase = "subject" | "chapter" | "quiz" | "result";

export default function MCQPage() {
  const [phase, setPhase] = useState<Phase>("subject");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const subjects = useMemo(
    () => Array.from(new Set(mcqData.map((m) => m.subject))),
    [],
  );
  const chaptersForSubject = useMemo(
    () =>
      Array.from(
        new Set(
          mcqData
            .filter((m) => m.subject === selectedSubject)
            .map((m) => m.chapter),
        ),
      ),
    [selectedSubject],
  );
  const quizQuestions = useMemo(
    () =>
      mcqData.filter(
        (m) => m.subject === selectedSubject && m.chapter === selectedChapter,
      ),
    [selectedSubject, selectedChapter],
  );
  const currentQuestion = quizQuestions[currentQ];

  function handleSelectSubject(subject: string) {
    setSelectedSubject(subject);
    setPhase("chapter");
  }

  function handleSelectChapter(chapter: string) {
    setSelectedChapter(chapter);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setScore(0);
    setPhase("quiz");
  }

  function handleSelectAnswer(idx: number) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === currentQuestion.correct) setScore((prev) => prev + 1);
  }

  function handleNext() {
    if (currentQ + 1 >= quizQuestions.length) setPhase("result");
    else {
      setCurrentQ((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setScore(0);
    setPhase("quiz");
  }

  function handleBackToSubjects() {
    setPhase("subject");
    setSelectedSubject("");
    setSelectedChapter("");
    setCurrentQ(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  const pct =
    quizQuestions.length > 0
      ? Math.round((score / quizQuestions.length) * 100)
      : 0;
  const getMessage = () => {
    if (pct >= 90) return "🏆 शानदार! आप बहुत होशियार हैं!";
    if (pct >= 70) return "🌟 बहुत अच्छा! और मेहनत करें!";
    if (pct >= 50) return "👍 ठीक है! दोबारा कोशिश करें!";
    return "💪 चिंता न करें! अभ्यास से सफलता मिलेगी!";
  };

  if (phase === "subject") {
    return (
      <div className="pb-20 px-4 py-4">
        <p className="text-sm text-muted-foreground mb-4">एक विषय चुनें:</p>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map((sub, i) => (
            <button
              type="button"
              key={sub}
              onClick={() => handleSelectSubject(sub)}
              data-ocid={`mcq.subject.button.${i + 1}`}
              className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary hover:shadow-card transition-all active:scale-95"
            >
              <div className="text-2xl mb-2">
                {sub === "गणित"
                  ? "🔢"
                  : sub === "विज्ञान"
                    ? "🔬"
                    : sub === "इतिहास"
                      ? "🏛️"
                      : "📚"}
              </div>
              <div className="font-bold text-sm">{sub}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {mcqData.filter((m) => m.subject === sub).length} प्रश्न
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "chapter") {
    return (
      <div className="pb-20 px-4 py-4">
        <button
          type="button"
          className="text-primary text-sm mb-4 flex items-center gap-1"
          onClick={() => setPhase("subject")}
          data-ocid="mcq.back.button"
        >
          ← वापस
        </button>
        <p className="text-sm text-muted-foreground mb-3">
          {selectedSubject} — अध्याय चुनें:
        </p>
        <div className="flex flex-col gap-2">
          {chaptersForSubject.map((ch, i) => (
            <button
              type="button"
              key={ch}
              onClick={() => handleSelectChapter(ch)}
              data-ocid={`mcq.chapter.button.${i + 1}`}
              className="bg-card border border-border rounded-2xl px-4 py-3 text-left hover:border-primary hover:shadow-card transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-sm">{ch}</div>
                <div className="text-xs text-muted-foreground">
                  {
                    mcqData.filter(
                      (m) => m.subject === selectedSubject && m.chapter === ch,
                    ).length
                  }{" "}
                  प्रश्न
                </div>
              </div>
              <span className="text-primary text-lg">→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div
        className="pb-20 px-4 py-8 flex flex-col items-center"
        data-ocid="mcq.result.panel"
      >
        <div className="text-6xl mb-4">
          {pct >= 70 ? "🎉" : pct >= 50 ? "👍" : "💪"}
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">
          {score}/{quizQuestions.length}
        </div>
        <div className="text-muted-foreground mb-2">सही उत्तर</div>
        <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-primary">{pct}%</span>
        </div>
        <p className="text-center font-semibold text-foreground mb-6 text-sm px-4">
          {getMessage()}
        </p>
        <div className="flex gap-3 w-full max-w-xs">
          <Button
            className="flex-1 rounded-xl"
            onClick={handleRestart}
            data-ocid="mcq.restart.button"
          >
            फिर से खेलें
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={handleBackToSubjects}
            data-ocid="mcq.home.button"
          >
            विषय बदलें
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="pb-20 px-4 py-4" data-ocid="mcq.quiz.panel">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          className="text-primary text-sm"
          onClick={handleBackToSubjects}
          data-ocid="mcq.quit.button"
        >
          ✕ छोड़ें
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          प्रश्न {currentQ + 1}/{quizQuestions.length}
        </span>
        <span className="text-sm font-bold text-accent">Score: {score}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${(currentQ / quizQuestions.length) * 100}%` }}
        />
      </div>
      <div className="bg-card border border-border rounded-2xl p-4 mb-4 shadow-xs">
        <div className="text-xs font-semibold text-primary mb-2">
          {currentQuestion.subject} — {currentQuestion.chapter}
        </div>
        <p className="font-semibold text-foreground text-base leading-snug">
          {currentQuestion.question}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {currentQuestion.options.map((opt, i) => {
          let cls = "bg-card border border-border hover:border-primary";
          if (selectedAnswer !== null) {
            if (i === currentQuestion.correct)
              cls = "bg-green-50 border-green-500 text-green-700";
            else if (i === selectedAnswer && i !== currentQuestion.correct)
              cls = "bg-red-50 border-red-500 text-red-700";
          }
          return (
            <button
              type="button"
              key={opt}
              onClick={() => handleSelectAnswer(i)}
              disabled={selectedAnswer !== null}
              data-ocid={`mcq.option.button.${i + 1}`}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all border-2 ${cls} disabled:cursor-default`}
            >
              <span className="font-bold mr-2">{["A", "B", "C", "D"][i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <Button
          className="w-full mt-4 rounded-xl"
          onClick={handleNext}
          data-ocid="mcq.next.button"
        >
          {currentQ + 1 >= quizQuestions.length
            ? "परिणाम देखें 🎯"
            : "अगला प्रश्न →"}
        </Button>
      )}
    </div>
  );
}
