import { SlideType, CreatorType } from "./types";

export const OVERVIEW_TEXT: SlideType[] = [
    {
        subtitle: "",
        paragraphs: [
            `Gamitude combines most recent discoveries about human productivity with gamification concepts.`,
            `Bringing you the complete producitivy management tool.`,
        ],
    },
    {
        subtitle: "",
        paragraphs: [
            `Maintenance of 4 types of energies is rewarded with stats that can then be spent on ranks`,
            `You can learn more about what energies, stats and ranks are on the next banners - go there quickly using menu on the right side`,
        ],
    },
];

export const ENERGIES_TEXT: SlideType[] = [
    {
        subtitle: "Body",
        paragraphs: [
            `Energy meant to represent your physical wellness.`,
            `Broad topic including proper nutrition, adequate sleep, regular stretching and much more.`,
            `The base for the rest of energies, their fuel.`,
            // Coming soon
            //`Gamitude will try to monitor these for you through drink water reminders, sleep check and nutrition tracker`
        ],
    },
    {
        subtitle: "Emotions",
        paragraphs: [
            `Meant to represent quality of your energy.`,
            `Whether your energy is being used up at steady pace or being wasted.`,
            `Generally restored with emotional self-control activities like Pranayama.`,
            // Coming soon
            // Gamitude can help you with these breathing pattern exercises with compound interval timers
        ],
    },
    {
        subtitle: "Mind",
        paragraphs: [
            `Energy meant to represent your cognitive readiness.`,
            `Whether you're focused and efficient or distracted and wasteful.`,
            `Generally restores itself when we're not focusing on anything in particular.`,
            `Here we are going to let it restore itself with efficient work/break timer patterns - Projects.`,
        ],
    },
    {
        subtitle: "Soul",
        paragraphs: [
            `Energy meant to represent your sense of meaning and purpose.`,
            `Whether you have clear purpose in life or just taking whether tides will bring`,
            `Generally connected to spiritual activities like prayer or meditation.`,
            `Here we won't really make you pray but will encourage creating specific goals for yourself through Bullet Journal`,
            // Coming soon
            // and quests
        ],
    },
];

export const STATS_TEXT: SlideType[] = [
    {
        subtitle: "Strength",
        paragraphs: [
            `Stat meant to represent bulkiness, fitness and endurance.`,
            `Use it for things like running, strength training, cardio etc.`,
            `Allows to buy ranks of animals that are known for their strength like Gorilla, Tiger or Ox`,
        ],
    },
    {
        subtitle: "Creativity",
        paragraphs: [
            `Stat meant to represent proficiency forms of creative work - sculpturing, drawing, painting and stuff.`,
            `Use it for the aformentioned activities but also consider adding them as secondary stat in f.e writing`,
            `Allows to buy ranks of animals that are known for craftiness like Fox, Crow or Small Monkeys`,
        ],
    },
    {
        subtitle: "Intelligence",
        paragraphs: [
            `Stat meant to represent proficiency in Math, Informatics and Science`,
            `Use it for most activities involving reading, writing and dealing with number`,
            `Allows to buy ranks of animals that are known for their intelligence like Dolphin, Octopus or Primates`,
        ],
    },
    {
        subtitle: "Fluency",
        paragraphs: [
            `Stat meant to represent proficiency in Humanities, Linguistics and Economics`,
            `Use it when learning a language writing an essay etc.`,
            `Allows to buy ranks of animals that are known for their communication skills like Raven, Parrot or Chimpanzee`,
        ],
    },
];

export const PROJECTS_TEXT: SlideType[] = [
    {
        subtitle: "Philosophy",
        paragraphs: [
            `Attention spans vary depending on factors like age but it's roughly 20-90 minutes`,
            `Each span consumes energies and with energy drops efficiency.`,
            `Acknowledging this Gamitude created Projects system when long term activities are divided into sessions.`,
            `By default Ultradian Rhytm, Pomodoro, Just 5 and Flow timers for methodologies are provided.`,
        ],
    },
    {
        subtitle: "Stat or Energy",
        paragraphs: [
            `Projects can either boost stats or replenish energies.`,
            `Stats projects are work attention consuming activities like programming, learning a language or working out.`,
            `Energy projects are things that you'are doing to relax like yoga, playing games or meditating.`,
        ],
    },
    {
        subtitle: "Boosted & Dominant",
        paragraphs: [
            `You can select up to 4 stats or energies that a project will boost / replenish.`,
            `The dominant stat / energy will be the one replenished / boosted the most.`,
            `This is useful for multi-field activities like yoga which replenishes all 4 energies but body is the focused one.`,
        ],
    },
    {
        subtitle: "Folders & Default Timer",
        paragraphs: [
            `Projects can be organised into folders.`,
            `Some people just have to divide things.`,
            `Work stuff, school stuff, personal interests are some folder names ideas.
        `,
        ],
    },
];

