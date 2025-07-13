import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Download, Copy, Check } from 'lucide-react';
import { fetchMediumArticle, generateBlogFile } from '@/utils/medium-fetcher';
import { toast } from 'sonner';

const MediumImporter: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) {
      toast.error('Please enter a Medium URL');
      return;
    }

    setIsLoading(true);
    setArticle(null);
    setGeneratedCode('');

    try {
      const fetchedArticle = await fetchMediumArticle(url);
      setArticle(fetchedArticle);
      
      const code = generateBlogFile(fetchedArticle);
      setGeneratedCode(code);
      
      toast.success('Article imported successfully!');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import article. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const handleDownloadFile = () => {
    if (!article) return;

    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.slug}.ts`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File downloaded!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Import Medium Article
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Medium Article URL</label>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://medium.com/@username/article-slug"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleImport} 
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  'Import'
                )}
              </Button>
            </div>
          </div>

          {url && (
            <Alert>
              <AlertDescription>
                <strong>Example:</strong> {url}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {article && (
        <Card>
          <CardHeader>
            <CardTitle>Imported Article</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <p className="text-sm text-muted-foreground">{article.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Author</label>
                <p className="text-sm text-muted-foreground">{article.author}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Date</label>
                <p className="text-sm text-muted-foreground">{article.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Read Time</label>
                <p className="text-sm text-muted-foreground">{article.readTime}</p>
              </div>
            </div>

            {article.image && (
              <div>
                <label className="text-sm font-medium">Featured Image</label>
                <img 
                  src={article.image} 
                  alt="Article preview" 
                  className="w-full max-w-md h-48 object-cover rounded-lg mt-2"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Content Preview</label>
              <div 
                className="mt-2 p-4 bg-muted rounded-lg max-h-40 overflow-y-auto text-sm"
                dangerouslySetInnerHTML={{ __html: article.content.substring(0, 500) + '...' }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated Blog File
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyCode}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownloadFile}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedCode}
              readOnly
              className="font-mono text-sm h-96"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>Next steps:</strong></p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Save this code as a new file in <code>src/blogposts/</code></li>
                <li>Add the import to <code>src/pages/BlogPost.tsx</code></li>
                <li>Download and add any images to <code>public/lovable-uploads/</code></li>
                <li>Update the image paths in the generated code</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediumImporter; 