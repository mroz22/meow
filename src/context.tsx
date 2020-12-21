import React from 'react';

import { initialState, Manipulator } from './provider';

export const Context = React.createContext({
  data: initialState,
  update: (_fn: Manipulator<typeof initialState>) => { },
});
