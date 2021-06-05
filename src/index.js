require('dotenv').config();

const puppeteer = require('puppeteer');

const fs = require('fs');
const colors = require('colors');

const manga_url = process.env.MANGA_URL;

const { getMangaListOfChapters } = require('./manga_scraper');

async function run() {
	const mangaReadingList = getMangaReadingList();
	console.log("Starting to check...");
	
	const browser = await puppeteer.launch({
		headless: false
	  });

    const page = await browser.newPage();

	for(const manga of mangaReadingList) {
		const chapters = await getMangaListOfChapters(page, manga_url, manga.url_ends_with);
		const chapterWithVolume = getLastChapter(chapters);

		const chapterVolume = getChapterVolume(chapterWithVolume);

		if (chapterVolume.includes(manga.last_chapter)) {
			console.log(`${manga.url_ends_with} - No new chapter found`);
		} else {
			console.log(`${manga.url_ends_with} - New ${chapterVolume} ! Please go read now!`.green);
		}
	}

    await browser.close();

	function getMangaReadingList() {
		const rawdata = fs.readFileSync('./mangareading.json');
		let currentReading = JSON.parse(rawdata);
		return currentReading;
	}

	function getLastChapter(chapters) {
		return chapters[0];
	}

	function getChapterVolume(titleWithChapter) {
		const indexWithChapter = titleWithChapter.indexOf("Chapter");

		const chapter = titleWithChapter.substring(indexWithChapter);
		return chapter;
	}
}

run();