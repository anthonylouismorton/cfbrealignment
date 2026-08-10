// Alaska has no schools in the dataset, so it's dropped from the map entirely
// (see States.js) to reclaim the empty lower-left space AlbersUSA reserves for it.
// Hawaii is nudged up and to the left into that reclaimed space. Both the Hawaii
// state shape (States.js) and any school markers located in Hawaii
// (SchoolLocation.js) apply this same offset, in the same screen-pixel
// coordinate space, so the logo/marker stays aligned with the shifted shape.
// Expressed as a fraction of the map's own size so it scales with it rather
// than drifting at different map dimensions.
export const ALASKA_STATE_ID = '02';
export const HAWAII_STATE_ID = '15';

export function getHawaiiOffset(mapSize) {
  return {
    dx: -(mapSize?.width ?? 835) * 0.035,
    dy: -(mapSize?.height ?? 500) * 0.05,
  };
}
