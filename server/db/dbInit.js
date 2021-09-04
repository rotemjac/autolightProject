//TODO:fix variables names
const {Builder, By} = require('selenium-webdriver');
const fetch = require('node-fetch');
const util = require('util');
let fs = require('fs');
const unlinkFile = util.promisify(fs.unlink);
const dbOperations = require('./dbOperations');
const {uploadFileFromPath} = require('../routes/s3');
(async function initDb() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.navigate().to("https://www.rhinocarhire.com/Drive-Smart-Blog/Dash-Warning-Lights-Complete-Guide.aspx");

    await insertDbData(driver);

})();

async function insertDbData(driver) {
    let lightData;
    const warningLightsElements = await driver.findElements(By.xpath("//*[contains(@id,'content_')]"));
    for (let i = 0; i < warningLightsElements.length; i++) {
        let currLightElm = warningLightsElements[i];
        lightData = await GetOneLightFullData(i, currLightElm);

        if ((lightData.get("color") !== "White") && (lightData.get("Name") !== 'Window Wiper')) {
            let selectSql = 'INSERT INTO WarningLightsTbl  (Id,Name,displayImgPath,SearchImgDir,Explanation,Recommendation,Severity,IsCommon,Color) VALUES'
                + "(" + i + "," +
                "'" + lightData.get("Name") + "'," +
                "'" + lightData.get("displayImgSrc") + "'," +
                "'" + lightData.get("searchImgDir") + "'," +
                "'" + lightData.get("explanation") + "'," +
                "'" + lightData.get("recommendation") + "'," +
                "'" + lightData.get("severity") + "'," +
                "'0'," +
                "'" + lightData.get("color") + "');";
            await dbOperations.execQuery(selectSql);
            console.log(selectSql);
        }
    }
    await updateCommonWarningLights();
    await updateContainedText();
}

async function GetImgColor(imgElm, warningLigthData) {
    let color;
    let title = await imgElm.getAttribute("title"); //.toLowerCase()
    if (title.includes(" in red"))
        color = "Red";
    else if (title.includes(" in orange"))
        color = "Yellow";
    else if (title.includes(" in green"))
        color = "Green";
    else if (title.includes(" in blue"))
        color = "Blue";
    else if (title.includes(" in white"))
        color = "White";
    else
        color = "Yellow"; // Undefined

    warningLigthData.set("color", color);
}

function findAllBrIndexes(innerHtml) {
    var indexes = [];
    let index = innerHtml.indexOf("<br>");
    while (index >= 0) {
        indexes.push(index);
        index = innerHtml.indexOf("<br>", index + 1);
    }
    return indexes;
}

function findAllaIndexes(recommendation) {
    var a_indexes = [];

    a_indexes.push(recommendation.indexOf("<a"));
    a_indexes.push(recommendation.indexOf(">"));
    a_indexes.push(recommendation.indexOf("</a"));
    a_indexes.push(recommendation.indexOf("</a>"));
    a_indexes.push(recommendation.length);

    return a_indexes;
}

function cut(str, aTagIndexes) {
    let rec = str.substring(0, aTagIndexes[0]);
    rec += str.substring(aTagIndexes[1] + 1, aTagIndexes[2]);
    rec += str.substring(aTagIndexes[3] + 4, aTagIndexes[4]);

    return rec;
}

