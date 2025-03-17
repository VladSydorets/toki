import { useState } from "react";

interface PaginationOptions {
  initialCount?: number;
  incrementBy?: number;
}

interface PaginationResults<T> {
  visibleIssues: T[];
  hasMore: boolean;
  showMore: () => void;
  showLess: () => void;
}

export function usePagination<T>(
  items: T[],
  options: PaginationOptions = {}
): PaginationResults<T> {
  const { initialCount = 5, incrementBy = 5 } = options;
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleIssues = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const showMore = () => {
    setVisibleCount((prev) => prev + incrementBy);
  };

  const showLess = () => {
    setVisibleCount(initialCount);
  };

  return { visibleIssues, hasMore, showMore, showLess };
}
