module.exports = function (eleventyConfig) {
  // 🔹 statische Dateien (Assets) unverändert kopieren
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // 🔹 optional: zusätzliche statische Ordner (falls du mal brauchst)
  // eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  // eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  return {
    dir: {
      input: "src",       // Quellordner
      includes: "_includes", // Layouts & Partials
      output: "_site"     // Zielordner für fertige Seite
    },
    templateFormats: ["njk", "html", "md"], // welche Dateien Eleventy verarbeitet
    htmlTemplateEngine: "njk"                // Engine für HTML-Dateien
  };
};
