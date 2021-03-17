const manga_url = process.env.MANGA_URL;

const getMangaListOfChapters = async(page, mangaTitle) => {
    await page.goto(`${manga_url}/${mangaTitle}`);

    const getXpath = await getMangaChaptersElement(page);
    const getMsg = await page.evaluate(name => name.innerText, getXpath);
    return getMsg.split("\n");
}

const getMangaChaptersElement = async(page) => {
    const isDescriptionLong = await isMangaDescriptionLong(page);

    if (isDescriptionLong) {
        await page.waitForXPath("/html[1]/body[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[2]/div[5]/ul[1]");
        const [getXpath] = await page.$x("/html[1]/body[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[2]/div[5]/ul[1]");
        return getXpath;
    } else {
        await page.waitForXPath("/html[1]/body[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[2]/div[4]/ul[1]");
        const [getXpath] = await page.$x("/html[1]/body[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[2]/div[4]/ul[1]");
        return getXpath;
    }
}

const isMangaDescriptionLong = async(page) => {
    try {
        await page.waitForXPath("//body/div[@id='all']/div[@id='pusat']/div[@id='main']/div[@id='content']/div[1]/div[2]/div[3]/span[1]/img[1]", {
            timeout: 5000
        });
        return true;
    } catch {
        return false;
    }
}

module.exports = {
    getMangaListOfChapters
}