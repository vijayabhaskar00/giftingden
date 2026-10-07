/**
 * Photography manifest. Photos are hosted remotely until you self-host them:
 * run `node scripts/fetch-photos.mjs` (needs network access to the CDN), then set
 * NEXT_PUBLIC_LOCAL_PHOTOS=1 to serve compressed WebP files from /public/photos instead.
 */
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3DJ7Ks0uyRjwFxpioPT3wFQoE4G/";

export const PHOTO_FILES = {
  hero: "hf_20261001_083243_e455d12b-f406-44c8-bc5d-d1997195712f",
  birthday: "hf_20261001_083243_cb0673bd-dab9-43ac-856f-7709328799e1",
  "birthday-flat": "hf_20261001_083243_f41bf3de-ac35-45ce-88bf-2dfff48b7593",
  selfcare: "hf_20261001_083243_500f7bed-148c-4642-92bb-eb80517d076f",
  "selfcare-close": "hf_20261001_083243_18f6d8c5-9af0-4501-8ba1-e91b5023630c",
  couple: "hf_20261001_083243_bbe677c3-93b2-445d-8d97-92502a26e509",
  "couple-close": "hf_20261001_083243_75b03fbc-56f3-498d-b027-ab2e045ea931",
  corporate: "hf_20261001_083243_7f256b48-e5fc-4a61-bbb9-2409de0bcd35",
  "corporate-flat": "hf_20261001_083243_1b65953e-abd5-40e7-afe9-2357db4662cb",
  luxury: "hf_20261001_083243_aceedae4-bd86-4c4b-ab56-f8478da57c59",
  gourmet: "hf_20261001_083243_8ac8a6a9-73e4-43b8-8334-39ecd6a11062",
  festive: "hf_20261001_083244_320f1de4-5af9-460c-ab67-ecceb42772c2",
  "festive-close": "hf_20261001_083248_303cec87-e75e-4e03-bfbb-fe02ce231209",
  bridesmaid: "hf_20261001_083248_a91a6419-7bd8-4194-bb42-1a6a545f6de3",
  "bridesmaid-close": "hf_20261001_083248_242e031e-a8a7-4ce4-8fe2-043c7b1d0fdc",
  wedding: "hf_20261001_083248_cf5d0d4b-78dd-45b3-9ccd-1c9690721b68",
  "wedding-close": "hf_20261001_083248_17fd6358-e478-41dd-9968-9f9ed5f02d1a",
  employee: "hf_20261001_083248_70941e75-3089-4b2a-b84d-dd26e6b85e70",
  "employee-close": "hf_20261001_083248_640e52ba-5ffb-4188-b20d-4db798140ad5",
  thanks: "hf_20261001_083248_d5d6b951-14bc-4050-a714-51953ae38dc9",
  "thanks-close": "hf_20261001_083248_83b9f980-05c8-49d8-bbfd-92185d5051f6",
  custom: "hf_20261001_083248_b690bb78-82d7-4c9c-a032-805183521382",
  ribbon: "hf_20261001_083248_a753fb92-40b8-48d9-9417-43f014fccd08",
  "corporate-stack": "hf_20261001_083248_fd669bdb-f15a-4ecf-87a6-799ad62d2b90",
} as const;

/** Photos shipped in /public/photos (supplied by the shop), always served locally. */
export const LOCAL_PHOTOS = ["diwali-kraft", "diwali-jute", "diwali-white"] as const;

export type PhotoKey = keyof typeof PHOTO_FILES | (typeof LOCAL_PHOTOS)[number];

export function photoUrl(key: PhotoKey): string {
  const local = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/photos/${key}.webp`;
  if ((LOCAL_PHOTOS as readonly string[]).includes(key) || process.env.NEXT_PUBLIC_LOCAL_PHOTOS === "1") return local;
  return `${CDN}${PHOTO_FILES[key as keyof typeof PHOTO_FILES]}.png`;
}
