/**
 * 项目状态
 */
export const PROJECT_STATUS = {
  /**
   * 审核中
   */
  EXAIME:'examining',
  /**
   * 内部面试
   */
  INVEST_VIEW: 'investViewing',
  /**
   * 内部通过
   */
  INVEST_PASS: 'investPass',
  /**
   * 理事会公示
   */
  PUBLICITY: 'publicity',
  /**
   * 理事会成员沟通
   */
  COUNCILINK: 'councilLink',
  /**
   * 成功发起
   */
  SUCC_LAUNCH:'launch',
   /**
   * 不通过/发起失败
   */
  NOT_PASS:'fail'
}


/**
 * 申请项目的入库数据
 */
export const PROJECT_BASE_DATA = {
    companyName: "",
    companyBrief: "", // 公司简称
    setupDate: '', // 成立时间
    projectBrief: "",
    industry:"", // 所属行业
    businessModel:"",
    productIntro:"",

    coreCompete:"",
    marketPain:"",
    marketSize:"",
    sizeMeasurement:"",
    businessPlan:"",
    productPlan:"",
    financePlan:"",
    teamDevPlan:"",
    isExternalInvest: null, // 是否曾获得外部投资
    egInvestBrief: '', // 融资情况
    valuation:"",
    isFounderCtrl: null,
    isTechCoreTeam: null,
    founderStockRat:"",
    isTeamInvested: null,
    equityStruct:"",
    other:"",
    isCouncilMember: null,
    councilSupport:"",
    name:"",
    mobile:"",
    email:"",
    referrer:"",
    referrerMobile:"",
    uploadBPPath:"",
    projectStatus: 'examining',// 项目状态
    /**
     *  最新业务：
     */
    latestBusines: "",
    /**
     * 财务报表：
     */
    finacialReport: "",
    /**
     *  商业计划书：
     */
    bizPlan: "",
    /**
     *  理事会支持：
     */
    councilSuport2: "",
 
    
   
   
}