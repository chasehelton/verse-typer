import axios from 'axios';

type Verse = {
  canonical: string;
  parsed: any;
  passage_meta: any;
  passages: string[] | undefined;
  query: string;
};

export async function getVersesByReference(
  ref: string
): Promise<{ ref: string; charArray: string[] | undefined }> {
  const { data } = await axios.get<Verse | undefined>(
    'https://api.esv.org/v3/passage/text/',
    {
      headers: {
        Authorization: `Token ${process.env.REACT_APP_ESV_API_KEY}`,
      },
      params: {
        q: ref,
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
      },
    }
  );
  let charArray: string[] | undefined;
  if (data?.passages) {
    charArray =
      data.passages[0]
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .replace(/\s\s+/g, ' ')
        .replace(/“/g, '"')
        .replace(/”/g, '"')
        .replace(/‘/g, "'")
        .replace(/’/g, "'")
        .trim()
        .split('') ?? undefined;
  }
  return data ? { ref, charArray } : { ref, charArray: undefined };
}
