export interface TranscriptSection {
  title?: string;
  quarter?: string;
  time?: string;
  items?: { role?: string; name: string; detail?: string }[];
  paragraphs?: string[];
  quote?: { text: string; author: string };
}

export interface DocumentTranscript {
  id: 'program' | 'obituary';
  title: string;
  subtitle: string;
  dateAndLocation?: string;
  meta: string;
  sections: TranscriptSection[];
}

export const DOCUMENT_TRANSCRIPTS: Record<'program' | 'obituary', DocumentTranscript> = {
  program: {
    id: 'program',
    title: 'Celebration of a Legend: William “Buck” Godfrey, Jr.',
    subtitle: 'Official Celebration Order of Service',
    dateAndLocation: 'Saturday, September 19, 2026 • 5:00 PM • College Football Hall of Fame, Atlanta, GA',
    meta: 'Commemorative Program • 2 Pages • Official 4-Quarter Service',
    sections: [
      {
        title: 'Call to Order & Invocation',
        items: [
          { role: 'Master of Ceremony', name: 'Pastor Jesse Curney, III', detail: 'New Mercies Christian Church' },
          { role: 'Processional', name: 'Family & Dignitaries' },
          { role: 'Opening Prayer', name: 'Pastor Jesse Curney, III' },
        ],
      },
      {
        title: 'Scripture Readings',
        items: [
          { role: 'Old Testament — Psalm 23', name: 'Reverend Dr. William E. Flippin, Sr.', detail: 'The Greater Piney Grove Baptist Church' },
          { role: 'New Testament — 2 Timothy 4:7-8', name: 'Pastor Craig L. Oliver, Sr.', detail: 'Elizabeth Baptist Church' },
        ],
      },
      {
        quarter: 'FIRST QUARTER: FOUNDATION & FAITH',
        items: [
          { role: 'Musical Selection', name: '“Total Praise”', detail: 'Combined Celebration Choir' },
          { role: 'Reflections as a Scholar & Author', name: 'Dr. Louis W. Sullivan', detail: 'Former U.S. Secretary of Health & Human Services, President Emeritus of Morehouse School of Medicine' },
          { role: 'Reflections on Kracke Street & Cannon Street All-Stars', name: 'Members of the Cannon Street YMCA All-Stars', detail: 'Charleston, SC' },
        ],
      },
      {
        quarter: 'SECOND QUARTER: COACH, TEACHER & MENTOR',
        items: [
          { role: 'Reflections from Southwest DeKalb Alumni', name: 'Former Panthers Players & Champions', detail: 'Representing 30 Seasons (1983–2012)' },
          { role: 'Coaching Fraternity Tribute', name: 'Georgia High School Football Coaches Association', detail: 'State Championship & Region Honors' },
          { role: 'Musical Interlude', name: '“A Change Is Gonna Come”', detail: 'Instrumental Solo' },
        ],
      },
      {
        quarter: 'THIRD QUARTER: CIVIL RIGHTS & SCHOLARSHIP',
        items: [
          { role: 'Reflections as an Educator & English Scholar', name: 'DeKalb County School District Leadership', detail: 'William “Buck” Godfrey Stadium Dedication Commemoration' },
          { role: 'Presentation of the Memorial Legacy Scholarship', name: 'Board of Directors', detail: 'The William Buck Godfrey Legacy Scholarship Foundation' },
          { role: 'Tribute from Delaware State University', name: 'Athletic Department & Omega Psi Phi Fraternity', detail: 'National Scholar (1965) & CIAA Batting Champion' },
        ],
      },
      {
        quarter: 'FOURTH QUARTER: FAMILY & EULOGY',
        items: [
          { role: 'Reflections as a Son', name: 'Colin Godfrey', detail: 'All-American Punter, Tennessee State University' },
          { role: 'Reflections as a Daughter', name: 'Rashan Godfrey', detail: 'Collegiate Swimmer, Florida A&M University' },
          { role: 'Musical Selection', name: '“Take My Hand, Precious Lord”', detail: 'Soloist' },
          { role: 'The Eulogy', name: 'Pastor Jesse Curney, III', detail: 'Senior Pastor, New Mercies Christian Church' },
          { role: 'Benediction & Recessional', name: '“Goin’ Up Yonder”' },
        ],
      },
      {
        title: 'Arrangements & Acknowledgments',
        paragraphs: [
          'The Godfrey family expresses profound gratitude to everyone who reached out, prayed, and contributed to honoring Coach Godfrey’s extraordinary life.',
          'Professional Arrangements Entrusted to: Gregory B. Levett & Sons Funeral Homes & Crematory, Inc. (South DeKalb Chapel).',
          'In lieu of flowers, the family requests tax-deductible memorial contributions to The William Buck Godfrey Legacy Scholarship Foundation supporting HBCU student-athletes.',
        ],
      },
    ],
  },
  obituary: {
    id: 'obituary',
    title: 'Obituary & Life Story: William “Buck” Godfrey, Jr.',
    subtitle: 'Written by Gavin Godfrey • An American Odyssey from Kracke Street to the World',
    dateAndLocation: '1943 — 2026 • Charleston, SC to Atlanta, GA',
    meta: 'Biographical Narrative • 3 Pages • Published Memorial Memoir',
    sections: [
      {
        quote: {
          text: '“The strength of a man is judged by his ability to succeed under overwhelming odds or survive under oppressive circumstances.”',
          author: '— W.H. Godfrey, from Songs For My Father',
        },
        paragraphs: [
          'The year was 1943.',
          'America was in the throes of World War II. The New York Yankees were en route to a 10th World Series title. Black folks were navigating life in the segregated, Jim Crow South. Heroes of the Harlem Renaissance used their art to shed light on Black experiences stateside. Langston Hughes wrote a column for the Chicago Defender. Duke Ellington performed “Black, Brown, and Beige” at Carnegie Hall.',
          'In Charleston, South Carolina, Octavia and William Godfrey were celebrating the birth of their first son. They named him William. He was the eldest of their four boys. In his childhood, William picked up the nickname “Buck” from a community elder.',
          'Little did that old-timer or anyone living on the city’s north side know about what was to come.',
          'That kid they called Buck would build a legacy reaching from Kracke Street to the world. He would go on to become one of Georgia’s most accomplished high school football coaches, an educator, author, scholar, mentor, and devoted family man. His impact extended far beyond the gridiron and classrooms, spanning generations.',
        ],
      },
      {
        title: 'The Cannon Street All-Stars & Early Years',
        paragraphs: [
          'Every legend has an origin story. Buck was a gifted athlete from an early age, a standout baseball talent on sandlots and street diamonds.',
          'In fact, he and a group of 13 gifted Black boys from Charleston were on the verge of making American history in 1955. The Cannon Street YMCA All-Stars – composed of 11- and 12-year-olds – had Little League World Series dreams. They qualified for and were invited to Williamsport, Pennsylvania.',
          'Instead, racism and segregation denied them a chance to play. White teams boycotted rather than face them. Buck’s daddy, Mr. Bill, kept him home: if they weren’t playing, Buck wasn’t going. It was a heart-wrenching development for what was likely the best team to never play in the Little League World Series.',
          'It was an experience that would inform and inspire Buck for decades to come, and the subject of his 2008 memoir, The Team Nobody Would Play.',
          '“We’d have won everything, and that’s not braggadocio, that’s just fact,” he told the Slate Magazine podcast One Year. “We were well coached, we could run, and we could hit. Most of all, we loved each other.”',
        ],
      },
      {
        title: 'Delaware State, Joyce, & Higher Education',
        paragraphs: [
          'Buck graduated from Burke High School before earning scholarships in both baseball and football at Delaware State University. There, he distinguished himself as a standout student-athlete, serving as captain of both teams. Known for his bat since youth, Buck won the CIAA batting title with an impressive .511 average, earning recognition as the university’s most outstanding captain. He was Omega Psi Phi Fraternity’s National Scholar in 1965.',
          'Buck also found true love. Her name was Joyce, the chocolate city girl from Philly who landed on the campus of Delaware State as a freshman, and rocked the Gullah Geechee boy’s world. Theirs is a love that would endure for more than half a century.',
          'His passion for learning led Buck to postgraduate fellowships at Columbia and New York Universities before completing a master’s degree in English at Atlanta University.',
          'He pursued professional baseball with the New York Mets organization and competed successfully as a Golden Gloves middleweight boxer. He studied Marcus Aurelius and Epictetus, loved western films, and began teaching English in New York City’s Spanish Harlem.',
        ],
      },
      {
        title: '30 Seasons at Southwest DeKalb & The Championship Era',
        paragraphs: [
          'After relocating to Georgia, he discovered his true calling in coaching at Gordon High and Towers High before being named head coach at Southwest DeKalb High School in 1983. Over the next 30 seasons, he transformed the Panthers into one of Georgia’s premier programs.',
          'Through it all was Joyce, who was more than hip to the game of x’s and o’s. She became a football mastermind in her own right, coaching her own undefeated youth teams at Glenwood Hills and scouting adjustments from the stands at halftime.',
          'That love brought their children Colin and Rashan into the world.',
          '“We had our own relationship. Daddy was my Father, but he was my best friend, too. We understood each other,” said Colin, an All-American punter at Tennessee State.',
          '“Every girl should be able to look at her Father and feel completely consumed by his love. That was and will continue to be my reality,” shared Rashan, who swam for Florida A&M.',
          'Under Coach Godfrey, Southwest DeKalb captured the 1995 GHSA Class AAAA State Championship, claimed 13 region championships, finished as state runner-up in 1990, and never had a losing regular season. With a career record of 273-89-1, he became the winningest football coach in DeKalb County history, sending more than 300 student-athletes to college on scholarship.',
        ],
      },
      {
        title: 'Author, Hall of Famer, and Immortal Legacy',
        paragraphs: [
          'A gifted storyteller, Buck was an accomplished author whose published works included Moods of a Black Man, Songs For My Father, The Team Nobody Would Play, My Friend Eddie Robinson, and Where the Woodbine Twineth and the Sycamore Ceased to Bloom.',
          'His legacy was honored with inductions into the Atlanta Sports Hall of Fame, Georgia Athletic Coaches Association Hall of Fame, Delaware State University Athletics Hall of Fame, and the Georgia High School Football Hall of Fame. In 2013, DeKalb County renamed its flagship 9,000-seat athletic venue as the William “Buck” Godfrey Stadium.',
          '“I have this sick thing in me called loyalty. And I just love the kids,” Coach Godfrey famously remarked. “We’ve got more scholarships than wins. My vision is to save all children. I know I can’t do it, but I can save a few.”',
        ],
      },
    ],
  },
};
