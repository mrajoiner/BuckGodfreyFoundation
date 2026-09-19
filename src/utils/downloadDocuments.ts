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

export const MEMORIAL_DOCUMENTS: MemorialDocument[] = [
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
];

export const triggerSingleDownload = (doc: MemorialDocument) => {
  const link = document.createElement('a');
  link.href = doc.downloadUrl;
  link.download = doc.filename;
  link.setAttribute('download', doc.filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const triggerSingleDownloadByUrl = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadBothDocuments = (
  onStatusChange?: (status: 'idle' | 'downloading' | 'completed') => void
) => {
  if (onStatusChange) onStatusChange('downloading');

  // Trigger Document 1
  triggerSingleDownload(MEMORIAL_DOCUMENTS[0]);

  // Trigger Document 2 with a 400ms delay so browsers don't suppress the second automated download
  setTimeout(() => {
    triggerSingleDownload(MEMORIAL_DOCUMENTS[1]);

    setTimeout(() => {
      if (onStatusChange) onStatusChange('completed');
    }, 1200);
  }, 400);
};
