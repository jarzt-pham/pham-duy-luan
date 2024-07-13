export class Configuration {
  // Database
  public static readonly DATABASE_NAME =
    process.env.DATABASE_NAME || "99tech";
  public static readonly DATABASE_USER =
    process.env.DATABASE_USER || "postgres";
  public static readonly DATABASE_PASS =
    process.env.DATABASE_PASSWORD || "password";
  public static readonly DATABASE_HOST =
    process.env.DATABASE_HOST || "localhost";
  public static readonly DATABASE_PORT =
    parseInt(process.env.DATABASE_PORT ?? "5432") || 5432;

  // App
  public static readonly APPLICATION_PORT =
    parseInt(process.env.APPLICATION_PORT ?? "3000") || 3000;
}
