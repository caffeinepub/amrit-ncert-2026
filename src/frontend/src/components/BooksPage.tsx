import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { booksData } from "@/data/content";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import PDFModal from "./PDFModal";

export default function BooksPage() {
  const [pdfModal, setPdfModal] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const classes = [6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="pb-20">
      <Tabs defaultValue="10">
        <div className="sticky top-14 z-30 bg-background border-b border-border">
          <TabsList className="flex w-full overflow-x-auto h-auto p-1 bg-muted rounded-none justify-start gap-1">
            {classes.map((c) => (
              <TabsTrigger
                key={c}
                value={String(c)}
                className="shrink-0 rounded-lg text-xs px-3 py-1.5"
                data-ocid={`books.class.tab.${c}`}
              >
                कक्षा {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {classes.map((c) => (
          <TabsContent key={c} value={String(c)} className="px-4 py-4 mt-0">
            <div className="grid grid-cols-2 gap-3">
              {(booksData[c] || []).map((subject, idx) => (
                <div
                  key={subject.en}
                  className="bg-card border border-border rounded-2xl p-4 shadow-xs flex flex-col gap-3"
                  data-ocid={`books.subject.card.${idx + 1}`}
                >
                  <div className="text-3xl text-center">{subject.icon}</div>
                  <div className="text-center">
                    <div className="font-bold text-sm text-foreground">
                      {subject.hi}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {subject.en}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full rounded-xl text-xs"
                    onClick={() =>
                      setPdfModal({
                        url: subject.pdfUrl,
                        title: `कक्षा ${c} — ${subject.hi}`,
                      })
                    }
                    data-ocid={`books.read.button.${idx + 1}`}
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1" /> पढ़ें
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {pdfModal && (
        <PDFModal
          pdfUrl={pdfModal.url}
          title={pdfModal.title}
          onClose={() => setPdfModal(null)}
        />
      )}
    </div>
  );
}
