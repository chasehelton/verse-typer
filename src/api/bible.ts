import axios from 'axios';

type Verse = {
    canonical: string,
    parsed: any,
    passage_meta: any,
    passages: string[],
    query: string,
}

export async function getBible(book: string, chapter: string, verse: string) {

    const { data } = await axios.get<Verse | undefined>(
        'https://api.esv.org/v3/passage/text/',
        {
            headers: {
                'Authorization': `Token ${process.env.REACT_APP_ESV_API_KEY}`,
            },
            params: {
                'q': `${book} ${chapter}:${verse}`,
                'indent-poetry': 'false',
                'include-footnotes': 'false',
                'include-headings': 'false',
                'include-passage-references': 'false',
                'include-short-copyright': 'false',
                'include-passage-horizontal-lines': 'false',
                'include-heading-horizontal-lines': 'false',
                'include-verse-numbers': 'false',
                'include-first-verse-numbers': 'false',
                'include-verse-numbers-one-line': 'false',
                'include-subheadings': 'false',
            }   
        }
    );
    return data;
}
