
function normalizeUploadedUrls(images: string[] | null | undefined): string[] {
  if (!images?.length) return [];
  return images
    .map((img) => (img == null ? '' : String(img).trim()))
    .filter(Boolean);
}

export function normalizeClassImageSlots(raw: string[] | null | undefined): string[] {
  const base = Array.isArray(raw) && raw.length > 0 ? [...raw] : [];
  while (base.length < 3) base.push('');
  return base.slice(0, 3);
}

export type MyDancerImagesPayload = {
  dancerImages?: (string | null)[];
  profileImage?: string | null;
};

export function buildClassImagesWithDancerFallback(
  classImages: string[] | null | undefined,
  dancer: MyDancerImagesPayload | null | undefined
): string[] {
  const uploaded = normalizeUploadedUrls(classImages ?? []);
  if (uploaded.length > 0) return uploaded;

  const fromGallery = normalizeUploadedUrls(dancer?.dancerImages as string[] | undefined);
  if (fromGallery.length > 0) return fromGallery.slice(0, 3);

  const profile = dancer?.profileImage?.trim();
  if (profile) return [profile];

  return [];
}

export function resolveClassThumbnail(
  thumbnailImage: string | null | undefined,
  dancer: MyDancerImagesPayload | null | undefined
): string {
  const thumb = thumbnailImage?.trim();
  if (thumb) return thumb;

  const fromGallery = normalizeUploadedUrls(dancer?.dancerImages as string[] | undefined)[0];
  if (fromGallery) return fromGallery;

  const profile = dancer?.profileImage?.trim();
  return profile ?? '';
}
