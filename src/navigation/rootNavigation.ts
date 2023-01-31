import * as React from 'react';

export const navigationRef: React.Ref<any> = React.createRef();

export const navigate = (name: string, params: object) => {
  navigationRef.current?.navigate(name, params);
};

export const pop = (n: number) => {
  navigationRef.current?.pop(n);
};
