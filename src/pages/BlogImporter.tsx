import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MediumImporter from '@/components/MediumImporter';

const BlogImporter: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Blog Importer</h1>
              <p className="text-muted-foreground">
                Import articles from Medium and convert them to blog posts
              </p>
            </div>
            
            <MediumImporter />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogImporter; 