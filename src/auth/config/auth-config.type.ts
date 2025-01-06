export type AuthConfig = {
  // JWT的密钥，用于签名和验证令牌
  secret?: string;
  // JWT的过期时间
  expires?: string;
  // 刷新令牌的密钥
  refreshSecret?: string;
  // 刷新令牌的过期时间
  refreshExpires?: string;
  // 忘记密码功能的密钥
  forgotSecret?: string;
  // 忘记密码令牌的过期时间
  forgotExpires?: string;
};
