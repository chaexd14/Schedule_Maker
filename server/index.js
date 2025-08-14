require("dotenv").config();

const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/generate-pdf", async (req, res) => {
  try {
    const { schedData } = req.body;
    console.log("Received schedData:", schedData);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set viewport width close to A4 width (portrait)
    await page.setViewport({
      width: 1754, // wider side
      height: 1240, // approx height for A4 at 96dpi
      deviceScaleFactor: 1,
    });

    // Inject localStorage BEFORE page scripts run for the correct origin
    await page.goto("http://localhost:5173", { waitUntil: "domcontentloaded" }); // establish origin
    await page.evaluateOnNewDocument((data) => {
      localStorage.setItem("schedData", JSON.stringify(data));
    }, schedData);

    // Now go to the print page
    await page.goto("http://localhost:5173/print-schedule", {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // Wait for fonts and React rendering
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // extra delay for stable rendering

    // Hide scrollbars and force overflow visible only on scrollable containers
    await page.addStyleTag({
      content: `
    html, body, #root, #schedule-container, section, div, main {
      overflow: visible !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    *::-webkit-scrollbar {
      display: none !important;
    }
  `,
    });

    // Generate PDF with A4 format in portrait mode, include backgrounds, no margins
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" }, // zero margin so your wrapper matches page exactly
      scale: 0.9, // no extra scaling here because you handle scale in CSS
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="schedule.pdf"',
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).send("Failed to generate PDF");
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
