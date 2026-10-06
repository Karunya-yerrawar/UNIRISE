const uniriseAIData = {
    info: {
        name: "UNIRISE AI",
        subtitle: "Your Campus Opportunity Assistant",
        tagline: "Discover opportunities. Find people. Create better posts."
    },

    suggestedQueries: [
        { label: "Find upcoming hackathons", query: "hackathon" },
        { label: "Find internship opportunities", query: "internship" },
        { label: "Find students looking for teammates", query: "teammates" },
        { label: "Find mentors", query: "mentors" },
        { label: "What did I miss this week?", query: "recap" },
        { label: "Find active club opportunities", query: "club" }
    ],

    opportunityResults: {
        hackathon: {
            summary: "I found 2 active hackathons happening on campus this month.",
            cards: [
                {
                    id: 101,
                    title: "AI INNOVATE 2026",
                    category: "Hackathon",
                    type: "hackathon",
                    organization: "AI Club",
                    date: "15 Oct 2026",
                    location: "Innovation Lab",
                    description: "Build innovative AI solutions and compete with top student teams across campus.",
                    tags: ["AI", "Hackathon", "Prize Pool"],
                    actionText: "Register Now",
                    link: "https://unirise.campus/hackathon/ai-innovate"
                },
                {
                    id: 102,
                    title: "Smart Campus Hack",
                    category: "Hackathon",
                    type: "hackathon",
                    organization: "Robotics & IoT Club",
                    date: "28 Oct 2026",
                    location: "Hardware Lab 2",
                    description: "Develop smart automation and IoT solutions for campus sustainability.",
                    tags: ["IoT", "Robotics", "Hardware"],
                    actionText: "View Event",
                    link: "#"
                }
            ]
        },

        internship: {
            summary: "Here are the latest verified campus internship opportunities:",
            cards: [
                {
                    id: 103,
                    title: "Frontend Developer Internship",
                    category: "Internship",
                    type: "internship",
                    organization: "Career Cell & TechCorp",
                    date: "Apply before 20 Oct",
                    location: "Remote / Hybrid",
                    description: "Paid internship opportunity for students skilled in HTML, CSS, JavaScript & React.",
                    tags: ["Frontend", "Paid", "Stipend: ₹15k/mo"],
                    actionText: "Apply Now",
                    link: "#"
                },
                {
                    id: 104,
                    title: "Data Analyst Trainee",
                    category: "Internship",
                    type: "internship",
                    organization: "Analytics Club",
                    date: "Apply before 25 Oct",
                    location: "Campus Lab",
                    description: "Work on real campus analytics datasets using Python and SQL.",
                    tags: ["Python", "Data", "Mentorship"],
                    actionText: "Apply Now",
                    link: "#"
                }
            ]
        },

        teammates: {
            summary: "I located students actively seeking hackathon & project teammates:",
            cards: [
                {
                    id: 105,
                    title: "Looking for Flutter Teammate",
                    category: "Teammate Search",
                    type: "opportunity",
                    organization: "Rohan Mehta (3rd Year CSE)",
                    date: "Posted 2h ago",
                    location: "Campus",
                    description: "Building a mobile app for AI Innovate. Need a Flutter developer for state management.",
                    tags: ["Flutter", "Dart", "Mobile"],
                    actionText: "Connect with Rohan",
                    link: "#"
                },
                {
                    id: 106,
                    title: "UI/UX Designer Needed",
                    category: "Teammate Search",
                    type: "opportunity",
                    organization: "Ananya Rao (AI Club Lead)",
                    date: "Posted today",
                    location: "Innovation Lab",
                    description: "Seeking a designer skilled in Figma for our club's flagship web application.",
                    tags: ["Figma", "UI/UX", "Design"],
                    actionText: "Message Ananya",
                    link: "#"
                }
            ]
        },

        mentors: {
            summary: "Here are verified senior mentors open for guidance & project review:",
            cards: [
                {
                    id: 107,
                    title: "Priya Sharma — Senior AI Mentor",
                    category: "Mentor",
                    type: "mentor",
                    organization: "4th Year CSE • Ex-Amazon Intern",
                    date: "Available Tue/Thu",
                    location: "Library / Discord",
                    description: "Guidance on Machine Learning projects, resume reviews, and hackathon strategies.",
                    tags: ["ML", "Python", "Career"],
                    actionText: "Book Guidance Session",
                    link: "#"
                },
                {
                    id: 108,
                    title: "Harsh Vardhan — Full-Stack Mentor",
                    category: "Mentor",
                    type: "mentor",
                    organization: "4th Year IT • Club Vice-President",
                    date: "Available Weekends",
                    location: "Lab 4",
                    description: "Mentoring teams on system design, Node.js, and web deployment.",
                    tags: ["FullStack", "Node.js", "System Design"],
                    actionText: "Request Mentorship",
                    link: "#"
                }
            ]
        },

        recap: {
            summary: "⚡ What You Missed This Week on Campus:",
            cards: [
                {
                    id: 109,
                    title: "AI Club Workshop Highlights",
                    category: "Campus Update",
                    type: "event",
                    organization: "AI Club",
                    date: "Yesterday",
                    location: "Lab 3",
                    description: "Over 80 students attended the Neural Networks 101 workshop. Deck & code shared.",
                    tags: ["Recap", "AI", "Notes Available"],
                    actionText: "View Resources",
                    link: "#"
                }
            ]
        },

        club: {
            summary: "Here are active club recruitment announcements:",
            cards: [
                {
                    id: 110,
                    title: "Robotics Club Core Team Recruitment",
                    category: "Club Recruitment",
                    type: "club",
                    organization: "Robotics Club",
                    date: "Deadline 22 Oct",
                    location: "Robotics Wing",
                    description: "Openings for Event Coordinators, Tech Leads, and Social Media managers.",
                    tags: ["Recruitment", "Leadership", "Robotics"],
                    actionText: "View Club Page",
                    link: "#"
                }
            ]
        }
    },

    posterSample: {
        fileName: "poster_ai_summit_2026.png",
        previewBg: "linear-gradient(135deg, #102A43, #087E8B)",
        mockExtracted: {
            title: "UNIRISE AI & Cloud Innovation Summit 2026",
            organizer: "AI Club & Department of Computer Science",
            date: "25 October 2026",
            time: "10:00 AM – 4:30 PM",
            venue: "Main Auditorium, Block C",
            description: "Join us for the annual campus AI & Cloud Summit featuring keynote talks from industry tech leads, hands-on lab sessions, and student project demos.",
            deadline: "22 October 2026",
            registrationLink: "https://unirise.campus/summit-2026",
            type: "event"
        }
    },

    teammateTemplates: {
        defaultTitle: "Teammate Needed for Campus Hackathon",
        defaultDescription: "We are building an innovative campus project and looking for a motivated student developer to complete our team.",
        sampleMessage: "Hi! I saw your profile on UNIRISE. We're forming a team for the upcoming hackathon and looking for someone with frontend skills. Let's connect if you're interested!"
    }
};
