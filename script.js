/* =========================================================
   THE GAME 2026
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   QUEST DATA
   ========================================================= */

const QUESTS = [

    {
        id: 1,
        title: "The Silent Arrival",
        date: "October 3",
        release: "2026-10-03"
    },

    {
        id: 2,
        title: "The Watcher's Tower",
        date: "October 6",
        release: "2026-10-06"
    },

    {
        id: 3,
        title: "The Broken Seals",
        date: "October 10",
        release: "2026-10-10"
    },

    {
        id: 4,
        title: "Echoes Beneath The Volcano",
        date: "October 14",
        release: "2026-10-14"
    },

    {
        id: 5,
        title: "The Last Sealkeeper",
        date: "October 18",
        release: "2026-10-18"
    },

    {
        id: 6,
        title: "Beyond The Veil",
        date: "October 22",
        release: "2026-10-22"
    },

    {
        id: 7,
        title: "The Search",
        date: "October 24",
        release: "2026-10-24"
    },

    {
        id: 8,
        title: "The Rescue",
        date: "October 27",
        release: "2026-10-27"
    },

    {
        id: 9,
        title: "The Last Preparation",
        date: "October 29",
        release: "2026-10-29"
    },

    {
        id: 10,
        title: "The Hallowed Convergence",
        date: "October 31",
        release: "2026-10-31"
    }

];


/* =========================================================
   QUEST DESCRIPTIONS
   ========================================================= */

const QUEST_DESCRIPTIONS = {

    1:
        "The first recorded quest of Halloween 2026.",

    2:
        "The players investigate the Watcher's Tower.",

    3:
        "The players encounter the consequences of the broken Seal system.",

    4:
        "The investigation leads beneath the Volcano.",

    5:
        "The players encounter the last remaining Sealkeeper.",

    6:
        "The players move beyond the known boundary of the island.",

    7:
        "The players search for clues revealing where the missing crew may be.",

    8:
        "The search becomes a rescue operation.",

    9:
        "The players make their final preparations.",

    10:
        "The Hallowed Convergence begins. The players must activate and defend the three Severing Anchors."

};


/* =========================================================
   NAVIGATION
   ========================================================= */

const pages =
    document.querySelectorAll(".page");

const navigationButtons =
    document.querySelectorAll("[data-page]");


function openPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const target =
        document.getElementById(pageName);

    if (!target) return;

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navigationButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;

            if (page) {
                openPage(page);
            }

        }
    );

});


/* =========================================================
   QUEST SYSTEM
   ========================================================= */

const questList =
    document.getElementById("quest-list");

const questDetail =
    document.getElementById("quest-detail");

const questDetailNumber =
    document.getElementById("quest-detail-number");

const questDetailDate =
    document.getElementById("quest-detail-date");

const questDetailTitle =
    document.getElementById("event-detail-title");

const questDetailDescription =
    document.getElementById("event-detail-description");


function getQuestState(quest) {

    const now =
        new Date();

    const release =
        new Date(
            `${quest.release}T00:00:00`
        );

    return now >= release
        ? "available"
        : "locked";

}


function renderQuests() {

    if (!questList) return;

    questList.innerHTML = "";


    QUESTS.forEach(quest => {

        const state =
            getQuestState(quest);

        const card =
            document.createElement("article");


        card.className =
            `event-card ${state}`;


        card.innerHTML = `

            <div class="event-card-date">
                ${quest.date}
            </div>

            <div>

                <div class="event-card-number">
                    QUEST ${String(quest.id).padStart(2, "0")}
                </div>

                <div class="event-card-title">
                    ${quest.title}
                </div>

                <div class="event-card-subtitle">
                    ${state === "locked"
                        ? "RELEASED SOON"
                        : "QUEST RECORD AVAILABLE"}
                </div>

            </div>

            <div class="event-card-status">
                ${state === "locked"
                    ? "LOCKED"
                    : "AVAILABLE"}
            </div>

        `;


        if (state === "available") {

            card.addEventListener(
                "click",
                () => {

                    if (!questDetail) return;

                    questDetail.classList.add("open");

                    questDetailNumber.textContent =
                        `QUEST ${String(quest.id).padStart(2, "0")}`;

                    questDetailDate.textContent =
                        quest.date;

                    questDetailTitle.textContent =
                        quest.title;

                    questDetailDescription.textContent =
                        QUEST_DESCRIPTIONS[quest.id] ||
                        "No additional information has been established.";

                    questDetail.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });

                }
            );

        }


        questList.appendChild(card);

    });

}


renderQuests();


/* =========================================================
   CONVERGENCE
   ========================================================= */

const meterFill =
    document.getElementById("meter-fill");

const meterValue =
    document.getElementById("meter-value");

const statusText =
    document.getElementById("status");

const homeStatus =
    document.getElementById("home-status");

const systemLog =
    document.getElementById("system-log-text");


const pageMeter =
    document.getElementById(
        "convergence-page-meter"
    );

const pageValue =
    document.getElementById(
        "convergence-page-value"
    );

const pageStatus =
    document.getElementById(
        "convergence-page-status"
    );


/*
   EVENT-BASED CONVERGENCE

   This is deliberately NOT 37%.

   The meter progresses according to
   the Halloween quest timeline.
*/


const CONVERGENCE_LEVELS = [

    {
        date: "2026-10-03",
        value: 0
    },

    {
        date: "2026-10-06",
        value: 10
    },

    {
        date: "2026-10-10",
        value: 20
    },

    {
        date: "2026-10-14",
        value: 30
    },

    {
        date: "2026-10-18",
        value: 40
    },

    {
        date: "2026-10-22",
        value: 50
    },

    {
        date: "2026-10-24",
        value: 60
    },

    {
        date: "2026-10-27",
        value: 70
    },

    {
        date: "2026-10-29",
        value: 85
    },

    {
        date: "2026-10-31",
        value: 100
    }

];


