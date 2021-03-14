const getMangaListOfChapters = async(page, mangaTitle) => {
    await page.goto(`http://mangareader.cc/manga/${mangaTitle}`);

    await page.waitForXPath("/html[1]/body[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[2]/div[4]/ul[1]");

    const [getXpath] = await page.$x("/html[1]/body[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[2]/div[4]/ul[1]");

    const getMsg = await page.evaluate(name => name.innerText, getXpath);
    return getMsg.split("\n");
}

module.exports = {
    getMangaListOfChapters
}