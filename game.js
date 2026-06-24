document.addEventListener("DOMContentLoaded", () => {

    const player = document.getElementById("player");
    const message = document.getElementById("message");

    const menuBtn = document.getElementById("menuBtn");
    const questPanel = document.getElementById("questPanel");

    const startBtn = document.getElementById("startBtn");
    const startScreen = document.getElementById("startScreen");

    const resetBtn = document.getElementById("resetBtn");

    const certificate =
    document.getElementById("certificate");

    const closeCertificate =
    document.getElementById("closeCertificate");

    const downloadBtn =
    document.getElementById("downloadBtn");

    let x = 300;
    let y = 300;

    const speed = 10;

    let currentBuilding = null;

    let visitedBuildings =
    JSON.parse(
        localStorage.getItem("visitedBuildings")
    ) || [];

    let housePoints =
    parseInt(
        localStorage.getItem("housePoints")
    ) || 0;

    // RETURN POSITION SYSTEM

    const returnPercentX =
    parseFloat(
        localStorage.getItem("returnPercentX")
    );

    const returnPercentY =
    parseFloat(
        localStorage.getItem("returnPercentY")
    );

    if (
        !isNaN(returnPercentX) &&
        !isNaN(returnPercentY)
    ) {

        x = returnPercentX * window.innerWidth;
        y = returnPercentY * window.innerHeight;

        localStorage.removeItem("returnPercentX");
        localStorage.removeItem("returnPercentY");
    }

    // BUILDINGS

    const buildings = [

        {
            name: "Castle",
            page: "pages/castle.html",
            origX: 720,
            origY: 100,
            origW: 120,
            origH: 120,
            elementId: "castleQuest"
        },

        {
            name: "Grand Library",
            page: "pages/library.html",
            origX: 1100,
            origY: 150,
            origW: 120,
            origH: 120,
            elementId: "libraryQuest"
        },

        {
            name: "Potion Lab",
            page: "pages/potionlab.html",
            origX: 1290,
            origY: 360,
            origW: 120,
            origH: 120,
            elementId: "potionQuest"
        },

        {
            name: "Magic Hall",
            page: "pages/magichall.html",
            origX: 400,
            origY: 540,
            origW: 120,
            origH: 120,
            elementId: "magicQuest"
        },

        {
            name: "Great Hall",
            page: "pages/greathall.html",
            origX: 1070,
            origY: 600,
            origW: 140,
            origH: 140,
            elementId: "greatQuest"
        },

        {
            name: "Map Tower",
            page: "pages/maptower.html",
            origX: 290,
            origY: 100,
            origW: 120,
            origH: 120,
            elementId: "towerQuest"
        },

        {
            name: "Enchanted Forest",
            page: "pages/forest.html",
            origX: 170,
            origY: 340,
            origW: 140,
            origH: 140,
            elementId: "forestQuest"
        }

    ];

    // HOUSE POINTS

    function updateHousePoints() {

        const display =
        document.getElementById("housePoints");

        if (display) {

            display.textContent =
            housePoints;

        }

        localStorage.setItem(
            "housePoints",
            housePoints
        );
    }
    function addHousePoints(points){

    housePoints += points;

    localStorage.setItem(
        "housePoints",
        housePoints
    );

    updateHousePoints();

}
    // QUEST PANEL

    function updateQuestPanel() {

        const progressText =
        document.getElementById(
            "progressText"
        );

        if (progressText) {

            progressText.innerHTML =
            `${visitedBuildings.length} / 7 Buildings Visited`;

        }

        buildings.forEach((building) => {

            const item =
            document.getElementById(
                building.elementId
            );

            if (!item) return;

            if (
                visitedBuildings.includes(
                    building.name
                )
            ) {

                item.innerHTML =
                `☑ ${building.name}`;

                item.style.color =
                "#4CAF50";

            } else {

                item.innerHTML =
                `☐ ${building.name}`;

                item.style.color =
                "#ffffff";

            }

        });

        // CERTIFICATE

        if (
            visitedBuildings.length === 7 &&
            certificate
        ) {

            certificate.style.display =
            "flex";

        }

    }

    // KEY TRACKING

    const keys = {};

    document.addEventListener(
        "keydown",
        (e) => {

            keys[
                e.key.toLowerCase()
            ] = true;

        }
    );

    document.addEventListener(
        "keyup",
        (e) => {

            keys[
                e.key.toLowerCase()
            ] = false;

        }
    );

    // BUILDING ENTRY

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key.toLowerCase() === "e" &&
                currentBuilding
            ) {

                if (
                    !visitedBuildings.includes(
                        currentBuilding.name
                    )
                ) {

                    visitedBuildings.push(
                        currentBuilding.name
                    );

                    ;

                    localStorage.setItem(
                        "visitedBuildings",
                        JSON.stringify(
                            visitedBuildings
                        )
                    );

                    updateHousePoints();
                }

                updateQuestPanel();

                window.location.href =
                currentBuilding.page;
            }

        }
    );

    // BUILDING DETECTION

    function checkBuildings() {

        currentBuilding = null;

        const currentWidth =
        window.innerWidth;

        const currentHeight =
        window.innerHeight;

        const playerCenterX =
        x + player.offsetWidth / 2;

        const playerCenterY =
        y + player.offsetHeight / 2;

        for (let building of buildings) {

            const scaledX =
            (building.origX / 1500) *
            currentWidth;

            const scaledY =
            (building.origY / 1000) *
            currentHeight;

            const scaledW =
            (building.origW / 1500) *
            currentWidth;

            const scaledH =
            (building.origH / 1000) *
            currentHeight;

            const centerX =
            scaledX + scaledW / 2;

            const centerY =
            scaledY + scaledH / 2;

            const distance =
            Math.sqrt(

                Math.pow(
                    playerCenterX - centerX,
                    2
                ) +

                Math.pow(
                    playerCenterY - centerY,
                    2
                )

            );

            const triggerRange =
            (scaledW / 2) + 20;

            if (
                distance < triggerRange
            ) {

                currentBuilding =
                building;

                if (message) {

                    message.style.display =
                    "block";

                    message.innerHTML =
                    `${building.name}<br><small>Press E to Enter</small>`;

                }

                return;
            }

        }

        if (message) {

            message.style.display =
            "none";

        }

    }
    function addHousePoints(points){

    housePoints += points;

    localStorage.setItem(
        "housePoints",
        housePoints
    );

    const display =
    document.getElementById(
        "housePoints"
    );

    if(display){

        display.innerHTML =
        housePoints;

    }

}
    // GAME LOOP

    function gameLoop() {

        if (keys["w"]) y -= speed;
        if (keys["s"]) y += speed;
        if (keys["a"]) x -= speed;
        if (keys["d"]) x += speed;

        if (x < 0) x = 0;
        if (y < 0) y = 0;

        if (
            x >
            window.innerWidth -
            player.offsetWidth
        ) {

            x =
            window.innerWidth -
            player.offsetWidth;

        }

        if (
            y >
            window.innerHeight -
            player.offsetHeight
        ) {

            y =
            window.innerHeight -
            player.offsetHeight;

        }

        player.style.left =
        x + "px";

        player.style.top =
        y + "px";

        checkBuildings();

        requestAnimationFrame(
            gameLoop
        );
    }

    // MENU

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            () => {

                questPanel.style.display =
                questPanel.style.display === "block"
                ? "none"
                : "block";

            }
        );

    }

    // START SCREEN

    if (
        localStorage.getItem(
            "gameStarted"
        ) === "true"
    ) {

        startScreen.style.display =
        "none";

    }

    if (startBtn) {

        startBtn.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "gameStarted",
                    "true"
                );

                startScreen.style.display =
                "none";

            }
        );

    }

    // CERTIFICATE CLOSE

    if (closeCertificate) {

        closeCertificate.addEventListener(
            "click",
            () => {

                certificate.style.display =
                "none";

            }
        );

    }

    // DOWNLOAD CERTIFICATE

    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            () => {

                const text = `
WIZARDVERSE ACADEMY

CERTIFICATE OF COMPLETION

Congratulations!

You have explored
all locations in
WizardVerse Academy.

House Points: ${housePoints}

Completion: 100%
`;

                const blob =
                new Blob(
                    [text],
                    {
                        type:
                        "text/plain"
                    }
                );

                const link =
                document.createElement("a");

                link.href =
                URL.createObjectURL(
                    blob
                );

                link.download =
                "WizardVerse-Certificate.txt";

                link.click();

            }
        );

    }

    // RESET

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            () => {

                if (
                    confirm(
                        "Reset progress?"
                    )
                ) {

                    localStorage.clear();

                    location.reload();

                }

            }
        );

    }

    updateQuestPanel();
    updateHousePoints();
    gameLoop();

});