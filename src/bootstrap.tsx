const isHigherEnv = process.env.ENV === "stg" || process.env.ENV === "prd";

if (isHigherEnv) {
  window.location.assign("/");
} else {
  import("./index");
}

export {};
