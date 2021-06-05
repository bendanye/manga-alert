

const getMangaListOfChapters = async(page, manga_url, mangaTitle) => {
    await page.goto(`${manga_url}/${mangaTitle}`);

    const getXpath = await getMangaChaptersElement(page);
    const getMsg = await page.evaluate(name => name.innerText, getXpath);
    return getMsg.split("\n");
}

const getMangaChaptersElement = async(page) => {
    const selector = "//tbody/tr[1]/td[1]/h4[1]/a[1]";
    await page.waitForXPath(selector);
    const [getXpath] = await page.$x(selector);
    return getXpath;
    
}

module.exports = {
    getMangaListOfChapters
}