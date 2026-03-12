import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { boardPapers } from "@/data/content";
import { useState } from "react";
import PDFModal from "./PDFModal";

export default function PapersPage() {
  const [pdfModal, setPdfModal] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const renderPapers = (classNum: number) => {
    const classPapers = boardPapers.filter((p) => p.classNum === classNum);
    return (
      <div className="px-4 py-4 grid grid-cols-1 gap-3">
        {classPapers.map((paper, idx) => (
          <div
            key={`${paper.subject}-${paper.year}`}
            className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between shadow-xs"
            data-ocid={`papers.paper.card.${idx + 1}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                📄
              </div>
              <div>
                <div className="font-bold text-sm text-foreground">
                  {paper.subject}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {paper.year}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    कक्षा {paper.classNum}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl text-xs shrink-0"
              onClick={() =>
                setPdfModal({
                  url: paper.pdfUrl,
                  title: `${paper.subject} ${paper.year} — कक्षा ${paper.classNum}`,
                })
              }
              data-ocid={`papers.view.button.${idx + 1}`}
            >
              देखें
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pb-20">
      <Tabs defaultValue="10">
        <div className="sticky top-14 z-30 bg-background border-b border-border">
          <TabsList className="w-full rounded-none bg-muted p-1">
            <TabsTrigger
              value="10"
              className="flex-1 rounded-lg"
              data-ocid="papers.class10.tab"
            >
              कक्षा 10
            </TabsTrigger>
            <TabsTrigger
              value="12"
              className="flex-1 rounded-lg"
              data-ocid="papers.class12.tab"
            >
              कक्षा 12
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="10" className="mt-0">
          {renderPapers(10)}
        </TabsContent>
        <TabsContent value="12" className="mt-0">
          {renderPapers(12)}
        </TabsContent>
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
