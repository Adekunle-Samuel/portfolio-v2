'use client'

interface ProjectFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Brand Design', value: 'brand' },
  { label: 'Product Design', value: 'product' },
  { label: 'AI Development', value: 'development' },
  { label: 'Design', value: 'design' },
]

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="w-full px-8 lg:px-16 pt-12 pb-0">
      <div className="flex flex-wrap gap-3 justify-left">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2.5 text-xs border border-gray-text rounded transition-colors duration-300 relative overflow-hidden group ${
              activeFilter === filter.value
                ? 'bg-black text-white border-black'
                : 'bg-white text-black hover:text-white hover:border-black'
            }`}
          >
            {/* Swipe background effect for inactive buttons */}
            {activeFilter !== filter.value && (
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-300 ease-out" />
            )}
            
            {/* Content with relative positioning to stay above background */}
            <span className="relative z-10">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

