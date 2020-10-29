import { TooltipObjectType } from './types'

const body = {
    title: "Body",
    bodyItems: [
        "Energy meant to represent your physical wellness, whether body is tense or relaxed, whether the body feels light or heavy",
        "Build up through:",
        "adequate nutrition",
        "sleeping well",
        "stretching, yoga and other light physical activities",
    ],
};

const emotions = {
    title: "Emotions",
    bodyItems: [
        "Meant to represent quality of your energy, whether your energy is being used up at steady pace or being wasted",
        "Build up through:",
        "pranayama practices and other breathing techniques",
        "appreciation",
        "changing perspective on everyday events",
    ],
};

const mind = {
    title: "Mind",
    bodyItems: [
        "Energy meant to represent your cognitive readiness, whether you're focused and efficient or distracted and drained",
        "Build up through:",
        "meditation",
        "breaking work time into sessions",
        "focusing on activities that have the most long-term leverage",
    ],
};

const soul = {
    title: "Soul - Human Spirit",
    bodyItems: [
        "Energy meant to represent your sense of meaning and purpose, whether you have the deep sense of meaning inside",
        "Build up through:",
        "doing what you do best and enjoy most at work",
        "consciously allocating time and energy to the areas that mean a lot to you - family, work etc.",
        "living your core values in your daily behaviors",
    ],
};

const tooltipToggle = {
    title: "Toggle Tooltips",
    bodyItems: ["Toggle Tooltips visibility on and off"],
};

const selectBoostedEnergies = {
    title: "Select Boosted",
    bodyItems: [
        "Certain forms of activities repleshish certain types of energies, for example yoga would boost body, emotions and mind ...",
    ],
};

const selectDominantEnergies = {
    title: "Select Dominant",
    bodyItems: ["... out of these 3 the body will benefit the most"],
};

const selectBoostedStats = {
    title: "Select Boosted",
    bodyItems: [
        "Certain forms of activities boost certain types of stats, for example learning a language would boost fluency and creativity ... ",
    ],
};

const selectDominantStats = {
    variant: "simple",
    title: "Select Dominant",
    bodyItems: ["... out of these 2 the fluency takes #1 spot"],
};

const bulletJournal = {
    title: "Bullet Journal",
    bodyItems: [
        "Want to break down your projects into milestones? Looking to add quick to-do? Trying to put a task in the time context? This is the place.",
    ],
};

const home = {
    title: "Home",
    bodyItems: [
        "Not sure what it's all about? Want to learn more about science behind this site? Want to see who made the site? This is the place.",
    ],
};

const profileSettings = {
    title: "Profile Settings",
    bodyItems: [
        "Time statistics for your work - charts, graphs and tables, manage personal information",
    ],
};

const projects = {
    title: "Projects",
    bodyItems: [
        "Organize your working time into projects and complete them bit by bit with the working method that suits you",
    ],
};

const breakTimer = {
    title: "Break Timer",
    bodyItems: [
        "After each completed session an adequate amount of time is going to appear here.",
        "For Ultradian rhythm - after 90 minutes of work 30 minutes of break will be added",
        "For Pomodoro Technique - after first 4 session 5 minutes will be added after each 5th session 15 minutes will be added",
        "For other techniques - 1 minute of break for each 5 minutes of session",
    ],
};

const rankRequirements = {
    title: "Rank Requirements",
    bodyItems: [
        "These represent the requirements for unlocking this rank, you can think of them as rank's mana cost",
        "Two most dominant of these will be displayed in the background below and their colors will decide the card color",
    ],
};

const rankImage = {
    title: "Rank Image",
    bodyItems: [
        "This is the visual representation of your productivity spirit animal",
    ],
};

const rankName = {
    title: "Rank Name",
    bodyItems: [
        "Unlock new ranks by boosting your strength, creativity, intelligence and fluency",
    ],
};

const rankTier = {
    title: "Rank Tier",
    bodyItems: [
        "Each rank belongs to a tier which represents its place on the foodchain, think of tiers as of milestones on the road to productivity",
    ],
};

const creativity = {
    title: "Creativity",
    bodyItems: [
        "Stat meant to represent proficiency in Arts, Crafts and other forms of creative work, like writing a book",
    ],
};

const fluency = {
    title: "Fluency",
    bodyItems: [
        "Stat meant to represent proficiency in Humanities, Linguistics and Economics",
    ],
};

const intelligence = {
    title: "Intelligence",
    bodyItems: [
        "Stat meant to represent proficiency in Math, Informatics and Science",
    ],
};

const strength = {
    title: "Strength",
    bodyItems: [
        "Stat meant to represent Bulkiness, Fitness and Endurance, use it for projects like 'Strength Training', 'HIIT' etc.",
    ],
};

const logout = {
    title: "Logout",
    bodyItems: [
        "See you soon!"
    ]
}

const tooltipNotFound = {
    title: "Not Found",
    bodyItems: [
        "Mapping funciton wasn't able to match string to an object"
    ]
}

export const targetToTooltipObject = (
    target: string,
):TooltipObjectType => {
    switch (target) {
        case "body":
            return body;
        case "emotions":
            return emotions;
        case "soul":
            return soul;
        case "mind":
            return mind;
        case "selectBoostedEnergies":
            return selectBoostedEnergies;
        case "selectDominantEnergies":
            return selectDominantEnergies;
        case "selectBoostedStats":
            return selectBoostedStats;
        case "selectDominantStats":
            return selectDominantStats;
        case "bulletJournal":
            return bulletJournal;
        case "home":
            return home;
        case "profileSettings":
            return profileSettings;
        case "projects":
            return projects;
        case "breakTimer":
            return breakTimer;
        case "rankRequirements":
            return rankRequirements;
        case "rankImage":
            return rankImage;
        case "rankName":
            return rankName;
        case "rankTier":
            return rankTier;
        case "creativity":
            return creativity;
        case "fluency":
            return fluency;
        case "intelligence":
            return intelligence;
        case "strength":
            return strength;
        case "tooltipToggle":
            return tooltipToggle;
        case "logout":
            return logout;
        default:
            return tooltipNotFound;
    }
};