function calculateConvergence() {

    const now =
        new Date();

    let current =
        CONVERGENCE_LEVELS[0];


    for (
        const level
        of CONVERGENCE_LEVELS
    ) {

        const date =
            new Date(
                `${level.date}T00:00:00`
            );

        if (now >= date) {
            current = level;
        }

    }


    return current.value;

}


function getPhase(value) {

    if (value >= 100)
        return "convergence";

    if (value >= 90)
        return "severe";

    if (value >= 75)
        return "critical";

    if (value >= 50)
        return "danger";

    if (value >= 25)
        return "warning";

    if (value > 0)
        return "early";

    return "normal";

}


function getStatus(value) {

    if (value >= 100)
        return "CONVERGENCE";

    if (value >= 75)
        return "CRITICAL";

    if (value >= 50)
        return "UNSTABLE";

    if (value > 0)
        return "DEVELOPING";

    return "MONITORING";

}


function updateConvergence(value = null) {

    const convergence =
        value === null
            ? calculateConvergence()
            : value;


    const phase =
        getPhase(convergence);


    document.body.classList.remove(
        "phase-normal",
        "phase-early",
        "phase-warning",
        "phase-danger",
        "phase-critical",
        "phase-severe",
        "phase-convergence"
    );


    document.body.classList.add(
        `phase-${phase}`
    );


    const status =
        getStatus(convergence);


    if (meterFill) {

        meterFill.style.width =
            `${convergence}%`;

    }


    if (meterValue) {

        meterValue.textContent =
            `${convergence}%`;

    }


    if (statusText) {

        statusText.textContent =
            status;

    }


    if (pageMeter) {

        pageMeter.style.width =
            `${convergence}%`;

    }


    if (pageValue) {

        pageValue.textContent =
            `${convergence}%`;

    }


    if (pageStatus) {

        pageStatus.textContent =
            status;

    }


    if (homeStatus) {

        if (convergence >= 100) {

            homeStatus.textContent =
                "THE WORLDS ARE COLLIDING";

        }

        else if (convergence >= 75) {

            homeStatus.textContent =
                "THE VEIL IS FAILING";

        }

        else if (convergence >= 50) {

            homeStatus.textContent =
                "THE ISLAND IS CHANGING";

        }

        else if (convergence > 0) {

            homeStatus.textContent =
                "SOMETHING IS WRONG";

        }

        else {

            homeStatus.textContent =
                "THE ISLAND IS WATCHING";

        }

    }


    if (systemLog) {

        if (convergence >= 100) {

            systemLog.textContent =
                "CONVERGENCE DETECTED. BEGIN SEVERING.";

        }

        else if (convergence >= 75) {

            systemLog.textContent =
                "REALITY DISTORTION DETECTED.";

        }

        else if (convergence >= 50) {

            systemLog.textContent =
                "HOLLOW SIGNAL DETECTED BENEATH THE ISLAND.";

        }

        else if (convergence > 0) {

            systemLog.textContent =
                "ANOMALOUS ACTIVITY DETECTED.";

        }

        else {

            systemLog.textContent =
                "Monitoring the island.";

        }

    }

}


updateConvergence();


/* =========================================================
   COUNTDOWN
   ========================================================= */

const countdown =
    document.getElementById("countdown");


