import { useState } from 'react';

import { INITIAL_DATA, Data, LOCAL_STORAGE_KEY } from '../constants/initialData';

export default function useGetInitialData() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedData = JSON.parse(savedData as string) as Data;
  const [state, setState] = useState<Data>(parsedData?.columnOrder?.length ? parsedData : INITIAL_DATA);

  const handleSetState = (data: Data) => {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedData);

    setState(data);
  };

  return [state, handleSetState] as const;
}
