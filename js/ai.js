/**
 * UNIRISE AI Campus Assistant Controller
 * Manages the AI Assistant interface, sub-feature switching, natural language query discovery,
 * poster-to-post extraction workflow, and teammate post generator.
 */

let currentAITool = "discovery"; // "discovery" | "poster" | "teammates"

function initializeAI() {
    renderAIPage();
}

function renderAIPage() {
    const container = document.getElementById("aiContainer");
    if (!container) return;

    container.innerHTML = `
        <div class="ai-header-card">
            <div class="ai-brand-badge">
                <div class="ai-badge-icon">
                    <img src="assets/unirise-logo.png.jpeg" alt="UNIRISE AI Mascot">
                </div>
                <div>
                    <h3>UNIRISE AI</h3>
                    <span>${uniriseAIData.info.subtitle}</span>
                </div>
            </div>
            <p>${uniriseAIData.info.tagline}</p>
        </div>

        <div class="ai-tool-nav">
            <button class="ai-tool-btn ${currentAITool === 'discovery' ? 'active' : ''}" onclick="switchAITool('discovery')">
                🔍 Opportunity Discovery
            </button>
            <button class="ai-tool-btn ${currentAITool === 'poster' ? 'active' : ''}" onclick="switchAITool('poster')">
                🖼️ Poster to Post
            </button>
            <button class="ai-tool-btn ${currentAITool === 'teammates' ? 'active' : ''}" onclick="switchAITool('teammates')">
                🤝 Team Member Generator
            </button>
        </div>

        <div id="aiToolBody"></div>
    `;

    renderAIToolBody();
}

function switchAITool(toolName) {
    currentAITool = toolName;
    renderAIPage();
}

function renderAIToolBody() {
    const body = document.getElementById("aiToolBody");
    if (!body) return;

    if (currentAITool === "discovery") {
        renderDiscoveryTool(body);
    } else if (currentAITool === "poster") {
        renderPosterTool(body);
    } else if (currentAITool === "teammates") {
        renderTeammateTool(body);
    }
}

/* ==========================================================================
   FEATURE 1: OPPORTUNITY DISCOVERY
   ========================================================================== */
function renderDiscoveryTool(container) {
    container.innerHTML = `
        <div class="ai-input-card">
            <div class="ai-search-bar">
                <span style="color: var(--primary);">✦</span>
                <input id="aiAssistantQueryInput" type="text" placeholder="Ask UNIRISE anything... (e.g., 'Find AI hackathons for beginners')">
                <button class="primary-btn" onclick="executeAIDiscovery()">Ask AI</button>
            </div>

            <div class="ai-chips-label">Suggested Queries</div>
            <div class="ai-chips-grid">
                ${uniriseAIData.suggestedQueries.map(item => `
                    <button class="ai-chip-btn" onclick="runAISuggestion('${item.query}')">
                        ${item.label}
                    </button>
                `).join('')}
            </div>
        </div>

        <div id="aiDiscoveryResults" class="ai-results-container"></div>
    `;

    // Run default query on load
    executeAIDiscovery("hackathon");
}

function runAISuggestion(queryKey) {
    const input = document.getElementById("aiAssistantQueryInput");
    if (input) input.value = queryKey;
    executeAIDiscovery(queryKey);
}