function updateCountdown() {

    if (!countdown) return;


    const target =
        new Date(
            "2026-10-31T19:00:00"
        );

    const now =
        new Date();


    const difference =
        target - now;


    if (difference <= 0) {

        countdown.textContent =
            "THE FINALE HAS BEGUN";

        return;

    }


    const days =
        Math.floor(
            difference / 86400000
        );

    const hours =
        Math.floor(
            difference / 3600000
        ) % 24;

    const minutes =
        Math.floor(
            difference / 60000
        ) % 60;

    const seconds =
        Math.floor(
            difference / 1000
        ) % 60;


    countdown.textContent =
        `${days}D ${hours}H ${minutes}M ${seconds}S`;

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   MAP
   ========================================================= */

const mapLocations =
    document.querySelectorAll(
        ".map-location"
    );

const mapTitle =
    document.getElementById(
        "map-detail-title"
    );

const mapText =
    document.getElementById(
        "map-detail-text"
    );


mapLocations.forEach(location => {

    location.addEventListener(
        "click",
        () => {

            mapLocations.forEach(
                item =>
                    item.classList.remove(
                        "selected"
                    )
            );


            location.classList.add(
                "selected"
            );


            if (mapTitle) {

                mapTitle.textContent =
                    location.dataset.location
                        .toUpperCase();

            }


            if (mapText) {

                mapText.textContent =
                    location.dataset.description;

            }

        }
    );

});

/* =========================================================
   THE GAME 2026
   ARCHIVE SYSTEM
   ========================================================= */

const archiveData = {

    /* =====================================================
       HISTORY
       ===================================================== */

    "seal-system": {
        category: "HISTORY",
        title: "THE SEAL SYSTEM",

        content: `
            <div class="archive-record">

                <p>
                    The Seal System was an island-wide system created
                    to contain the Hallow King's influence.
                </p>

                <p>
                    Seven Seal Statues were positioned throughout
                    the island. Their destruction gradually weakened
                    the protection surrounding the island.
                </p>

                <div class="archive-warning">
                    THE SEAL SYSTEM IS GONE.
                </div>

                <p>
                    By the end of Summer 2026, all seven Seal Statues
                    had been destroyed.
                </p>

                <div class="archive-data">
                    <span>STATUS</span>
                    <strong>DESTROYED</strong>
                </div>

                <div class="archive-data">
                    <span>LAST RECORDED</span>
                    <strong>SUMMER 2026</strong>
                </div>

            </div>
        `
    },


    "killer-bunny-history": {
        category: "HISTORY",
        title: "THE KILLER BUNNY",

        content: `
            <div class="archive-record">

                <p>
                    During Easter 2026, the Killer Bunny entered
                    the island through the Fountain.
                </p>

                <p>
                    Its presence became connected to the Forest
                    Beacon, which it attempted to target.
                </p>

                <p>
                    The events surrounding the Killer Bunny became
                    one of the major recorded incidents preceding
                    the Summer storyline.
                </p>

                <div class="archive-data">
                    <span>FIRST RECORDED</span>
                    <strong>EASTER 2026</strong>
                </div>

                <div class="archive-data">
                    <span>KNOWN CONNECTION</span>
                    <strong>THE FOUNTAIN</strong>
                </div>

            </div>
        `
    },


    "crimson-lord-history": {
        category: "HISTORY",
        title: "THE CRIMSON LORD",

        content: `
            <div class="archive-record">

                <p>
                    During Summer 2026, the Crimson Lord appeared
                    within the Crimson Forest.
                </p>

                <p>
                    The entity became a major threat to the island
                    and its inhabitants.
                </p>

                <p>
                    The Crimson Lord ultimately played a role in
                    the awakening of the Hallow King.
                </p>

                <div class="archive-data">
                    <span>FIRST RECORDED</span>
                    <strong>SUMMER 2026</strong>
                </div>

                <div class="archive-data">
                    <span>ASSOCIATED LOCATION</span>
                    <strong>CRIMSON FOREST</strong>
                </div>

            </div>
        `
    },


    "awakening": {
        category: "HISTORY",
        title: "THE AWAKENING",

        content: `
            <div class="archive-record">

                <p>
                    The Crimson Lord woke the Hallow King during
                    the Summer 2026 storyline.
                </p>

                <div class="archive-warning">
                    THE HALLOW KING IS AWAKE.
                </div>

                <p>
                    By Halloween 2026, the Hallow King is no longer
                    dormant. His objective has changed from simply
                    existing within the Hallowed Realm.
                </p>

                <p>
                    He now seeks to rule both worlds.
                </p>

                <div class="archive-data">
                    <span>STATUS</span>
                    <strong>AWAKE</strong>
                </div>

            </div>
        `
    },


    /* =====================================================
       ENTITIES
       ===================================================== */

    "hallow-king": {
        category: "ENTITY",
        title: "THE HALLOW KING",

        content: `
            <div class="archive-record">

                <div class="archive-threat">
                    <span>THREAT LEVEL</span>
                    <strong>CRITICAL</strong>
                </div>

                <p>
                    The Hallow King is the ruler of the Hallowed
                    Realm.
                </p>

                <p>
                    Following his awakening during Summer 2026,
                    the Hallow King became an active threat to
                    the island.
                </p>

                <p>
                    His objective is to merge the normal world
                    with the Hallowed Realm and rule both worlds.
                </p>

                <div class="archive-warning">
                    THE CONVERGENCE IS COMING.
                </div>

                <div class="archive-data">
                    <span>STATUS</span>
                    <strong>ACTIVE</strong>
                </div>

                <div class="archive-data">
                    <span>OBJECTIVE</span>
                    <strong>RULE BOTH WORLDS</strong>
                </div>

            </div>
        `
    },


    "killer-bunny": {
        category: "ENTITY",
        title: "KILLER BUNNY",

        content: `
            <div class="archive-record">

                <p>
                    The Killer Bunny is a supernatural entity first
                    recorded during Easter 2026.
                </p>

                <p>
                    It entered the island through the Fountain and
                    targeted the Forest Beacon.
                </p>

                <p>
                    Further records indicate that the entity is
                    expected to return during Halloween 2026.
                </p>

                <div class="archive-data">
                    <span>TYPE</span>
                    <strong>SUPERNATURAL ENTITY</strong>
                </div>

                <div class="archive-data">
                    <span>STATUS</span>
                    <strong>EXPECTED RETURN</strong>
                </div>

            </div>
        `
    },


    "crimson-lord": {
        category: "ENTITY",
        title: "CRIMSON LORD",

        content: `
            <div class="archive-record">

                <p>
                    The Crimson Lord is a supernatural entity
                    associated with the Crimson Forest.
                </p>

                <p>
                    The entity appeared during Summer 2026 and
                    became involved in the destruction of the
                    island's remaining protection.
                </p>

                <div class="archive-warning">
                    ENTITY RESPONSIBLE FOR THE AWAKENING.
                </div>

                <div class="archive-data">
                    <span>ASSOCIATED LOCATION</span>
                    <strong>CRIMSON FOREST</strong>
                </div>

                <div class="archive-data">
                    <span>KNOWN ACTION</span>
                    <strong>WOKE THE HALLOW KING</strong>
                </div>

            </div>
        `
    },


    "captain-rowan": {
        category: "CHARACTER",
        title: "CAPTAIN ROWAN",

        content: `
            <div class="archive-record">

                <p>
                    Captain Rowan is an established character
                    associated with the Game's quest storyline.
                </p>

                <p>
                    Records involving Captain Rowan are connected
                    to the island's investigation and events.
                </p>

                <div class="archive-data">
                    <span>CLASSIFICATION</span>
                    <strong>QUEST CHARACTER</strong>
                </div>

            </div>
        `
    },


    "sealkeeper": {
        category: "CHARACTER",
        title: "THE SEALKEEPER",

        content: `
            <div class="archive-record">

                <p>
                    The Sealkeeper was the last known member of
                    the seven Sealkeepers.
                </p>

                <p>
                    The Sealkeepers were historically connected to
                    the protection of the island.
                </p>

                <p>
                    With the destruction of the Seal System,
                    the Sealkeeper's original purpose is no longer
                    active.
                </p>

                <div class="archive-data">
                    <span>KNOWN LOCATION</span>
                    <strong>SEALKEEPER TOWER</strong>
                </div>

                <div class="archive-data">
                    <span>SEAL SYSTEM</span>
                    <strong>DESTROYED</strong>
                </div>

            </div>
        `
    },


    /* =====================================================
       LOCATIONS
       ===================================================== */

    "fountain": {
        category: "LOCATION",
        title: "THE FOUNTAIN",

        content: `
            <div class="archive-record">

                <p>
                    The Fountain is one of the island's most
                    important locations.
                </p>

                <p>
                    It is the known entry point through which the
                    Killer Bunny entered the island during Easter
                    2026.
                </p>

                <p>
                    The Fountain is also considered one of the
                    strongest known connections between the island
                    and the Hallowed Realm.
                </p>

                <div class="archive-warning">
                    HALLOWED CONNECTION DETECTED.
                </div>

                <div class="archive-data">
                    <span>LOCATION</span>
                    <strong>CENTRAL ISLAND</strong>
                </div>

            </div>
        `
    },


    "cathedral": {
        category: "LOCATION",
        title: "CATHEDRAL",

        content: `
            <div class="archive-record">

                <p>
                    The Cathedral was the prison where the Hallow
                    King was held.
                </p>

                <p>
                    It served as one of the central locations
                    connected to the containment of the Hallow King.
                </p>

                <p>
                    Following the destruction of the Seal System,
                    the Cathedral no longer functions as the
                    Hallow King's prison.
                </p>

                <div class="archive-data">
                    <span>FORMER PURPOSE</span>
                    <strong>HALLOW KING'S PRISON</strong>
                </div>

                <div class="archive-data">
                    <span>STATUS</span>
                    <strong>COMPROMISED</strong>
                </div>

            </div>
        `
    },


    "crimson-forest": {
        category: "LOCATION",
        title: "CRIMSON FOREST",

        content: `
            <div class="archive-record">

                <p>
                    The Crimson Forest became associated with the
                    Crimson Lord during Summer 2026.
                </p>

                <p>
                    The area became one of the major locations of
                    the Summer storyline.
                </p>

                <div class="archive-data">
                    <span>REGION</span>
                    <strong>NORTH / EAST</strong>
                </div>

                <div class="archive-data">
                    <span>ASSOCIATED ENTITY</span>
                    <strong>CRIMSON LORD</strong>
                </div>

            </div>
        `
    },


    "volcano": {
        category: "LOCATION",
        title: "VOLCANO",

        content: `
            <div class="archive-record">

                <p>
                    The Volcano occupies the western region of
                    the island.
                </p>

                <p>
                    The location is the later form of the former
                    Forest Beacon area.
                </p>

                <div class="archive-data">
                    <span>REGION</span>
                    <strong>WEST</strong>
                </div>

                <div class="archive-data">
                    <span>STATUS</span>
                    <strong>ACTIVE LOCATION</strong>
                </div>

            </div>
        `
    },


    "sealkeeper-tower": {
        category: "LOCATION",
        title: "SEALKEEPER TOWER",

        content: `
            <div class="archive-record">

                <p>
                    The Sealkeeper Tower is associated with the last
                    known Sealkeeper.
                </p>

                <p>
                    The tower remains as a record of the Sealkeepers
                    and their role in the island's history.
                </p>

                <div class="archive-data">
                    <span>REGION</span>
                    <strong>NORTH / WEST</strong>
                </div>

                <div class="archive-data">
                    <span>ASSOCIATED WITH</span>
                    <strong>THE SEALKEEPER</strong>
                </div>

            </div>
        `
    },


    "haunted-house": {
        category: "LOCATION",
        title: "HAUNTED HOUSE",

        content: `
            <div class="archive-record">

                <p>
                    The Haunted House is an established Game
                    location on the island.
                </p>

                <p>
                    Further information remains limited in the
                    current archive.
                </p>

                <div class="archive-data">
                    <span>REGION</span>
                    <strong>WEST</strong>
                </div>

                <div class="archive-data">
                    <span>CLASSIFICATION</span>
                    <strong>ESTABLISHED LOCATION</strong>
                </div>

            </div>
        `
    },


    /* =====================================================
       FINALE
       ===================================================== */

    "hallowed-convergence": {
        category: "FINALE",
        title: "THE HALLOWED CONVERGENCE",

        content: `
            <div class="archive-record">

                <div class="archive-threat">
                    <span>EVENT DATE</span>
                    <strong>OCTOBER 31</strong>
                </div>

                <p>
                    The Hallowed Convergence is the Halloween 2026
                    finale of The Game.
                </p>

                <p>
                    The Hallow King seeks to merge the normal world
                    with the Hallowed Realm.
                </p>

                <p>
                    The players must prevent the two worlds from
                    becoming permanently connected.
                </p>

                <div class="archive-warning">
                    TWO WORLDS. ONE CONNECTION.
                </div>

                <div class="archive-data">
                    <span>DATE</span>
                    <strong>OCTOBER 31, 2026</strong>
                </div>

                <div class="archive-data">
                    <span>OBJECTIVE</span>
                    <strong>PREVENT THE CONVERGENCE</strong>
                </div>

            </div>
        `
    },


    "severing-anchors": {
        category: "FINALE",
        title: "THE SEVERING ANCHORS",

        content: `
            <div class="archive-record">

                <p>
                    Three Severing Anchors are used during the final
                    confrontation with the Hallow King.
                </p>

                <p>
                    The players must activate and defend the Anchors
                    while the final battle takes place.
                </p>

                <p>
                    Their purpose is to sever the Hallow King's
                    connection between the two worlds.
                </p>

                <div class="archive-warning">
                    SEVER THE CONNECTION.
                </div>

                <div class="archive-data">
                    <span>NUMBER OF ANCHORS</span>
                    <strong>3</strong>
                </div>

                <div class="archive-data">
                    <span>PURPOSE</span>
                    <strong>SEVER THE CONVERGENCE</strong>
                </div>

            </div>
        `
    }

};


/* =========================================================
   ARCHIVE ELEMENTS
   ========================================================= */

const archiveSearch =
    document.getElementById("archive-search");

const archiveGrid =
    document.getElementById("archive-grid");

const archiveFiles =
    document.querySelectorAll(".archive-file");

const archiveFilters =
    document.querySelectorAll(".archive-filter");

const archiveNoResults =
    document.getElementById("archive-no-results");

const archiveViewer =
    document.getElementById("archive-viewer");

const archiveClose =
    document.getElementById("archive-close");

const archiveDocumentTitle =
    document.getElementById("archive-document-title");

const archiveDocumentCategory =
    document.getElementById("archive-document-category");

const archiveDocumentContent =
    document.getElementById("archive-document-content");


/* =========================================================
   CURRENT FILTER
   ========================================================= */

let currentArchiveFilter = "all";


/* =========================================================
   FILTER ARCHIVE
   ========================================================= */

function filterArchive() {

    const searchTerm =
        archiveSearch.value
            .trim()
            .toLowerCase();

    let visibleCount = 0;


    archiveFiles.forEach(file => {

        const category =
            file.dataset.category.toLowerCase();

        const title =
            file.dataset.title.toLowerCase();

        const matchesFilter =
            currentArchiveFilter === "all" ||
            category === currentArchiveFilter;

        const matchesSearch =
            title.includes(searchTerm) ||
            category.includes(searchTerm);


        if (matchesFilter && matchesSearch) {

            file.style.display = "";

            visibleCount++;

        } else {

            file.style.display = "none";

        }

    });


    if (visibleCount === 0) {

        archiveNoResults.style.display = "block";

    } else {

        archiveNoResults.style.display = "none";

    }

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

archiveFilters.forEach(button => {

    button.addEventListener("click", () => {

        archiveFilters.forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        currentArchiveFilter =
            button.dataset.filter;

        filterArchive();

    });

});


/* =========================================================
   SEARCH
   ========================================================= */

if (archiveSearch) {

    archiveSearch.addEventListener(
        "input",
        filterArchive
    );

}


/* =========================================================
   OPEN ARCHIVE DOCUMENT
   ========================================================= */

archiveFiles.forEach(file => {

    file.addEventListener("click", () => {

        const archiveID =
            file.dataset.archive;

        const documentData =
            archiveData[archiveID];


        if (!documentData) {

            console.warn(
                "Archive document not found:",
                archiveID
            );

            return;

        }


        archiveDocumentTitle.textContent =
            documentData.title;

        archiveDocumentCategory.textContent =
            documentData.category;


        archiveDocumentContent.innerHTML =
            documentData.content;


        archiveViewer.classList.add("active");

        document.body.classList.add(
            "archive-open"
        );

    });

});


/* =========================================================
   CLOSE ARCHIVE DOCUMENT
   ========================================================= */

function closeArchive() {

    archiveViewer.classList.remove("active");

    document.body.classList.remove(
        "archive-open"
    );

}


if (archiveClose) {

    archiveClose.addEventListener(
        "click",
        closeArchive
    );

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        archiveViewer.classList.contains("active")
    ) {

        closeArchive();

    }

});


