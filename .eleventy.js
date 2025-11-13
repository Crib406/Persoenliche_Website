const { execSync } = require("child_process");
const fs = require("fs");

module.exports = function (eleventyConfig) {
  // Umgebung ermitteln: local oder production
  const env = process.env.ELEVENTY_ENV || "local";
  const siteData = require(`./src/_data/site.${env}.json`);
  eleventyConfig.addGlobalData("site", siteData);

  // Git-basiertes lastModified
  eleventyConfig.addFilter("lastModified", (inputPath) => {
    try {
      // Prüfen, ob Datei existiert (sollte sie, aber safety first)
      if (!fs.existsSync(inputPath)) {
        return null;
      }

      // Letzten Commit-Zeitpunkt für diese Datei holen (ISO 8601)
      const result = execSync(
        `git log -1 --format=%cI "${inputPath}"`,
        { encoding: "utf-8" }
      ).trim();

      if (!result) return null;

      // Nur das Datum (YYYY-MM-DD)
      return result.slice(0, 10);
    } catch (e) {
      // Fallback, wenn z.B. Datei nicht im Git-Repo ist
      return null;
    }
  });

  // Statische Assets direkt durchschleifen
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk"
  };
};
