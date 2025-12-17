import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_PB_URL || 'http://localhost:8090';

export const pb = new PocketBase(pbUrl);

// Enable auto refresh of auth token
pb.autoCancellation(false);

export default pb;
