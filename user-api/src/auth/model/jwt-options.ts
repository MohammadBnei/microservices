export const jwtOptions: JwtOptions = {
  secret: process.env.JWT_SECRET,
  expiresIn: '1h',
};

export interface JwtOptions {
  secret: string;
  expiresIn: string;
}
