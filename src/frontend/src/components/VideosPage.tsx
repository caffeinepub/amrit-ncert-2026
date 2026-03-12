import { Button } from "@/components/ui/button";
import { videos } from "@/data/content";
import { Play, X } from "lucide-react";
import { useState } from "react";

export default function VideosPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    videoId: string;
    title: string;
  } | null>(null);

  const subjects = Array.from(new Set(videos.map((v) => v.subject)));
  const subjectIcons: Record<string, string> = {
    गणित: "🔢",
    विज्ञान: "🔬",
    इतिहास: "🏛️",
    भूगोल: "🌍",
  };
  const filteredVideos = selectedSubject
    ? videos.filter((v) => v.subject === selectedSubject)
    : videos;

  return (
    <div className="pb-20">
      <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-border">
        <button
          type="button"
          onClick={() => setSelectedSubject(null)}
          data-ocid="videos.all.tab"
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            !selectedSubject
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          सभी
        </button>
        {subjects.map((sub, i) => (
          <button
            type="button"
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            data-ocid={`videos.subject.tab.${i + 1}`}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedSubject === sub
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {subjectIcons[sub] || "📚"} {sub}
          </button>
        ))}
      </div>
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {filteredVideos.map((video, idx) => (
          <button
            type="button"
            key={video.videoId}
            onClick={() =>
              setActiveVideo({ videoId: video.videoId, title: video.title })
            }
            data-ocid={`videos.video.card.${idx + 1}`}
            className="bg-card border border-border rounded-2xl overflow-hidden text-left hover:shadow-card transition-all active:scale-95"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-4 h-4 text-red-600 fill-red-600 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-2.5">
              <div className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                {video.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {video.subject} • कक्षा {video.classNum}
              </div>
            </div>
          </button>
        ))}
      </div>
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          data-ocid="videos.modal"
        >
          <div className="flex items-center justify-between p-4">
            <span className="text-white font-semibold text-sm truncate max-w-xs">
              {activeVideo.title}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 shrink-0"
              onClick={() => setActiveVideo(null)}
              data-ocid="videos.close_button"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 px-4 pb-4">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={activeVideo.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
