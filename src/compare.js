const compare = async(mangaReadingList, mangaWithChapters) => {
    let results = [];

    for(const manga of mangaReadingList) {

        const { chapters } = mangaWithChapters.find(o => o.name === manga.url_ends_with);

        const chapterWithVolume = getLastChapter(chapters);
        const chapterVolume = getChapterVolume(chapterWithVolume);

        results.push({
            "name": manga.url_ends_with,
            "status": chapterVolume.includes(manga.last_chapter) ? 'NO_UPDATE' : chapterVolume
        })
    }

    return results;
}

const getLastChapter = (chapters) => {
    return chapters[0];
}

const getChapterVolume = (titleWithChapter) => {
    const indexWithChapter = titleWithChapter.indexOf("Chapter");
    const chapter = titleWithChapter.substring(indexWithChapter);
    return chapter;
}

module.exports = {
    compare
}