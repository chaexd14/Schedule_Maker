const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // For JSON HTML payload

app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).send('Missing HTML content');

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Measure actual size of rendered content
    const { width, height } = await page.evaluate(() => {
      const body = document.body;
      return {
        width: body.scrollWidth,
        height: body.scrollHeight,
      };
    });

    // Set the viewport to match the full content size
    await page.setViewport({
      width: Math.ceil(width),
      height: Math.ceil(height),
      deviceScaleFactor: 1,
    });

    // A4 dimensions in pixels at 96 DPI (landscape)
    const A4_WIDTH_PX = 1123; // 11.7 inch * 96 dpi
    const A4_HEIGHT_PX = 796; // 8.3 inch * 96 dpi

    // Calculate scale factor to fit entire content inside one A4 landscape page
    const scaleX = A4_WIDTH_PX / width;
    const scaleY = A4_HEIGHT_PX / height;
    const scale = Math.min(scaleX, scaleY);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      scale: scale, // this scales the full content to fit
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
      pageRanges: '1',
      displayHeaderFooter: false,
      preferCSSPageSize: false,
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="schedule.pdf"',
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).send('Failed to generate PDF');
  }
});




app.listen(port, () => {
  console.log(`PDF server running on http://localhost:${port}`);
});
