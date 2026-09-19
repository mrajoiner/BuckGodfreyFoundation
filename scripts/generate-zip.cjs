const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function createMemorialZip() {
  const documentsDir = path.join(__dirname, '..', 'public', 'documents');
  const zip = new JSZip();

  const filesToAdd = [
    'William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf',
    'William_Buck_Godfrey_Celebration_Order_of_Service.pdf',
    'William_Buck_Godfrey_Obituary_and_Life_Story.pdf',
    'William_Buck_Godfrey_Program_Page_1.jpeg',
    'William_Buck_Godfrey_Program_Page_2.jpeg',
    'William_Buck_Godfrey_Obituary_Page_1.jpeg',
    'William_Buck_Godfrey_Obituary_Page_2.jpeg',
    'William_Buck_Godfrey_Obituary_Page_3.jpeg',
  ];

  for (const filename of filesToAdd) {
    const filePath = path.join(documentsDir, filename);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      zip.file(filename, fileData);
      console.log(`Added to ZIP: ${filename}`);
    } else {
      console.warn(`File not found for ZIP: ${filename}`);
    }
  }

  // Add README tribute text
  const readmeText = `================================================================================
COACH WILLIAM "BUCK" GODFREY, JR. (1943 — 2026)
Official Memorial Commemorative Archive
The William Buck Godfrey Legacy Foundation
williambuckgodfrey.com
================================================================================

This commemorative archive contains the complete official memorial documents
honoring Coach William "Buck" Godfrey, Jr.:

1. William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf
   Complete 5-page commemorative edition featuring the Celebration Program 
   (Order of Service) and Coach Godfrey's official Obituary & Life Story.

2. William_Buck_Godfrey_Celebration_Order_of_Service.pdf
   Official Order of Service from the Celebration of a Legend at the 
   College Football Hall of Fame in Atlanta, Georgia.

3. William_Buck_Godfrey_Obituary_and_Life_Story.pdf
   Full 3-page biography and obituary written by Gavin Godfrey.

4. High-Resolution Embedded JPEG Pages:
   - William_Buck_Godfrey_Program_Page_1.jpeg (Commemorative Cover)
   - William_Buck_Godfrey_Program_Page_2.jpeg (Order of Service)
   - William_Buck_Godfrey_Obituary_Page_1.jpeg (Origins & Early Life)
   - William_Buck_Godfrey_Obituary_Page_2.jpeg (Coaching Career & Legacy)
   - William_Buck_Godfrey_Obituary_Page_3.jpeg (Family, Accolades & Tributes)

"Death is a moment, but memories of a great man last forever."
— Coach William "Buck" Godfrey, Jr.
================================================================================
`;
  zip.file('README_MEMORIAL_TRIBUTE.txt', readmeText);

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const zipPath = path.join(documentsDir, 'William_Buck_Godfrey_Memorial_Documents.zip');
  fs.writeFileSync(zipPath, zipBuffer);
  console.log(`Successfully generated ZIP archive: ${zipPath} (${zipBuffer.length} bytes)`);
}

createMemorialZip().catch((err) => {
  console.error('Error generating memorial ZIP:', err);
  process.exit(1);
});
