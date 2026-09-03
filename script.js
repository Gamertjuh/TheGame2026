/* =========================================================
   THE GAME 2026
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const GAME_START = new Date("2026-10-03T19:00:00");
const FINALE_DATE = new Date("2026-10-31T19:00:00");


/* =========================================================
   QUEST SCHEDULE
   ========================================================= */

const QUEST_DATES = {
    "quest-1":  new Date("2026-10-03T19:00:00"),
    "quest-2":  new Date("2026-10-06T19:00:00"),
    "quest-3":  new Date("2026-10-09T19:00:00"),
    "quest-4":  new Date("2026-10-12T19:00:00"),
    "quest-5":  new Date("2026-10-15T19:00:00"),
    "quest-6":  new Date("2026-10-18T19:00:00"),
    "quest-7":  new Date("2026-10-21T19:00:00"),
    "quest-8":  new Date("2026-10-24T19:00:00"),
    "quest-9":  new Date("2026-10-27T19:00:00"),
    "quest-10": new Date("2026-10-31T19:00:00")
};


/* =========================================================
   QUEST DATA
   ========================================================= */

const QUESTS = [

    {
        id: "quest-1",
        number: "QUEST 01",
        date: "OCT 03",
        title: "QUEST 1",
        description:
            "The first Halloween 2026 quest."
    },

    {
        id: "quest-2",
        number: "QUEST 02",
        date: "OCT 06",
        title: "QUEST 2",
        description:
            "The second quest of The Game 2026."
    },

    {
        id: "quest-3",
        number: "QUEST 03",
        date: "OCT 09",
        title: "QUEST 3",
        description:
            "The third quest of The Game 2026."
    },

    {
        id: "quest-4",
        number: "QUEST 04",
        date: "OCT 12",
        title: "QUEST 4",
        description:
            "The fourth quest of The Game 2026."
    },

    {
        id: "quest-5",
        number: "QUEST 05",
        date: "OCT 15",
        title: "QUEST 5",
        description:
            "The fifth quest of The Game 2026."
    },

    {
        id: "quest-6",
        number: "QUEST 06",
        date: "OCT 18",
        title: "QUEST 6",
        description:
            "The sixth quest of The Game 2026."
    },

    {
        id: "quest-7",
        number: "QUEST 07",
        date: "OCT 21",
        title: "QUEST 7",
        description:
            "The seventh quest of The Game 2026."
    },

    {
        id: "quest-8",
        number: "QUEST 08",
        date: "OCT 24",
        title: "QUEST 8",
        description:
            "The eighth quest of The Game 2026."
    },

    {
        id: "quest-9",
        number: "QUEST 09",
        date: "OCT 27",
        title: "QUEST 9",
        description:
            "The ninth quest of The Game 2026."
    },

    {
        id: "quest-10",
        number: "QUEST 10",
        date: "OCT 31",
        title: "THE HALLOWED CONVERGENCE",
        description:
            "The final confrontation. The players must activate and defend the three Severing Anchors, sever the Hallow King's connection to the world, and survive the Convergence."
    }

];


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

const pages =
    document.querySelectorAll(".page");

const pageButtons =
    document.querySelectorAll("[data-page]");


function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });


    const target =
        document.getElementById(pageId);


    if (!target) {

        console.warn(
            "Page not found:",
            pageId
        );

        return;
    }


    target.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    pageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageId
        );

    });


    history.replaceState(
        null,
        "",
        `#${pageId}`
    );

}


/* Navigation buttons */

pageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;


            if (page) {
                showPage(page);
            }

        }
    );

});


/* =========================================================
   INITIAL PAGE
   ========================================================= */

function initializePage() {

    const hash =
        window.location.hash.replace(
            "#",
            ""
        );


    if (
        hash &&
        document.getElementById(hash)
    ) {

        showPage(hash);

    }
    else {

        showPage("home");

    }

}


initializePage();


/* =========================================================
   COUNTDOWN HELPERS
   ========================================================= */

function getTimeRemaining(targetDate) {

    const now =
        new Date();


    const difference =
        targetDate.getTime() -
        now.getTime();


    if (difference <= 0) {

        return {
            finished: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

    }


    const secondsTotal =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            secondsTotal / 86400
        );


    const hours =
        Math.floor(
            (secondsTotal % 86400) /
            3600
        );


    const minutes =
        Math.floor(
            (secondsTotal % 3600) /
            60
        );


    const seconds =
        secondsTotal % 60;


    return {
        finished: false,
        days,
        hours,
        minutes,
        seconds
    };

}


function pad(number) {

    return String(number)
        .padStart(2, "0");

}


/* =========================================================
   LARGE COUNTDOWN
   ========================================================= */

function formatLargeCountdown(targetDate) {

    const time =
        getTimeRemaining(targetDate);


    if (time.finished) {
        return "NOW";
    }


    return `
        ${time.days}D
        ${pad(time.hours)}H
        ${pad(time.minutes)}M
        ${pad(time.seconds)}S
    `;

}


/* =========================================================
   QUEST COUNTDOWN
   ========================================================= */

function formatQuestCountdown(targetDate) {

    const time =
        getTimeRemaining(targetDate);


    if (time.finished) {
        return "NOW";
    }


    if (time.days > 0) {

        return `
            ${time.days}D
            ${pad(time.hours)}H
        `;

    }


    return `
        ${pad(time.hours)}H
        ${pad(time.minutes)}M
    `;

}


/* =========================================================
   FIND NEXT QUEST
   ========================================================= */

function getNextQuest() {

    const now =
        new Date();


    for (const quest of QUESTS) {

        const date =
            QUEST_DATES[quest.id];


        if (
            date &&
            now < date
        ) {

            return {
                quest,
                date
            };

        }

    }


    return null;

}


/* =========================================================
   MAIN COUNTDOWN
   ========================================================= */

/*
 * The main countdown ALWAYS points to the next quest.
 *
 * Before the game:
 *     Quest 1
 *
 * During the game:
 *     Next upcoming quest
 *
 * Before October 31:
 *     Quest 10 / Hallowed Convergence
 *
 * After October 31:
 *     NOW
 */

function updateGameStartCountdown() {

    const timer =
        document.getElementById(
            "countdown-start-timer"
        );


    const status =
        document.getElementById(
            "countdown-start-status"
        );


    const title =
        document.getElementById(
            "countdown-start-title"
        );


    const label =
        document.getElementById(
            "countdown-start-label"
        );


    const nextQuest =
        getNextQuest();


    /*
     * Before / during the quest schedule
     */

    if (nextQuest) {

        if (timer) {

            timer.textContent =
                formatLargeCountdown(
                    nextQuest.date
                );

        }


        if (status) {

            status.textContent =
                nextQuest.quest.id === "quest-10"
                    ? "FINALE"
                    : "NEXT QUEST";

            status.classList.remove(
                "live"
            );

        }


        if (title) {

            title.textContent =
                nextQuest.quest.title;

        }


        if (label) {

            label.textContent =
                nextQuest.quest.number;

        }


        return;
    }


    /*
     * All quests have happened.
     */

    if (timer) {
        timer.textContent = "NOW";
    }


    if (status) {

        status.textContent =
            "THE GAME IS COMPLETE";

        status.classList.add(
            "live"
        );

    }


    if (title) {

        title.textContent =
            "THE HALLOWED CONVERGENCE";

    }


    if (label) {
        label.textContent = "QUEST 10";
    }

}


/* =========================================================
   HOME COUNTDOWN
   ========================================================= */

function updateHomeCountdown() {

    const element =
        document.getElementById(
            "home-countdown"
        );


    if (!element) {
        return;
    }


    const nextQuest =
        getNextQuest();


    if (nextQuest) {

        element.textContent =
            formatLargeCountdown(
                nextQuest.date
            );

        return;
    }


    element.textContent =
        "NOW";

}


/* =========================================================
   QUEST COUNTDOWNS
   ========================================================= */

function updateQuestCountdowns() {

    Object.entries(
        QUEST_DATES
    ).forEach(
        ([questId, targetDate]) => {

            const timer =
                document.querySelector(
                    `[data-countdown-id="${questId}"]`
                );


            const status =
                document.querySelector(
                    `[data-status-id="${questId}"]`
                );


            const eventCard =
                document.querySelector(
                    `[data-event-id="${questId}"]`
                );


            const questCard =
                document.querySelector(
                    `[data-quest-id="${questId}"]`
                );


            const card =
                eventCard ||
                questCard;


            const time =
                getTimeRemaining(
                    targetDate
                );


            /*
             * Quest is active / has arrived.
             */

            if (time.finished) {

                if (timer) {

                    timer.textContent =
                        "ACTIVE";

                }


                if (status) {

                    status.textContent =
                        "ACTIVE";

                    status.classList.add(
                        "live"
                    );

                }


                if (card) {

                    card.classList.add(
                        "active"
                    );

                    card.classList.remove(
                        "upcoming"
                    );

                }


                return;

            }


            /*
             * Quest is upcoming.
             */

            if (timer) {

                timer.textContent =
                    formatQuestCountdown(
                        targetDate
                    );

            }


            if (status) {

                status.textContent =
                    "UPCOMING";

                status.classList.remove(
                    "live"
                );

            }


            if (card) {

                card.classList.remove(
                    "active"
                );

                card.classList.add(
                    "upcoming"
                );

            }

        }
    );

}