/* =========================================================
   INITIAL FILTER
   ========================================================= */

filterArchive();

/* =========================================================
   BACKGROUND MUSIC
   ========================================================= */

const backgroundMusic =
    document.getElementById(
        "background-music"
    );


if (backgroundMusic) {

    backgroundMusic.volume =
        0.35;

}


/*
   Start the soundtrack after the
   first interaction with the website.

   No visible music button.
*/

let musicStarted = false;


function startMusic() {

    if (
        !backgroundMusic ||
        musicStarted
    ) {
        return;
    }


    backgroundMusic.play()
        .then(() => {

            musicStarted = true;

        })
        .catch(() => {

            /*
                Browser blocked autoplay.
                Try again on another interaction.
            */

        });

}


document.addEventListener(
    "click",
    startMusic,
    {
        once: false
    }
);


/* =========================================================
   CREDITS
   ========================================================= */

const creditsContainer =
    document.getElementById(
        "credits-container"
    );


const CREDIT_SECTIONS = [

    {
        key: "eventDirector",
        title: "EVENT DIRECTOR"
    },

    {
        key: "creativeLore",
        title: "CREATIVE / LORE"
    },

    {
        key: "coLeads",
        title: "CO-LEADS"
    },

    {
        key: "buildTeam",
        title: "BUILD TEAM"
    },

    {
        key: "questDesign",
        title: "QUEST DESIGN"
    },

    {
        key: "development",
        title: "DEVELOPMENT"
    },

    {
        key: "writing",
        title: "WRITING / EDITORIAL"
    },

    {
        key: "artMedia",
        title: "ART / MEDIA"
    },

    {
        key: "specialThanks",
        title: "SPECIAL THANKS"
    }

];


