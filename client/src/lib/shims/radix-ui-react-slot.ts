import * as React from 'react';

const Component = (props: any) => props?.children ?? null;
export const Root = Component;
export const Slot = Component;
export const Slottable = Component;
