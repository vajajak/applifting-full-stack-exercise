export const getAssetPath = (path?: string) =>
    process.env.NEXT_PUBLIC_CLOUDINARY_ASSET_URL && path?.includes(process.env.NEXT_PUBLIC_CLOUDINARY_ASSET_URL)
        ? path
        : path
        ? [process.env.NEXT_PUBLIC_ASSET_URL, path].join('/')
        : null;
