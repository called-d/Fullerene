import Fullerene from './fullerene/Fullerene'
import FullereneIncognito from './fullerene/Fullerene+Incognito'

let fl = new Fullerene()


const MENU_ID_OPEN_FULLERENE_WINDOW = "openFullereneWindow";

const mainWindow = {
    _w: null,
    get() {
        return new Promise((resolve, reject) => {
            if (!this._w) reject("no main window");
            chrome.windows.get(this._w.id, w => {
                if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
                resolve(w);
            });
        });
    },
    open() {
        this.get().then(w => {
            chrome.windows.update(w.id, {focused: true});
        }).catch(_ => {
            chrome.windows.create(
                {
                    url: "extension/main.html",
                    width: 480,
                    height: 1024,
                    type: "popup",
                    focused: true,
                },
                w => { self._w = w }
            );
        });
    }
};

const contextMenuHandlers = {
    [MENU_ID_OPEN_FULLERENE_WINDOW]: () => {
        mainWindow.open();
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