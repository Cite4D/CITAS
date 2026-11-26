import React, { useState, useMemo } from 'react';
import { useConference } from '../context/ConferenceContext';
import { Search, Filter, CheckCircle2 } from 'lucide-react';

export const ScopeSection: React.FC = () => {
  const { config } = useConference();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTopicsWithCategory = useMemo(() => {
    return config.scopeCategories.flatMap((cat) =>
      cat.topics.map((t) => ({
        topic: t,
        categoryName: cat.name,
        categoryId: cat.id
      }))
    );
  }, [config.scopeCategories]);

  const filteredTopics = useMemo(() => {
    return allTopicsWithCategory.filter((item) => {
      const matchesCategory = selectedCategoryId === 'all' || item.categoryId === selectedCategoryId;
      const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allTopicsWithCategory, selectedCategoryId, searchQuery]);

  return (
    <section id="scope" className="py-16 sm:py-24 bg-[#f8faf8] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dlsu-900 tracking-tight mb-4 text-balance">
            Conference Scope & Topics
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-pretty max-w-[68ch] mx-auto">
            CITAS 2027 welcomes high-quality original research spanning fundamental theories, algorithm design, empirical studies, and real-world societal deployments across multiple disciplines.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategoryId('all')}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategoryId === 'all'
                    ? 'bg-dlsu-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Topics ({allTopicsWithCategory.length})
              </button>

              {config.scopeCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategoryId === cat.id
                      ? 'bg-dlsu-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name.split('&')[0]} ({cat.topics.length})
                </button>
              ))}
            </div>

            {/* Accessible Search Input with High Contrast */}
            <div className="relative min-w-[280px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. Fuzzy, Robotics)..."
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-dlsu-800 focus:border-transparent bg-white text-slate-900 placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Active Status Counter */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
            <span>
              Showing <strong className="text-dlsu-900 font-bold">{filteredTopics.length}</strong> of{' '}
              {allTopicsWithCategory.length} research topics
            </span>
            {searchQuery && (
              <span className="italic text-slate-700 font-medium">Filtering by &quot;{searchQuery}&quot;</span>
            )}
          </div>
        </div>

        {/* Topic Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-dlsu-500 hover:shadow-sm transition-all duration-200 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-md bg-dlsu-100 text-dlsu-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                    {item.topic}
                  </h3>
                  <span className="inline-block mt-1 text-xs font-medium text-slate-700 bg-slate-150 px-2 py-0.5 rounded border border-slate-200">
                    {item.categoryName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Filter className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base mb-1">No matching research topics found</h3>
            <p className="text-sm text-slate-600 mb-4">Try clearing your search query or selecting another track category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId('all');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-md bg-dlsu-800 text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Category Thematic Clusters Summary */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.scopeCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs"
            >
              <h3 className="font-serif font-bold text-dlsu-900 text-base mb-2">
                {cat.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                {cat.description}
              </p>
              <div className="text-xs font-bold text-dlsu-800">
                {cat.topics.length} specified topics
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