function renderCredits() {

    if (!creditsContainer) {
        return;
    }


    creditsContainer.innerHTML = "";


    CREDIT_SECTIONS.forEach(section => {

        const people =
            CREDITS[section.key];


        if (
            !people ||
            people.length === 0
        ) {
            return;
        }


        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.className =
            "credits-section";


        const heading =
            document.createElement(
                "div"
            );

        heading.className =
            "credits-section-title";

        heading.textContent =
            section.title;


        const list =
            document.createElement(
                "div"
            );

        list.className =
            "credits-list";


        people.forEach(person => {

            const entry =
                document.createElement(
                    "div"
                );

            entry.className =
                "credit-entry";


            entry.innerHTML = `

                <div class="credit-role">
                    ${person.role}
                </div>

                <div class="credit-name">
                    ${person.name}
                </div>

            `;


            list.appendChild(entry);

        });


        wrapper.appendChild(
            heading
        );

        wrapper.appendChild(
            list
        );


        creditsContainer.appendChild(
            wrapper
        );

    });

}


renderCredits();


/* =========================================================
   TEST MODE
   =========================================================

   T = enable / disable
   LEFT = decrease corruption
   RIGHT = increase corruption
   ESC = exit test mode

   ========================================================= */

let TEST_MODE = false;

let TEST_CORRUPTION = 0;


