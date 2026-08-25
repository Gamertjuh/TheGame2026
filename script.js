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
   ARCHIVE SEARCH
   ========================================================= */

const archiveSearch =
    document.getElementById(
        "archive-search"
    );


const archiveFiles =
    document.querySelectorAll(
        ".archive-file"
    );


const archiveNoResults =
    document.getElementById(
        "archive-no-results"
    );


let activeArchiveFilter =
    "all";


function filterArchive() {

    const search =
        archiveSearch
            ? archiveSearch.value
                .trim()
                .toLowerCase()
            : "";


    let visibleCount =
        0;


    archiveFiles.forEach(
        file => {

            const category =
                file.dataset.category ||
                "";


            const title =
                file.dataset.title ||
                "";


            const categoryMatch =
                activeArchiveFilter === "all" ||
                category === activeArchiveFilter;


            const searchMatch =
                title
                    .toLowerCase()
                    .includes(search);


            const visible =
                categoryMatch &&
                searchMatch;


            file.style.display =
                visible
                    ? ""
                    : "none";


            if (visible) {
                visibleCount++;
            }

        }
    );


    if (archiveNoResults) {

        archiveNoResults.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }

}


if (archiveSearch) {

    archiveSearch.addEventListener(
        "input",
        filterArchive
    );

}


document
    .querySelectorAll(
        ".archive-filter"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".archive-filter"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    activeArchiveFilter =
                        button.dataset.filter;


                    filterArchive();

                }
            );

        }
    );


/* =========================================================
   ARCHIVE VIEWER
   ========================================================= */

const archiveViewer =
    document.getElementById(
        "archive-viewer"
    );


const archiveClose =
    document.getElementById(
        "archive-close"
    );


const archiveTitle =
    document.getElementById(
        "archive-document-title"
    );


const archiveCategory =
    document.getElementById(
        "archive-document-category"
    );


const archiveContent =
    document.getElementById(
        "archive-document-content"
    );


const ARCHIVE_CONTENT = {

    "seal-system": {

        category: "HISTORY",

        title: "THE SEAL SYSTEM",

        content:
            "The seven Seal Statues were destroyed during the Summer 2026 storyline. The Seal system no longer exists during Halloween 2026."

    },


    "killer-bunny-history": {

        category: "HISTORY",

        title: "THE KILLER BUNNY",

        content:
            "During Easter 2026, the Killer Bunny entered through the Fountain and targeted the Forest Beacon."

    },


    "crimson-lord-history": {

        category: "HISTORY",

        title: "THE CRIMSON LORD",

        content:
            "During Summer 2026, the Crimson Lord appeared within the Crimson Forest."

    },


    "awakening": {

        category: "HISTORY",

        title: "THE AWAKENING",

        content:
            "The Crimson Lord woke the Hallow King, setting the stage for Halloween 2026."

    },


    "hallow-king": {

        category: "ENTITY",

        title: "THE HALLOW KING",

        content:
            "The Hallow King is the ruler of the Hallowed Realm. During Halloween 2026, he seeks to merge both worlds and rule them."

    },


    "killer-bunny": {

        category: "ENTITY",

        title: "KILLER BUNNY",

        content:
            "A supernatural antagonist first encountered during Easter 2026."

    },


    "crimson-lord": {

        category: "ENTITY",

        title: "CRIMSON LORD",

        content:
            "A supernatural entity associated with the Crimson Forest."

    },


    "captain-rowan": {

        category: "CHARACTER",

        title: "CAPTAIN ROWAN",

        content:
            "An established quest character involved in The Game 2026 storyline."

    },


    "sealkeeper": {

        category: "CHARACTER",

        title: "THE SEALKEEPER",

        content:
            "The last known Sealkeeper. The Seal system itself no longer exists during Halloween 2026."

    },


    "fountain": {

        category: "LOCATION",

        title: "THE FOUNTAIN",

        content:
            "The Fountain is a major connection point between the island and the Hallowed Realm."

    },


    "cathedral": {

        category: "LOCATION",

        title: "CATHEDRAL",

        content:
            "The Cathedral was the prison of the Hallow King."

    },


    "crimson-forest": {

        category: "LOCATION",

        title: "CRIMSON FOREST",

        content:
            "The Crimson Forest became associated with the Crimson Lord during Summer 2026."

    },


    "volcano": {

        category: "LOCATION",

        title: "VOLCANO",

        content:
            "The Volcano occupies the western portion of the island."

    },


    "sealkeeper-tower": {

        category: "LOCATION",

        title: "SEALKEEPER TOWER",

        content:
            "The tower associated with the last known Sealkeeper."

    },


    "haunted-house": {

        category: "LOCATION",

        title: "HAUNTED HOUSE",

        content:
            "An established location on the island."

    },


    "hallowed-convergence": {

        category: "FINALE",

        title: "THE HALLOWED CONVERGENCE",

        content:
            "Quest 10 and the Halloween 2026 finale. The players must activate and defend the three Severing Anchors, sever the Hallow King's connection to the world, and survive the final confrontation."

    },


    "severing-anchors": {

        category: "FINALE",

        title: "THE SEVERING ANCHORS",

        content:
            "Three Severing Anchors are used during Quest 10. The players must activate and defend them to sever the Hallow King's connection to the world."

    }

};


/* Archive files */

archiveFiles.forEach(
    file => {

        file.addEventListener(
            "click",
            () => {

                const id =
                    file.dataset.archive;


                const data =
                    ARCHIVE_CONTENT[id];


                if (!data) {
                    return;
                }


                if (archiveTitle) {

                    archiveTitle.textContent =
                        data.title;

                }


                if (archiveCategory) {

                    archiveCategory.textContent =
                        data.category;

                }


                if (archiveContent) {

                    archiveContent.textContent =
                        data.content;

                }


                if (archiveViewer) {

                    archiveViewer.classList.add(
                        "visible"
                    );

                }

            }
        );

    }
);


/* Archive close */

if (archiveClose) {

    archiveClose.addEventListener(
        "click",
        () => {

            if (archiveViewer) {

                archiveViewer.classList.remove(
                    "visible"
                );

            }

        }
    );

}


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

/* =========================================================
   PUMPKIN OVERRIDE
   Replaces the existing pumpkin without touching old code
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Remove existing pumpkins
    document.querySelectorAll(
        '.pumpkin, #pumpkin, .pumpkin-decoration, .pumpkin-icon'
    ).forEach(el => el.remove());

    // Create new pumpkin
    const pumpkin = document.createElement("div");

    pumpkin.id = "new-pumpkin";
    pumpkin.innerHTML = "🎃";

    document.body.appendChild(pumpkin);

});