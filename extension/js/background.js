import Fullerene from './fullerene/Fullerene'
import FullereneIncognito from './fullerene/Fullerene+Incognito'

let fl = new Fullerene()


const MENU_ID_OPEN_FULLERENE_WINDOW = "openFullereneWindow";

var mainWindow;
const contextMenuHandlers = {
    [MENU_ID_OPEN_FULLERENE_WINDOW]: () => {
        chrome.windows.create({
            url: "extension/main.html",
            width: 480,
            height: 1024,
            type: "popup",
            focused: true,
        },
        (window) => {
            mainWindow = window;
        });
    },
};

chrome.contextMenus.create({
    id: MENU_ID_OPEN_FULLERENE_WINDOW,
    title: "open Fullerene Tabs window",
    contexts: ["browser_action"],
}, () => {});
chrome.contextMenus.onClicked.addListener(
    (info, tab) => {
        let f = contextMenuHandlers[info.menuItemId];
        if (f) { f(info, tab); }
    }
);