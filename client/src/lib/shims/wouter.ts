import React from 'react';

export const Link = (props: any) => React.createElement('a', { href: props.href }, props?.children);

export const Route = (props: any) => {
  if (props.component) {
    return React.createElement(props.component);
  }
  return props?.children ?? null;
};

export const Router = (props: any) => (props?.children ?? null);

export const Switch = (props: any) => {
  // Renderizar apenas o primeiro Route filho
  const children = React.Children.toArray(props.children);
  return children[0] || null;
};

export const useLocation = () => ['/', () => {}] as const;

export default {};
