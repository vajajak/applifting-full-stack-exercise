export const getAssetPath = (path?: string) => (path ? [process.env.NEXT_PUBLIC_ASSET_URL, path].join('/') : null);
