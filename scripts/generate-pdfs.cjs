const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'documents');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Common palette
const navy = [10, 27, 54]; // #0A1B36
const gold = [197, 162, 83]; // #C5A253
const darkGray = [40, 40, 40];
const lightGray = [100, 100, 100];

// Obituary content data
const obituaryPagesData = [
  // Page 1
  {
    sections: [
      {
        type: 'quote',
        text: '“The strength of a man is judged by his ability to succeed under overwhelming odds or survive under oppressive circumstances.”',
        author: '— W.H. Godfrey, from Songs For My Father',
      },
      {
        type: 'body',
        paragraphs: [
          'The year was 1943.',
          'America was in the throes of World War II. The New York Yankees were en route to a 10th World Series title. Black folks were navigating life in the segregated, Jim Crow South. Heroes of the Harlem Renaissance used their art to shed light on Black experiences stateside. Langston Hughes wrote a column for the Chicago Defender. Duke Ellington performed “Black, Brown, and Beige” at Carnegie Hall.',
          'In Charleston, South Carolina, Octavia and William Godfrey were celebrating the birth of their first son. They named him William. He was the eldest of their four boys. In his childhood, William picked up the nickname “Buck” from a community elder.',
          'Little did that old-timer or anyone living on the city’s north side know about what was to come.',
          'That kid they called Buck would build a legacy reaching from Kracke Street to the world. He would go on to become one of Georgia\'s most accomplished high school football coaches, an educator, author, scholar, mentor, and devoted family man. His impact extended far beyond the gridiron and classrooms, spanning generations.',
          'Every legend has an origin story.',
          'Buck was a gifted athlete from an early age. A standout baseball talent on sandlots and street diamonds.',
          'In fact, he and a group of 13 gifted Black boys from Charleston were on the verge of making American history in 1955. The Cannon Street YMCA All-Stars – composed of 11- and 12-year-olds – had the Little League World Series dreams. They qualified for and got invited to Williamsport, Pennsylvania.',
          'Instead, racism and segregation denied them a chance to play. Buck’s daddy, Mr. Bill, kept him home. If they weren’t playing, Buck wasn’t going. A sad development for what was likely the best team to never play in the Little League World Series.',
          'It was an experience that would inform and inspire Buck for decades to come. It was also the subject of his 2008 memoir, The Team Nobody Would Play.',
          '“We’d have won everything, and that’s not braggadocio, that’s just fact,” is what he told the Slate Magazine podcast, “One Year.”',
          '“We were well coached, we could run, and we could hit,” he said. “Most of all, we loved each other.”',
          'He graduated from Burke High School before earning scholarships in both baseball and football at Delaware State University. There, he distinguished himself as a standout student-athlete, serving as captain of both teams. Known for his bat since a youth, Buck won the CIAA batting title with an impressive .511 average, earning recognition as the university\'s most outstanding captain. He was Omega Psi Phi Fraternity\'s National Scholar in 1965.',
          'Buck also found true love.',
          'Her name was Joyce, the chocolate city girl from Philly who landed on the campus of Delaware State University as a freshman, and rocked the Gullah Geechee boy’s world. Theirs is a love that would endure for more than half a century.',
          'The journey that followed was both remarkable and diverse.',
          'His passion for learning led Buck to postgraduate fellowships at Columbia and New York Universities before completing a master\'s degree in English at Atlanta University.',
          'He pursued professional baseball with the New York Mets organization and competed successfully as a Golden Gloves middleweight boxer. He studied philosophers such as Marcus',
        ],
      },
    ],
  },
  // Page 2
  {
    sections: [
      {
        type: 'body',
        paragraphs: [
          'Aurelius and Epictetus. He loved western films.',
          'His career inspiring young minds started as an English teacher in New York City\'s Spanish Harlem.',
          'After relocating to Georgia, he discovered his true calling in coaching, a calling that would forever change the lives of thousands.',
          'After coaching at Gordon High School and Towers High School, Buck became the head football coach at Southwest DeKalb High School in 1983. Over the next 30 seasons, he transformed the Panthers into one of Georgia\'s premier football programs.',
          'Through it all was Joyce, who was more than hip to the game of x’s and o’s.',
          'She became a mastermind, even coaching and leading her own football team to several undefeated seasons at Glenwood Hills.',
          'Joyce would find a way down to the locker room at half time to give Buck adjustments she spotted from the stands. They both understood the game, which deepened their bond and love.',
          'That love brought their children Colin and Rashan into this world.',
          '“We had our own relationship. Daddy was my Father, but he was my best friend, too. We could talk about anything, and a lot of what we shared was just between us. I don’t know that I can fully explain it. We just understood each other,” said Colin, who also played for Buck and went on to be an All-American punter at Tennessee State University.',
          'Daddy’s lessons led Rashan to excel at swimming, which landed her an athletic scholarship at Florida A&M University.',
          '“Every girl should be able to look at her Father and feel completely consumed by his love. That was and will continue to be my reality. I have been loved so incredibly well,” Rashan said.',
          '“It’s a badge of honor that has shaped the woman I am.”',
          'Under his leadership, Southwest DeKalb captured the 1995 GHSA Class AAAA State Championship, claimed 13 region championships, finished as state runner-up in 1990, and never experienced a losing regular season.',
          'With a career record of 273-89-1, he became the winningest football coach in DeKalb County history. No Black coach in the state has more wins.',
          'Once asked about why he hadn’t yet embraced retirement, his answer was true to Coach Godfrey.',
          '“I have this sick thing in me called loyalty. And I just love the kids,” he said. “Simple as that.”',
          'This was true in how Buck measured success by far more than victories. His proudest accomplishments were the lives he changed. More than 300 student-athletes earned college scholarships under his mentorship, with many going on to graduate school, professional careers, and the National Football League.',
          'To Coach Godfrey, developing character, discipline, education, and opportunity shone brighter than Friday night lights.',
          '“We’ve got more scholarships than wins. My vision is to save all children. I know I can’t do it, but I can save a few,” he told the Atlanta Journal-Constitution.',
          'A gifted storyteller, Buck was also an accomplished author whose books – Moods of a Black Man, Songs For My Father, The Team Nobody Would Play, My Friend Eddie Robinson, Where the Woodbine Twineth and the Sycamore Ceased to Bloom – reflected his love of history, family, sports, and humanity.',
        ],
      },
    ],
  },
  // Page 3
  {
    sections: [
      {
        type: 'body',
        paragraphs: [
          '“I\'m engrossed in the language,” he once said about his love for writing and teaching English.',
          'Buck’s remarkable career earned inductions into the Delaware State Athletic Hall of Fame, the Atlanta Sports Hall of Fame, the Georgia Coaches Association Hall of Fame, and the Georgia Sports Hall of Fame. In 2015, Southwest DeKalb\'s home field was permanently renamed William “Buck” Godfrey Stadium, ensuring that generations of athletes would continue to walk in the legacy he built.',
          'More than titles and accolades, Buck cherished his family.',
          'To them, he’s William. Buck. Billy. The Patriarch. Daddy. Unc.',
          'Buck and Joyce’s love story spanned 58 years of marriage. He found his greatest joy in being a husband, father, grandfather, mentor, and friend.',
          'He is lovingly remembered by his wife, Joyce; brother, Frank Godfrey; his adult children Colin Godfrey (Deanna) and Rashan Ali Smith (Brian); four beloved granddaughters, Bailey, Gabrielle, Carter, and Morgan, who knew and affectionately referred to him as, “Papi.” That affection is also shared by Buck’s nieces, nephews and extended family.',
          'He was preceded in death by his parents, Octavia and William Godfrey; brothers, Robert Godfrey and John Godfrey.',
          'Buck from Kracke Street built a legacy that lives on not only in stadiums and record books, but in the countless lives he inspired.',
          'In his own words, “Death is a moment, but memories of a great man last forever.”',
          'Lucky for us, we’re able to say we lived in the time of Buck Godfrey.',
          'His is a legend worth telling, a life worth celebrating.',
          '— Gavin Godfrey',
        ],
      },
    ],
  },
];

