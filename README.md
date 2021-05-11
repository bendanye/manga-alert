# manga-alert

A tool that checks if the manga you interested in has updated based on your last read chapter.

## Setup

1. Create a mangareading.json file. For example,
  
```json
[
    {
        "url_ends_with": "my_manga_name",
        "last_chapter": "1"
    }
]
```

2. Create .env file and indicate the manga url

```env
MANGA_URL=http://myurl.com
```

3. Install required modules.

```shell
npm install
```

## Execute

To run the program.

```shell
npm start
```

## Current version

* A command line tool
* Only tested and works on a particular website.

## Possible Future enhancement

- Chrome extension
- Telegram Bot

## Impetus

I am interested in few manga and I wanted to know immediately if there is new chapter available when I switched on my computer instead of having to manually click on each manga.
