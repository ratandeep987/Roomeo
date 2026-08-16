import roomImage1 from "../assets/roomImage1.avif";
import roomImg2 from "../assets/roomImg2.png";
import roomImage3 from "../assets/roomImage3.png";
import roomImg4 from "../assets/roomImg4.png";
import roomImage5 from "../assets/roomImage5.avif";

// A small pool of stock interior photos. Your Hotel/Room models have no
// image field, so there's no "real" photo per listing — this deterministic
// hash means the same hotel/room _id always renders the same photo
// (instead of a random one on every reload), without ever claiming to be
// an actual photo of that property.
const IMAGE_POOL = [roomImage1, roomImg2, roomImage3, roomImg4, roomImage5];

export const getImageForId = (id, salt = 0) => {
  const str = String(id || "fallback");
  let hash = salt;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return IMAGE_POOL[hash % IMAGE_POOL.length];
};