async function executeAIDiscovery(customQuery) {
    const input = document.getElementById("aiAssistantQueryInput");
    const query = customQuery || (input ? input.value : "") || "hackathon";
    const resultsContainer = document.getElementById("aiDiscoveryResults");

    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
        <div class="ai-response-summary">
            <span>✦</span> Analyzing UNIRISE campus database for "${query}"...
        </div>
    `;

    const result = await UniriseAIService.queryAssistant(query);

    resultsContainer.innerHTML = `
        <div class="ai-response-summary">
            <span>✦</span> ${result.summary}
        </div>

        <div class="ai-result-cards">
            ${result.cards.map(card => `
                <div class="ai-card">
                    <div class="ai-card-top">
                        <span class="ai-card-category">${card.category}</span>
                        <small style="color: var(--muted);">${card.date}</small>
                    </div>

                    <h4>${card.title}</h4>
                    <div class="ai-card-org">Organized by ${card.organization} • 📍 ${card.location || 'Campus'}</div>
                    <p>${card.description}</p>

                    <div class="tag-list">
                        ${(card.tags || []).map(tag => `<span>#${tag}</span>`).join('')}
                    </div>

                    <div class="post-actions" style="margin-top: 12px;">
                        <button class="secondary-btn" onclick="viewPost(${card.id})">View Details</button>
                        <button class="primary-btn" onclick="postAction('${card.link}')">${card.actionText}</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   FEATURE 2: POSTER TO POST (CLUB COORDINATOR TOOL)
   ========================================================================== */
function renderPosterTool(container) {
    container.innerHTML = `
        <div class="extracted-panel" style="margin-bottom: 20px;">
            <h3>🖼️ Poster to Post AI Extractor</h3>
            <p style="color: var(--muted); font-size: 13px; margin: 4px 0 16px;">
                Upload a campus event poster to automatically extract title, venue, dates, and registration links into a ready-to-publish UNIRISE post.
            </p>

            <div class="poster-dropzone" onclick="triggerMockPosterExtraction()">
                <div class="poster-dropzone-icon">📄</div>
                <h4>Click or drop a campus poster here</h4>
                <p>Supports PNG, JPG, PDF (Simulated AI Vision Extraction)</p>
            </div>
        </div>

        <div id="posterExtractionOutput"></div>
    `;
}

async function triggerMockPosterExtraction() {
    const output = document.getElementById("posterExtractionOutput");
    if (!output) return;

    output.innerHTML = `
        <div class="ai-response-summary">
            <span>✦</span> Running AI Vision Extraction on poster...
        </div>
    `;

    const data = await UniriseAIService.extractPosterData();

    output.innerHTML = `
        <div class="extracted-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h4 style="color: var(--dark-navy);">✓ Information Extracted from Poster</h4>
                <span class="ai-card-category">Ready for Review</span>
            </div>

            <div class="extracted-grid">
                <div class="extracted-field full-width">
                    <label>Event Title</label>
                    <input id="extTitle" type="text" value="${data.title}">
                </div>

                <div class="extracted-field">
                    <label>Organizer</label>
                    <input id="extOrganizer" type="text" value="${data.organizer}">
                </div>

                <div class="extracted-field">
                    <label>Post Category</label>
                    <select id="extType">
                        <option value="event" ${data.type === 'event' ? 'selected' : ''}>Event</option>
                        <option value="hackathon" ${data.type === 'hackathon' ? 'selected' : ''}>Hackathon</option>
                        <option value="internship" ${data.type === 'internship' ? 'selected' : ''}>Internship</option>
                        <option value="club" ${data.type === 'club' ? 'selected' : ''}>Club</option>
                    </select>
                </div>

                <div class="extracted-field">
                    <label>Date & Time</label>
                    <input id="extDate" type="text" value="${data.date} • ${data.time}">
                </div>

                <div class="extracted-field">
                    <label>Venue / Location</label>
                    <input id="extVenue" type="text" value="${data.venue}">
                </div>

                <div class="extracted-field">
                    <label>Registration Deadline</label>
                    <input id="extDeadline" type="text" value="${data.deadline}">
                </div>

                <div class="extracted-field">
                    <label>Registration Link</label>
                    <input id="extLink" type="text" value="${data.registrationLink}">
                </div>

                <div class="extracted-field full-width">
                    <label>Description</label>
                    <textarea id="extDesc" rows="3">${data.description}</textarea>
                </div>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px;">
                <button class="secondary-btn" onclick="triggerMockPosterExtraction()">Re-Extract</button>
                <button class="primary-btn" onclick="publishExtractedPosterPost()">Publish to UNIRISE Feed</button>
            </div>
        </div>
    `;
}

function publishExtractedPosterPost() {
    const title = document.getElementById("extTitle").value.trim();
    const description = document.getElementById("extDesc").value.trim();
    const type = document.getElementById("extType").value;
    const link = document.getElementById("extLink").value.trim();

    if (!title || !description) {
        alert("Please complete the required title and description fields.");
        return;
    }

    createNewPost({ type, title, description, link });

    alert("✓ Post successfully published to UNIRISE Campus Feed!");
    
    // Navigate to feed tab
    const feedNavBtn = document.querySelector('.nav-item[data-page="feedPage"]');
    if (feedNavBtn) feedNavBtn.click();
}

/* ==========================================================================
   FEATURE 3: TEAM MEMBER GENERATOR
   ========================================================================== */
function renderTeammateTool(container) {
    container.innerHTML = `
        <div class="generator-card">
            <h3>🤝 AI Team Member Post & Outreach Generator</h3>
            <p style="color: var(--muted); font-size: 13px; margin: 4px 0 16px;">
                Describe your project or hackathon needs, and UNIRISE AI will draft a structured post and direct message for potential teammates.
            </p>

            <div class="extracted-field full-width" style="margin-bottom: 14px;">
                <label>What skills or teammates are you looking for?</label>
                <textarea id="teammateReqInput" rows="3" placeholder="e.g. 'I need a frontend developer for an AI hackathon. React & UI design experience preferred.'"></textarea>
            </div>

            <button class="primary-btn" onclick="generateTeammatePostPreview()">Generate Post & Message</button>

            <div id="teammateGeneratorOutput"></div>
        </div>
    `;
}

async function generateTeammatePostPreview() {
    const input = document.getElementById("teammateReqInput");
    const req = (input ? input.value : "").trim() || "Need a frontend developer for AI hackathon";
    const output = document.getElementById("teammateGeneratorOutput");

    if (!output) return;

    output.innerHTML = `
        <div class="ai-response-summary" style="margin-top: 16px;">
            <span>✦</span> Drafting teammate recruitment post and outreach message...
        </div>
    `;

    const generated = await UniriseAIService.generateTeammatePost(req);
    const outreach = await UniriseAIService.generateDirectMessage("Ananya", "AI Innovate 2026");

    output.innerHTML = `
        <div class="generator-preview">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span class="ai-card-category">Generated Post Preview</span>
                <span style="font-size: 11px; color: var(--muted);">UNIRISE Opportunity Post</span>
            </div>

            <h4 id="genTitle">${generated.title}</h4>
            <p id="genDesc" style="font-size: 13px; color: var(--text); margin-bottom: 10px;">${generated.description}</p>

            <div class="tag-list">
                ${generated.tags.map(t => `<span>#${t}</span>`).join('')}
            </div>

            <div style="display: flex; gap: 8px; margin-top: 14px;">
                <button class="secondary-btn" onclick="copyTeammatePostText()">Copy Post Text</button>
                <button class="primary-btn" onclick="publishTeammateGeneratedPost()">Post on UNIRISE</button>
            </div>
        </div>

        <div class="outreach-box">
            <div style="font-weight: 700; font-size: 13px; color: var(--dark-navy);">💬 Generated Direct Outreach Message</div>
            <p style="font-size: 12px; color: var(--muted); margin-top: 2px;">Use this message when reaching out directly to a potential teammate:</p>
            <textarea id="genOutreachText">${outreach}</textarea>

            <div style="display: flex; gap: 8px; margin-top: 8px; justify-content: flex-end;">
                <button class="secondary-btn" onclick="copyOutreachMessageText()">Copy Message</button>
            </div>
        </div>
    `;
}

function copyTeammatePostText() {
    const title = document.getElementById("genTitle")?.innerText || "";
    const desc = document.getElementById("genDesc")?.innerText || "";
    navigator.clipboard.writeText(`${title}\n\n${desc}`);
    alert("Post text copied to clipboard!");
}

function copyOutreachMessageText() {
    const text = document.getElementById("genOutreachText")?.value || "";
    navigator.clipboard.writeText(text);
    alert("Outreach message copied to clipboard!");
}

function publishTeammateGeneratedPost() {
    const title = document.getElementById("genTitle")?.innerText || "Teammate Needed";
    const description = document.getElementById("genDesc")?.innerText || "";

    createNewPost({
        type: "opportunity",
        title,
        description,
        link: "#"
    });

    alert("✓ Teammate opportunity successfully posted to UNIRISE!");
    
    const feedNavBtn = document.querySelector('.nav-item[data-page="feedPage"]');
    if (feedNavBtn) feedNavBtn.click();
}
