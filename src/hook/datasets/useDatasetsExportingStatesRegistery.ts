import { useCallback, useState } from "react";

type ExportingStates<K, V> = Map<K, V> | [K, V][];

type RegisteryActions<K, V> = {
  set: (key: K, value: V) => void;
  update: () => void;
  remove: (key: K) => void;
  reset: Map<K, V>["clear"];
};

type UseDatasetsExportingStatesRegisteryReturn<K, V> = [
  Omit<Map<K, V>, "set" | "clear" | "delete">,
  RegisteryActions<K, V>
];

export default function useDatasetsExportingStatesRegistery<K, V>(
  initialState: ExportingStates<K, V> = new Map()
): UseDatasetsExportingStatesRegisteryReturn<K, V> {
  const [map, setMap] = useState(new Map(initialState));

  const actions: RegisteryActions<K, V> = {
    set: useCallback((key, value) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.set(key, value);
        return copy;
      });
    }, []),

    update: useCallback(() => {
      setMap((preMap) => new Map(preMap));
    }, []),

    remove: useCallback((key) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
    }, []),

    reset: useCallback(() => {
      setMap(() => new Map());
    }, []),
  };

  return [map, actions];
}
