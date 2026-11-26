(() => {
    const storageKey = "stegripe:docs.stegripe.org:sidebar-scroll";
    const selector = ".col-sidebar, .site-menu, .page-menu";
    const restoreWindowMs = 600;
    let saved = null;
    let restoring = true;
    let observer = null;
    const timers = [];

    const scrollerId = (el) =>
        ["col-sidebar", "site-menu", "page-menu"].find((name) => el.classList.contains(name)) ?? "sidebar";

    const scrollers = () => [...document.querySelectorAll(selector)];

    const readSaved = () => {
        try {
            const raw = sessionStorage.getItem(storageKey);
            if (!raw) {
                return null;
            }
            const data = JSON.parse(raw);
            return data && typeof data === "object" ? data : null;
        } catch {
            return null;
        }
    };

    const save = () => {
        const data = { ...(saved || {}) };
        for (const el of scrollers()) {
            if (el.scrollHeight > el.clientHeight + 1) {
                data[scrollerId(el)] = el.scrollTop;
            }
        }
        saved = data;
        try {
            sessionStorage.setItem(storageKey, JSON.stringify(data));
        } catch {
        }
    };

    const apply = () => {
        if (!restoring) {
            return;
        }
        const data = saved;
        for (const el of scrollers()) {
            const id = scrollerId(el);
            if (data && typeof data[id] === "number") {
                el.scrollTop = data[id];
            } else if (!data) {
                el.scrollTop = 0;
            }
        }
    };

    const navReady = () => {
        const nav = document.getElementById("tsd-nav-container");
        if (!nav) {
            return false;
        }
        const text = nav.textContent?.replace(/\s+/g, " ").trim();
        return text !== "" && text !== "Loading...";
    };

    const stopRestore = () => {
        if (!restoring) {
            return;
        }
        restoring = false;
        for (const id of timers) {
            clearTimeout(id);
        }
        timers.length = 0;
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    };

    const isSidebarEvent = (event) => {
        const target = event.target;
        if (target instanceof Element && target.closest(selector)) {
            return true;
        }
        if (event.type === "keydown") {
            const active = document.activeElement;
            return scrollers().some((el) => el === active || el.contains(active));
        }
        return false;
    };

    saved = readSaved();
    apply();

    for (const ms of [0, 50, 100, 300, restoreWindowMs]) {
        timers.push(
            setTimeout(() => {
                if (!restoring) {
                    return;
                }
                apply();
                if (ms === restoreWindowMs) {
                    stopRestore();
                }
            }, ms),
        );
    }

    const nav = document.getElementById("tsd-nav-container");
    if (nav) {
        observer = new MutationObserver(() => {
            if (restoring && navReady()) {
                apply();
            }
        });
        observer.observe(nav, { childList: true, subtree: true });
        if (navReady()) {
            apply();
        }
    }

    document.addEventListener(
        "scroll",
        (event) => {
            const target = event.target;
            if (!(target instanceof Element) || !target.matches(selector)) {
                return;
            }
            if (restoring) {
                return;
            }
            save();
        },
        true,
    );

    const onUserInput = (event) => {
        if (!isSidebarEvent(event)) {
            return;
        }
        stopRestore();
    };

    for (const type of ["keydown", "pointerdown", "wheel", "touchstart", "touchmove"]) {
        document.addEventListener(type, onUserInput, true);
    }
})();
