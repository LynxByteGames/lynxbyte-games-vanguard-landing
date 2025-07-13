import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

// Ładowanie wszystkich plików Markdown z folderu blogposts
const blogFiles = import.meta.glob('/src/blogposts/*.md', {
  eager: true,
  query: '?raw'
});

console.log('BlogLoader: Znalezione pliki:', Object.keys(blogFiles));

export const loadBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];

  for (const [filePath, fileContent] of Object.entries(blogFiles)) {
    try {
      if (typeof fileContent !== 'string') {
        console.error('BlogLoader: Nieprawidłowy typ zawartości dla', filePath);
        continue;
      }

      // Parsowanie frontmatter i zawartości Markdown
      const { data, content } = matter(fileContent);
      
      // Wyciągnięcie ID z nazwy pliku
      const fileName = filePath.split('/').pop()?.replace('.md', '') || 'unknown';
      
      // Konwersja daty
      let formattedDate = 'Unknown Date';
      try {
        const date = new Date(data.date);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      } catch (error) {
        console.error('BlogLoader: Błąd parsowania daty dla', filePath, error);
      }

      const post: BlogPost = {
        id: data.id || fileName,
        title: data.title || 'Bez tytułu',
        excerpt: data.excerpt || 'Brak opisu',
        content: content,
        author: data.author || 'Nieznany autor',
        date: formattedDate,
        image: data.image || '/placeholder.svg',
        category: data.category || 'Ogólne',
        readTime: data.readTime || '5 min czytania'
      };

      posts.push(post);
      console.log('BlogLoader: Załadowano post:', post.title);
      
    } catch (error) {
      console.error('BlogLoader: Błąd parsowania pliku', filePath, error);
    }
  }

  console.log('BlogLoader: Łącznie załadowano', posts.length, 'postów');

  // Sortowanie po dacie (najnowsze pierwsze)
  return posts.sort((a, b) => {
    try {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    } catch {
      return 0;
    }
  });
};

// Funkcja do pobierania najnowszych blog postów
export const getLatestBlogPosts = (count: number = 2): BlogPost[] => {
  const posts = loadBlogPosts();
  return posts.slice(0, count);
};

// Funkcja do pobierania blog posta po ID
export const getBlogPostById = (id: string): BlogPost | undefined => {
  const posts = loadBlogPosts();
  return posts.find(post => post.id === id);
}; 