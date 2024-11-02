require('dotenv').config();

const fs = require('fs');
const colors = require('colors');
const prompt = require('prompt-sync')();

const manga_url = process.env.MANGA_URL;

const { getMangaListOfChapters } = require('./manga_scraper');
const { compare } = require('./compare');

async function run() {
	const mangaReadingList = getMangaReadingList();

	const mangaWithChapters = await getMangaListOfChapters(manga_url, mangaReadingList);
	const compareResults = await compare(mangaReadingList, mangaWithChapters);

	for (const manga of compareResults) {
		if (manga.status === "NO_UPDATE") {
			console.log(`${manga.name} - No new chapter found`);
		} else {
			console.log(`${manga.name} - New ${manga.latest_chapter} ! Please go read now!`.green);
		}
	}

	if (newChapters(compareResults)) {
		prompt('Press enter/return to update to latest chapters');
		updateToLatestChapter(compareResults)
	}


	function getMangaReadingList() {
		const rawdata = fs.readFileSync('./mangareading.json');
		let currentReading = JSON.parse(rawdata);
		return currentReading;
	}

	function newChapters(compareResults) {
		for (const manga of compareResults) {
			if (manga.status !== "NO_UPDATE") {
				return true
			}
		}

		return false
	}

	function updateToLatestChapter() {
		for (const manga of compareResults) {
			if (manga.status === "NO_UPDATE") {
				continue
			}

			const rawdata = fs.readFileSync('./mangareading.json');
			let currentReading = JSON.parse(rawdata);
			const item = currentReading.find(entry => entry.url_ends_with === manga.name);
			if (item) {
				item.last_chapter = manga.latest_chapter;

				// Write updated data back to the JSON file
				fs.writeFile('./mangareading.json', JSON.stringify(currentReading, null, 2), 'utf8', (writeErr) => {
					if (writeErr) {
						console.error("Error writing file:", writeErr);
					} else {
						console.log(`Successfully updated last_chapter for url_ends_with: ${manga.name}`);
					}
				});
			} else {
				console.log(`No entry found with url_ends_with: ${manga.name}`);
			}
		}
	}
}

run();