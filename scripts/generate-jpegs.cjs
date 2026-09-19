const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'documents');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to escape XML characters
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ---------------------------------------------------------------------------
// 1. CELEBRATION PROGRAM - PAGE 1 (COVER)
// ---------------------------------------------------------------------------
function generateProgramPage1Svg() {
  const width = 1200;
  const height = 1600;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#071326"/>
        <stop offset="50%" stop-color="#0A1B36"/>
        <stop offset="100%" stop-color="#0E2447"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F2DF99"/>
        <stop offset="50%" stop-color="#C5A253"/>
        <stop offset="100%" stop-color="#9C7B32"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.45"/>
      </filter>
    </defs>

    <!-- Deep Navy Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

    <!-- Outer Gold Border -->
    <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="#C5A253" stroke-width="4"/>

    <!-- Inner Fine Gold Border -->
    <rect x="52" y="52" width="${width - 104}" height="${height - 104}" fill="none" stroke="#C5A253" stroke-width="1.5" stroke-opacity="0.7"/>

    <!-- Corner Accents -->
    <path d="M40 70 L70 40 M${width-40} 70 L${width-70} 40 M40 ${height-70} L70 ${height-40} M${width-40} ${height-70} L${width-70} ${height-40}" stroke="#C5A253" stroke-width="2"/>

    <!-- Top Badge / Header -->
    <g transform="translate(${width/2}, 160)" text-anchor="middle">
      <text y="0" font-family="'Georgia', 'Times New Roman', serif" font-size="28" font-weight="bold" fill="#E8D39E" letter-spacing="8">CELEBRATION OF A</text>
      <text y="70" font-family="'Impact', 'Arial Black', sans-serif" font-size="76" font-weight="900" fill="url(#goldGrad)" letter-spacing="14">LEGEND</text>
      <line x1="-180" y1="105" x2="180" y2="105" stroke="#C5A253" stroke-width="3"/>
      <circle cx="0" cy="105" r="5" fill="#C5A253"/>
    </g>

    <!-- Central Commemorative Portrait Frame -->
    <g transform="translate(${width/2}, 560)">
      <!-- Frame box -->
      <rect x="-380" y="-190" width="760" height="380" rx="16" fill="#0D2140" stroke="#C5A253" stroke-width="3" filter="url(#shadow)"/>
      <rect x="-370" y="-180" width="740" height="360" rx="12" fill="none" stroke="#C5A253" stroke-width="1" stroke-dasharray="8 6"/>

      <!-- Name Presentation -->
      <text y="-70" text-anchor="middle" font-family="'Georgia', 'Times New Roman', serif" font-size="44" font-weight="bold" fill="url(#goldGrad)" letter-spacing="10">WILLIAM</text>
      <text y="25" text-anchor="middle" font-family="'Impact', 'Arial Black', sans-serif" font-size="94" font-weight="900" fill="#FFFFFF" letter-spacing="6">“BUCK”</text>
      <text y="105" text-anchor="middle" font-family="'Georgia', 'Times New Roman', serif" font-size="46" font-weight="bold" fill="url(#goldGrad)" letter-spacing="8">GODFREY, JR.</text>

      <!-- Life Dates -->
      <rect x="-140" y="130" width="280" height="36" rx="6" fill="#0A1B36" stroke="#C5A253" stroke-width="1.5"/>
      <text y="154" text-anchor="middle" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#E8D39E" letter-spacing="6">1943 — 2026</text>
    </g>

    <!-- Service Details -->
    <g transform="translate(${width/2}, 980)" text-anchor="middle">
      <text y="0" font-family="'Arial', sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" letter-spacing="4">SATURDAY, SEPTEMBER 19, 2026</text>
      <text y="42" font-family="'Arial', sans-serif" font-size="24" font-weight="bold" fill="#E8D39E" letter-spacing="6">5:00 PM EST</text>

      <line x1="-120" y1="75" x2="120" y2="75" stroke="#C5A253" stroke-width="2"/>

      <text y="125" font-family="'Georgia', 'Times New Roman', serif" font-size="34" font-weight="bold" fill="url(#goldGrad)" letter-spacing="4">COLLEGE FOOTBALL HALL OF FAME</text>
      <text y="170" font-family="'Arial', sans-serif" font-size="22" fill="#E2E8F0" letter-spacing="2">250 MARIETTA STREET NORTHWEST</text>
      <text y="202" font-family="'Arial', sans-serif" font-size="22" fill="#CBD5E1" letter-spacing="2">ATLANTA, GEORGIA 30313</text>
    </g>

    <!-- Master of Ceremony Plaque -->
    <g transform="translate(${width/2}, 1320)" text-anchor="middle">
      <rect x="-300" y="-35" width="600" height="70" rx="8" fill="#0D2140" stroke="#C5A253" stroke-width="1.5"/>
      <text y="-6" font-family="'Arial', sans-serif" font-size="16" font-weight="bold" fill="#C5A253" letter-spacing="3">MASTER OF CEREMONY</text>
      <text y="20" font-family="'Georgia', 'Times New Roman', serif" font-size="20" font-weight="bold" fill="#FFFFFF">Pastor Jesse Curney, III • New Mercies Christian Church</text>
    </g>

    <!-- Bottom Emblem & Foundation Seal -->
    <g transform="translate(${width/2}, 1500)" text-anchor="middle">
      <line x1="-240" y1="-25" x2="240" y2="-25" stroke="#C5A253" stroke-width="1"/>
      <text y="0" font-family="'Arial', sans-serif" font-size="15" font-weight="bold" fill="#C5A253" letter-spacing="3">THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP FOUNDATION</text>
      <text y="24" font-family="'Courier New', monospace" font-size="13" fill="#94A3B8" letter-spacing="2">OFFICIAL CELEBRATION ORDER OF SERVICE • PAGE 1 OF 2</text>
    </g>
  </svg>
  `;
}

// ---------------------------------------------------------------------------
// 2. CELEBRATION PROGRAM - PAGE 2 (ORDER OF SERVICE)
// ---------------------------------------------------------------------------
function generateProgramPage2Svg() {
  const width = 1200;
  const height = 1600;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#071326"/>
        <stop offset="50%" stop-color="#0A1B36"/>
        <stop offset="100%" stop-color="#0E2447"/>
      </linearGradient>
      <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F2DF99"/>
        <stop offset="50%" stop-color="#C5A253"/>
        <stop offset="100%" stop-color="#9C7B32"/>
      </linearGradient>
    </defs>

    <!-- Background & Borders -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad2)"/>
    <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="#C5A253" stroke-width="4"/>
    <rect x="52" y="52" width="${width - 104}" height="${height - 104}" fill="none" stroke="#C5A253" stroke-width="1.5" stroke-opacity="0.7"/>

    <!-- Header Section -->
    <g transform="translate(${width/2}, 110)" text-anchor="middle">
      <text y="0" font-family="'Impact', 'Arial Black', sans-serif" font-size="44" font-weight="900" fill="url(#goldGrad2)" letter-spacing="6">ORDER OF SERVICE</text>
      <text y="32" font-family="'Arial', sans-serif" font-size="16" font-weight="bold" fill="#E8D39E" letter-spacing="3">MASTER OF CEREMONY: PASTOR JESSE CURNEY, III</text>
      <text y="54" font-family="'Arial', sans-serif" font-size="14" fill="#94A3B8">New Mercies Christian Church</text>
      <line x1="-220" y1="72" x2="220" y2="72" stroke="#C5A253" stroke-width="2"/>
    </g>

    <!-- Pre-Service & Opening Items -->
    <g transform="translate(100, 240)">
      <rect x="0" y="0" width="1000" height="100" rx="8" fill="#0D2140" stroke="#C5A253" stroke-width="1.5"/>
      <text x="30" y="40" font-family="'Georgia', serif" font-size="22" font-weight="bold" fill="#FFFFFF">Processional</text>
      <text x="970" y="40" text-anchor="end" font-family="'Arial', sans-serif" font-size="16" fill="#C5A253">Ministers &amp; Family</text>

      <line x1="30" y1="55" x2="970" y2="55" stroke="#1E3A5F" stroke-width="1"/>

      <text x="30" y="82" font-family="'Georgia', serif" font-size="22" font-weight="bold" fill="#FFFFFF">Opening Prayer</text>
      <text x="970" y="82" text-anchor="end" font-family="'Arial', sans-serif" font-size="18" font-weight="bold" fill="#C5A253">Pastor Jesse Curney, III</text>
    </g>

    <!-- 1ST QUARTER -->
    <g transform="translate(100, 375)">
      <rect x="0" y="0" width="1000" height="42" rx="4" fill="#C5A253"/>
      <text x="20" y="28" font-family="'Arial Black', sans-serif" font-size="18" font-weight="900" fill="#0A1B36" letter-spacing="2">1ST QUARTER — THE MAN</text>

      <rect x="0" y="42" width="1000" height="135" fill="#08172D" stroke="#1E3A5F" stroke-width="1"/>
      <text x="25" y="85" font-family="'Arial', sans-serif" font-size="18" font-weight="bold" fill="#E2E8F0">Scripture Readings</text>
      <text x="975" y="85" text-anchor="end" font-family="'Georgia', serif" font-size="20" font-weight="bold" fill="#E8D39E">Michelle Williams</text>

      <line x1="25" y1="110" x2="975" y2="110" stroke="#162D4A" stroke-width="1"/>

      <text x="25" y="145" font-family="'Arial', sans-serif" font-size="16" fill="#94A3B8">Scripture Verses</text>
      <text x="975" y="145" text-anchor="end" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#C5A253">Psalm 37: 3-6  |  Philippians 4: 4-9</text>
    </g>

    <!-- 2ND QUARTER -->
    <g transform="translate(100, 585)">
      <rect x="0" y="0" width="1000" height="42" rx="4" fill="#C5A253"/>
      <text x="20" y="28" font-family="'Arial Black', sans-serif" font-size="18" font-weight="900" fill="#0A1B36" letter-spacing="2">2ND QUARTER — THE VISIONARY</text>

      <rect x="0" y="42" width="1000" height="160" fill="#08172D" stroke="#1E3A5F" stroke-width="1"/>
      <text x="25" y="85" font-family="'Arial', sans-serif" font-size="18" font-weight="bold" fill="#E2E8F0">Musical Selection</text>
      <text x="975" y="85" text-anchor="end" font-family="'Georgia', serif" font-size="20" font-weight="bold" fill="#E8D39E">Dawn Bynoe — “It Is Well With My Soul”</text>

      <line x1="25" y1="110" x2="975" y2="110" stroke="#162D4A" stroke-width="1"/>

      <text x="25" y="140" font-family="'Arial', sans-serif" font-size="17" font-weight="bold" fill="#E2E8F0">Remarks &amp; Reflections</text>
      <text x="25" y="165" font-family="'Arial', sans-serif" font-size="14" fill="#94A3B8">(3 minutes please)</text>
      <text x="975" y="145" text-anchor="end" font-family="'Georgia', serif" font-size="18" font-weight="bold" fill="#C5A253">Reginald Tompkins  •  Quincy Carter  •  Frank Godfrey, Sr.</text>
    </g>

    <!-- 3RD QUARTER -->
    <g transform="translate(100, 820)">
      <rect x="0" y="0" width="1000" height="42" rx="4" fill="#C5A253"/>
      <text x="20" y="28" font-family="'Arial Black', sans-serif" font-size="18" font-weight="900" fill="#0A1B36" letter-spacing="2">3RD QUARTER — THE LEADER</text>

      <rect x="0" y="42" width="1000" height="150" fill="#08172D" stroke="#1E3A5F" stroke-width="1"/>
      <text x="25" y="85" font-family="'Arial', sans-serif" font-size="18" font-weight="bold" fill="#E2E8F0">Family Tribute</text>
      <text x="975" y="85" text-anchor="end" font-family="'Georgia', serif" font-size="20" font-weight="bold" fill="#E8D39E">Granddaughters’ Tribute</text>

      <line x1="25" y1="110" x2="975" y2="110" stroke="#162D4A" stroke-width="1"/>

      <text x="25" y="145" font-family="'Arial', sans-serif" font-size="17" font-weight="bold" fill="#E2E8F0">Acknowledgements &amp; Commendations</text>
      <text x="975" y="145" text-anchor="end" font-family="'Georgia', serif" font-size="18" font-weight="bold" fill="#C5A253">State Rep. Inga Willis  •  State Rep. Omari Crawford</text>
    </g>

    <!-- 4TH QUARTER -->
    <g transform="translate(100, 1045)">
      <rect x="0" y="0" width="1000" height="42" rx="4" fill="#C5A253"/>
      <text x="20" y="28" font-family="'Arial Black', sans-serif" font-size="18" font-weight="900" fill="#0A1B36" letter-spacing="2">4TH QUARTER — THE LEGEND</text>

      <rect x="0" y="42" width="1000" height="190" fill="#08172D" stroke="#1E3A5F" stroke-width="1"/>
      <text x="25" y="85" font-family="'Arial', sans-serif" font-size="18" font-weight="bold" fill="#E2E8F0">His Life. His Legacy. His Way.</text>
      <text x="975" y="85" text-anchor="end" font-family="'Georgia', serif" font-size="22" font-weight="bold" fill="url(#goldGrad2)">Rashan Ali Smith</text>

      <line x1="25" y1="110" x2="975" y2="110" stroke="#162D4A" stroke-width="1"/>

      <text x="25" y="140" font-family="'Arial', sans-serif" font-size="18" font-weight="bold" fill="#E2E8F0">Benediction | Committal</text>
      <text x="975" y="140" text-anchor="end" font-family="'Georgia', serif" font-size="20" font-weight="bold" fill="#E8D39E">Pastor Jesse Curney, III</text>

      <line x1="25" y1="160" x2="975" y2="160" stroke="#162D4A" stroke-width="1"/>

      <text x="25" y="195" font-family="'Arial', sans-serif" font-size="18" font-weight="bold" fill="#E2E8F0">Recessional</text>
      <text x="975" y="195" text-anchor="end" font-family="'Arial', sans-serif" font-size="16" fill="#C5A253">Family &amp; Attendees</text>
    </g>

    <!-- Footer -->
    <g transform="translate(${width/2}, 1500)" text-anchor="middle">
      <line x1="-240" y1="-25" x2="240" y2="-25" stroke="#C5A253" stroke-width="1"/>
      <text y="0" font-family="'Arial', sans-serif" font-size="15" font-weight="bold" fill="#C5A253" letter-spacing="3">THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP FOUNDATION</text>
      <text y="24" font-family="'Courier New', monospace" font-size="13" fill="#94A3B8" letter-spacing="2">OFFICIAL CELEBRATION ORDER OF SERVICE • PAGE 2 OF 2</text>
    </g>
  </svg>
  `;
}

