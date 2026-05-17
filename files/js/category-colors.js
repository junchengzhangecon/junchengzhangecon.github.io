(function () {
  const palette = [
    { bg: "#e2f2ee", ink: "#174a40", border: "#9bd0c2" },
    { bg: "#f8ead2", ink: "#6c4713", border: "#e4be77" },
    { bg: "#e5eff9", ink: "#173f66", border: "#9dc4e8" },
    { bg: "#f3e7df", ink: "#6a3827", border: "#dfad95" },
    { bg: "#edf0dc", ink: "#435018", border: "#c3cd83" },
    { bg: "#efe8f3", ink: "#4d3d63", border: "#c5acd4" }
  ];

  function hashKeyword(text) {
    return Array.from(text).reduce((hash, char) => {
      return (hash * 31 + char.codePointAt(0)) >>> 0;
    }, 7);
  }

  function cleanKeyword(chip) {
    return chip.textContent.replace(/\s*\(\d+\)\s*$/, "").trim();
  }

  function applyChipColor(chip) {
    const keyword = cleanKeyword(chip);
    if (!keyword) return;

    chip.dataset.keyword = keyword;

    const color = palette[hashKeyword(keyword) % palette.length];
    chip.style.setProperty("--chip-bg", color.bg);
    chip.style.setProperty("--chip-ink", color.ink);
    chip.style.setProperty("--chip-border", color.border);
  }

  function refreshCategoryLabels() {
    document.querySelectorAll(".quarto-listing-category-title").forEach((title) => {
      if (title.textContent.trim() === "Categories") {
        title.textContent = "Keywords";
      }
    });
  }

  function removeAllCategoryChip() {
    document.querySelectorAll('.quarto-listing-category .category[data-category=""]').forEach((chip) => {
      chip.remove();
    });
  }

  function colorChips() {
    document
      .querySelectorAll(".quarto-listing-category .category, .listing-category")
      .forEach(applyChipColor);
  }

  function forceNotesLinksToNewTab() {
    document
      .querySelectorAll(".notes-feature-card a, .notes-materials a")
      .forEach((link) => {
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.addEventListener("click", (event) => {
          if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          event.preventDefault();
          window.open(link.href, "_blank", "noopener,noreferrer");
        });
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    refreshCategoryLabels();
    removeAllCategoryChip();
    colorChips();
    forceNotesLinksToNewTab();
  });
})();
