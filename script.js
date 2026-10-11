
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const toolResults = document.querySelector("#toolResults");
const toolCount = document.querySelector("#toolCount");
const categoryFilters = document.querySelector("#categories");

const tools = [
  {
    name: "ChatGPT",
    category: "Study",
    icon: "✳",
    description: "Learn concepts, brainstorm ideas and get help with everyday tasks.",
    url: "https://chatgpt.com/"
  },
  {
    name: "Claude",
    category: "Writing",
    icon: "✺",
    description: "Work through ideas, write drafts and analyze documents.",
    url: "https://claude.ai/"
  },
  {
    name: "Google Gemini",
    category: "Study",
    icon: "✦",
    description: "Explore topics, ask questions and get help with learning.",
    url: "https://gemini.google.com/"
  },
  {
    name: "Perplexity",
    category: "Research",
    icon: "⌕",
    description: "Research questions and explore answers with cited sources.",
    url: "https://www.perplexity.ai/"
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    icon: "⌘",
    description: "Get coding suggestions and assistance inside your workflow.",
    url: "https://github.com/features/copilot"
  },
  {
    name: "Cursor",
    category: "Coding",
    icon: "⟡",
    description: "An AI-powered code editor for building and understanding software.",
    url: "https://cursor.com/"
  },
  {
    name: "Canva",
    category: "Design",
    icon: "◉",
    description: "Design presentations, graphics and social media content.",
    url: "https://www.canva.com/"
  },
  {
    name: "Adobe Express",
    category: "Design",
    icon: "✿",
    description: "Create visual content, posters and short-form videos.",
    url: "https://www.adobe.com/express/"
  },
  {
    name: "Grammarly",
    category: "Writing",
    icon: "✎",
    description: "Improve writing clarity, grammar and communication.",
    url: "https://www.grammarly.com/"
  },
  {
    name: "Notion AI",
    category: "Productivity",
    icon: "▤",
    description: "Organize notes, summarize information and manage your work.",
    url: "https://www.notion.com/product/ai"
  },
  {
    name: "ElevenLabs",
    category: "Productivity",
    icon: "♫",
    description: "Explore AI voice generation and audio creation tools.",
    url: "https://elevenlabs.io/"
  },
  {
    name: "Leonardo AI",
    category: "Design",
    icon: "◈",
    description: "Generate visual concepts and explore AI image creation.",
    url: "https://leonardo.ai/"
  }
];

let activeCategory = "All";

function updateTools() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredTools = tools.filter(function(tool) {
    const matchesCategory =
      activeCategory === "All" ||
      tool.category === activeCategory;

    const searchableText = [
      tool.name,
      tool.category,
      tool.description
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  displayTools(filteredTools);
}

function displayTools(filteredTools) {
  toolCount.textContent =
    `${filteredTools.length} ${filteredTools.length === 1 ? "tool" : "tools"} found`;

  if (filteredTools.length === 0) {
    toolResults.innerHTML = `
      <div class="empty-message">
        <div class="empty-icon">⌕</div>
        <h3>No tools found</h3>
        <p>Try another keyword or choose a different category.</p>
      </div>
    `;
    return;
  }

  toolResults.innerHTML = `
    <div class="tool-grid">
      ${filteredTools.map(function(tool, index) {
        return `
          <article class="tool-card" style="animation-delay: ${index * 35}ms">
            <div class="card-top">
              <div class="tool-icon" aria-hidden="true">${tool.icon}</div>
              <span class="tool-category">${tool.category}</span>
            </div>

            <h3>${tool.name}</h3>
            <p class="tool-description">${tool.description}</p>

            <a
              class="visit-link"
              href="${tool.url}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit ${tool.name} official website"
            >
              Visit Website <span>↗</span>
            </a>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

categoryFilters.addEventListener("click", function(event) {
  const button = event.target.closest(".filter-btn");

  if (!button) return;

  activeCategory = button.dataset.category;

  categoryFilters.querySelectorAll(".filter-btn").forEach(function(item) {
    const isActive = item === button;

    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  updateTools();
});

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  updateTools();
});

searchInput.addEventListener("input", updateTools);

updateTools();
