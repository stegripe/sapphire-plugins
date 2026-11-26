(() => {
    const storageKey = "stegripe:docs.stegripe.org:sidebar-scroll";
    const selector = ".col-sidebar, .site-menu, .page-menu";
    let lastUser = null;
    let userScrolling = false;

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
        const data = { ...(lastUser || {}) };
        for (const el of scrollers()) {
            if (el.scrollHeight > el.clientHeight + 1) {
                data[scrollerId(el)] = el.scrollTop;
            }
        }
        lastUser = data;
        sessionStorage.setItem(storageKey, JSON.stringify(data));
    };

    const apply = () => {
        const saved = lastUser || readSaved();
        for (const el of scrollers()) {
            const id = scrollerId(el);
            if (saved && typeof saved[id] === "number") {
                el.scrollTop = saved[id];
            } else if (!saved) {
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

    lastUser = readSaved();
    apply();
    for (const ms of [0, 50, 100, 300, 600]) {
        setTimeout(apply, ms);
    }
    const nav = document.getElementById("tsd-nav-container");
    if (nav) {
        new MutationObserver(() => {
            if (navReady()) {
                apply();
            }
        }).observe(nav, { childList: true, subtree: true });
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
            if (userScrolling) {
                save();
            } else {
                apply();
            }
        },
        true,
    );

    const onUserScroll = (event) => {
        const target = event.target;
        if (!(target instanceof Element) || !target.closest(selector)) {
            return;
        }
        userScrolling = true;
        requestAnimationFrame(() => {
            save();
            userScrolling = false;
        });
    };

    for (const type of ["wheel", "touchmove"]) {
        document.addEventListener(type, onUserScroll, true);
    }
})();
