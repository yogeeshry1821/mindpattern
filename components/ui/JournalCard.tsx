// components/JournalCard.tsx
import { Journal } from "@prisma/client";

export default function JournalCard({ journal }: { journal: any }) {
  // Parse the JSON string from Postgres back into an object
  const analysis = journal.analysis ||  null;

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-mono text-gray-400">
          {new Date(journal.createdAt).toLocaleDateString()}
        </h3>

        {/* State 1: Still Processing */}
        {!analysis && (
          <span className="flex items-center text-xs text-blue-500 animate-pulse">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Analyzing...
          </span>
        )}
      </div>

      <p className="text-gray-800 line-clamp-3 mb-4">{journal.content}</p>

      {/* State 2: Analysis is Ready */}
      {analysis && (
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex flex-wrap gap-2">
            {analysis.topics?.map((topic: string) => (
              <span
                key={topic}
                className="px-2 py-1 bg-purple-50 text-purple-600 text-[10px] rounded-full uppercase font-bold">
                #{topic}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                style={{ width: `${analysis.sentiment * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-gray-500">
              {analysis.cognitive_load} Load
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