/* =========================================================
   FINALE / QUEST 10
   ========================================================= */

/*
 * There is intentionally NO separate finale event.
 *
 * Quest 10 IS the finale.
 *
 * If the existing HTML still has a
 * countdown-finale-timer element, we update it too,
 * so the old layout does not break.
 */

function updateFinaleCountdown() {

    const timer =
        document.getElementById(
            "countdown-finale-timer"
        );


    const status =
        document.getElementById(
            "countdown-finale-status"
        );


    if (!timer && !status) {
        return;
    }


    const time =
        getTimeRemaining(
            FINALE_DATE
        );


    if (timer) {

        timer.textContent =
            time.finished
                ? "NOW"
                : formatLargeCountdown(
                    FINALE_DATE
                );

    }


    if (status) {

        status.textContent =
            time.finished
                ? "THE CONVERGENCE HAS BEGUN"
                : "QUEST 10 — THE HALLOWED CONVERGENCE";


        if (time.finished) {

            status.classList.add(
                "live"
            );

        }
        else {

            status.classList.remove(
                "live"
            );

        }

    }

}


/* =========================================================
   UPDATE ALL COUNTDOWNS
   ========================================================= */

function updateAllCountdowns() {

    updateGameStartCountdown();

    updateHomeCountdown();

    updateQuestCountdowns();

    updateFinaleCountdown();

}


updateAllCountdowns();


setInterval(
    updateAllCountdowns,
    1000
);


/* =========================================================
   CONVERGENCE SYSTEM
   ========================================================= */

function updateConvergence() {

    const now =
        new Date();


    let percentage = 0;


    if (now >= GAME_START) {

        const total =
            FINALE_DATE -
            GAME_START;


        const elapsed =
            now -
            GAME_START;


        percentage =
            (elapsed / total) *
            100;

    }


    percentage =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );


    /*
     * Home meter
     */

    const meter =
        document.getElementById(
            "meter-fill"
        );


    const value =
        document.getElementById(
            "meter-value"
        );


    if (meter) {

        meter.style.width =
            `${percentage}%`;

    }


    if (value) {

        value.textContent =
            `${Math.floor(percentage)}%`;

    }


    /*
     * Convergence page meter
     */

    const pageMeter =
        document.getElementById(
            "convergence-page-meter"
        );


    const pageValue =
        document.getElementById(
            "convergence-page-value"
        );


    if (pageMeter) {

        pageMeter.style.width =
            `${percentage}%`;

    }


    if (pageValue) {

        pageValue.textContent =
            `${Math.floor(percentage)}%`;

    }


    /*
     * Status
     */

    const status =
        document.getElementById(
            "status"
        );


    const pageStatus =
        document.getElementById(
            "convergence-page-status"
        );


    let statusText =
        "MONITORING";


    if (percentage >= 100) {

        statusText =
            "CONVERGENCE";

    }
    else if (percentage >= 75) {

        statusText =
            "CRITICAL";

    }
    else if (percentage >= 50) {

        statusText =
            "UNSTABLE";

    }
    else if (percentage >= 25) {

        statusText =
            "DEGRADING";

    }


    if (status) {

        status.textContent =
            statusText;

    }


    if (pageStatus) {

        pageStatus.textContent =
            statusText;

    }

}


updateConvergence();


setInterval(
    updateConvergence,
    1000
);


/* =========================================================
   SYSTEM LOG
   ========================================================= */

function updateSystemLog() {

    const element =
        document.getElementById(
            "system-log-text"
        );


    if (!element) {
        return;
    }


    const now =
        new Date();


    if (now < GAME_START) {

        element.textContent =
            "The island remains under observation. Halloween 2026 has not begun.";

        return;

    }


    if (now >= FINALE_DATE) {

        element.textContent =
            "THE CONVERGENCE IS ACTIVE. SEVERING PROTOCOL REQUIRED.";

        return;

    }


    element.textContent =
        "Monitoring the island. The connection continues to strengthen.";

}


updateSystemLog();


setInterval(
    updateSystemLog,
    5000
);


/* =========================================================
   QUEST ARCHIVE
   ========================================================= */

function initializeQuestArchive() {

    const list =
        document.getElementById(
            "quest-list"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    QUESTS.forEach(
        quest => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "event-card";


            article.dataset.questId =
                quest.id;


            article.dataset.eventId =
                quest.id;


            article.innerHTML = `

                <div class="event-card-date">
                    ${quest.date}
                </div>

                <div>

                    <div class="event-card-number">
                        ${quest.number}
                    </div>

                    <div class="event-card-title">
                        ${quest.title}
                    </div>

                    <div class="event-card-subtitle">
                        ${quest.description}
                    </div>

                    <div
                        class="event-card-countdown"
                        data-countdown-id="${quest.id}">
                        ${formatQuestCountdown(
                            QUEST_DATES[quest.id]
                        )}
                    </div>

                </div>

                <div
                    class="event-card-status"
                    data-status-id="${quest.id}">
                    UPCOMING
                </div>

            `;


            article.addEventListener(
                "click",
                () => {

                    showQuestDetails(
                        quest
                    );

                }
            );


            list.appendChild(
                article
            );

        }
    );


    updateQuestCountdowns();

}


function showQuestDetails(quest) {

    const detail =
        document.getElementById(
            "quest-detail"
        );


    const number =
        document.getElementById(
            "quest-detail-number"
        );


    const date =
        document.getElementById(
            "quest-detail-date"
        );


    const title =
        document.getElementById(
            "event-detail-title"
        );


    const description =
        document.getElementById(
            "event-detail-description"
        );


    if (!detail) {
        return;
    }


    if (number) {

        number.textContent =
            quest.number;

    }


    if (date) {

        date.textContent =
            quest.date;

    }


    if (title) {

        title.textContent =
            quest.title;

    }


    if (description) {

        description.textContent =
            quest.description;

    }


    detail.classList.add(
        "visible"
    );

}


initializeQuestArchive();


/* =========================================================
   ISLAND MAP
   ========================================================= */

const mapLocations =
    document.querySelectorAll(
        ".map-location"
    );

mapLocations.forEach(
    location => {

        location.addEventListener(
            "click",
            () => {

                const title =
                    document.getElementById(
                        "map-detail-title"
                    );

                const text =
                    document.getElementById(
                        "map-detail-text"
                    );

                mapLocations.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );

                location.classList.add(
                    "selected"
                );

                if (title) {
                    title.textContent =
                        location.dataset.location;
                }

                if (text) {
                    text.textContent =
                        location.dataset.description;
                }

            }
        );

    }
);





/* =========================================================
   BACKGROUND MUSIC
   ========================================================= */

const backgroundMusic =
    document.getElementById(
        "background-music"
    );


let musicStarted =
    false;


function startMusic() {

    if (
        !backgroundMusic ||
        musicStarted
    ) {

        return;

    }


    backgroundMusic.volume =
        0.35;


    backgroundMusic
        .play()
        .then(
            () => {

                musicStarted =
                    true;

            }
        )
        .catch(
            () => {

                /*
                 * Browser autoplay protection.
                 */

            }
        );

}


