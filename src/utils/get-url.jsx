const defaultShortCuts = {
    y: "https://www.youtube.com/",
    g: "https://www.google.com/",
    f: "https://www.facebook.com/",
    i: "https://www.instagram.com/",
    t: "https://twitter.com/",
    r: "https://www.reddit.com/",
    a: "https://www.amazon.com/",
    w: "https://en.wikipedia.org/",
    n: "https://www.netflix.com/",
    l: "https://www.linkedin.com/",
    p: "https://www.pinterest.com/",
    m: "https://www.microsoft.com/",
    d: "https://www.dropbox.com/",
    e: "https://www.ebay.com/",
    h: "https://www.hulu.com/",
    s: "https://www.spotify.com/",
    o: "https://www.office.com/",
    z: "https://zoom.us/",
    q: "https://www.quora.com/",
    u: "https://www.uber.com/",
    v: "https://vimeo.com/",
    b: "https://www.bing.com/",
    c: "https://chatgpt.com/",
    cl: "https://www.craigslist.org/",
    k: "https://www.kickstarter.com/",
    x: "https://www.xbox.com/",
    j: "https://www.jetbrains.com/",
    mt: "https://www.medium.com/"
}

function tryUrl(url) {
    try {
        //if the url is a valid url
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}

export var searchEngine = localStorage.getItem("mw-b-search-engine") || "https://www.google.com/search"

export function getShortCuts() {
    try {
        if (localStorage.getItem("mw-b-shortcuts"))
            return JSON.parse(localStorage.getItem("mw-b-shortcuts"))
        return defaultShortCuts
    }
    catch (err) {
        return defaultShortCuts
    }
}

export default function toUrl(input) {
    const shortCuts = getShortCuts()

    if (tryUrl(input)) return input
    if (tryUrl(shortCuts[input])) return shortCuts[input]

    if (tryUrl(`https://${input}`) && (input.includes(".") || new URL(`https://${input}`).origin == "localhost") && !input.split(".")[0].includes(" ")) return `https://${input}`

    const searchUrl = new URL(searchEngine)

    searchUrl.searchParams.set("q", input)

    return searchUrl.toString()
}