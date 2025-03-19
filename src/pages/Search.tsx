
import { useState } from "react";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <div className="py-8 space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-center">Search</h1>
        
        <div className="relative w-full max-w-md mx-auto mt-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass w-full py-2 pl-10 pr-4 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto mt-8 space-y-4">
          <p className="text-muted-foreground text-center text-sm">
            {searchQuery ? `Searching for "${searchQuery}"` : "Enter a search term above"}
          </p>
          
          {searchQuery && (
            <div className="space-y-4 animate-slide-up">
              {Array.from({ length: 3 }).map((_, i) => (
                <GlassCard key={i} className="p-4" interactive>
                  <h2 className="text-lg font-medium">Search Result {i + 1}</h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    Sample result for "{searchQuery}"
                  </p>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