document.addEventListener(
    "click",
    startMusic,
    {
        once: false
    }
);


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

    const layer =
        document.getElementById(
            "particle-layer"
        );


    if (!layer) {
        return;
    }


    /*
     * Prevent duplicate particles if
     * this function is ever called again.
     */

    if (
        layer.children.length > 0
    ) {

        return;

    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 10}s`;


        particle.style.animationDuration =
            `${8 + Math.random() * 12}s`;


        layer.appendChild(
            particle
        );

    }

}


createParticles();


/* =========================================================
   CONVERGENCE CORRUPTION
   ========================================================= */

function updateCorruption() {

    const now =
        new Date();


    const start =
        GAME_START;


    const finale =
        FINALE_DATE;


    let progress =
        0;


    if (now > start) {

        progress =
            (now - start) /
            (finale - start);

    }


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    const corruption =
        document.getElementById(
            "convergence-corruption"
        );


    if (!corruption) {
        return;
    }


    corruption.style.setProperty(
        "--corruption",
        progress
    );


    if (progress >= 0.75) {

        corruption.classList.add(
            "critical"
        );

    }
    else {

        corruption.classList.remove(
            "critical"
        );

    }

}


updateCorruption();


setInterval(
    updateCorruption,
    5000
);


/* =========================================================
   TRANSMISSION
   ========================================================= */

const transmission =
    document.getElementById(
        "system-transmission"
    );


const transmissionClose =
    document.getElementById(
        "transmission-close"
    );


if (transmissionClose) {

    transmissionClose.addEventListener(
        "click",
        () => {

            if (transmission) {

                transmission.classList.remove(
                    "visible"
                );

            }

        }
    );

}


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "%cTHE GAME 2026",
    "font-size:24px;font-weight:bold;"
);


console.log(
    "Countdown system initialized."
);


console.log(
    "Game Start:",
    GAME_START
);


console.log(
    "Quest 10 / Hallowed Convergence:",
    FINALE_DATE
);


console.log(
    "Quest Dates:",
    QUEST_DATES
);

/* =========================================================================
   THE GAME 2026 — PREVIOUS EVENTS ARCHIVE DOSSIER
   =========================================================================
   Self-contained. Does not touch script.js or any existing page-routing
   logic. Only wires up:
     - clicking a .prev-event-card -> opens the fullscreen dossier overlay
     - #event-archive-back / Escape / backdrop click -> closes it
     - clicking a gallery image / finale image -> opens the lightbox

   All content for Easter and Summer lives in the EVENTS object below.

   IMAGE FILES:
     Easter:
       easter-teaser-1.jpg
       easter-teaser-2.jpg
       easter-teaser-3.jpg
       easter-teaser-4.jpg
       easter-teaser-5.jpg
       easter-teaser-6.jpg
       easter-teaser-7.jpg
       easter-teaser-8.jpg
       easter-finale.jpg

     Summer:
       summer-teaser-1.jpg
       summer-teaser-2.jpg
       summer-teaser-3.jpg
       summer-teaser-4.jpg
       summer-teaser-5.jpg
       summer-teaser-6.jpg
       summer-teaser-7.jpg
       summer-teaser-8.jpg
       summer-finale.jpg

   All image files are expected to be next to the HTML file.
   ========================================================================= */

(function () {
  "use strict";

  /* =======================================================================
     EVENT DATA
     ======================================================================= */

  var EVENTS = {

    /* =====================================================================
       EASTER EDITION
       ===================================================================== */

    easter: {
      era: "easter",
      tag: "EASTER 2026 / ARCHIVED RECORD",
      title: "THE EASTER EDITION",
      subtitle: "THE FIRST NEW ERA OF THE GAME",
      dates: "APRIL 06 — APRIL 25, 2026",

      overview: [
        "The Easter Edition was the first brand-new edition of The Game 2026 to introduce the token system. The event opened on April 6, and the finale took place on April 25.",
        "The event used a total of approximately 12 tokens. Players had to complete a variety of minigames in order to obtain them, including an Easter hunt inside the windmill, redstone-based challenges, zombie fights, puzzle-style challenges, exploration challenges, and several other custom minigames.",
        "The intention of the system was that players needed specific tokens, or a specific amount of tokens, in order to qualify for the finale. However, the token system did not function completely correctly, and because of this, everyone was eventually allowed to participate in the finale. This is recorded here honestly, as part of the true history of the event."
      ],

      sections: [
        {
          heading: "THE KILLER BUNNY",
          paragraphs: [
            "The main villain of the Easter Edition was the Killer Bunny. She slowly made her way from the mountain toward the forest, and as she moved across the island, corruption appeared around her — the ground changed into crimson netherrack, and crimson trees appeared in the places where she walked.",
            "This made her path across the island visually obvious to anyone watching. Eventually, the Killer Bunny stopped above the Fountain. She flew above it and watched the Forest Beacon, which was slowly becoming corrupted."
          ]
        },

        {
          heading: "THE FORSAKEN UNSEALER",
          paragraphs: [
            "At the point where she settled above the corrupted Forest Beacon, the Killer Bunny became known by a new name: THE FORSAKEN UNSEALER.",
            "The players eventually confronted her. It was the first real boss fight of this new era of The Game — relatively simple compared with later finales, with a handful of abilities, essentially the team's first attempt at building a proper boss encounter. It was built in approximately one week."
          ]
        },

        {
          heading: "THE FOREST BEACON",
          paragraphs: [
            "The players defeated the Killer Bunny. After her defeat, the corruption affecting the Forest Beacon was removed.",
            "However, the beacon was still damaged. More importantly, the connection to the island remained — a detail that would matter far more than it seemed at the time."
          ]
        }
      ],

      timeline: [
        { date: "APR 06", label: "Event Opens" },
        { date: "", label: "Token System Introduced" },
        { date: "", label: "Killer Bunny Appears" },
        { date: "", label: "Corruption Spreads" },
        { date: "", label: "Forest Beacon Targeted" },
        { date: "", label: "Killer Bunny Becomes The Forsaken Unsealer" },
        { date: "APR 25", label: "Easter Finale", marker: true },
        { date: "", label: "Killer Bunny Defeated" },
        { date: "", label: "Forest Beacon Saved, But Damaged" },
        { date: "", label: "Connection Remains" },
        { date: "APR 29–30", label: "Summoning Tower Appears", marker: true }
      ],

      /* EXACT EASTER TEASER FILES */
      gallery: {
        prefix: "easter-teaser-",
        count: 8
      },

      finale: {
        label: "EASTER FINALE",
        date: "APRIL 25, 2026",
        name: "THE FORSAKEN UNSEALER",

        paragraphs: [
          "The Easter finale was a normal boss fight, and the team's first attempt at a custom boss encounter. It included several abilities and was built in roughly one week.",
          "The boss was the Killer Bunny — the Forsaken Unsealer. The players defeated her. The Forest Beacon stopped being corrupted but remained damaged, and the connection to the island remained."
        ],

        image: "easter-finale.jpg"
      },

      aftermathHeading: "SUMMONING TOWER",

      aftermath: [
        "THE EASTER EDITION ENDED, BUT THE ISLAND WAS NOT RESTORED.",
        "The Forest Beacon had survived, but something had remained connected to the island. Near the end of the Easter period, around April 29–30, a mysterious structure appeared: THE SUMMONING TOWER.",
        "The tower was connected to the summoning of the Crimson Lord. It did not immediately lead to a major event during Easter — instead, it became a setup for what would happen during the Summer Edition. The appearance of the Summoning Tower marked the beginning of what came next."
      ],

      strongLines: []
    },


    /* =====================================================================
       SUMMER EDITION
       ===================================================================== */

    summer: {
      era: "summer",
      tag: "SUMMER 2026 / ARCHIVED RECORD",
      title: "THE SUMMER EDITION",
      subtitle: "THE CRIMSON LORD",
      dates: "JUNE 20 — JULY 09, 2026",

      overview: [
        "The Summer Edition continued the same token system introduced during Easter, with approximately 20 tokens in total. Unlike Easter, there were no minigames used to obtain them — instead, the tokens were hidden around the island, and players had to find them.",
        "Players who had obtained all the tokens and attended the opening were allowed into the finale. Players could also be manually given permission by the project lead. The Summer Edition therefore used the token system in a much more exploration-focused way than Easter."
      ],

      sections: [
        {
          heading: "THE CRIMSON LORD",
          paragraphs: [
            "The villain of the Summer Edition was THE CRIMSON LORD, who had his own fortress inside the Crimson Forest. At first, he did not actively attack players — he remained inside the forest, and instead of directly fighting the players, he slowly spread his corruption outward.",
            "His focus was not primarily player-hunting. His target was the island's Seal System."
          ]
        },

        {
          heading: "THE SEVEN SEALS",
          paragraphs: [
            "The Crimson Lord attacked the seven Seal Statues one by one — the core mechanism of the island's Seal System, not merely decorative structures. As each statue was destroyed, the island's protection grew weaker.",
            "The Mountain Seal was the first to fall. The remaining statues were destroyed gradually throughout the Summer storyline, each destruction slowly approaching the finale. By the end of the Summer Edition, ALL SEVEN SEALS WERE BROKEN, and the Seal System was effectively gone."
          ]
        },

        {
          heading: "THE CRIMSON FOREST",
          paragraphs: [
            "The important locations of the Summer Edition were the Sealkeeper Tower, the Cathedral, the Crimson Forest, the Crimson Blade, the Fountain, and the Volcano — at this point still associated with the Forest Beacon and the former forest area.",
            "The Crimson Forest itself was the Crimson Lord's stronghold, and the source point of the corruption spreading toward the seals."
          ]
        }
      ],

      timeline: [
        { date: "JUN 20", label: "Event Opens" },
        { date: "", label: "Hidden Tokens" },
        { date: "", label: "Crimson Lord Emerges" },
        { date: "", label: "Crimson Forest Corrupted" },
        { date: "", label: "Mountain Seal Destroyed" },
        { date: "", label: "Remaining Seals Destroyed One By One" },
        { date: "", label: "Final Seal Destroyed" },
        { date: "JUL 09", label: "The Game 2026: Summer Finale", marker: true },
        { date: "", label: "Crimson Lord Defeated" },
        { date: "", label: "Death Scene" },
        { date: "", label: "Aftermath" },
        { date: "", label: "Crimson Lord Is Not Dead", marker: true },
        { date: "", label: "All Seals Broken", marker: true },
        { date: "", label: "The Hallow King Awakens", marker: true }
      ],

      /* EXACT SUMMER TEASER FILES */
      gallery: {
        prefix: "summer-teaser-",
        count: 8
      },

      finale: {
        label: "THE GAME 2026: SUMMER FINALE",
        date: "JULY 09, 2026",
        name: "THE CRIMSON LORD",

        paragraphs: [
          "The Summer finale was a custom boss fight against the Crimson Lord. Compared with Easter, it was far more ambitious — significantly more effects, a more elaborate boss encounter, a custom death scene, and a larger cinematic presentation overall.",
          "The Crimson Lord appeared to be defeated. The aftermath revealed otherwise."
        ],

        image: "summer-finale.jpg"
      },

      aftermathHeading: "THE AFTERMATH",

      aftermath: [
        "The Crimson Lord was not truly dead.",
        "The seven seals had all been destroyed. The island's protection was gone. And the destruction of the final seal triggered the awakening of something far older."
      ],

      strongLines: [
        "ALL SEALS ARE BROKEN.",
        "THE HALLOW KING IS AWAKENING."
      ]
    }

  };


  /* =======================================================================
     HELPERS
     ======================================================================= */

  function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }


  /* =======================================================================
     TIMELINE
     ======================================================================= */

  function renderTimeline(steps) {
    return (
      '<div class="dossier-timeline">' +

      steps.map(function (s) {
        return (
          '<div class="timeline-step' +
            (s.marker ? " marker" : "") +
          '">' +

            (
              s.date
                ? '<div class="timeline-step-date">' +
                    s.date +
                  '</div>'
                : ""
            ) +

            '<div class="timeline-step-title">' +
              s.label +
            '</div>' +

          '</div>'
        );
      }).join("") +

      '</div>'
    );
  }


  /* =======================================================================
     PHOTO GALLERY
     =======================================================================

     IMPORTANT:
     If prefix = "easter-teaser-"

     The generated files are:

       easter-teaser-1.jpg
       easter-teaser-2.jpg
       easter-teaser-3.jpg
       ...
       easter-teaser-8.jpg

     If prefix = "summer-teaser-"

     The generated files are:

       summer-teaser-1.jpg
       summer-teaser-2.jpg
       ...
       summer-teaser-8.jpg
     ======================================================================= */

  function renderGallery(gallery, eventTitle) {

    var items = [];

    for (var i = 1; i <= gallery.count; i++) {

      /* EXACT FILE NAME */
      var file = gallery.prefix + i + ".jpg";

      /* Convert the prefix into a readable label */
      var label = gallery.prefix
        .replace("-teaser-", "")
        .toUpperCase() +
        " TEASER " +
        i;

      items.push(

        '<div class="gallery-item" ' +

          'data-fallback="' +
            escapeAttr(
              label + " — IMAGE NOT YET ADDED"
            ) +
          '" ' +

          'data-caption="' +
            escapeAttr(
              label + " — " + eventTitle
            ) +
          '">' +

            '<img src="' +
              file +
            '" ' +

              'alt="' +
                escapeAttr(
                  label + " — " + eventTitle
                ) +
              '" ' +

              'loading="lazy">' +

            '<span class="gallery-item-label">' +
              label +
            '</span>' +

        '</div>'
      );
    }

    return (

      '<div class="dossier-gallery-count">' +
        gallery.count +
        ' PHOTOS' +
      '</div>' +

      '<div class="dossier-gallery">' +
        items.join("") +
      '</div>'
    );
  }


  /* =======================================================================
     FINALE
     ======================================================================= */

  function renderFinale(finale) {

    return (

      '<div class="dossier-finale">' +

        '<div class="dossier-finale-label">' +
          finale.label +
        '</div>' +

        '<div class="dossier-finale-date">' +
          finale.date +
        '</div>' +

        '<h2>' +
          finale.name +
        '</h2>' +

        finale.paragraphs.map(function (p) {
          return '<p>' + p + '</p>';
        }).join("") +

        '<div class="dossier-finale-image" ' +

          'data-fallback="FINALE IMAGE — NOT YET ADDED" ' +

          'data-caption="' +
            escapeAttr(finale.label) +
          '">' +

            '<img src="' +
              finale.image +
            '" ' +

              'alt="' +
                escapeAttr(finale.label) +
              '" ' +

              'loading="lazy">' +

            '<span class="dossier-finale-image-label">' +
              'FINALE — ' +
              finale.date +
            '</span>' +

        '</div>' +

      '</div>'
    );
  }


  /* =======================================================================
     AFTERMATH
     ======================================================================= */

  function renderAftermath(ev) {

    var strong = ev.strongLines.map(function (line) {

      return (
        '<span class="aftermath-strong">' +
          line +
        '</span>'
      );

    }).join("");

    return (

      '<div class="dossier-aftermath">' +

        '<div class="dossier-section-label">' +
          ev.aftermathHeading +
        '</div>' +

        ev.aftermath.map(function (p) {
          return '<p>' + p + '</p>';
        }).join("") +

        strong +

      '</div>'
    );
  }


  /* =======================================================================
     FULL DOSSIER
     ======================================================================= */

  function renderDossier(ev) {

    var html = "";


    /* HERO */

    html +=
      '<div class="dossier-hero era-' +
        ev.era +
      '">';

    html +=
      '<span class="dossier-hero-tag">' +
        ev.tag +
      '</span>';

    html +=
      '<h1>' +
        ev.title +
      '</h1>';

    html +=
      '<div class="dossier-hero-subtitle">' +
        ev.subtitle +
      '</div>';

    html +=
      '<div class="dossier-hero-dates">' +
        ev.dates +
      '</div>';

    html +=
      '</div>';


    /* OVERVIEW */

    html +=
      '<div class="dossier-section">';

    html +=
      '<div class="dossier-section-label">' +
        'OVERVIEW' +
      '</div>';

    html +=
      '<div class="dossier-section-label">' +
        'THE TOKEN SYSTEM' +
      '</div>';

    html +=
      ev.overview.map(function (p) {
        return '<p>' + p + '</p>';
      }).join("");

    html +=
      '</div>';


    /* STORY SECTIONS */

    ev.sections.forEach(function (s) {

      html +=
        '<div class="dossier-section">';

      html +=
        '<div class="dossier-section-label">' +
          s.heading +
        '</div>';

      html +=
        s.paragraphs.map(function (p) {
          return '<p>' + p + '</p>';
        }).join("");

      html +=
        '</div>';
    });


    /* TIMELINE */

    html +=
      '<div class="dossier-section">';

    html +=
      '<div class="dossier-section-label">' +
        'EVENT TIMELINE' +
      '</div>';

    html +=
      renderTimeline(ev.timeline);

    html +=
      '</div>';


    /* PHOTO ARCHIVE */

    html +=
      '<div class="dossier-section">';

    html +=
      '<div class="dossier-section-label">' +
        'PHOTO ARCHIVE' +
      '</div>';

    html +=
      renderGallery(
        ev.gallery,
        ev.title
      );

    html +=
      '</div>';


    /* FINALE */

    html +=
      renderFinale(ev.finale);


    /* AFTERMATH */

    html +=
      renderAftermath(ev);


    return html;
  }


  /* =======================================================================
     WIRING
     ======================================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      var viewer =
        document.getElementById(
          "event-archive-viewer"
        );

      var scrollEl =
        viewer
          ? viewer.querySelector(
              ".event-archive-scroll"
            )
          : null;

      var content =
        document.getElementById(
          "dossier-content"
        );

      var backBtn =
        document.getElementById(
          "event-archive-back"
        );

      var lightbox =
        document.getElementById(
          "event-lightbox"
        );

      var lightboxImg =
        document.getElementById(
          "event-lightbox-image"
        );

      var lightboxCaption =
        document.getElementById(
          "event-lightbox-caption"
        );

      var lightboxClose =
        document.getElementById(
          "event-lightbox-close"
        );


      if (!viewer || !content) {
        return;
      }


      /* ===================================================================
         OPEN EVENT
         =================================================================== */

      function openEvent(id) {

        var ev = EVENTS[id];

        if (!ev) {
          return;
        }


        /* Render dossier */

        content.innerHTML =
          renderDossier(ev);


        /* ===============================================================
           BROKEN IMAGE FALLBACK
           =============================================================== */

        content
          .querySelectorAll(
            ".gallery-item img, .dossier-finale-image img"
          )
          .forEach(function (img) {

            img.addEventListener(
              "error",
              function () {

                var wrap =
                  img.closest(
                    ".gallery-item, .dossier-finale-image"
                  );

                if (wrap) {
                  wrap.classList.add(
                    "img-missing"
                  );
                }

              }
            );

          });


        /* ===============================================================
           LIGHTBOX
           =============================================================== */

        content
          .querySelectorAll(
            ".gallery-item, .dossier-finale-image"
          )
          .forEach(function (item) {

            item.addEventListener(
              "click",
              function () {

                if (
                  item.classList.contains(
                    "img-missing"
                  )
                ) {
                  return;
                }

                var img =
                  item.querySelector("img");

                if (!img) {
                  return;
                }

                openLightbox(
                  img.src,
                  item.getAttribute(
                    "data-caption"
                  ) || ""
                );

              }
            );

          });


        /* Open viewer */

        viewer.classList.add("active");

        viewer.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.style.overflow =
          "hidden";


        if (scrollEl) {
          scrollEl.scrollTop = 0;
        }

      }


      /* ===================================================================
         CLOSE EVENT
         =================================================================== */

      function closeEvent() {

        viewer.classList.remove(
          "active"
        );

        viewer.setAttribute(
          "aria-hidden",
          "true"
        );

        document.body.style.overflow =
          "";

      }


      /* ===================================================================
         OPEN LIGHTBOX
         =================================================================== */

      function openLightbox(
        src,
        caption
      ) {

        if (
          !lightbox ||
          !lightboxImg
        ) {
          return;
        }

        lightboxImg.src =
          src;

        lightboxImg.alt =
          caption;

        if (lightboxCaption) {

          lightboxCaption.textContent =
            caption;

        }

        lightbox.classList.add(
          "active"
        );

        lightbox.setAttribute(
          "aria-hidden",
          "false"
        );

      }


      /* ===================================================================
         CLOSE LIGHTBOX
         =================================================================== */

      function closeLightbox() {

        if (!lightbox) {
          return;
        }

        lightbox.classList.remove(
          "active"
        );

        lightbox.setAttribute(
          "aria-hidden",
          "true"
        );

      }


      /* ===================================================================
         EVENT CARDS
         =================================================================== */

      document
        .querySelectorAll(
          ".prev-event-card"
        )
        .forEach(function (card) {

          card.addEventListener(
            "click",
            function () {

              openEvent(
                card.getAttribute(
                  "data-event"
                )
              );

            }
          );


          card.addEventListener(
            "keydown",
            function (e) {

              if (
                e.key === "Enter" ||
                e.key === " "
              ) {

                e.preventDefault();

                openEvent(
                  card.getAttribute(
                    "data-event"
                  )
                );

              }

            }
          );

        });


      /* ===================================================================
         BACK BUTTON
         =================================================================== */

      if (backBtn) {

        backBtn.addEventListener(
          "click",
          closeEvent
        );

      }


      /* ===================================================================
         BACKDROP CLICK
         =================================================================== */

      viewer.addEventListener(
        "click",
        function (e) {

          if (e.target === viewer) {
            closeEvent();
          }

        }
      );


      /* ===================================================================
         LIGHTBOX CLOSE
         =================================================================== */

      if (lightboxClose) {

        lightboxClose.addEventListener(
          "click",
          closeLightbox
        );

      }


      if (lightbox) {

        lightbox.addEventListener(
          "click",
          function (e) {

            if (e.target === lightbox) {
              closeLightbox();
            }

          }
        );

      }


      /* ===================================================================
         ESCAPE KEY
         =================================================================== */

      document.addEventListener(
        "keydown",
        function (e) {

          if (e.key !== "Escape") {
            return;
          }

          if (
            lightbox &&
            lightbox.classList.contains(
              "active"
            )
          ) {

            closeLightbox();

            return;
          }

          if (
            viewer.classList.contains(
              "active"
            )
          ) {

            closeEvent();

          }

        }
      );

    }
  );

})();

/* =========================================================================
   THE GAME 2026 — CORRUPTION ATMOSPHERE
   Animated crimson particles + spreading corruption veins
   ========================================================================= */

(() => {
    const hero = document.querySelector('#home.page > .hero');

    if (!hero) {
        console.warn('[Corruption] Hero not found.');
        return;
    }

    /* ---------------------------------------------------------------------
       CONTAINER
       --------------------------------------------------------------------- */

    const atmosphere = document.createElement('div');
    atmosphere.className = 'corruption-atmosphere';

    Object.assign(atmosphere.style, {
        position: 'absolute',
        inset: '0',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: '1'
    });

    hero.appendChild(atmosphere);


    /* ---------------------------------------------------------------------
       PARTICLES
       --------------------------------------------------------------------- */

    const particleContainer = document.createElement('div');
    particleContainer.className = 'corruption-particles';

    Object.assign(particleContainer.style, {
        position: 'absolute',
        inset: '0',
        overflow: 'hidden',
        pointerEvents: 'none'
    });

    atmosphere.appendChild(particleContainer);


    const particles = [];

    const PARTICLE_COUNT = 55;

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        const particle = document.createElement('span');
        particle.className = 'corruption-particle';

        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        const duration = 7 + Math.random() * 13;
        const delay = Math.random() * -20;

        Object.assign(particle.style, {
            position: 'absolute',
            left: `${startX}%`,
            top: `${startY}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'rgba(184, 34, 31, 0.85)',
            boxShadow: `0 0 ${size * 3}px rgba(184, 34, 31, 0.45)`,
            opacity: '0.25',
            animation: `corruptionParticle ${duration}s linear ${delay}s infinite`,
            willChange: 'transform, opacity'
        });

        particleContainer.appendChild(particle);
        particles.push(particle);
    }


    /* ---------------------------------------------------------------------
       CORRUPTION VEINS
       --------------------------------------------------------------------- */

    const veins = document.createElement('div');
    veins.className = 'corruption-veins';

    Object.assign(veins.style, {
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none'
    });

    atmosphere.appendChild(veins);


    /*
       SVG gives us proper organic branching lines without needing
       additional images.
    */

    veins.innerHTML = `
        <svg
            class="corruption-svg"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            aria-hidden="true"
        >

            <!-- LEFT SIDE -->
            <path class="corruption-vein"
                d="M0 760
                   C80 720 90 650 155 620
                   C210 590 190 530 250 490
                   C290 460 275 400 330 360"
            />

            <path class="corruption-vein"
                d="M0 620
                   C75 600 110 555 145 515
                   C175 480 205 475 220 420
                   C235 375 280 350 300 300"
            />

            <path class="corruption-vein"
                d="M120 900
                   C160 820 210 790 245 735
                   C280 680 310 665 350 610
                   C380 570 405 560 425 515"
            />

            <!-- RIGHT SIDE -->
            <path class="corruption-vein"
                d="M1600 760
                   C1520 720 1510 650 1445 620
                   C1390 590 1410 530 1350 490
                   C1310 460 1325 400 1270 360"
            />

            <path class="corruption-vein"
                d="M1600 620
                   C1525 600 1490 555 1455 515
                   C1425 480 1395 475 1380 420
                   C1365 375 1320 350 1300 300"
            />

            <path class="corruption-vein"
                d="M1480 900
                   C1440 820 1390 790 1355 735
                   C1320 680 1290 665 1250 610
                   C1220 570 1195 560 1175 515"
            />

            <!-- SMALL BRANCHES -->
            <path class="corruption-vein branch"
                d="M155 620
                   C190 635 210 650 230 680"
            />

            <path class="corruption-vein branch"
                d="M250 490
                   C230 470 215 445 220 420"
            />

            <path class="corruption-vein branch"
                d="M1445 620
                   C1410 635 1390 650 1370 680"
            />

            <path class="corruption-vein branch"
                d="M1350 490
                   C1370 470 1385 445 1380 420"
            />

        </svg>
    `;


    /* ---------------------------------------------------------------------
       ANIMATION CSS
       --------------------------------------------------------------------- */

    if (!document.querySelector('#corruption-atmosphere-style')) {

        const style = document.createElement('style');
        style.id = 'corruption-atmosphere-style';

        style.textContent = `

            @keyframes corruptionParticle {

                0% {
                    transform: translate3d(0, 40px, 0) scale(.7);
                    opacity: 0;
                }

                12% {
                    opacity: .45;
                }

                50% {
                    opacity: .8;
                }

                88% {
                    opacity: .35;
                }

                100% {
                    transform: translate3d(
                        ${Math.random() * 80 - 40}px,
                        -180px,
                        0
                    ) scale(1.15);

                    opacity: 0;
                }
            }

            .corruption-svg {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                overflow: visible;
            }

            .corruption-vein {
                fill: none;
                stroke: rgba(120, 12, 12, .34);
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;

                filter:
                    drop-shadow(
                        0 0 5px rgba(184, 34, 31, .28)
                    );

                stroke-dasharray: 900;
                stroke-dashoffset: 900;

                animation:
                    corruptionVeinGrow
                    14s
                    ease-in-out
                    infinite alternate;
            }

            .corruption-vein.branch {
                stroke-width: 1.5;
                stroke: rgba(150, 18, 18, .28);
            }

            @keyframes corruptionVeinGrow {

                0% {
                    stroke-dashoffset: 900;
                    opacity: .25;
                }

                35% {
                    opacity: .55;
                }

                100% {
                    stroke-dashoffset: 0;
                    opacity: 1;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* ---------------------------------------------------------------------
       CORRUPTION INTENSITY
       ---------------------------------------------------------------------

       Baseline is intentionally NOT zero.
       The island is already corrupted when the event begins.
       --------------------------------------------------------------------- */

    function setIntensity(value) {

        const convergence = Math.max(
            0,
            Math.min(100, Number(value) || 0)
        );

        /*
           Starting intensity:
           0% convergence = 20% visual corruption

           100% convergence = 100% visual corruption
        */

        const intensity =
            0.20 + (convergence / 100) * 0.80;


        /* PARTICLES */

        particleContainer.style.opacity =
            Math.min(1, intensity * 1.15);


        particles.forEach((particle, index) => {

            const base = 0.2 + intensity * 0.55;

            particle.style.opacity =
                Math.min(1, base);

            /*
               Higher convergence makes particles slightly larger
               and more noticeable.
            */

            const size =
                1 +
                Math.random() *
                (1.5 + intensity * 2);

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        });


        /* VEINS */

        const veinOpacity =
            0.25 + intensity * 0.75;

        veins.style.opacity =
            Math.min(1, veinOpacity);


        /*
           At high convergence, push the corruption further toward
           the center of the screen.
        */

        const spread =
            0.20 + intensity * 0.80;

        veins.style.transform =
            `scale(${0.88 + spread * 0.12})`;


        hero.dataset.corruption =
            Math.round(convergence);
    }


    /* ---------------------------------------------------------------------
       PUBLIC TEST API
       --------------------------------------------------------------------- */

    window.CorruptionAtmosphere = {
        set: setIntensity,

        reset() {
            setIntensity(0);
        },

        get() {
            return Number(
                hero.dataset.corruption || 0
            );
        }
    };


    /* ---------------------------------------------------------------------
       CONNECT TO EXISTING TEST SYSTEM
       --------------------------------------------------------------------- */

    /*
       If CorruptionTest already exists, wrap its set() function so
       the atmosphere follows it automatically.
    */

    if (
        window.CorruptionTest &&
        typeof window.CorruptionTest.set === 'function'
    ) {

        const originalSet =
            window.CorruptionTest.set;

        window.CorruptionTest.set = function(value) {

            originalSet.call(
                window.CorruptionTest,
                value
            );

            setIntensity(value);
        };
    }


    /* Initial state */
    setIntensity(0);

    console.log(
        '[Corruption Atmosphere] Active — particles + veins.'
    );

})();

/* =========================================================================
   THE GAME 2026 — INTERACTIVE ISLAND CARTOGRAPHY
   ========================================================================= */

(() => {

    const island = document.getElementById("island");

    if (!island) {
        return;
    }


    /* =====================================================
       LOCATION DATA
       ===================================================== */

    const LOCATIONS = {

        cathedral: {

            code: "LOCATION 001",

            record: "LOC-001",

            title: "CATHEDRAL",

            classification: "STRUCTURE",

            region: "CENTRAL",

            defaultStatus: "COMPROMISED",

            description:
                "The former prison of the Hallow King. The Cathedral was once the central point of the island's sealing system. Its connection to the Hallowed Realm remains active.",

            events: [
                "HALLOWEEN 2025",
                "HALLOWEEN 2026"
            ],

            entities: [
                "HALLOW KING"
            ],

            archive: "cathedral",

            warning:
                "CONNECTION TO HALLOWED REALM DETECTED."

        },


        volcano: {

            code: "LOCATION 002",

            record: "LOC-002",

            title: "VOLCANO",

            classification: "ANOMALOUS REGION",

            region: "WESTERN ISLAND",

            defaultStatus: "UNSTABLE",

            description:
                "A volcanic region associated with the island's later transformation. The area remains unstable and shows signs of increasing anomalous activity.",

            events: [
                "SUMMER 2026",
                "HALLOWEEN 2026"
            ],

            entities: [
                "UNKNOWN"
            ],

            archive: "volcano",

            warning:
                "THERMAL AND ANOMALOUS ACTIVITY DETECTED."

        },


        fountain: {

            code: "LOCATION 003",

            record: "LOC-003",

            title: "FOUNTAIN",

            classification: "CONNECTION POINT",

            region: "CENTRAL",

            defaultStatus: "ACTIVE",

            description:
                "The Fountain is one of the island's strongest known connection points to the Hallowed Realm. During Easter 2026, the Killer Bunny entered the island through it.",

            events: [
                "EASTER 2026",
                "HALLOWEEN 2026"
            ],

            entities: [
                "KILLER BUNNY",
                "HALLOW KING"
            ],

            archive: "fountain",

            warning:
                "HALLOWED REALM CONNECTION DETECTED."

        },


        "crimson-forest": {

            code: "LOCATION 004",

            record: "LOC-004",

            title: "CRIMSON FOREST",

            classification: "CORRUPTED REGION",

            region: "NORTH / EAST",

            defaultStatus: "CORRUPTED",

            description:
                "The forest associated with the Crimson Lord. The region became the center of the Crimson Lord's activity during Summer 2026.",

            events: [
                "SUMMER 2026",
                "THE SEAL SYSTEM",
                "THE AWAKENING"
            ],

            entities: [
                "CRIMSON LORD"
            ],

            archive: "crimson-forest",

            warning:
                "CRIMSON CORRUPTION DETECTED."

        },


        "sealkeeper-tower": {

            code: "LOCATION 005",

            record: "LOC-005",

            title: "SEALKEEPER TOWER",

            classification: "HISTORICAL STRUCTURE",

            region: "EASTERN ISLAND",

            defaultStatus: "UNKNOWN",

            description:
                "The last known location associated with the remaining Sealkeeper. The tower contains records connected to the island's former protection system.",

            events: [
                "SUMMER 2026"
            ],

            entities: [
                "SEALKEEPER"
            ],

            archive: "sealkeeper-tower",

            warning:
                "NO ACTIVE SEAL SYSTEM DETECTED."

        },


        "haunted-house": {

            code: "LOCATION 006",

            record: "LOC-006",

            title: "HAUNTED HOUSE",

            classification: "ESTABLISHED LOCATION",

            region: "WESTERN ISLAND",

            defaultStatus: "UNKNOWN",

            description:
                "An established location on the island. Current records provide insufficient information regarding its role in the Convergence.",

            events: [
                "THE GAME 2026"
            ],

            entities: [
                "UNKNOWN"
            ],

            archive: "haunted-house",

            warning:
                "NO RELIABLE SIGNAL FROM THIS LOCATION."

        }

    };


    /* =====================================================
       DOM
       ===================================================== */

    const markers =
        [...island.querySelectorAll(
            ".tg-island-marker"
        )];

    const locationCards =
        [...island.querySelectorAll(
            ".tg-island-location-card"
        )];


    const condition =
        document.getElementById(
            "tg-island-condition"
        );

    const conditionDetail =
        document.getElementById(
            "tg-island-condition-detail"
        );

    const signal =
        document.getElementById(
            "tg-island-signal"
        );

    const warningText =
        document.getElementById(
            "tg-island-warning-text"
        );

    const convergenceValue =
        document.getElementById(
            "tg-island-convergence-value"
        );

    const miniMeter =
        document.getElementById(
            "tg-island-mini-meter-fill"
        );

    const mapStatus =
        document.getElementById(
            "tg-island-map-status"
        );

    const mapSignal =
        document.getElementById(
            "tg-island-map-signal"
        );

    const logText =
        document.getElementById(
            "tg-island-log-text"
        );


    const dossierCode =
        document.getElementById(
            "tg-island-dossier-code"
        );

    const dossierTitle =
        document.getElementById(
            "tg-island-dossier-title"
        );

    const dossierStatus =
        document.getElementById(
            "tg-island-dossier-status"
        );

    const dossierClass =
        document.getElementById(
            "tg-island-dossier-class"
        );

    const dossierRegion =
        document.getElementById(
            "tg-island-dossier-region"
        );

    const dossierRecord =
        document.getElementById(
            "tg-island-dossier-record"
        );

    const dossierDescription =
        document.getElementById(
            "tg-island-dossier-description"
        );

    const dossierEvents =
        document.getElementById(
            "tg-island-dossier-events"
        );

    const dossierEntities =
        document.getElementById(
            "tg-island-dossier-entities"
        );

    const dossierWarning =
        document.getElementById(
            "tg-island-dossier-warning"
        );

    const archiveButton =
        document.getElementById(
            "tg-island-archive-button"
        );


    /* =====================================================
       MAP
       ===================================================== */

    const viewport =
        document.getElementById(
            "tg-island-map-viewport"
        );

    const stage =
        document.getElementById(
            "tg-island-map-stage"
        );

    const frame =
        document.getElementById(
            "tg-island-map-frame"
        );


    const zoomIn =
        document.getElementById(
            "tg-island-zoom-in"
        );

    const zoomOut =
        document.getElementById(
            "tg-island-zoom-out"
        );

    const resetButton =
        document.getElementById(
            "tg-island-reset"
        );

    const fullscreenButton =
        document.getElementById(
            "tg-island-fullscreen"
        );

    const zoomValue =
        document.getElementById(
            "tg-island-zoom-value"
        );


    let currentLocation =
        "cathedral";


    let zoom =
        1;

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 2.8;
    const ZOOM_STEP = .2;


    let panX = 0;
    let panY = 0;

    let dragging = false;

    let dragStartX = 0;
    let dragStartY = 0;

    let startingPanX = 0;
    let startingPanY = 0;


    /* =====================================================
       LOCATION STATUS
       ===================================================== */

    function getLocationStatus(
        location,
        percentage
    ) {

        if (!location) {
            return "UNKNOWN";
        }


        if (
            location === "cathedral"
            && percentage >= 75
        ) {
            return "CRITICAL";
        }


        if (
            location === "fountain"
            && percentage >= 75
        ) {
            return "OVERLOADED";
        }


        if (
            location === "crimson-forest"
            && percentage >= 50
        ) {
            return "CRITICAL";
        }


        if (
            location === "sealkeeper-tower"
            && percentage >= 65
        ) {
            return "SIGNAL LOST";
        }


        if (
            location === "haunted-house"
            && percentage >= 80
        ) {
            return "SIGNAL LOST";
        }


        if (
            location === "volcano"
            && percentage >= 50
        ) {
            return "CRITICAL";
        }


        return LOCATIONS[location]
            .defaultStatus;

    }


    /* =====================================================
       SELECT LOCATION
       ===================================================== */

    function selectLocation(
        id,
        focusMap = true
    ) {

        const data =
            LOCATIONS[id];

        if (!data) {
            return;
        }


        currentLocation =
            id;


        markers.forEach(
            marker => {

                marker.classList.toggle(
                    "selected",
                    marker.dataset.location === id
                );

            }
        );


        locationCards.forEach(
            card => {

                card.classList.toggle(
                    "active",
                    card.dataset.location === id
                );

            }
        );


        if (dossierCode) {
            dossierCode.textContent =
                data.code;
        }


        if (dossierTitle) {
            dossierTitle.textContent =
                data.title;
        }


        if (dossierClass) {
            dossierClass.textContent =
                data.classification;
        }


        if (dossierRegion) {
            dossierRegion.textContent =
                data.region;
        }


        if (dossierRecord) {
            dossierRecord.textContent =
                data.record;
        }


        if (dossierDescription) {
            dossierDescription.textContent =
                data.description;
        }


        if (dossierEvents) {

            dossierEvents.innerHTML =
                data.events
                    .map(
                        event =>
                            `<li>${event}</li>`
                    )
                    .join("");

        }


        if (dossierEntities) {

            dossierEntities.innerHTML =
                data.entities
                    .map(
                        entity =>
                            `<li>${entity}</li>`
                    )
                    .join("");

        }


        if (dossierWarning) {
            dossierWarning.textContent =
                data.warning;
        }


        const percentage =
            getConvergence();


        if (dossierStatus) {
            dossierStatus.textContent =
                getLocationStatus(
                    id,
                    percentage
                );
        }


        if (
            focusMap &&
            window.innerWidth > 800
        ) {

            focusMarker(id);

        }

    }


    /* =====================================================
       FOCUS MARKER
       ===================================================== */

    function focusMarker(id) {

        const marker =
            markers.find(
                item =>
                    item.dataset.location === id
            );

        if (!marker) {
            return;
        }


        const left =
            parseFloat(
                marker.style.left
            );

        const top =
            parseFloat(
                marker.style.top
            );


        if (
            Number.isNaN(left) ||
            Number.isNaN(top)
        ) {
            return;
        }


        const targetX =
            50 - left;

        const targetY =
            50 - top;


        zoom =
            Math.max(
                1.15,
                zoom
            );


        panX =
            targetX *
            zoom *
            1.35;

        panY =
            targetY *
            zoom *
            1.35;


        clampPan();

        applyMapTransform();

    }


    /* =====================================================
       MAP TRANSFORM
       ===================================================== */

    function applyMapTransform() {

        if (!stage) {
            return;
        }


        stage.style.transform =
            `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;


        if (zoomValue) {

            zoomValue.textContent =
                `${Math.round(zoom * 100)}%`;

        }

    }


    function clampPan() {

        const rect =
            viewport
                ? viewport.getBoundingClientRect()
                : null;

        if (!rect) {
            return;
        }


        if (zoom <= 1) {

            panX = 0;
            panY = 0;

            return;

        }


        const maxX =
            rect.width *
            (zoom - 1) *
            .5;

        const maxY =
            rect.height *
            (zoom - 1) *
            .5;


        panX =
            Math.max(
                -maxX,
                Math.min(
                    maxX,
                    panX
                )
            );


        panY =
            Math.max(
                -maxY,
                Math.min(
                    maxY,
                    panY
                )
            );

    }


    function setZoom(
        newZoom
    ) {

        zoom =
            Math.max(
                MIN_ZOOM,
                Math.min(
                    MAX_ZOOM,
                    newZoom
                )
            );


        if (zoom === 1) {

            panX = 0;
            panY = 0;

        }


        clampPan();
        applyMapTransform();

    }


    function resetMap() {

        zoom = 1;

        panX = 0;
        panY = 0;

        applyMapTransform();

    }


    /* =====================================================
       BUTTON CONTROLS
       ===================================================== */

    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            () => {

                setZoom(
                    zoom + ZOOM_STEP
                );

            }
        );

    }


    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            () => {

                setZoom(
                    zoom - ZOOM_STEP
                );

            }
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetMap
        );

    }


    /* =====================================================
       WHEEL ZOOM
       ===================================================== */

    if (viewport) {

        viewport.addEventListener(
            "wheel",
            event => {

                event.preventDefault();

                const direction =
                    event.deltaY > 0
                        ? -ZOOM_STEP
                        : ZOOM_STEP;


                setZoom(
                    zoom + direction
                );

            },
            {
                passive: false
            }
        );

    }


    /* =====================================================
       DRAGGING
       ===================================================== */

    if (viewport) {

        viewport.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.target.closest(
                        ".tg-island-marker"
                    )
                ) {
                    return;
                }


                if (zoom <= 1) {
                    return;
                }


                dragging = true;

                viewport.classList.add(
                    "is-dragging"
                );

                stage.classList.add(
                    "is-dragging"
                );


                dragStartX =
                    event.clientX;

                dragStartY =
                    event.clientY;

                startingPanX =
                    panX;

                startingPanY =
                    panY;


                viewport.setPointerCapture(
                    event.pointerId
                );

            }
        );


        viewport.addEventListener(
            "pointermove",
            event => {

                if (!dragging) {
                    return;
                }


                panX =
                    startingPanX +
                    (
                        event.clientX -
                        dragStartX
                    );

                panY =
                    startingPanY +
                    (
                        event.clientY -
                        dragStartY
                    );


                clampPan();
                applyMapTransform();

            }
        );


        const stopDragging =
            event => {

                if (!dragging) {
                    return;
                }


                dragging = false;

                viewport.classList.remove(
                    "is-dragging"
                );

                stage.classList.remove(
                    "is-dragging"
                );


                try {

                    viewport.releasePointerCapture(
                        event.pointerId
                    );

                }
                catch (_) {}

            };


        viewport.addEventListener(
            "pointerup",
            stopDragging
        );

        viewport.addEventListener(
            "pointercancel",
            stopDragging
        );

    }


    /* =====================================================
       MARKER CLICKS
       ===================================================== */

    markers.forEach(
        marker => {

            marker.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    selectLocation(
                        marker.dataset.location,
                        false
                    );

                }
            );

        }
    );


    /* =====================================================
       LOCATION CARD CLICKS
       ===================================================== */

    locationCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    selectLocation(
                        card.dataset.location,
                        true
                    );

                }
            );

        }
    );


    /* =====================================================
       ARCHIVE BUTTON
       ===================================================== */

    if (archiveButton) {

        archiveButton.addEventListener(
            "click",
            () => {

                const data =
                    LOCATIONS[currentLocation];

                if (
                    !data ||
                    !data.archive
                ) {
                    return;
                }


                /*
                 * Your existing archive system already
                 * has clickable .archive-file elements.
                 * We simply trigger the correct one.
                 */

                const archiveFile =
                    document.querySelector(
                        `.archive-file[data-archive="${data.archive}"]`
                    );


                if (archiveFile) {

                    /*
                     * Navigate to the archive page
                     * using your existing page system.
                     */

                    const archivePageButton =
                        document.querySelector(
                            '[data-page="archive"]'
                        );


                    if (archivePageButton) {
                        archivePageButton.click();
                    }


                    setTimeout(
                        () => {

                            archiveFile.click();

                        },
                        180
                    );

                    return;

                }


                /*
                 * Fallback if the archive record
                 * does not exist.
                 */

                console.warn(
                    "Island archive record not found:",
                    data.archive
                );

            }
        );

    }


    /* =====================================================
       CONVERGENCE
       ===================================================== */

    function getConvergence() {

        /*
         * Your existing website already writes
         * the live Convergence percentage into
         * #meter-value.
         */

        const existingMeter =
            document.getElementById(
                "meter-value"
            );


        if (existingMeter) {

            const value =
                parseFloat(
                    existingMeter.textContent
                );


            if (
                Number.isFinite(value)
            ) {

                return Math.max(
                    0,
                    Math.min(
                        100,
                        value
                    )
                );

            }

        }


        /*
         * Optional external integration.
         */

        if (
            Number.isFinite(
                window.theGameConvergence
            )
        ) {

            return Math.max(
                0,
                Math.min(
                    100,
                    Number(
                        window.theGameConvergence
                    )
                )
            );

        }


        return 0;

    }


    function updateIslandConvergence(
        suppliedValue = null
    ) {

        const percentage =
            suppliedValue !== null
                ? Math.max(
                    0,
                    Math.min(
                        100,
                        Number(
                            suppliedValue
                        )
                    )
                )
                : getConvergence();


        const progress =
            percentage / 100;


        island.style.setProperty(
            "--tg-island-corruption",
            progress
        );


        if (convergenceValue) {

            convergenceValue.textContent =
                `${Math.floor(percentage)}%`;

        }


        if (miniMeter) {

            miniMeter.style.width =
                `${percentage}%`;

        }


        /*
         * Overall island condition
         */

        let conditionText =
            "UNSTABLE";

        let conditionDetail =
            "ACTIVE CARTOGRAPHIC MONITORING";

        let signalText =
            "SIGNAL STABLE";

        let warning =
            "The island remains connected to the Hallowed Realm. The Convergence threatens both worlds.";

        let systemStatus =
            "MONITORING";


        if (percentage >= 100) {

            conditionText =
                "CONVERGENCE";

            conditionDetail =
                "HALLOWED REALM CONNECTION COMPLETE";

            signalText =
                "SIGNAL OVERRIDDEN";

            warning =
                "THE TWO REALMS ARE NOW CONNECTED. SEVERING PROTOCOL REQUIRED.";

            systemStatus =
                "CONVERGENCE";

            island.classList.add(
                "tg-island-converged"
            );

            island.classList.remove(
                "tg-island-critical"
            );

        }

        else if (percentage >= 75) {

            conditionText =
                "CRITICAL";

            conditionDetail =
                "CARTOGRAPHIC INTEGRITY FAILING";

            signalText =
                "SIGNAL DEGRADED";

            warning =
                "Multiple locations are showing severe anomalous activity.";

            systemStatus =
                "CRITICAL";

            island.classList.add(
                "tg-island-critical"
            );

            island.classList.remove(
                "tg-island-converged"
            );

        }

        else if (percentage >= 50) {

            conditionText =
                "UNSTABLE";

            conditionDetail =
                "ANOMALOUS ACTIVITY INCREASING";

            signalText =
                "SIGNAL UNSTABLE";

            warning =
                "The connection is strengthening. Several locations are becoming increasingly unstable.";

            systemStatus =
                "UNSTABLE";

            island.classList.add(
                "tg-island-critical"
            );

            island.classList.remove(
                "tg-island-converged"
            );

        }

        else if (percentage >= 25) {

            conditionText =
                "DEGRADING";

            conditionDetail =
                "CORRUPTION DETECTED";

            signalText =
                "SIGNAL DEGRADING";

            warning =
                "Early signs of Hallowed Realm interference have been detected across the island.";

            systemStatus =
                "DEGRADING";

            island.classList.remove(
                "tg-island-critical",
                "tg-island-converged"
            );

        }

        else {

            island.classList.remove(
                "tg-island-critical",
                "tg-island-converged"
            );

        }


        if (condition) {
            condition.textContent =
                conditionText;
        }


        if (conditionDetail) {
            conditionDetail.textContent =
                conditionDetail;
        }


        if (signal) {
            signal.textContent =
                signalText;
        }


        if (warningText) {
            warningText.textContent =
                warning;
        }


        if (mapStatus) {
            mapStatus.textContent =
                systemStatus;
        }


        if (mapSignal) {

            mapSignal.textContent =
                `SIGNAL ACQUISITION: ${signalText}`;

        }


        /*
         * Update selected location status.
         */

        const currentData =
            LOCATIONS[currentLocation];


        if (
            currentData &&
            dossierStatus
        ) {

            dossierStatus.textContent =
                getLocationStatus(
                    currentLocation,
                    percentage
                );

        }


        /*
         * Update system log.
         */

        if (logText) {

            if (percentage >= 100) {

                logText.textContent =
                    "THE CONVERGENCE IS ACTIVE. CARTOGRAPHIC SYSTEM NO LONGER RELIABLE.";

            }

            else if (percentage >= 75) {

                logText.textContent =
                    "Multiple island sectors are experiencing severe signal distortion.";

            }

            else if (percentage >= 50) {

                logText.textContent =
                    "Anomalous activity is spreading across multiple island sectors.";

            }

            else if (percentage >= 25) {

                logText.textContent =
                    "Low-level corruption detected. Continuing cartographic surveillance.";

            }

            else {

                logText.textContent =
                    "Monitoring island coordinates. No major cartographic instability detected.";

            }

        }

    }


    /*
     * Public function.
     *
     * This means another system can simply do:
     *
     * updateIslandConvergence(75);
     *
     * if you ever want manual control.
     */

    window.updateIslandConvergence =
        updateIslandConvergence;


    /*
     * Optional event-based integration.
     *
     * Other code can dispatch:
     *
     * window.dispatchEvent(
     *     new CustomEvent(
     *         "convergence:update",
     *         { detail: 75 }
     *     )
     * );
     */

    window.addEventListener(
        "convergence:update",
        event => {

            if (
                event.detail !== undefined
            ) {

                updateIslandConvergence(
                    event.detail
                );

            }

        }
    );


    /* =====================================================
       FULLSCREEN
       ===================================================== */

    if (fullscreenButton && frame) {

        fullscreenButton.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        !document.fullscreenElement
                    ) {

                        await frame.requestFullscreen();

                    }
                    else {

                        await document.exitFullscreen();

                    }

                }
                catch (error) {

                    console.warn(
                        "Fullscreen unavailable:",
                        error
                    );

                }

            }
        );

    }


    document.addEventListener(
        "fullscreenchange",
        () => {

            if (!fullscreenButton) {
                return;
            }


            fullscreenButton.textContent =
                document.fullscreenElement
                    ? "EXIT"
                    : "EXPAND";

        }
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            clampPan();
            applyMapTransform();

        }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    selectLocation(
        "cathedral",
        false
    );

    resetMap();

    updateIslandConvergence();


    /*
     * Read the existing Convergence meter.
     * Your main script updates it every second.
     */

    setInterval(
        () => {

            updateIslandConvergence();

        },
        1000
    );


})();