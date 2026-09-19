import React, { useState, useRef } from 'react';
import {
  HelpCircle,
  MapPin,
  Clock,
  Ticket,
  Shirt,
  Car,
  Accessibility,
  Utensils,
  HeartHandshake,
  Video,
  Smile,
  Camera,
  Phone,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Search,
  CheckCircle2,
  Download,
  Eye,
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';
import {
  MEMORIAL_DOCUMENTS,
  triggerSingleDownload,
} from '../utils/downloadDocuments';

interface FaqItem {
  id: string;
  question: string;
  category: 'venue' | 'attire' | 'logistics' | 'tribute';
  icon: React.ComponentType<{ className?: string }>;
  answer: React.ReactNode;
}

interface CelebrationFaqSectionProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenDocumentViewer?: (docId: 'program' | 'obituary') => void;
}

export const CelebrationFaqSection: React.FC<CelebrationFaqSectionProps> = ({
  onNavigateSection,
  onOpenDocumentViewer,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [openIds, setOpenIds] = useState<string[]>([
    'faq-when-where',
    'faq-what-time',
    'faq-what-wear',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'venue' | 'attire' | 'logistics' | 'tribute'>('all');

  // Parallax watermark scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  const watermarkY = useTransform(smoothProgress, [0, 1], [-40, 40]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(FAQ_ITEMS.map((item) => item.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection('donate');
      return;
    }
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const FAQ_ITEMS: FaqItem[] = [
    {
      id: 'faq-when-where',
      category: 'venue',
      icon: MapPin,
      question: 'When and where is the celebration?',
      answer: (
        <div className="space-y-3">
          <p className="font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
            The celebration will be held <strong>Saturday, September 19th</strong> at the <strong>College Football Hall of Fame</strong>.
          </p>
          <div className="bg-[#0A1B36]/5 border-l-4 border-[#C5A253] p-3.5 sm:p-4 text-xs sm:text-sm space-y-2">
            <div className="font-display-title font-bold text-[#0A1B36] uppercase tracking-wide">
              College Football Hall of Fame
            </div>
            <div className="font-body-text text-[#0A1B36]/80 leading-relaxed">
              250 Marietta Street NW<br />
              Atlanta, GA 30313
            </div>
            <div className="pt-1">
              <a
                href="https://maps.google.com/?q=College+Football+Hall+of+Fame+250+Marietta+Street+NW+Atlanta+GA+30313"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-tech-mono text-[11px] font-bold uppercase tracking-wider text-[#0A1B36] hover:text-[#C5A253] transition-colors underline underline-offset-4"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-what-time',
      category: 'venue',
      icon: Clock,
      question: 'What time should I arrive?',
      answer: (
        <div className="space-y-2.5 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            On <strong>Saturday, September 19th</strong>, access to the College Football Hall of Fame and the pre-reception begins at <strong>5:00 PM</strong>.
          </p>
          <p>
            The hall will open at <strong>5:30 PM</strong>.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 text-xs sm:text-sm text-[#0A1B36] font-medium">
            <strong>Important Notice:</strong> Guests will not be permitted to enter the venue before <strong>5:00 PM</strong>.
          </div>
        </div>
      ),
    },
    {
      id: 'faq-tickets',
      category: 'venue',
      icon: Ticket,
      question: 'Are tickets required to attend?',
      answer: (
        <div className="font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p className="font-semibold text-[#0A1B36]">
            No. Tickets are not required to attend the celebration.
          </p>
          <p className="text-xs sm:text-sm text-[#0A1B36]/80 mt-1">
            All players, colleagues, former students, family, friends, and supporters are welcome to join us to honor Coach Godfrey.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-what-wear',
      category: 'attire',
      icon: Shirt,
      question: 'What should I wear?',
      answer: (
        <div className="space-y-3 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            This is a nice occasion, but it is <strong>not a formal event</strong>.
          </p>
          <div className="bg-[#ffffff] border-2 border-[#0A1B36] p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#0A1B36]" title="Navy Blue" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#C5A253]" title="Gold" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-300" title="Yellow" />
              <span className="font-display-title text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1B36]">
                Suggested Colors: Blues, Golds, &amp; Yellows
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#0A1B36]/85">
              Guests are encouraged to wear <strong>blues, golds and yellows</strong>.
            </p>
            <div className="pt-1 text-xs font-tech-mono font-bold text-red-700 uppercase tracking-wide">
              Our only request is that guests not wear black. Let&apos;s make this a festive occasion!
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-rideshare',
      category: 'logistics',
      icon: Car,
      question: 'Should I use rideshare?',
      answer: (
        <div className="space-y-2.5 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            <strong>Yes!</strong> We strongly encourage guests to use Uber, Lyft, or another rideshare service if possible.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 text-xs sm:text-sm text-[#0A1B36]">
            <strong>Travel Advisory:</strong> An Atlanta Dream game begins at <strong>7:00 PM on Saturday, September 19th</strong>, so downtown traffic and parking may be busier than usual.
          </div>
        </div>
      ),
    },
    {
      id: 'faq-parking',
      category: 'logistics',
      icon: MapPin,
      question: 'Where should I park?',
      answer: (
        <div className="space-y-3 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>There are two nearby parking decks available:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs sm:text-sm font-semibold text-[#0A1B36]">
            <li>Green Deck at the College Football Hall of Fame</li>
            <li>Omni Hotel Parking Deck</li>
          </ul>
          <p className="text-xs sm:text-sm text-[#0A1B36]/80">
            There are also several public parking lots throughout the downtown area. Please allow yourself plenty of extra time to find parking and walk to the College Football Hall of Fame.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-seating',
      category: 'venue',
      icon: CheckCircle2,
      question: 'Will seating be assigned?',
      answer: (
        <div className="font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p className="font-semibold text-[#0A1B36]">
            No. Seating will not be assigned.
          </p>
          <p className="text-xs sm:text-sm text-[#0A1B36]/80 mt-1">
            Guests are welcome to sit wherever they feel most comfortable upon entry to the hall.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-accessibility',
      category: 'venue',
      icon: Accessibility,
      question: 'Is the College Football Hall of Fame accessible?',
      answer: (
        <div className="font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed space-y-2">
          <p>
            <strong>Yes.</strong> The Chick-fil-A College Football Hall of Fame is a <strong>completely accessible venue</strong> and strives to provide a welcoming and comfortable experience for every guest.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-food-beverages',
      category: 'venue',
      icon: Utensils,
      question: 'Will light hors d\'oeuvres and beverages be provided?',
      answer: (
        <div className="space-y-2 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            <strong>Yes</strong>, light bites and non-alcoholic/alcoholic beverages will be available:
          </p>
          <div className="bg-[#0A1B36]/5 p-3.5 border-l-4 border-[#C5A253] space-y-1.5 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A253] shrink-0" />
              <span><strong>Pre-Reception:</strong> 5:00 PM – 5:45 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A253] shrink-0" />
              <span><strong>Post-Celebration:</strong> 7:00 PM – 9:00 PM (immediately following)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-flowers-gifts',
      category: 'tribute',
      icon: HeartHandshake,
      question: 'Should I send flowers or gifts?',
      answer: (
        <div className="space-y-3 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            <strong>Please do not send flowers or gifts.</strong> Those who would like to honor Buck are encouraged to make a donation to the <strong>William Buck Godfrey Foundation</strong> at <strong>williambuckgodfrey.com</strong>.
          </p>
          <div>
            <button
              onClick={handleDonateClick}
              className="inline-flex items-center gap-2 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] font-display-title text-xs font-bold py-2.5 px-5 uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              <span>Make a Memorial Donation Online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-livestream',
      category: 'logistics',
      icon: Video,
      question: 'Will the celebration be livestreamed?',
      answer: (
        <div className="space-y-3 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            <strong>Yes</strong>, the celebration will be livestreamed online for family, former players, and community members who cannot attend in person.
          </p>
          <div className="pt-1">
            <a
              href="https://vimeo.com/event/6189518"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] font-display-title text-xs sm:text-sm font-bold py-3 px-6 uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Video className="w-4 h-4 text-[#C5A253] shrink-0" />
              <span>Watch the Celebration Livestream on Vimeo</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-documents-download',
      category: 'tribute',
      icon: Download,
      question: 'Where can I view or download the Celebration Program and Coach Godfrey’s Obituary?',
      answer: (
        <div className="space-y-3 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            You can <strong>view both commemorative memorial documents inline</strong> directly on the website, or download them to your device as separate PDF files:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {MEMORIAL_DOCUMENTS.map((doc, idx) => (
              <div key={doc.id} className="bg-[#0A1B36]/5 border border-[#0A1B36]/20 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-tech-mono text-[9px] font-bold bg-[#0A1B36] text-white px-1.5 py-0.5">
                      DOC {idx + 1}
                    </span>
                    <span className="font-tech-mono text-[10px] text-[#C5A253] font-bold uppercase">
                      {doc.pages} • {doc.size}
                    </span>
                  </div>
                  <h4 className="font-display-title text-sm font-bold text-[#0A1B36] uppercase leading-tight">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-[#0A1B36]/75 mt-1 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-[#0A1B36]/10 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById(`document-card-${doc.id}`) || document.getElementById('documents');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else if (onOpenDocumentViewer) {
                        onOpenDocumentViewer(doc.id as 'program' | 'obituary');
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-tech-mono font-bold text-[#0A1B36] hover:text-[#C5A253] underline cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A253]" />
                    <span>View Online</span>
                  </button>

                  <a
                    href={doc.downloadUrl}
                    download={doc.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      triggerSingleDownload(doc);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-tech-mono font-bold text-[#0A1B36] hover:text-[#C5A253] cursor-pointer no-underline"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C5A253]" />
                    <span>{doc.id === 'program' ? 'Download Program' : 'Download Obituary'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (onOpenDocumentViewer) {
                  onOpenDocumentViewer('program');
                } else {
                  const el = document.getElementById('documents');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center gap-2 bg-white border-2 border-[#0A1B36] text-[#0A1B36] hover:bg-[#C5A253] font-display-title text-xs sm:text-sm font-bold py-3 px-5 uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#0A1B36]" />
              <span>View Inline on Website</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-children',
      category: 'attire',
      icon: Smile,
      question: 'May I bring my children?',
      answer: (
        <div className="font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p className="font-semibold text-[#0A1B36]">
            Of course, Buck loved the kids!
          </p>
          <p className="text-xs sm:text-sm text-[#0A1B36]/80 mt-1">
            Children and families of all ages are warmly welcomed.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-photos-video',
      category: 'tribute',
      icon: Camera,
      question: 'May guests take photographs or video?',
      answer: (
        <div className="space-y-2.5 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            <strong>Yes!</strong> Please share your memories, photos, and videos across social platforms to celebrate Coach Godfrey&apos;s legacy.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#C5A253]/20 border border-[#C5A253] px-3 py-1.5 text-xs sm:text-sm font-tech-mono font-bold text-[#0A1B36]">
            <span>Official Celebration Hashtag:</span>
            <span className="text-[#0A1B36] font-black underline decoration-[#C5A253] underline-offset-4">
              #BuckTheLegend
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-contact-question',
      category: 'logistics',
      icon: Phone,
      question: 'Who should I contact if I have another question?',
      answer: (
        <div className="space-y-2.5 font-body-text text-sm sm:text-base text-[#0A1B36]/90 leading-relaxed">
          <p>
            For additional questions regarding the celebration of life, please contact:
          </p>
          <div className="bg-[#ffffff] border-2 border-[#0A1B36] p-4 shadow-sm space-y-2">
            <div className="font-display-title font-bold text-[#0A1B36] text-base sm:text-lg uppercase">
              Gregory B. Levett &amp; Sons Funeral Homes &amp; Crematory
            </div>
            <div>
              <a
                href="tel:4042415656"
                className="inline-flex items-center gap-2 font-tech-mono text-sm sm:text-base font-bold text-[#0A1B36] hover:text-[#C5A253] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A253]" />
                <span>(404) 241-5656</span>
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === 'string' &&
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative py-5 sm:py-7 md:py-9 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-[#ffffff] border-t border-[#0A1B36]/10"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-[0.02] sm:opacity-[0.03] select-none transform-gpu"
      >
        CELEBRATION
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#ffffff] px-4 py-1.5 border border-[#C5A253]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
              <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold">
                OFFICIAL EVENT INFORMATION • SATURDAY, SEPTEMBER 19TH
              </span>
            </div>

            <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]">
              Celebration of Life FAQ
            </h2>

            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed font-medium">
              We look forward to gathering in celebration of Coach William &ldquo;Buck&rdquo; Godfrey&apos;s life and legacy. Here are answers to some of the most frequently asked questions.
            </p>
          </div>
        </FadeInView>

        {/* Quick Highlights Summary Card */}
        <FadeInView direction="up" delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 bg-[#0A1B36]/5 p-4 sm:p-5 border-2 border-[#0A1B36]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#C5A253] font-bold text-xs uppercase font-tech-mono">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>VENUE</span>
              </div>
              <p className="font-display-title text-xs sm:text-sm font-bold text-[#0A1B36]">
                College Football Hall of Fame
              </p>
              <p className="font-body-text text-[11px] text-[#0A1B36]/75">
                250 Marietta St NW, Atlanta
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#C5A253] font-bold text-xs uppercase font-tech-mono">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>DATE &amp; SCHEDULE</span>
              </div>
              <p className="font-display-title text-xs sm:text-sm font-bold text-[#0A1B36]">
                Saturday, September 19th
              </p>
              <p className="font-body-text text-[11px] text-[#0A1B36]/75">
                5:00 PM Reception • 5:30 PM Hall
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#C5A253] font-bold text-xs uppercase font-tech-mono">
                <Shirt className="w-3.5 h-3.5 shrink-0" />
                <span>ATTIRE</span>
              </div>
              <p className="font-display-title text-xs sm:text-sm font-bold text-[#0A1B36]">
                Blues, Golds &amp; Yellows
              </p>
              <p className="font-body-text text-[11px] text-[#0A1B36]/75">
                Please do not wear black
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#C5A253] font-bold text-xs uppercase font-tech-mono">
                <Video className="w-3.5 h-3.5 shrink-0" />
                <span>LIVESTREAM</span>
              </div>
              <p className="font-display-title text-xs sm:text-sm font-bold text-[#0A1B36]">
                Vimeo Broadcast
              </p>
              <a
                href="https://vimeo.com/event/6189518"
                target="_blank"
                rel="noopener noreferrer"
                className="font-tech-mono text-[11px] text-[#0A1B36] font-bold underline decoration-[#C5A253] flex items-center gap-1 hover:text-[#C5A253]"
              >
                <span>vimeo.com/event/6189518</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </FadeInView>

        {/* Filter Controls & Search */}
        <FadeInView direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
              {(
                [
                  { key: 'all', label: 'ALL QUESTIONS' },
                  { key: 'venue', label: 'VENUE & ARRIVAL' },
                  { key: 'attire', label: 'ATTIRE & FAMILY' },
                  { key: 'logistics', label: 'PARKING & TRAVEL' },
                  { key: 'tribute', label: 'GIFTS & PHOTOS' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider py-1.5 px-3 border transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-[#0A1B36] text-white border-[#0A1B36]'
                      : 'bg-[#ffffff] text-[#0A1B36]/80 border-[#0A1B36]/20 hover:border-[#0A1B36]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Expand / Collapse All Toggles */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={expandAll}
                className="font-tech-mono text-[10px] sm:text-[11px] uppercase font-bold text-[#0A1B36]/70 hover:text-[#0A1B36] underline cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-[#0A1B36]/30">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="font-tech-mono text-[10px] sm:text-[11px] uppercase font-bold text-[#0A1B36]/70 hover:text-[#0A1B36] underline cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </FadeInView>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-1">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            const Icon = faq.icon;

            return (
              <FadeInView key={faq.id} direction="up" delay={0.03 * (index + 1)}>
                <div
                  className={`border transition-all duration-200 bg-[#ffffff] shadow-xs ${
                    isOpen
                      ? 'border-[#0A1B36] shadow-md'
                      : 'border-[#0A1B36]/15 hover:border-[#0A1B36]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-4 px-4 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center border transition-colors ${
                          isOpen
                            ? 'bg-[#0A1B36] text-[#C5A253] border-[#0A1B36]'
                            : 'bg-[#ffffff] text-[#0A1B36] border-[#0A1B36]/20'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <span className="font-display-title text-sm sm:text-base md:text-lg font-bold text-[#0A1B36] tracking-tight leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#C5A253]' : 'text-[#0A1B36]/60'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-[#0A1B36]/10 animate-in fade-in duration-200">
                      <div className="pl-0 sm:pl-13">{faq.answer}</div>
                    </div>
                  )}
                </div>
              </FadeInView>
            );
          })}
        </div>

        {/* Additional Questions Card */}
        <FadeInView direction="up" delay={0.25}>
          <div className="bg-[#ffffff] border-2 border-[#0A1B36] p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-display-title text-base sm:text-lg font-bold uppercase text-[#0A1B36]">
                Have another question about the service?
              </div>
              <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/80">
                Contact Gregory B. Levett &amp; Sons Funeral Homes &amp; Crematory for additional inquiries.
              </p>
            </div>
            <a
              href="tel:4042415656"
              className="font-display-title text-xs sm:text-sm font-bold tracking-[0.15em] bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] py-3 px-6 uppercase transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 border-2 border-[#0A1B36]"
            >
              <Phone className="w-4 h-4 text-[#C5A253]" />
              <span>Call (404) 241-5656</span>
            </a>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