function drawObituaryPage(doc, pageData, pageIndex, totalPages) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 54;
  const contentWidth = pageWidth - margin * 2;

  // Top gold & navy border accent
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(margin, 28, contentWidth, 3, 'F');

  // Header on each page
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('COACH WILLIAM "BUCK" GODFREY, JR.', margin, 42);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('Official Life Story & Obituary', pageWidth - margin, 42, { align: 'right' });

  let y = 64;

  pageData.sections.forEach((sec) => {
    if (sec.type === 'quote') {
      doc.setFillColor(248, 246, 240);
      doc.roundedRect(margin, y, contentWidth, 54, 4, 4, 'F');
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(1.5);
      doc.line(margin, y, margin, y + 54);

      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      const quoteLines = doc.splitTextToSize(sec.text, contentWidth - 28);
      doc.text(quoteLines, margin + 14, y + 20);

      doc.setFont('times', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(gold[0], gold[1], gold[2]);
      doc.text(sec.author, margin + 14, y + 42);

      y += 68;
    }

    if (sec.type === 'body') {
      doc.setFont('times', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

      sec.paragraphs.forEach((p) => {
        const isQuoteOrSignature = p.startsWith('“') || p.startsWith('—') || p.startsWith('"');
        if (p.startsWith('— Gavin Godfrey')) {
          y += 8;
          doc.setFont('times', 'bold');
          doc.setFontSize(10.5);
          doc.setTextColor(navy[0], navy[1], navy[2]);
        } else if (isQuoteOrSignature) {
          doc.setFont('times', 'italic');
          doc.setFontSize(9.5);
          doc.setTextColor(navy[0], navy[1], navy[2]);
        } else {
          doc.setFont('times', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        }

        const lines = doc.splitTextToSize(p, contentWidth);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 5;
      });
    }
  });

  // Page footer
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, pageHeight - 36, pageWidth - margin, pageHeight - 36);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('The William Buck Godfrey Legacy Foundation • williambuckgodfrey.com', margin, pageHeight - 24);
  doc.text(`Page ${pageIndex} of ${totalPages}`, pageWidth - margin, pageHeight - 24, { align: 'right' });
}

function drawOrderOfServiceCover(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background navy
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Double gold decorative border
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(2);
  doc.rect(36, 36, pageWidth - 72, pageHeight - 72);
  doc.setLineWidth(0.8);
  doc.rect(42, 42, pageWidth - 84, pageHeight - 84);

  // Top header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('CELEBRATION OF A', pageWidth / 2, 110, { align: 'center' });

  doc.setFontSize(38);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('LEGEND', pageWidth / 2, 150, { align: 'center' });

  // Center banner
  doc.setFillColor(15, 38, 74);
  doc.roundedRect(pageWidth / 2 - 160, 210, 320, 240, 8, 8, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.5);
  doc.roundedRect(pageWidth / 2 - 160, 210, 320, 240, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('WILLIAM', pageWidth / 2, 280, { align: 'center' });

  doc.setFontSize(44);
  doc.setTextColor(255, 255, 255);
  doc.text('“BUCK”', pageWidth / 2, 335, { align: 'center' });

  doc.setFontSize(26);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('GODFREY, JR.', pageWidth / 2, 385, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(200, 210, 225);
  doc.setFont('helvetica', 'normal');
  doc.text('1943 — 2026', pageWidth / 2, 418, { align: 'center' });

  // Event Date & Time
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text('SATURDAY, SEPTEMBER 19, 2026  |  5:00 PM', pageWidth / 2, 530, { align: 'center' });

  // Venue
  doc.setFontSize(15);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('COLLEGE FOOTBALL HALL OF FAME', pageWidth / 2, 570, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(230, 235, 245);
  doc.text('250 MARIETTA STREET NORTHWEST', pageWidth / 2, 595, { align: 'center' });
  doc.text('ATLANTA, GA 30313', pageWidth / 2, 615, { align: 'center' });

  // Footer on cover
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP FOUNDATION', pageWidth / 2, 710, { align: 'center' });
}

function drawOrderOfServiceProgram(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background navy
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Double gold decorative border
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(2);
  doc.rect(36, 36, pageWidth - 72, pageHeight - 72);
  doc.setLineWidth(0.8);
  doc.rect(42, 42, pageWidth - 84, pageHeight - 84);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('ORDER OF SERVICE', pageWidth / 2, 75, { align: 'center' });

  // Master of ceremony
  doc.setFontSize(10.5);
  doc.setTextColor(215, 185, 115);
  doc.text('MASTER OF CEREMONY — PASTOR JESSE CURNEY, III', pageWidth / 2, 98, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(200, 210, 230);
  doc.text('New Mercies Christian Church', pageWidth / 2, 112, { align: 'center' });

  // Divider
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 120, 124, pageWidth / 2 + 120, 124);

  let curY = 145;

  // Processional & Opening Prayer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Processional', pageWidth / 2, curY, { align: 'center' });
  curY += 26;

  doc.text('Opening Prayer', pageWidth / 2, curY, { align: 'center' });
  curY += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Pastor Jesse Curney, III', pageWidth / 2, curY, { align: 'center' });
  curY += 32;

  const quarters = [
    {
      quarter: '1ST QUARTER — THE MAN',
      items: [
        { label: 'Scripture Readings', name: 'Michelle Williams' },
        { label: 'Scriptures', name: 'Psalm 37: 3-6  |  Philippians 4: 4-9' },
      ],
    },
    {
      quarter: '2ND QUARTER — THE VISIONARY',
      items: [
        { label: 'Musical Selection', name: 'Dawn Bynoe — “It Is Well With My Soul”' },
        { label: 'Remarks & Reflections (3 minutes please)', name: 'Reginald Tompkins   •   Quincy Carter   •   Frank Godfrey, Sr.' },
      ],
    },
    {
      quarter: '3RD QUARTER — THE LEADER',
      items: [
        { label: 'Family Tribute', name: 'Granddaughters’ Tribute' },
        { label: 'Acknowledgements & Commendations', name: 'State Representative Inga Willis  •  State Representative Omari Crawford' },
      ],
    },
    {
      quarter: '4TH QUARTER — THE LEGEND',
      items: [
        { label: 'His Life. His Legacy. His Way.', name: 'Rashan Ali Smith' },
        { label: 'Benediction | Committal', name: 'Pastor Jesse Curney, III' },
        { label: 'Recessional', name: '' },
      ],
    },
  ];

  quarters.forEach((q) => {
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.roundedRect(pageWidth / 2 - 135, curY - 12, 270, 22, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text(q.quarter, pageWidth / 2, curY + 3, { align: 'center' });

    curY += 26;

    q.items.forEach((it) => {
      if (it.label) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(255, 255, 255);
        doc.text(it.label, pageWidth / 2, curY, { align: 'center' });
        curY += 14;
      }
      if (it.name) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(gold[0], gold[1], gold[2]);
        doc.text(it.name, pageWidth / 2, curY, { align: 'center' });
        curY += 16;
      }
    });

    curY += 10;
  });

  // Levett & Sons Footer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(215, 185, 115);
  doc.text('SERVICES ENTRUSTED TO', pageWidth / 2, pageHeight - 75, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('GREGORY B. LEVETT & SONS FUNERAL HOMES & CREMATORY', pageWidth / 2, pageHeight - 60, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('(404) 241-5656   •   levettfuneralhome.com', pageWidth / 2, pageHeight - 47, { align: 'center' });
}

// ---------------------------------------------------------------------------
// 1. GENERATE OBITUARY PDF (3 PAGES)
// ---------------------------------------------------------------------------
function generateObituaryPdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  obituaryPagesData.forEach((pageData, idx) => {
    if (idx > 0) doc.addPage();
    drawObituaryPage(doc, pageData, idx + 1, 3);
  });

  const filePath = path.join(outDir, 'William_Buck_Godfrey_Obituary_and_Life_Story.pdf');
  fs.writeFileSync(filePath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', filePath);
}

// ---------------------------------------------------------------------------
// 2. GENERATE ORDER OF SERVICE PDF (2 PAGES)
// ---------------------------------------------------------------------------
function generateOrderOfServicePdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  drawOrderOfServiceCover(doc);
  doc.addPage();
  drawOrderOfServiceProgram(doc);

  const filePath = path.join(outDir, 'William_Buck_Godfrey_Celebration_Order_of_Service.pdf');
  fs.writeFileSync(filePath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', filePath);
}

generateObituaryPdf();
generateOrderOfServicePdf();
