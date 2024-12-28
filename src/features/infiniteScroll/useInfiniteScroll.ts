import { useEffect } from "react";

export const useInfiniteScroll = (
  loading: boolean,
  hasMore: boolean,
  loadMore: () => void
) => {
  const handleScroll = () => {
    if (loading || !hasMore) return;

    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (bottom) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);
};
