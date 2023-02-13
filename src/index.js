require('dotenv').config();

const fs = require('fs');
const colors = require('colors');

const manga_url = process.env.MANGA_URL;

const { getMangaListOfChapters } = require('./manga_scraper');
const { compare } = require('./compare');

async function run() {
	const mangaReadingList = getMangaReadingList();

	const mangaWithChapters = await getMangaListOfChapters(manga_url, mangaReadingList);
	const compareResults = await compare(mangaReadingList, mangaWithChapters);

	for(const manga of compareResults) {
		if (manga.status === "NO_UPDATE") {
			console.log(`${manga.name} - No new chapter found`);
		} else {
			console.log(`${manga.name} - New ${manga.latest_chapter} ! Please go read now!`.green);
		}
	}

	function getMangaReadingList() {
		const rawdata = fs.readFileSync('./mangareading.json');
		let currentReading = JSON.parse(rawdata);
		return currentReading;
	}
}

run();