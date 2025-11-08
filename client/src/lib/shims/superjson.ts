// Re-export superjson but keep this file present for alias resolution.
import superjson from 'superjson';
export default superjson;
export const { parse, stringify, serialize, deserialize } = superjson;
