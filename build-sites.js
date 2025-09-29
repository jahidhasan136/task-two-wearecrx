import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import csv from "csv-parser";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const results = [];

fs.createReadStream("website.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    results.forEach((site) => {
      console.log(`🚀 Building site for ${site.domain}...`);

      // Write site-data.json
      fs.writeFileSync(
        path.join(__dirname, "site-data.json"),
        JSON.stringify(
          {
            title: site.title,
            phone: site.phone,
            address: site.address,
          },
          null,
          2
        )
      );

      // Run next build (production build)
      execSync("npm run build", { stdio: "inherit" });

      // Define destination folder
      const dest = path.join(__dirname, "build", site.domain);
      fs.mkdirSync(dest, { recursive: true });

      // Cross-platform folder copy (works on Windows, Mac, Linux)
      if (process.platform === "win32") {
        execSync(`xcopy "out" "${dest}" /E /I /Y`, { stdio: "inherit" });
      } else {
        execSync(`cp -r out/* "${dest}"`, { stdio: "inherit" });
      }

      console.log(`✅ Site built at build/${site.domain}`);
    });

    // Cleanup
    const siteDataPath = path.join(__dirname, "site-data.json");
    if (fs.existsSync(siteDataPath)) fs.unlinkSync(siteDataPath);
  });
