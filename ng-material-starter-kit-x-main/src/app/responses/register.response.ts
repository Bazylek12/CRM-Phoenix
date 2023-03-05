export interface RegisterResponse {
    readonly user: {
      emailVerified: boolean;
      stsTokenManager: {
        refreshToken: string;
        accessToken: string;
      };
    };
}
