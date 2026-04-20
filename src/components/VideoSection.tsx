import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Youtube } from 'lucide-react';

const videos = [
  {
    id: 'wWm4jGklEwI',
    title: 'NHIS In A Week: Weekly Recap',
    description: 'A weekly recap of the National Health Insurance Authority activities.',
  },
  {
    id: 'ZM3YCcWOgMs',
    title: 'NHIA In A Week Update',
    description: 'Stay informed with the latest NHIA news and updates.',
  },
  {
    id: 'VIDEO_ID_3',
    title: 'MyNHIS App Tutorial',
    description: 'Learn how to use the MyNHIS mobile application.',
  },
  {
    id: 'VIDEO_ID_4',
    title: 'Registration Guide',
    description: 'Step by step guide to registering for NHIS.',
  },
  {
    id: 'VIDEO_ID_5',
    title: 'Benefits Explained',
    description: 'Understanding your NHIS benefits package.',
  },
];

export const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 340;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Youtube className="w-4 h-4" />
              NHIS TV
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Watch & Learn
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Educational videos from the National Health Insurance Authority
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 self-end">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous videos"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card shadow-card border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next videos"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card shadow-card border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors touch-manipulation"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Video Carousel */}
        <div
          ref={scrollContainer}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.08 }}
              className="flex-shrink-0 w-[78vw] sm:w-72 md:w-80 snap-start"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border/50 group">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary to-nhis-blue-dark">
                  {activeVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        // hqdefault is ~12KB vs maxresdefault ~80KB+ — far better for mobile
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={360}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <button
                        onClick={() => setActiveVideo(video.id)}
                        aria-label={`Play video: ${video.title}`}
                        className="absolute inset-0 flex items-center justify-center touch-manipulation"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 text-primary ml-1" fill="currentColor" />
                        </div>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube Channel Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="https://www.youtube.com/channel/UC1LlFtmEswsRRCvQZ6DTbBA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <Youtube className="w-5 h-5" />
            Visit NHIS TV on YouTube
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
