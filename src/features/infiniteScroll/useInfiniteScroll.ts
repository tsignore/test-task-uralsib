// features/infiniteScroll/useInfiniteScroll.ts

import { useEffect } from "react";

export const useInfiniteScroll = (
  loading: boolean, // Указывает, идет ли сейчас загрузка
  hasMore: boolean, // Есть ли еще посты для загрузки
  loadMore: () => void // Функция для подгрузки данных
) => {
  const handleScroll = () => {
    if (loading || !hasMore) return; // Если идет загрузка или больше нет данных, не обрабатываем скролл

    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (bottom) {
      loadMore(); // Если мы на дне страницы, загружаем больше данных
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]); // Обновление события, если загрузка или состояние данных изменяются
};
