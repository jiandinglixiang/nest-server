export type ImServerConfig = {
  openImIp: string; // 开放即时通讯服务器IP
  openImServerApiUrl: string; // 开放即时通讯服务器API地址
  openImServerAdminUserId: string; // 开放即时通讯服务器管理员用户ID
  openImServerSecret: string; // 开放即时通讯服务器密钥
  openImServerApiPort: number; // 开放即时通讯服务器API端口
  openImMsgGatewayPort: number; // 开放即时通讯服务器消息网关端口
};
