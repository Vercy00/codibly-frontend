"use client";

import { useEffect, useState } from "react";

interface Data<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(
  promise: () => Promise<T> | null
): [T, boolean, string | null] {
  const [data, setData] = useState<Data<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetch = async () => {
      setData((s) => ({ ...s, data: res, loading: true }));

      try {
        var res = await promise();

        if (!res) return;

        setData((s) => ({ ...s, data: res, loading: false }));
      } catch (e: any) {
        setData((s) => ({ ...s, error: e.message, loading: false }));
      }
    };

    fetch();
  }, [promise]);

  return [data.data!, data.loading, data.error];
}

export { useFetch };
