const { compare } = require('../src/compare');

test('should able to get list of manga with their chapter updates', async() => {
    const mangaReadingList = [
        {
            "url_ends_with": "helloworld",
            "last_chapter": "217"
        },
        {
            "url_ends_with": "hello_js",
            "last_chapter": "5"
        }
    ];
    const mangaWithChapters = [
        {
            "name": "helloworld",
            "chapters": [
                "Chapter 218",
                "Chapter 217",
                "Chapter 216",
            ]
        },
        {
            "name": "hello_js",
            "chapters": [
                "Chapter 5",
                "Chapter 4",
                "Chapter 3"
            ]
        }
    ];
    
    const results = await compare(mangaReadingList, mangaWithChapters);

    expect(results).toStrictEqual([
        {
            'name': 'helloworld',
            'status': "UPDATE",
            'latest_chapter': "Chapter 218"
        },
        {
            'name': 'hello_js',
            'status': "NO_UPDATE",
            'latest_chapter': "Chapter 5"
        }
    ]);
});