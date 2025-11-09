import React, { useState, useEffect } from 'react';

// Use hash-based routing for compatibility with static hosting
const getHashPath = () => {
  const hash = window.location.hash;
  return hash ? hash.slice(1) : '/'; // Remove # and default to /
};

export const Link = (props: any) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = `#${props.href}`;
  };
  
  return React.createElement('a', { 
    href: `#${props.href}`,
    onClick: handleClick,
    className: props.className,
    ...props
  }, props?.children);
};

export const Route = (props: any) => {
  const [currentPath] = useLocation();
  const matches = matchPath(props.path, currentPath);
  
  if (!matches) return null;
  
  if (props.component) {
    return React.createElement(props.component);
  }
  return props?.children ?? null;
};

export const Router = (props: any) => (props?.children ?? null);

export const Switch = (props: any) => {
  const [currentPath] = useLocation();
  const children = React.Children.toArray(props.children);
  
  // Find the first matching route
  for (const child of children) {
    const childElement = child as React.ReactElement;
    const path = childElement.props?.path;
    
    // If no path specified, it's a fallback route
    if (!path) {
      return child;
    }
    
    // Check if path matches current location
    if (matchPath(path, currentPath)) {
      return child;
    }
  }
  
  // Return last child as fallback (NotFound)
  return children[children.length - 1] || null;
};

export const useLocation = (): [string, (path: string) => void] => {
  const [location, setLocation] = useState(() => getHashPath());
  
  useEffect(() => {
    // Forçar atualização na montagem
    setLocation(getHashPath());
    
    const handleHashChange = () => {
      setLocation(getHashPath());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const navigate = (path: string) => {
    window.location.hash = `#${path}`;
  };
  
  return [location, navigate];
};

export const useParams = (): Record<string, string> => {
  const [location] = useLocation();
  const pathParts = location.split('/').filter(Boolean);
  
  const params: Record<string, string> = {};
  
  // Se a URL é /chat/:avatarId, extrair avatarId
  if (location.startsWith('/chat/')) {
    const avatarId = pathParts[1];
    if (avatarId) {
      params.avatarId = avatarId;
    }
  }
  
  return params;
};

// Helper function to match paths
function matchPath(pattern: string | undefined, path: string): boolean {
  if (!pattern) return false;
  
  // Exact match
  if (pattern === path) return true;
  
  // Root path only matches exactly
  if (pattern === '/' && path !== '/') return false;
  
  // Pattern matching with wildcards
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  
  if (patternParts.length !== pathParts.length) return false;
  
  return patternParts.every((part, i) => {
    if (part.startsWith(':')) return true; // Dynamic segment
    return part === pathParts[i];
  });
}

export default {};
