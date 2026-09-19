export interface MemorialDocument {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  downloadUrl: string;
  viewUrl: string;
  size: string;
  pages: string;
  pageCount: number;
  type: string;
  description: string;
  jpegPages: {
    pageNumber: number;
    title: string;
    url: string;
    filename: string;
  }[];
}

export const COMBINED_MEMORIAL_DOCUMENT: MemorialDocument = {
  id: 'combined',
  title: 'Complete Memorial Commemorative Edition',
  subtitle: 'Official Celebration Program & Complete Obituary • 5-Page Commemorative Edition',
  filename: 'William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf',
  downloadUrl: '/api/documents/combined',
  viewUrl: '/api/documents/combined/view',
  size: '25 KB',
  pages: '5 Pages (Both Documents)',
  pageCount: 5,
  type: 'Combined PDF Document',
  description:
    'The complete official memorial commemorative edition containing both the Celebration of Life Program (Order of Service) and Coach Godfrey’s full Obituary & Life Story in a single document.',
  jpegPages: [
    {
      pageNumber: 1,
      title: 'Page 1 — Program Cover & Celebration Details',
      url: '/documents/William_Buck_Godfrey_Program_Page_1.jpeg',
      filename: 'William_Buck_Godfrey_Program_Page_1.jpeg',
    },
    {
      pageNumber: 2,
      title: 'Page 2 — Official 4-Quarter Order of Service',
      url: '/documents/William_Buck_Godfrey_Program_Page_2.jpeg',
      filename: 'William_Buck_Godfrey_Program_Page_2.jpeg',
    },
    {
      pageNumber: 3,
      title: 'Page 3 — Obituary: Origins & Young Athlete',
      url: '/documents/William_Buck_Godfrey_Obituary_Page_1.jpeg',
      filename: 'William_Buck_Godfrey_Obituary_Page_1.jpeg',
    },
    {
      pageNumber: 4,
      title: 'Page 4 — Obituary: Southwest DeKalb & Coaching Legacy',
      url: '/documents/William_Buck_Godfrey_Obituary_Page_2.jpeg',
      filename: 'William_Buck_Godfrey_Obituary_Page_2.jpeg',
    },
    {
      pageNumber: 5,
      title: 'Page 5 — Obituary: Hall of Fame & Family Tributes',
      url: '/documents/William_Buck_Godfrey_Obituary_Page_3.jpeg',
      filename: 'William_Buck_Godfrey_Obituary_Page_3.jpeg',
    },
  ],
};

export const MEMORIAL_DOCUMENTS: MemorialDocument[] = [
  {
    id: 'program',
    title: 'Celebration Order of Service',
    subtitle: 'Official 4-Quarter Memorial Program & Tributes',
    filename: 'William_Buck_Godfrey_Celebration_Order_of_Service.pdf',
    downloadUrl: '/api/documents/program',
    viewUrl: '/api/documents/program/view',
    size: '10 KB',
    pages: '2 Pages',
    pageCount: 2,
    type: 'PDF & High-Res JPEG Document',
    description:
      'The commemorative program for the Celebration of Life at the College Football Hall of Fame, featuring the four-quarter order of service, scripture readings, speakers, and tributes.',
    jpegPages: [
      {
        pageNumber: 1,
        title: 'Page 1 — Commemorative Cover & Event Details',
        url: '/documents/William_Buck_Godfrey_Program_Page_1.jpeg',
        filename: 'William_Buck_Godfrey_Program_Page_1.jpeg',
      },
      {
        pageNumber: 2,
        title: 'Page 2 — Official 4-Quarter Order of Service',
        url: '/documents/William_Buck_Godfrey_Program_Page_2.jpeg',
        filename: 'William_Buck_Godfrey_Program_Page_2.jpeg',
      },
    ],
  },
  {
    id: 'obituary',
    title: 'Obituary & Life Story',
    subtitle: 'Written by Gavin Godfrey • 3-Page Memoir & Biography',
    filename: 'William_Buck_Godfrey_Obituary_and_Life_Story.pdf',
    downloadUrl: '/api/documents/obituary',
    viewUrl: '/api/documents/obituary/view',
    size: '17 KB',
    pages: '3 Pages',
    pageCount: 3,
    type: 'PDF & High-Res JPEG Document',
    description:
      'The comprehensive biographical narrative of Coach Buck Godfrey’s journey from Kracke Street in Charleston to Delaware State, coaching at Southwest DeKalb, his books, and family legacy.',
    jpegPages: [
      {
        pageNumber: 1,
        title: 'Page 1 — Origin Story & Young Athlete',
        url: '/documents/William_Buck_Godfrey_Obituary_Page_1.jpeg',
        filename: 'William_Buck_Godfrey_Obituary_Page_1.jpeg',
      },
      {
        pageNumber: 2,
        title: 'Page 2 — Southwest DeKalb & Coaching Legacy',
        url: '/documents/William_Buck_Godfrey_Obituary_Page_2.jpeg',
        filename: 'William_Buck_Godfrey_Obituary_Page_2.jpeg',
      },
      {
        pageNumber: 3,
        title: 'Page 3 — Hall of Fame & Family Tributes',
        url: '/documents/William_Buck_Godfrey_Obituary_Page_3.jpeg',
        filename: 'William_Buck_Godfrey_Obituary_Page_3.jpeg',
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
        Accept: 'application/pdf, application/zip, image/jpeg, */*',
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

export const triggerSingleDownloadByUrl = (url: string, filename: string) => {
  downloadFileSafe(url, filename);
};

/**
 * Downloads both the Celebration Program and Obituary.
 * Defaults to downloading the complete commemorative edition containing both documents in one single PDF,
 * completely preventing browser popup blockers and iframe download interruptions.
 */
export const downloadBothDocuments = async (
  onStatusChange?: (status: 'idle' | 'downloading' | 'completed') => void
) => {
  if (onStatusChange) onStatusChange('downloading');

  try {
    // Download the Combined 5-page Commemorative Edition (Both Documents in 1 pristine PDF)
    await downloadFileSafe(
      COMBINED_MEMORIAL_DOCUMENT.downloadUrl,
      COMBINED_MEMORIAL_DOCUMENT.filename
    );

    if (onStatusChange) {
      setTimeout(() => onStatusChange('completed'), 800);
    }
  } catch (err) {
    console.error('Download both documents failed:', err);
    if (onStatusChange) onStatusChange('idle');
  }
};

/**
 * Downloads the complete memorial ZIP archive containing all PDFs and JPEGs.
 */
export const downloadMemorialArchiveZip = async (
  onStatusChange?: (status: 'idle' | 'downloading' | 'completed') => void
) => {
  if (onStatusChange) onStatusChange('downloading');

  try {
    await downloadFileSafe('/api/documents/zip', 'William_Buck_Godfrey_Memorial_Documents.zip');
    if (onStatusChange) {
      setTimeout(() => onStatusChange('completed'), 800);
    }
  } catch (err) {
    console.error('Download ZIP failed:', err);
    if (onStatusChange) onStatusChange('idle');
  }
};
