function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderMarkdown(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let paragraph = [];
  let inList = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }
    const text = escapeHtml(paragraph.join(" ").trim());
    html.push(`<p>${text}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) {
      return;
    }
    html.push("</ul>");
    inList = false;
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      closeList();
      html.push(`<h2>${escapeHtml(trimmed.slice(3).trim())}</h2>`);
      return;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      closeList();
      html.push(`<h1>${escapeHtml(trimmed.slice(2).trim())}</h1>`);
      return;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${escapeHtml(trimmed.slice(2).trim())}</li>`);
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  closeList();
  return html.join("");
}

async function loadAboutContent() {
  const container = document.getElementById("about-content");
  if (!container) {
    return;
  }

  try {
    const response = await fetch("./about.md", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const markdown = await response.text();
    container.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    container.innerHTML =
      "<p>Unable to load the about copy right now. Please try refreshing.</p>";
  }
}

loadAboutContent();
