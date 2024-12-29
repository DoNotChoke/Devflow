export interface OAuthParams {
  provider: "google" | "github";
  providerAccountId: string;
  user: {
    email: string;
    name: string;
    username: string;
    image: string;
  };
}
