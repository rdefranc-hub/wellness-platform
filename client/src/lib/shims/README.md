# Shims Fix Implementation

This directory contains minimal shim files for packages that are referenced in the codebase but should not be bundled with the application.

## Files:
- `react-query.ts` - Minimal shim for @tanstack/react-query
- `trpc.ts` - Lightweight TRPC shim
- `wouter.ts` - Minimal router shim  
- `superjson.ts` - Re-export superjson

These shims prevent ENOTDIR errors during Vite build when resolving aliases.
