export function buildClassImagesWithDancerFallback(
  classImages: string[],
  dancerImages: string[] | undefined
): string[] {
  const uploaded = classImages.filter((img) => img);
  if (uploaded.length > 0) return uploaded;
  const fromDancer = (dancerImages ?? []).filter(Boolean);
  return fromDancer.slice(0, 3);
}
