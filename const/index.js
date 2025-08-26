
/**
 * 当前小程序的环境
 */
export const CURRENT_ENV = {
  DEV_ENV: "development",
  PRO_ENV: "production"
}
/**
 * 切换环境变量
 */
export const USER_ENV = CURRENT_ENV.PRO_ENV; 

/**
 * 用户身份角色
 * 普通用户=normal，校园大使=ambassador，校园合伙人=partner，校园合伙人管理者=campusManage，
 * 理事会成员=director，投资部=invest，超级管理员=admin
 */
export const USER_IDENTITY = {
  NORMAL: 'normal',
  ADMIN: 'admin',
  INVESTOR: 'investor',
  DIRECTOR: 'director',
  CAMPUS_AMB: 'ambassador',
  CAMPUS_PARTNER: 'partner',
  CAMPUS_MANAGE: 'campusManage'
}