// ---------------------------------------------------------------------------
// 3. OBITUARY & LIFE STORY - PAGES 1, 2, 3
// ---------------------------------------------------------------------------
function wrapText(text, maxChars = 85) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxChars) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }
  return lines;
}

function generateObituaryPageSvg(pageNumber) {
  const width = 1200;
  const height = 1650;
  const margin = 80;
  const contentWidth = width - margin * 2;

  let pageContent = '';

  if (pageNumber === 1) {
    const p1 = [
      'The year was 1943.',
      'America was in the throes of World War II. The New York Yankees were en route to a 10th World Series title. Black folks were navigating life in the segregated, Jim Crow South. Heroes of the Harlem Renaissance used their art to shed light on Black experiences stateside. Langston Hughes wrote a column for the Chicago Defender. Duke Ellington performed “Black, Brown, and Beige” at Carnegie Hall.',
      'In Charleston, South Carolina, Octavia and William Godfrey were celebrating the birth of their first son. They named him William. He was the eldest of their four boys. In his childhood, William picked up the nickname “Buck” from a community elder.',
      'Little did that old-timer or anyone living on the city’s north side know about what was to come.',
      'That kid they called Buck would build a legacy reaching from Kracke Street to the world. He would go on to become one of Georgia\'s most accomplished high school football coaches, an educator, author, scholar, mentor, and devoted family man. His impact extended far beyond the gridiron and classrooms, spanning generations.',
      'Every legend has an origin story.',
      'Buck was a gifted athlete from an early age. A standout baseball talent on sandlots and street diamonds.',
      'In fact, he and a group of 13 gifted Black boys from Charleston were on the verge of making American history in 1955. The Cannon Street YMCA All-Stars – composed of 11- and 12-year-olds – had Little League World Series dreams. They qualified for and got invited to Williamsport, Pennsylvania.',
      'Instead, racism and segregation denied them a chance to play. Buck’s daddy, Mr. Bill, kept him home. If they weren’t playing, Buck wasn’t going. A sad development for what was likely the best team to never play in the Little League World Series.',
      'It was an experience that would inform and inspire Buck for decades to come. It was also the subject of his 2008 memoir, The Team Nobody Would Play.',
      '“We’d have won everything, and that’s not braggadocio, that’s just fact,” is what he told the Slate Magazine podcast, “One Year.”',
      '“We were well coached, we could run, and we could hit,” he said. “Most of all, we loved each other.”',
      'He graduated from Burke High School before earning scholarships in both baseball and football at Delaware State University. There, he distinguished himself as a standout student-athlete, serving as captain of both teams. Known for his bat since youth, Buck won the CIAA batting title with an impressive .511 average, earning recognition as the university\'s most outstanding captain. He was Omega Psi Phi Fraternity\'s National Scholar in 1965.',
      'Buck also found true love.',
      'Her name was Joyce, the chocolate city girl from Philly who landed on the campus of Delaware State University as a freshman, and rocked the Gullah Geechee boy’s world. Theirs is a love that would endure for more than half a century.',
      'The journey that followed was both remarkable and diverse. His passion for learning led Buck to postgraduate fellowships at Columbia and New York Universities before completing a master\'s degree in English at Atlanta University.',
      'He pursued professional baseball with the New York Mets organization and competed successfully as a Golden Gloves middleweight boxer. He studied philosophers such as Marcus Aurelius and Epictetus. He loved western films.',
    ];

    let y = 340;
    const bodyParagraphs = p1.map((p) => {
      const isQuote = p.startsWith('“');
      const lines = wrapText(p, isQuote ? 80 : 86);
      const startY = y;
      y += lines.length * 24 + 14;

      return `
        <g transform="translate(${margin}, ${startY})">
          ${lines.map((l, idx) => `
            <text x="0" y="${idx * 24}" font-family="'Georgia', 'Times New Roman', serif" font-size="${isQuote ? '18' : '17.5'}" font-style="${isQuote ? 'italic' : 'normal'}" font-weight="${isQuote ? 'bold' : 'normal'}" fill="${isQuote ? '#0A1B36' : '#2D3748'}">${escapeXml(l)}</text>
          `).join('')}
        </g>
      `;
    }).join('');

    pageContent = `
      <!-- Page 1 Title & Epigraph -->
      <g transform="translate(${width/2}, 130)" text-anchor="middle">
        <text y="0" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" fill="#C5A253" letter-spacing="4">OFFICIAL MEMOIR &amp; BIOGRAPHY</text>
        <text y="38" font-family="'Georgia', serif" font-size="34" font-weight="900" fill="#0A1B36" letter-spacing="2">WILLIAM “BUCK” GODFREY, JR.</text>
        <text y="68" font-family="'Georgia', serif" font-size="18" font-style="italic" fill="#718096">Written by Gavin Godfrey</text>
      </g>

      <!-- Epigraph Box -->
      <g transform="translate(${margin}, 225)">
        <rect x="0" y="0" width="${contentWidth}" height="85" rx="6" fill="#F4EFE6" stroke="#C5A253" stroke-width="1.5"/>
        <line x1="0" y1="0" x2="6" y2="85" stroke="#C5A253" stroke-width="6"/>
        <text x="24" y="36" font-family="'Georgia', serif" font-size="17" font-style="italic" fill="#0A1B36">“The strength of a man is judged by his ability to succeed under overwhelming odds or survive under oppressive circumstances.”</text>
        <text x="24" y="65" font-family="'Arial', sans-serif" font-size="14" font-weight="bold" fill="#C5A253">— W.H. Godfrey, from Songs For My Father</text>
      </g>

      ${bodyParagraphs}
    `;
  } else if (pageNumber === 2) {
    const p2 = [
      'His career inspiring young minds started as an English teacher in New York City\'s Spanish Harlem.',
      'After relocating to Georgia, he discovered his true calling in coaching, a calling that would forever change the lives of thousands.',
      'After coaching at Gordon High School and Towers High School, Buck became the head football coach at Southwest DeKalb High School in 1983. Over the next 30 seasons, he transformed the Panthers into one of Georgia\'s premier football programs.',
      'Through it all was Joyce, who was more than hip to the game of x’s and o’s.',
      'She became a mastermind, even coaching and leading her own football team to several undefeated seasons at Glenwood Hills.',
      'Joyce would find a way down to the locker room at half time to give Buck adjustments she spotted from the stands. They both understood the game, which deepened their bond and love.',
      'That love brought their children Colin and Rashan into this world.',
      '“We had our own relationship. Daddy was my Father, but he was my best friend, too. We could talk about anything, and a lot of what we shared was just between us. I don’t know that I can fully explain it. We just understood each other,” said Colin, who also played for Buck and went on to be an All-American punter at Tennessee State University.',
      'Daddy’s lessons led Rashan to excel at swimming, which landed her an athletic scholarship at Florida A&M University.',
      '“Every girl should be able to look at her Father and feel completely consumed by his love. That was and will continue to be my reality. I have been loved so incredibly well,” Rashan said. “It’s a badge of honor that has shaped the woman I am.”',
      'Under his leadership, Southwest DeKalb captured the 1995 GHSA Class AAAA State Championship, claimed 13 region championships, finished as state runner-up in 1990, and never experienced a losing regular season.',
      'With a career record of 273-89-1, he became the winningest football coach in DeKalb County history. No Black coach in the state has more wins.',
      'Once asked about why he hadn’t yet embraced retirement, his answer was true to Coach Godfrey.',
      '“I have this sick thing in me called loyalty. And I just love the kids,” he said. “Simple as that.”',
      'This was true in how Buck measured success by far more than victories. His proudest accomplishments were the lives he changed. More than 300 student-athletes earned college scholarships under his mentorship, with many going on to graduate school, professional careers, and the National Football League.',
      'To Coach Godfrey, developing character, discipline, education, and opportunity shone brighter than Friday night lights.',
      '“We’ve got more scholarships than wins. My vision is to save all children. I know I can’t do it, but I can save a few,” he told the Atlanta Journal-Constitution.',
      'A gifted storyteller, Buck was also an accomplished author whose books – Moods of a Black Man, Songs For My Father, The Team Nobody Would Play, My Friend Eddie Robinson, Where the Woodbine Twineth and the Sycamore Ceased to Bloom – reflected his love of history, family, sports, and humanity.',
    ];

    let y = 140;
    const bodyParagraphs = p2.map((p) => {
      const isQuote = p.startsWith('“');
      const lines = wrapText(p, isQuote ? 80 : 86);
      const startY = y;
      y += lines.length * 24 + 14;

      return `
        <g transform="translate(${margin}, ${startY})">
          ${lines.map((l, idx) => `
            <text x="0" y="${idx * 24}" font-family="'Georgia', 'Times New Roman', serif" font-size="${isQuote ? '18' : '17.5'}" font-style="${isQuote ? 'italic' : 'normal'}" font-weight="${isQuote ? 'bold' : 'normal'}" fill="${isQuote ? '#0A1B36' : '#2D3748'}">${escapeXml(l)}</text>
          `).join('')}
        </g>
      `;
    }).join('');

    pageContent = `
      <!-- Page Header -->
      <g transform="translate(${width/2}, 90)" text-anchor="middle">
        <text y="0" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#C5A253" letter-spacing="3">WILLIAM “BUCK” GODFREY, JR. • OBITUARY &amp; LIFE STORY</text>
        <line x1="-300" y1="18" x2="300" y2="18" stroke="#E2E8F0" stroke-width="1.5"/>
      </g>

      ${bodyParagraphs}
    `;
  } else if (pageNumber === 3) {
    const p3 = [
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
    ];

    let y = 140;
    const bodyParagraphs = p3.map((p) => {
      const isQuote = p.startsWith('“');
      const lines = wrapText(p, isQuote ? 80 : 86);
      const startY = y;
      y += lines.length * 25 + 16;

      return `
        <g transform="translate(${margin}, ${startY})">
          ${lines.map((l, idx) => `
            <text x="0" y="${idx * 25}" font-family="'Georgia', 'Times New Roman', serif" font-size="${isQuote ? '18.5' : '18'}" font-style="${isQuote ? 'italic' : 'normal'}" font-weight="${isQuote ? 'bold' : 'normal'}" fill="${isQuote ? '#0A1B36' : '#2D3748'}">${escapeXml(l)}</text>
          `).join('')}
        </g>
      `;
    }).join('');

    pageContent = `
      <!-- Page Header -->
      <g transform="translate(${width/2}, 90)" text-anchor="middle">
        <text y="0" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#C5A253" letter-spacing="3">WILLIAM “BUCK” GODFREY, JR. • OBITUARY &amp; LIFE STORY</text>
        <line x1="-300" y1="18" x2="300" y2="18" stroke="#E2E8F0" stroke-width="1.5"/>
      </g>

      ${bodyParagraphs}

      <!-- Signature & Author Credit -->
      <g transform="translate(${width - margin}, 1040)" text-anchor="end">
        <text y="0" font-family="'Georgia', serif" font-size="24" font-weight="bold" fill="#0A1B36">— Gavin Godfrey</text>
        <line x1="-200" y1="12" x2="0" y2="12" stroke="#C5A253" stroke-width="2"/>
      </g>

      <!-- Memorial Seal Box -->
      <g transform="translate(${margin}, 1120)">
        <rect x="0" y="0" width="${contentWidth}" height="180" rx="8" fill="#0A1B36" stroke="#C5A253" stroke-width="2"/>
        <text x="${contentWidth/2}" y="45" text-anchor="middle" font-family="'Impact', sans-serif" font-size="28" font-weight="900" fill="#C5A253" letter-spacing="3">A LIVING HBCU LEGACY</text>
        <text x="${contentWidth/2}" y="80" text-anchor="middle" font-family="'Georgia', serif" font-size="18" fill="#FFFFFF">Delaware State University  •  Southwest DeKalb High School  •  Georgia Sports Hall of Fame</text>
        <text x="${contentWidth/2}" y="115" text-anchor="middle" font-family="'Arial', sans-serif" font-size="14" fill="#E2E8F0">Over 300 College Scholarships • 273 Football Victories • Countless Leaders Mentored</text>
        <text x="${contentWidth/2}" y="148" text-anchor="middle" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#C5A253">williambuckgodfrey.com</text>
      </g>
    `;
  }

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Parchment White Background -->
    <rect width="${width}" height="${height}" fill="#FAF9F5"/>

    <!-- Subtle Outer Border -->
    <rect x="30" y="30" width="${width - 60}" height="${height - 60}" fill="none" stroke="#C5A253" stroke-width="2"/>
    <rect x="38" y="38" width="${width - 76}" height="${height - 76}" fill="none" stroke="#0A1B36" stroke-width="0.75" stroke-opacity="0.3"/>

    <!-- Top Gold Accent Bar -->
    <rect x="30" y="30" width="${width - 60}" height="8" fill="#C5A253"/>

    ${pageContent}

    <!-- Page Footer -->
    <g transform="translate(${margin}, 1570)">
      <line x1="0" y1="0" x2="${contentWidth}" y2="0" stroke="#CBD5E1" stroke-width="1"/>
      <text x="0" y="30" font-family="'Arial', sans-serif" font-size="13" fill="#64748B">The William Buck Godfrey Legacy Scholarship Foundation</text>
      <text x="${contentWidth}" y="30" text-anchor="end" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#0A1B36">Page ${pageNumber} of 3</text>
    </g>
  </svg>
  `;
}

// ---------------------------------------------------------------------------
// BUILD & CONVERT ALL SVGS TO HIGH-RESOLUTION JPEGS
// ---------------------------------------------------------------------------
async function buildAllJpegs() {
  console.log('Generating document JPEGs...');

  const documents = [
    {
      filename: 'William_Buck_Godfrey_Program_Page_1.jpeg',
      svg: generateProgramPage1Svg(),
    },
    {
      filename: 'William_Buck_Godfrey_Program_Page_2.jpeg',
      svg: generateProgramPage2Svg(),
    },
    {
      filename: 'William_Buck_Godfrey_Obituary_Page_1.jpeg',
      svg: generateObituaryPageSvg(1),
    },
    {
      filename: 'William_Buck_Godfrey_Obituary_Page_2.jpeg',
      svg: generateObituaryPageSvg(2),
    },
    {
      filename: 'William_Buck_Godfrey_Obituary_Page_3.jpeg',
      svg: generateObituaryPageSvg(3),
    },
  ];

  for (const doc of documents) {
    const dest = path.join(outDir, doc.filename);
    await sharp(Buffer.from(doc.svg))
      .jpeg({ quality: 96, mozjpeg: true })
      .toFile(dest);
    console.log('Created JPEG:', doc.filename);
  }

  console.log('All document JPEGs generated successfully!');
}

buildAllJpegs().catch((err) => {
  console.error('Error generating document JPEGs:', err);
  process.exit(1);
});
