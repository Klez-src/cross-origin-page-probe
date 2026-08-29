const targetInput = document.getElementById("target");
const runButton = document.getElementById("run");
const result = document.getElementById("result");
const log = document.getElementById("log");

function writeLog(message) {
    const time = new Date().toLocaleTimeString();

    log.textContent += `[${time}] ${message}\n`;
}

function setResult(message) {
    result.querySelector("span:last-child").textContent = message;
}

async function runProbe() {
    const target = targetInput.value.trim();

    if (!target) {
        return;
    }

    log.textContent = "";

    setResult("starting test...");
    writeLog(`probe origin: ${location.origin}`);
    writeLog(`target: ${target}`);

    /*
     * First, make an iframe.

     * Because the target is on localhost:3001 while this page
     * is on localhost:3000, the two pages have different origins.
     *
     * We intentionally do NOT try to access iframe.contentDocument.
     * The browser should stop us from doing that.
     */

    const frame = document.createElement("iframe");

    frame.style.position = "absolute";
    frame.style.width = "1px";
    frame.style.height = "1px";
    frame.style.opacity = "0";

    frame.src = target;

    const loaded = new Promise((resolve) => {
        frame.addEventListener("load", resolve, { once: true });
    });

    document.body.appendChild(frame);

    await loaded;

    writeLog("target finished loading");

    /*
     * This is the important part of the first experiment.
     *
     * We deliberately attempt the obvious thing first.
     * It should fail because of the same-origin policy.
     */

    try {
        const documentInsideFrame = frame.contentDocument;

        // Depending on the browser, this may be null or inaccessible.
        const marker = documentInsideFrame?.querySelector("#secret-marker");

        if (marker) {
            writeLog("unexpectedly found the marker");
            setResult("marker was readable");
        } else {
            writeLog("marker could not be read");
            setResult("same-origin protection appears to be working");
        }
    } catch (error) {
        writeLog(`direct read blocked: ${error.message}`);
        setResult("direct access blocked");
    }

    /*
     * Clean up after the experiment.
     */
    setTimeout(() => {
        frame.remove();
    }, 1000);
}

runButton.addEventListener("click", runProbe);