function updateTestMode() {

    if (!TEST_MODE) {
        return;
    }


    updateConvergence(
        TEST_CORRUPTION
    );

}


document.addEventListener(
    "keydown",
    event => {

        /* T */

        if (
            event.key.toLowerCase() === "t"
        ) {

            TEST_MODE =
                !TEST_MODE;


            if (TEST_MODE) {

                TEST_CORRUPTION =
                    calculateConvergence();


                document.body.classList.add(
                    "test-mode"
                );


                console.log(
                    "THE GAME 2026 — TEST MODE ENABLED"
                );

                console.log(
                    "LEFT / RIGHT = CHANGE CONVERGENCE"
                );

            }

            else {

                document.body.classList.remove(
                    "test-mode"
                );


                updateConvergence();


                console.log(
                    "THE GAME 2026 — TEST MODE DISABLED"
                );

            }

            return;

        }


        if (!TEST_MODE) {
            return;
        }


        /* ESC */

        if (
            event.key === "Escape"
        ) {

            TEST_MODE = false;

            document.body.classList.remove(
                "test-mode"
            );

            updateConvergence();

            return;

        }


        /* LEFT */

        if (
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            TEST_CORRUPTION =
                Math.max(
                    0,
                    TEST_CORRUPTION - 1
                );


            updateTestMode();

        }


        /* RIGHT */

        if (
            event.key === "ArrowRight"
        ) {

            event.preventDefault();

            TEST_CORRUPTION =
                Math.min(
                    100,
                    TEST_CORRUPTION + 1
                );


            updateTestMode();

        }

    }
);


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "%cTHE GAME 2026",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "TEST MODE: press T"
);

console.log(
    "ARROW KEYS: adjust Convergence"
);


/* =========================================================
   FINAL INITIALIZATION
   ========================================================= */

updateConvergence();

renderQuests();

filterArchive();

/* =========================================================
   THE GAME 2026
   HALLOWEEN PARTICLE SYSTEM
   ========================================================= */

(function initHalloweenParticles() {

    const particleLayer =
        document.getElementById("particle-layer");

    if (!particleLayer) return;


    /*
       Number of particles on screen.
       Keep this fairly low so the site stays clean.
    */

    const PARTICLE_COUNT = 55;


    /*
       Random number helper.
    */

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }


    /*
       Create particles.
    */

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        const particle =
            document.createElement("div");


        /*
           Base class.
        */

        particle.className =
            "halloween-particle";


        /*
           A few particles are brighter.
        */

        const type =
            Math.random();

        if (type < 0.12) {

            particle.classList.add("bright");

        } else if (type < 0.30) {

            particle.classList.add("ash");

        }


        /*
           Particle size.
        */

        const size =
            random(1, 4);


        /*
           Starting horizontal position.
        */

        const x =
            random(-5, 100);


        /*
           Floating duration.
        */

        const duration =
            random(18, 38);


        /*
           Random delay so particles don't
           all appear at the same time.
        */

        const delay =
            random(-38, 0);


        /*
           Horizontal drifting.
        */

        const drift1 =
            random(-80, 80);

        const drift2 =
            random(-120, 120);

        const drift3 =
            random(-100, 100);

        const drift4 =
            random(-160, 160);


        /*
           Slightly different opacity.
        */

        const opacity =
            random(0.15, 0.55);


        /*
           Pass values into CSS.
        */

        particle.style.setProperty(
            "--particle-size",
            `${size}px`
        );

        particle.style.setProperty(
            "--particle-x",
            `${x}%`
        );

        particle.style.setProperty(
            "--particle-duration",
            `${duration}s`
        );

        particle.style.setProperty(
            "--particle-delay",
            `${delay}s`
        );

        particle.style.setProperty(
            "--particle-drift-1",
            `${drift1}px`
        );

        particle.style.setProperty(
            "--particle-drift-2",
            `${drift2}px`
        );

        particle.style.setProperty(
            "--particle-drift-3",
            `${drift3}px`
        );

        particle.style.setProperty(
            "--particle-drift-4",
            `${drift4}px`
        );

        particle.style.setProperty(
            "--particle-opacity",
            opacity
        );


        /*
           Add particle to the page.
        */

        particleLayer.appendChild(particle);

    }

})();

/* =========================================================
   CONVERGENCE CORRUPTION SYSTEM
   ========================================================= */

function updateCorruptionLevel(value) {

    value = Number(value) || 0;

    document.body.classList.remove(
        "corruption-0",
        "corruption-1",
        "corruption-2",
        "corruption-3",
        "corruption-4",
        "corruption-5"
    );


    let level;


    if (value < 20) {

        level = 0;

    } else if (value < 40) {

        level = 1;

    } else if (value < 60) {

        level = 2;

    } else if (value < 80) {

        level = 3;

    } else if (value < 95) {

        level = 4;

    } else {

        level = 5;

    }


    document.body.classList.add(
        `corruption-${level}`
    );

}


/* =========================================================
   CONNECT TO EXISTING CONVERGENCE METER
   ========================================================= */

function syncCorruptionWithMeter() {

    const meterValue =
        document.getElementById("meter-value");

    if (!meterValue) return;


    const text =
        meterValue.textContent
            .replace("%", "")
            .trim();


    const value =
        parseFloat(text);


    if (!Number.isNaN(value)) {

        updateCorruptionLevel(value);

    }

}


/* =========================================================
   WATCH THE METER
   ========================================================= */

const corruptionObserver =
    new MutationObserver(() => {

        syncCorruptionWithMeter();

    });


const corruptionMeter =
    document.getElementById("meter-value");


if (corruptionMeter) {

    corruptionObserver.observe(
        corruptionMeter,
        {
            childList: true,
            characterData: true,
            subtree: true
        }
    );

}


/* =========================================================
   INITIAL STATE
   ========================================================= */

syncCorruptionWithMeter();

