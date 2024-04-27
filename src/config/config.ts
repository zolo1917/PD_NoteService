export function secretKey(): string {
  return process.env.SECRET_KEY || "";
}
