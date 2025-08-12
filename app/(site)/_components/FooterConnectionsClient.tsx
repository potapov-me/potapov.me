"use client";

import { useEffect, useState } from "react";

type Connections = {
  accepted: number;
  dropped: number;
  active: number;
  idle: number;
};

export default function FooterConnectionsClient() {
  const [data, setData] = useState<Connections | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch("/console/api/connections/", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Partial<Connections>;
        if (
          typeof json.accepted === "number" &&
          typeof json.dropped === "number" &&
          typeof json.active === "number" &&
          typeof json.idle === "number"
        ) {
          if (isMounted) setData(json as Connections);
        } else {
          throw new Error("invalid_response_shape");
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "fetch_error";
        if (isMounted) setError(message);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  if (error) {
    return <div className="text-xs text-gray-400 mt-4">Нет данных</div>;
  }

  if (!data) {
    return <div className="text-xs text-gray-400 mt-4">Загрузка…</div>;
  }

  return (
    <div className="mt-6">
      <div className="text-xs text-gray-400">Подключения</div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <InfoPill label="Принято" value={data.accepted} />
        <InfoPill label="Активных" value={data.active} />
        <InfoPill label="Ожидают" value={data.idle} />
        <InfoPill label="Сброшено" value={data.dropped} />
      </div>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/15 px-2.5 py-1 text-xs text-gray-200">
      <span className="text-white/70">{label}:</span>
      <span className="ml-1 font-semibold text-white">{value}</span>
    </div>
  );
}
