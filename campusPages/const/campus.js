/**
 * 申请校园合伙人的入库数据
 */
export const PARTNER_BASE_DATA = {
  
  reallyName:'',
  gender:'',
  birthday:'',
  mobile:'',
  wechatNum:'',
  wechatName:'',
  email:'',
  /**
   * 最高学历
   */
  highestEdu: '',
  /**
   * 学校名称
   */
  schoolName:'',
  /**
   * 专业
   */
  major: '',
  /**
   * 毕业时间
   */
  gradYear: '',
  /**
   * 简单介绍您自己
   */
  introMyself: '',
  /**
   * 加入原因
   */
  joinReason: '',
  /**
   * 是否有推荐人
   */
  hasReferrer:'',
  referrerName:'',
  referrerContact:'',
  /**
   * 通过什么方式了解
   */
  howToKnow:'',
  /**
   * 想对我们说什么
   */
  whisper:'',
  /**
   * 加入原因
   */ 
  joinReason:'',
  /**
   * 简历路径
   */
  resumePath: '',
  profilePhoto: '', //形象照片
  
  /**
   * 校园合伙人级别，默认大使
   * 校园大使【ambassador】，校园合伙人【partner】
   */
  partnerLevel:'ambassador',
  /**
   * 审核状态
   * 待审核【pending】
   * 通过[pass]
   * 不通过[nopass]
   */
  status:'pending',
  /**
   * 审核人列表
   * 审核人Id
   * 审核姓名
   */
  reviewers:[],
  /**
   * 同意人数
   * 3个管理人员，最少2个同意
   */
  approvals: 0,


}