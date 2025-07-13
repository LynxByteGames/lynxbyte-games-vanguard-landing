// Funkcja do pobierania artykułów z Medium
export interface MediumArticle {
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

export const fetchMediumArticle = async (url: string): Promise<MediumArticle> => {
  try {
    // Pobierz artykuł z Medium
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Invalid RSS feed');
    }

    const item = data.items[0];
    
    // Wyciągnij slug z URL
    const slug = url.split('/').pop()?.split('?')[0] || 'medium-article';
    
    // Wyciągnij obrazek z contentu
    const imageMatch = item.content.match(/<img[^>]+src="([^"]+)"/);
    const image = imageMatch ? imageMatch[1] : '/lovable-uploads/placeholder-blog.jpg';
    
    // Wyczyść content z niepotrzebnych elementów Medium
    let cleanContent = item.content
      .replace(/<div class="medium-feed-controls">.*?<\/div>/gs, '') // Usuń kontrolki Medium
      .replace(/<div class="medium-feed-snippet">.*?<\/div>/gs, '') // Usuń snippet
      .replace(/<div class="medium-feed-link">.*?<\/div>/gs, '') // Usuń linki Medium
      .replace(/<a[^>]*class="[^"]*medium-feed-[^"]*"[^>]*>.*?<\/a>/gs, '') // Usuń linki Medium
      .replace(/<div[^>]*class="[^"]*medium-feed-[^"]*"[^>]*>.*?<\/div>/gs, '') // Usuń divy Medium
      .replace(/<script[^>]*>.*?<\/script>/gs, '') // Usuń skrypty
      .replace(/<style[^>]*>.*?<\/style>/gs, '') // Usuń style
      .replace(/<!--.*?-->/gs, '') // Usuń komentarze
      .trim();

    // Szacuj czas czytania (średnio 200 słów na minutę)
    const wordCount = cleanContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      title: item.title,
      content: cleanContent,
      author: item.author,
      date: new Date(item.pubDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: `${readTime} min read`,
      image,
      slug
    };
  } catch (error) {
    console.error('Error fetching Medium article:', error);
    throw new Error('Failed to fetch article from Medium');
  }
};

// Funkcja do generowania pliku bloga
export const generateBlogFile = (article: MediumArticle): string => {
  return `export default {
  slug: '${article.slug}',
  title: '${article.title.replace(/'/g, "\\'")}',
  content: \`
${article.content}
  \`,
  author: '${article.author.replace(/'/g, "\\'")}',
  date: '${article.date}',
  readTime: '${article.readTime}',
  image: '${article.image}',
  category: 'Industry Insights'
};`;
}; 