/* =========================================================
   RANDOM SYSTEM TRANSMISSIONS
   ========================================================= */

const transmissionBox =
    document.getElementById("system-transmission");

const transmissionMessage =
    document.getElementById("transmission-message");

const transmissionSource =
    document.getElementById("transmission-source");

const transmissionClose =
    document.getElementById("transmission-close");


let transmissionTimeout = null;


/* =========================================================
   TRANSMISSION DATABASE
   ========================================================= */

const transmissionMessages = {

    low: [

        {
            message: "Monitoring the island.",
            source: "ISLAND MONITOR"
        },

        {
            message: "No abnormalities detected.",
            source: "SYSTEM"
        },

        {
            message: "All known connections remain stable.",
            source: "ARCHIVE"
        },

        {
            message: "The island remains operational.",
            source: "ISLAND MONITOR"
        },

        {
            message: "Current records synchronized.",
            source: "ARCHIVE"
        }

    ],


    medium: [

        {
            message: "Connection strength has changed.",
            source: "SYSTEM"
        },

        {
            message: "Something moved beneath the island.",
            source: "UNKNOWN"
        },

        {
            message: "The Fountain is no longer responding.",
            source: "ISLAND MONITOR"
        },

        {
            message: "Unidentified activity detected.",
            source: "SYSTEM"
        },

        {
            message: "Why is the island getting darker?",
            source: "UNKNOWN"
        }

    ],


    high: [

        {
            message: "DO NOT APPROACH THE FOUNTAIN.",
            source: "UNKNOWN"
        },

        {
            message: "The connection is growing.",
            source: "UNKNOWN"
        },

        {
            message: "Something is watching the archive.",
            source: "UNKNOWN"
        },

        {
            message: "The island is no longer isolated.",
            source: "SYSTEM"
        },

        {
            message: "HE KNOWS YOU ARE HERE.",
            source: "UNKNOWN"
        },

        {
            message: "The Hallowed Realm is getting closer.",
            source: "ARCHIVE"
        }

    ],


    critical: [

        {
            message: "THE HALLOW KING IS AWAKE.",
            source: "UNKNOWN"
        },

        {
            message: "THE CONNECTION CANNOT BE CONTAINED.",
            source: "SYSTEM FAILURE"
        },

        {
            message: "STOP THE CONVERGENCE.",
            source: "UNKNOWN"
        },

        {
            message: "THERE ARE NO MORE SEALS.",
            source: "ARCHIVE"
        },

        {
            message: "HE IS ALREADY HERE.",
            source: "UNKNOWN"
        },

        {
            message: "TWO WORLDS. ONE CONNECTION.",
            source: "HALLOWED REALM"
        },

        {
            message: "SEVER THE CONNECTION.",
            source: "UNKNOWN"
        }

    ]

};


/* =========================================================
   GET CURRENT CONVERGENCE
   ========================================================= */

function getCurrentConvergence() {

    const meter =
        document.getElementById("meter-value");

    if (!meter) return 0;

    const value =
        parseFloat(
            meter.textContent.replace("%", "")
        );

    return Number.isNaN(value) ? 0 : value;

}


/* =========================================================
   SELECT MESSAGE GROUP
   ========================================================= */

function getTransmissionPool() {

    const value =
        getCurrentConvergence();


    if (value >= 95) {

        return transmissionMessages.critical;

    }

    if (value >= 60) {

        return transmissionMessages.high;

    }

    if (value >= 30) {

        return transmissionMessages.medium;

    }

    return transmissionMessages.low;

}


/* =========================================================
   SHOW TRANSMISSION
   ========================================================= */

function showTransmission() {

    if (!transmissionBox) return;


    const pool =
        getTransmissionPool();


    const transmission =
        pool[
            Math.floor(
                Math.random() * pool.length
            )
        ];


    transmissionMessage.textContent =
        transmission.message;


    transmissionSource.textContent =
        transmission.source;


    transmissionBox.classList.add(
        "active"
    );


    clearTimeout(
        transmissionTimeout
    );


    transmissionTimeout =
        setTimeout(() => {

            hideTransmission();

        }, 8500);

}


/* =========================================================
   HIDE TRANSMISSION
   ========================================================= */

function hideTransmission() {

    if (!transmissionBox) return;

    transmissionBox.classList.remove(
        "active"
    );

}


/* =========================================================
   CLOSE BUTTON
   ========================================================= */

if (transmissionClose) {

    transmissionClose.addEventListener(
        "click",
        hideTransmission
    );

}


/* =========================================================
   RANDOM INTERVAL
   ========================================================= */

function scheduleTransmission() {

    const delay =
        Math.floor(
            Math.random() * 45000
        ) + 30000;


    setTimeout(() => {

        showTransmission();

        scheduleTransmission();

    }, delay);

}


/* =========================================================
   START SYSTEM
   ========================================================= */

scheduleTransmission();

/* =========================================================
   CONVERGENCE CORRUPTION SYSTEM
   ========================================================= */

