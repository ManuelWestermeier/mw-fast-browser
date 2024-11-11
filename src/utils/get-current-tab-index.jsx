export default function getCurrentTabIndex(webViewsElem) {
    const scrollPos = webViewsElem.scrollLeft / webViewsElem.getClientRects()[0].width
    return Math.round(scrollPos)
}