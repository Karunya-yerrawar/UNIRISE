/**
 * UNIRISE AI Campus Assistant Service
 * Modular service interface designed for seamless migration from mock responses
 * to real AI API backends (e.g., Google Gemini API / REST endpoints).
 */
const UniriseAIService = {
    /**
     * Queries the AI assistant with natural language prompt.
     * @param {string} prompt 
     * @returns {Promise<{summary: string, cards: Array}>}
     */
    async queryAssistant(prompt) {
        // Simulate network API delay
        await new Promise(resolve => setTimeout(resolve, 400));

        const q = (prompt || "").toLowerCase().trim();
        const data = uniriseAIData.opportunityResults;

        if (q.includes("hackathon") || q.includes("compete") || q.includes("coding")) {
            return data.hackathon;
        } else if (q.includes("internship") || q.includes("job") || q.includes("career") || q.includes("apply")) {
            return data.internship;
        } else if (q.includes("teammate") || q.includes("team") || q.includes("partner") || q.includes("flutter") || q.includes("react")) {
            return data.teammates;
        } else if (q.includes("mentor") || q.includes("guidance") || q.includes("senior")) {
            return data.mentors;
        } else if (q.includes("miss") || q.includes("recap") || q.includes("week") || q.includes("passed")) {
            return data.recap;
        } else if (q.includes("club") || q.includes("recruit")) {
            return data.club;
        }

        // Dynamic fallback matching against main database
        const matches = (uniriseData.posts || []).filter(post => 
            post.title.toLowerCase().includes(q) ||
            post.description.toLowerCase().includes(q) ||
            post.type.toLowerCase().includes(q)
        );

        if (matches.length > 0) {
            return {
                summary: `UNIRISE AI found ${matches.length} campus record(s) matching "${prompt}":`,
                cards: matches.map(m => ({
                    id: m.id,
                    title: m.title,
                    category: m.type.toUpperCase(),
                    type: m.type,
                    organization: m.author,
                    date: m.date,
                    location: m.location,
                    description: m.description,
                    tags: m.tags || [],
                    actionText: m.action || "View Details",
                    link: m.link || "#"
                }))
            };
        }

        // Generic friendly response if no matches found
        return {
            summary: `UNIRISE AI analyzed campus listings for "${prompt}". Here are recommended opportunities:`,
            cards: data.hackathon.cards
        };
    },

    /**
     * Extracts poster information (Feature 2: Poster to Post).
     * @param {File|null} file 
     * @returns {Promise<Object>}
     */
    async extractPosterData(file) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return { ...uniriseAIData.posterSample.mockExtracted };
    },

    /**
     * Generates a teammate search post preview from natural language input (Feature 3).
     * @param {string} prompt 
     * @returns {Promise<{title: string, description: string, skills: Array, tags: Array}>}
     */
    async generateTeammatePost(prompt) {
        await new Promise(resolve => setTimeout(resolve, 450));

        const text = prompt || "Need a developer for upcoming hackathon";
        const hasReact = /react/i.test(text);
        const hasPython = /python|ai|ml/i.test(text);
        const hasFlutter = /flutter|mobile/i.test(text);

        let title = "Looking for a Project Teammate";
        let skills = ["JavaScript", "Git"];
        let tags = ["Teammate", "Hackathon"];

        if (hasReact) {
            title = "Frontend Developer Needed (React)";
            skills = ["React", "JavaScript", "UI Design", "Git"];
            tags = ["Frontend", "React", "Hackathon"];
        } else if (hasPython) {
            title = "AI / Machine Learning Teammate Needed";
            skills = ["Python", "TensorFlow", "Data Science"];
            tags = ["AI", "Python", "Hackathon"];
        } else if (hasFlutter) {
            title = "Flutter Mobile Developer Needed";
            skills = ["Flutter", "Dart", "Firebase"];
            tags = ["Mobile", "Flutter", "Teammate"];
        }

        const description = `We are forming a team for the upcoming campus hackathon. Requirement: ${text}. If you have relevant skills and want to build a winning solution together, connect with us!`;

        return { title, description, skills, tags };
    },

    /**
     * Generates a direct outreach message for connecting with another student.
     * @param {string} recipientName 
     * @param {string} requirement 
     * @returns {Promise<string>}
     */
    async generateDirectMessage(recipientName = "Student", requirement = "hackathon team") {
        await new Promise(resolve => setTimeout(resolve, 300));
        return `Hi ${recipientName}! I came across your profile on UNIRISE. I'm putting together a team for ${requirement} and your skills look like a great fit. Let me know if you'd be interested in connecting!`;
    }
};