export const BULLET_JOURNAL_TEXT: SlideType[] = [
    {
        subtitle: "",
        paragraphs: [
            `Not all things can be described as projects.`,
            `We sometimes just get an assignment with due date and that's it.`,
            `The problem comes where there is a lot of them.`,
        ],
    },
    {
        subtitle: "",
        paragraphs: [
            `This is where Bullet Journal is useful.`,
            `Add your tasks with due date and they'll be automatically put into day, week or month page - you can also add custom ones.`,
            `This helps with prioritization. Tasks can also be linked to projects and being worked on with sessions if you want to set milestones.`,
        ],
    },
];

const pawel = require("assets/images/Pawel_Benkowski.jpg");
const stachu = require("assets/images/Stanislaw_Lutkiewicz.jpg");
const robert = require("assets/images/Robert_Deyk.jpg");

export const CREATORS: CreatorType[] = [
    {
        image: pawel,
        name: "Paweł Benkowski",
        positions: ["Project Leader", "Lead Frontend Developer"],
        links: [
            {
                target: "github",
                ref: "https://github.com/BennyKayer",
            },
        ],
    },
    {
        image: stachu,
        name: "Stanisław Lutkiewicz",
        positions: ["Lead Backend Developer", "Lead DevOps Engineer"],
        links: [
            {
                target: "github",
                ref: "https://github.com/slutkiewicz",
            },
        ],
    },
    {
        image: robert,
        name: "Robert Deyk",
        positions: ["Ręcznik"],
        links: [
            {
                target: "github",
                ref: "https://github.com/Rustyiller",
            },
        ],
    },
];

export const ATTRIBUTIONS_FLATICON = [
    {
        ref: "https://www.flaticon.com/authors/pixel-perfect",
        name: "Pixel perfect",
    },
    {
        ref: "https://www.flaticon.com/authors/freepik",
        name: "Freepik",
    },
    {
        ref: "https://www.flaticon.com/authors/pause08",
        name: "Pause08",
    },
    {
        ref: "https://www.flaticon.com/authors/those-icons",
        name: "Those Icons",
    },
    {
        ref: "https://www.flaticon.com/authors/srip",
        name: "srip",
    },
    {
        ref: "https://www.flaticon.com/authors/pongsakornred",
        name: "pongsakornRed",
    },
    {
        ref: "https://www.flaticon.com/authors/eucalyp",
        name: "Eucalyp",
    },
    {
        ref: "https://www.flaticon.com/authors/wanicon",
        name: "wanicon",
    },
    {
        ref: "https://www.flaticon.com/authors/smashicons",
        name: "Smashicons",
    },
];

export const ATTRIBUTIONS_PIXABAY = [
    {
        ref:
            "https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=731238",
        name: "Free-Photos",
    },
    {
        ref:
            "https://pixabay.com/pl/users/dannymoore1973-1813225/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1114272",
        name: "dannymoore1973",
    },
    {
        ref:
            "https://pixabay.com/pl/users/jeremiah7-388072/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=18246",
        name: "Johnson Cherian",
    },
    {
        ref:
            "https://pixabay.com/pl/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=18246",
        name: "Pixabay",
    },
    {
        ref:
            "https://pixabay.com/pl/users/blende12-201217/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4328243",
        name: "Gerhard G.",
    },
    {
        ref:
            "https://pixabay.com/pl/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4328243",
        name: "Pixabay",
    },
    {
        ref:
            "https://pixabay.com/pl/users/263582-263582/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=428032",
        name: "Giacomo Zanni",
    },
    {
        ref:
            "https://pixabay.com/pl/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=428032",
        name: "Pixabay",
    },
    {
        ref:
            "https://pixabay.com/pl/users/luciejr-1927666/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1153456",
        name: "Lucie J.",
    },
    {
        ref:
            "https://pixabay.com/pl/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1153456",
        name: "Pixabay",
    },
];

export const HOME_SECTIONS = [
    {
        label: "Start",
    },
    {
        label: "Overview",
    },
    {
        label: "Energies",
    },
    {
        label: "Stats",
    },
    {
        label: "Projects",
    },
    {
        label: "Bullet Journal",
    },
    {
        label: "Creators",
    },
    {
        label: "Attributions",
    },
];