async function GetLightInnerData(id, warningLightElm, imgElm) {
    let explanation = "", recommendation = "", severity = "1/10";
    var warningLightData = new Map();
    let warningLightDataElm = await warningLightElm.findElement(By.className("cstxt"));
    let name = await warningLightDataElm.findElement(By.tagName("span")).getAttribute("innerText");
    warningLightData.set("Name", name);

    if (id === 28) {
        getWarningLight28Data(warningLightData);
    } else {
        let innerHtml = await warningLightElm.getAttribute("innerHTML");
        let brTagIndexes = await findAllBrIndexes(innerHtml);

        if (brTagIndexes.length >= 2) {
            explanation = innerHtml.substring(brTagIndexes[0] + 4, brTagIndexes[1]);

            if (brTagIndexes.length >= 4) {
                recommendation = innerHtml.substring(brTagIndexes[2] + 4, brTagIndexes[3]);

                // skip href in <a> tags
                if (recommendation.indexOf("<a") !== -1) {
                    let aTagIndexes = findAllaIndexes(recommendation);
                    recommendation = cut(recommendation, aTagIndexes);
                }
            }
        }

        let severityIndex = innerHtml.indexOf("/10") - 1;
        if (severityIndex != -2) {
            severity = innerHtml.substring(severityIndex, severityIndex + 4);
        }

        await GetImgColor(imgElm, warningLightData);

        warningLightData.set("explanation", explanation);
        warningLightData.set("recommendation", recommendation);
        warningLightData.set("severity", severity);
    }

    return warningLightData;
}

async function GetOneLightFullData(id, lightData) {
    let imgElm = lightData.findElement(By.tagName("img"));
    let warningLightData = await GetLightInnerData(id, lightData, imgElm);

    let imgSrc = await imgElm.getAttribute("src");
    let filePath = "./client/public/images/displayImages/" + id + ".jpg";

    const src = await fetch(imgSrc);
    const buffer = await src.buffer();
    fs.writeFileSync(filePath, buffer);
    let result = await uploadFileFromPath(filePath, id.toString());
    await unlinkFile(filePath);

    let searchImgDir = "./server/imgProcessing/searchImages/warningLight" + id; //nodejsPath  #todo: delete comment here

    let displayImgSrc = result.Location;

    warningLightData.set("searchImgDir", searchImgDir);
    warningLightData.set("displayImgSrc", displayImgSrc);

    return warningLightData;
}

function getWarningLight28Data(warningLightData) {
    let explanation = "Indicates the engine temperature is too hot"
    let recommendation = "Pull over as soon as possible and shut the engine off. Wait for at least 30 minutes for the engine to cool down.";

    warningLightData.set("explanation", explanation);
    warningLightData.set("recommendation", recommendation);
    warningLightData.set("severity", "8/10");
    warningLightData.set("color", "Red");
}

async function updateContainedText() {
    let updateTextQuery = "";
    console.log("updating warning lights contained text...")
    const textLightsArray = [[8, 'Air Bag'], [7, 'P'], [42, 'Oil Level'], [41, 'i'], [47, 'ESP'], [48, 'ABS'],
        [116, 'Shift'], [10, 'Main'], [15, 'A/T Oil Temp'], [17, 'Brake'], [19, 'SRS'], [21, 'A/T P'], [30, 'Check'],
        [31, 'Check'], [99, 'ENG A-STOP'], [104, 'EV'], [107, 'A'], [109, 'Hold'], [113, 'P'], [114, 'ECO'], [115, 'ECO MODE'],
        [35, 'PCS'], [37, 'Service'], [39, 'Min'], [40, 'A/T Oil Temp'], [62, 'Key'], [64, '4x2'], [65, '4WD'], [66, '4x4 Auto'],
        [67, '4x4 High'], [68, '4x4 Low'], [74, 'P']];

    var textLightsMap = new Map(textLightsArray);
    // '!' = 43, 46, 55, 3, 11, 12, 25, 102, 108, 34, 76, 79

    for (const [key, value] of textLightsMap) {
        updateTextQuery = "UPDATE WarningLightsTbl SET Text='" + value + "' where Id=" + key;
        await dbOperations.execQuery(updateTextQuery);
    }
}

async function updateCommonWarningLights() {
    console.log("updating common warning lights...")
    let updateIsCommonQuery = "UPDATE WarningLightsTbl SET IsCommon='1' where Id in ('4','6','7','9','12','13','20','31','36','48','55','59','77','107')";
    await dbOperations.execQuery(updateIsCommonQuery);
}





