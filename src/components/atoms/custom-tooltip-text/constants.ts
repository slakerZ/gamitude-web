import { SimpleTooltipTextType, ComplexTooltipTextType } from "./types";

export const targetToSimpleTooltipObject = (
    target: string,
): SimpleTooltipTextType => {
    switch (target) {
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
        case "activeProjects":
            return activeProjects;
        case "pausedProjects":
            return pausedProjects;
        case "doneProjects":
            return doneProjects;
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
        default:
            return simpleTooltipNotFound;
    }
};

export const targetToComplexTooltipObject = (
    target: string,
): ComplexTooltipTextType => {
    switch (target) {
        case "body":
            return body;
        case "emotions":
            return emotions;
        case "mind":
            return mind;
        case "soul":
            return soul;
        default:
            return complexTooltipNotFound;
    }
};

const complexTooltipNotFound = {
    variant: "complex",
    title: "Tooltip Not Found",
    subtitle: "Double check the string",
    listIntro: "Check the mapping",
    listItems: ["Then it should work"],
};

const simpleTooltipNotFound = {
    variant: "simple",
    title: "Tooltip not Found",
    bodyItems: ["Double check the string and mapping"],
};

const body = {
    variant: "complex",
    title: "Body",
    subtitle:
        "Energy meant to represent your physical wellness, whether body is tense or relaxed, whether the body feels light or heavy",
    listIntro: "Build up through:",
    listItems: [
        "adequate nutrition",
        "sleeping well",
        "stretching, yoga and other light physical activities",
    ],
};

const emotions = {
    variant: "complex",
    title: "Emotions",
    subtitle:
        "Meant to represent quality of your energy, whether your energy is being used up at steady pace or being wasted",
    listIntro: "Build up through:",
    listItems: [
        "pranayama practices and other breathing techniques",
        "appreciation",
        "changing perspective on everyday events",
    ],
};

const mind = {
    variant: "complex",
    title: "Mind",
    subtitle:
        "Energy meant to represent your cognitive readiness, whether you're focused and efficient or distracted and drained",
    listIntro: "Build up through:",
    listItems: [
        "meditation",
        "breaking work time into sessions",
        "focusing on activities that have the most long-term leverage",
    ],
};

const soul = {
    variant: "complex",
    title: "Soul - Human Spirit",
    subtitle:
        "Energy meant to represent your sense of meaning and purpose, whether you have the deep sense of meaning inside",
    listIntro: "Build up through:",
    listItems: [
        "doing what you do best and enjoy most at work",
        "consciously allocating time and energy to the areas that mean a lot to you - family, work etc.",
        "living your core values in your daily behaviors",
    ],
};

const selectBoostedEnergies = {
    variant: "simple",
    title: "Select Boosted",
    bodyItems: [
        "Certain forms of activities repleshish certain types of energies, for example yoga would boost body, emotions and mind ...",
    ],
};

const selectDominantEnergies = {
    variant: "simple",
    title: "Select Dominant",
    bodyItems: ["... out of these 3 the body will benefit the most"],
};

const selectBoostedStats = {
    variant: "simple",
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
    variant: "simple",
    title: "Bullet Journal",
    bodyItems: [
        "Want to break down your projects into milestones? Looking to add quick to-do? Trying to put a task in the time context? This is the place.",
    ],
};

const home = {
    variant: "simple",
    title: "Home",
    bodyItems: [
        "Not sure what it's all about? Want to learn more about science behind this site? Want to see who made the site? This is the place.",
    ],
};

const profileSettings = {
    variant: "simple",
    title: "Profile Settings",
    bodyItems: [
        "Time statistics for your work - charts, graphs and tables, manage personal information, logout",
    ],
};

const projects = {
    variant: "simple",
    title: "Projects",
    bodyItems: [
        "Organize your working time into projects and complete them bit by bit with the working method that suits you",
    ],
};

const activeProjects = {
    variant: "simple",
    title: "Active Projects",
    bodyItems: [
        "These are the projects that you're currently working on, try not have more than 7+-2 ogoing projects for best productivity",
    ],
};

const pausedProjects = {
    variant: "simple",
    title: "Paused Projects",
    bodyItems: [
        'These are "I want to do it but I really have too much to do right now" projects, put all of your non priority projects here',
    ],
};

const doneProjects = {
    variant: "simple",
    title: "Done Projects",
    bodyItems: [
        "This is your archive, your hall of glory, behold and relish how much you've accomplished",
    ],
};

const breakTimer = {
    variant: "simple",
    title: "Break Timer",
    bodyItems: [
        "After each completed session an adequate amount of time is going to appear here.",
        "For Ultradian rhythm - after 90 minutes of work 30 minutes of break will be added",
        "For Pomodoro Technique - after first 4 session 5 minutes will be added after each 5th session 15 minutes will be added",
        "For other techniques - 1 minute of break for each 5 minutes of session",
    ],
};

const rankRequirements = {
    variant: "simple",
    title: "Rank Requirements",
    bodyItems: [
        "These represent the requirements for unlocking this rank, you can think of them as rank's mana cost",
        "Two most dominant of these will be displayed in the background below and their colors will decide the card color",
    ],
};

const rankImage = {
    variant: "simple",
    title: "Rank Image",
    bodyItems: [
        "This is the visual representation of your productivity spirit animal",
    ],
};

const rankName = {
    variant: "simple",
    title: "Rank Name",
    bodyItems: [
        "Unlock new ranks by boosting your strength, creativity, intelligence and fluency",
    ],
};

const rankTier = {
    variant: "simple",
    title: "Rank Tier",
    bodyItems: [
        "Each rank belongs to a tier which represents its place on the foodchain, think of tiers as of milestones on the road to productivity",
    ],
};

const creativity = {
    variant: "simple",
    title: "Creativity",
    bodyItems: [
        "Stat meant to represent proficiency in Arts, Crafts and other forms of creative work, like writing a book",
    ],
};

const fluency = {
    variant: "simple",
    title: "Fluency",
    bodyItems: [
        "Stat meant to represent proficiency in Humanities, Linguistics and Economics",
    ],
};

const intelligence = {
    variant: "simple",
    title: "Intelligence",
    bodyItems: [
        "Stat meant to represent proficiency in Math, Informatics and Science",
    ],
};

const strength = {
    variant: "simple",
    title: "Strength",
    bodyItems: [
        "Stat meant to represent Bulkiness, Fitness and Endurance, use it for projects like 'Strength Training', 'HIIT' etc.",
    ],
};
