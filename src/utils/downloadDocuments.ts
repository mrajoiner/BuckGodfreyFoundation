export interface MemorialDocument {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  downloadUrl: string;
  size: string;
  pages: string;
  pageCount: number;
  description: string;
  jpegPages: {
    pageNumber: number;
    title: string;
    url: string;
  }[];
}

export const MEMORIAL_DOCUMENTS: MemorialDocument[] = [
  {
    id: 'program',
    title: 'Celebration Order of Service',
    subtitle: 'Official 4-Quarter Memorial Program & Tributes',
    // The public program download should match the Celebration of a Legend
    // flyer shown in the document viewer, rather than the older generated PDF.
    filename: 'William_Buck_Godfrey_Celebration_of_a_Legend_Flyer.jpg',
    downloadUrl: '/1.jpg',
    size: 'Original flyer',
    pages: '2 Pages',
    pageCount: 2,
    description:
      'The commemorative program for the Celebration of Life at the College Football Hall of Fame, featuring the four-quarter order of service, scripture readings, speakers, and tributes.',
    jpegPages: [
      {
        pageNumber: 1,
        title: 'Page 1 — Commemorative Cover & Event Details',
        url: '/1.jpg',
      },
      {
        pageNumber: 2,
        title: 'Page 2 — Official 4-Quarter Order of Service',
        url: '/2.jpg',
      },
    ],
  },
  {
    id: 'obituary',
    title: 'Obituary & Life Story',
    subtitle: 'Written by Gavin Godfrey • 3-Page Memoir & Biography',
    filename: 'William_Buck_Godfrey_Obituary_and_Life_Story.pdf',
    downloadUrl: '/documents/William_Buck_Godfrey_Obituary_and_Life_Story.pdf',
    size: '17 KB',
    pages: '3 Pages',
    pageCount: 3,
    description:
      'The comprehensive biographical narrative of Coach Buck Godfrey’s journey from Kracke Street in Charleston to Delaware State, coaching at Southwest DeKalb, his books, and family legacy.',
    jpegPages: [
      {
        pageNumber: 1,
        title: 'Page 1 — Origin Story & Young Athlete',
        url: '/documents/William_Buck_Godfrey_Obituary_Page_1.jpeg',
      },
      {
        pageNumber: 2,
        title: 'Page 2 — Southwest DeKalb & Coaching Legacy',
        url: '/documents/William_Buck_Godfrey_Obituary_Page_2.jpeg',
      },
      {
        pageNumber: 3,
        title: 'Page 3 — Hall of Fame & Family Tributes',
        url: '/documents/William_Buck_Godfrey_Obituary_Page_3.jpeg',
      },
    ],
  },
];

/**
 * Robust, cross-browser, iframe-safe download function with multi-tier fallback.
 * Works seamlessly in Chrome, Safari, iOS, Edge, and Sandboxed iframes.
 */
export async function downloadFileSafe(url: string, filename: string): Promise<boolean> {
  try {
    // Strategy 1: Fetch as Blob and create object URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/pdf, image/jpeg, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (e) {
        // Ignore cleanup errors
      }
    }, 1500);

    return true;
  } catch (err) {
    console.warn('Blob download encountered an issue, invoking direct fallback window/tab:', err);

    // Strategy 2: Direct new window / tab navigation escaping sandboxed iframe restrictions
    try {
      const fallbackUrl = url.includes('?') ? `${url}&download=1` : `${url}?download=1`;
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      return true;
    } catch (windowErr) {
      // Strategy 3: Direct standard link trigger
      try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 1000);
        return true;
      } catch (finalErr) {
        console.error('All download strategies failed:', finalErr);
        return false;
      }
    }
  }
}

export const triggerSingleDownload = (doc: MemorialDocument) => {
  downloadFileSafe(doc.downloadUrl, doc.filename);
};