(function () {

    const meterValue =
        document.getElementById("meter-value");

    if (!meterValue) {
        console.warn(
            "Convergence corruption system: #meter-value not found."
        );

        return;
    }


    let finalTriggered = false;


    /* =====================================================
       READ CURRENT CONVERGENCE
       ===================================================== */

    function getConvergence() {

        const text =
            meterValue.textContent || "0";

        const number =
            parseInt(
                text.replace(/[^0-9]/g, ""),
                10
            );

        return isNaN(number) ? 0 : number;

    }


    /* =====================================================
       UPDATE CORRUPTION
       ===================================================== */

    function updateCorruption() {

        const level =
            getConvergence();


        document.body.classList.remove(
            "convergence-active",
            "corruption-light",
            "corruption-medium",
            "corruption-heavy",
            "hallowed-intrusion"
        );


        /* -----------------------------------------------
           0–29%
           NORMAL
           ----------------------------------------------- */

        if (level < 30) {
            return;
        }


        /* -----------------------------------------------
           30–49%
           LIGHT CORRUPTION
           ----------------------------------------------- */

        document.body.classList.add(
            "convergence-active"
        );

        document.body.classList.add(
            "corruption-light"
        );


        /* -----------------------------------------------
           50–69%
           MEDIUM CORRUPTION
           ----------------------------------------------- */

        if (level >= 50) {

            document.body.classList.remove(
                "corruption-light"
            );

            document.body.classList.add(
                "corruption-medium"
            );

        }


        /* -----------------------------------------------
           70–89%
           HALLOWED INTRUSION
           ----------------------------------------------- */

        if (level >= 70) {

            document.body.classList.remove(
                "corruption-medium"
            );

            document.body.classList.add(
                "corruption-heavy"
            );

            document.body.classList.add(
                "hallowed-intrusion"
            );

        }


        /* -----------------------------------------------
           90–99%
           EXTREME CORRUPTION
           ----------------------------------------------- */

        if (level >= 90) {

            document.body.classList.add(
                "corruption-heavy"
            );

        }


        /* -----------------------------------------------
           100%
           FINAL CONVERGENCE
           ----------------------------------------------- */

        if (level >= 100 && !finalTriggered) {

            triggerFinalConvergence();

        }

    }


    /* =====================================================
       FINAL CONVERGENCE
       ===================================================== */

    function triggerFinalConvergence() {

        finalTriggered = true;


        document.body.classList.add(
            "final-convergence"
        );


        const message =
            document.querySelector(
                ".final-subtitle"
            );


        if (message) {

            message.textContent =
                "THE TWO WORLDS ARE ONE";

        }


        console.log(
            "THE HALLOWED CONVERGENCE HAS BEGUN."
        );

    }


    /* =====================================================
       WATCH THE METER
       ===================================================== */

    const observer =
        new MutationObserver(() => {

            updateCorruption();

        });


    observer.observe(
        meterValue,
        {
            childList: true,
            characterData: true,
            subtree: true
        }
    );


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    updateCorruption();


})();

/* =========================================================
   SLOW TEXT GLITCH SYSTEM
   ========================================================= */

(function () {

    const targets = [
        ".section-header h1",
        ".section-header p",
        ".hero-eyebrow",
        ".hero-subtitle",
        ".card-label",
        ".status-text",
        ".section-label",
        ".panel-header span",
        ".events-section-header span",
        ".media-label",
        ".media-status",
        ".transmission-header span",
        ".map-header span"
    ];


    function getConvergence() {

        const meter =
            document.getElementById("meter-value");

        if (!meter) return 0;

        const value =
            parseInt(
                meter.textContent.replace(/[^0-9]/g, ""),
                10
            );

        return isNaN(value) ? 0 : value;

    }


    function getRandomTarget() {

        const elements = [];

        targets.forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    if (
                        element.offsetParent !== null &&
                        element.textContent.trim()
                    ) {
                        elements.push(element);
                    }

                });

        });

        if (!elements.length) {
            return null;
        }

        return elements[
            Math.floor(
                Math.random() * elements.length
            )
        ];

    }


    function glitchText() {

        const level =
            getConvergence();


        /* Don't glitch much when the island is stable */

        if (level < 20) {
            return;
        }


        const target =
            getRandomTarget();


        if (!target) {
            return;
        }


        if (target.classList.contains("glitching")) {
            return;
        }


        const original =
            target.textContent;


        target.dataset.glitch =
            original;


        target.classList.add(
            "glitch-text",
            "glitching"
        );


        setTimeout(() => {

            target.classList.remove(
                "glitching"
            );

            delete target.dataset.glitch;

        }, 450);

    }


    function scheduleNextGlitch() {

        const level =
            getConvergence();


        /*
         * Higher Convergence =
         * shorter delay between glitches.
         */

        const minimumDelay =
            Math.max(
                900,
                6500 - (level * 55)
            );


        const maximumDelay =
            Math.max(
                1800,
                11000 - (level * 70)
            );


        const delay =
            minimumDelay +
            Math.random() *
            (maximumDelay - minimumDelay);


        setTimeout(() => {

            glitchText();

            scheduleNextGlitch();

        }, delay);

    }


    scheduleNextGlitch();

})();

/* =========================================================
   THE GAME 2026
   HALLOWEEN COUNTDOWN
   ========================================================= */

function updateCountdown() {

    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    // Halloween 2026
    const targetDate = new Date("2026-10-31T19:00:00+02:00").getTime();

    const now = new Date().getTime();

    const difference = targetDate - now;


    // =====================================================
    // EVENT HAS STARTED
    // =====================================================

    if (difference <= 0) {

        countdown.innerHTML = `
            <span class="countdown-live">
                THE CONVERGENCE HAS BEGUN
            </span>
        `;

        countdown.classList.add("countdown-active");

        return;
    }


    // =====================================================
    // CALCULATE TIME
    // =====================================================

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference /
            1000) % 60
        );


    // =====================================================
    // DISPLAY
    // =====================================================

    countdown.innerHTML = `
        <div class="countdown-label">
            TIME REMAINING
        </div>

        <div class="countdown-values">

            <div class="countdown-unit">
                <strong>${days}</strong>
                <span>DAYS</span>
            </div>

            <div class="countdown-separator">:</div>

            <div class="countdown-unit">
                <strong>${String(hours).padStart(2, "0")}</strong>
                <span>HOURS</span>
            </div>

            <div class="countdown-separator">:</div>

            <div class="countdown-unit">
                <strong>${String(minutes).padStart(2, "0")}</strong>
                <span>MIN</span>
            </div>

            <div class="countdown-separator">:</div>

            <div class="countdown-unit">
                <strong>${String(seconds).padStart(2, "0")}</strong>
                <span>SEC</span>
            </div>

        </div>
    `;
}


/* =========================================================
   START COUNTDOWN
   ========================================================= */

updateCountdown();

setInterval(updateCountdown, 1000);