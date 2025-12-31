/**
 * 校验项目申请第一步信息的填写
 * @param {*} applyParams 
 */
export const checkStepOneInfoData = (applyParams) =>{
  console.log('applyparams==>', applyParams);
  if (!applyParams.companyName) {
    return {
      message: '请填写公司或项目全称',
      status: false
    }
  }
  if (!applyParams.companyBrief) {
    return {
      message: '请填写公司或项目简称',
      status: false
    }
  }
  if (!applyParams.setupDate) {
    return {
      message: '请填写公司或项目成立时间',
      status: false
    }
  }
  if (!applyParams.projectBrief) {
    return {
      message: '请填写项目简介',
      status: false
    }
  }
  if (!applyParams.industry) {
    return {
      message: '请选中项目所属行业',
      status: false
    }
  }
 
  if (!applyParams.businessModel) {
    return {
      message: '请填写商业模式',
      status: false
    }
  }
  if (!applyParams.marketPain) {
    return {
      message: '请填写市场痛点',
      status: false
    }
  }
  if (!applyParams.marketSize) {
    return {
      message: '请填写目标市场规模',
      status: false
    }
  }
  if (!applyParams.sizeMeasurement) {
    return {
      message: '请填写市场规模测定依据',
      status: false
    }
  }
  // if (!applyParams.productIntro) {
  //   return {
  //     message: '请填写现有产品介绍',
  //     status: false
  //   }
  // }



  if (!applyParams.coreCompete) {
    return {
      message: '请填写市场竞争情况比较及核心竞争力总结',
      status: false
    }
  }

  if (!applyParams.businessPlan) {
    return {
      message: '请填写公司业务发展计划',
      status: false
    }
  }
  if (!applyParams.productPlan) {
    return {
      message: '请填写公司产品计划',
      status: false
    }
  }

  if (!applyParams.financePlan) {
    return {
      message: '请填写财务及融资计划',
      status: false
    }
  }
  if (!applyParams.teamDevPlan) {
    return {
      message: '请填写团队发展计划',
      status: false
    }
  }
  if (applyParams.isExternalInvest === null) {
    return {
      message: '请选择是否曾获得外部投资',
      status: false
    }
  }
  if (applyParams.isExternalInvest !== 0  && !applyParams.egInvestBrief) {
    return {
      message: '请填写获得的投资情况',
      status: false
    }
  }

  if (!applyParams.valuation) {
    return {
      message: '请填写本轮公司/项目计划估值',
      status: false
    }
  }
  
  if (applyParams.isFounderCtrl === '' || applyParams.isFounderCtrl === null) {
    return {
      message: '请选择创始人/发起人是否为公司实际控制人',
      status: false
    }
  }
  if (applyParams.isTechCoreTeam === '' || applyParams.isTechCoreTeam === null) {
    return {
      message: '请选择核心技术人员是否为创始团队成员',
      status: false
    }
  }
  if (applyParams.isTeamInvested === '' || applyParams.isTeamInvested === null) {
    return {
      message: '请选择创始人及核心团队成员是否实际出资',
      status: false
    }
  }
  if (!applyParams.founderStockRat) {
    return {
      message: '请填写创始人实际控制股比是多少',
      status: false
    }
  }
  if (!applyParams.equityStruct) {
    return {
      message: '请填写公司股权结构情况',
      status: false
    }
  }

  return {
    message: '',
    status: true
  }
}

/**
 * 第二步信息填写
 * @param {*} applyParams 
 */
export const checkStepTwoInfoData = (applyParams) =>{
 
  if (!applyParams.councilSupport) {
    return {
      message: '请填写您希望理事会提供什么支持',
      status: false
    }
  }
  if (!applyParams.name) {
    return {
      message: '请填写您的姓名',
      status: false
    }
  }
  if (!applyParams.mobile) {
    return {
      message: '请填写您的手机号',
      status: false
    }
  }
  if (!applyParams.email) {
    return {
      message: '请填写您的常用邮箱',
      status: false
    }
  }
  if (!applyParams.referrer) {
    return {
      message: '请填写您的推荐人',
      status: false
    }
  }
  if (!applyParams.uploadBPPath) {
    return {
      message: '请上传您的项目BP',
      status: false
    }
  }
  
  

  return {
    message: '',
    status: true
  }
}


/**
 * 第二步信息填写
 * @param {*} applyParams 
 */
export const checkApplyPartnerData = (applyParams) =>{
 
  if (!applyParams.reallyName) {
    return {
      message: '请填写您的真实姓名',
      status: false
    }
  }
  if (!applyParams.gender) {
    return {
      message: '请选择您的性别',
      status: false
    }
  }
  if (!applyParams.birthday) {
    return {
      message: '请选择您的出生日期',
      status: false
    }
  }
  if (!applyParams.mobile) {
    return {
      message: '请填写您的手机号',
      status: false
    }
  }
  if (!applyParams.wechatNum) {
    return {
      message: '请填写您的微信号',
      status: false
    }
  }
  if (!applyParams.wechatName) {
    return {
      message: '请填写您的微信昵称',
      status: false
    }
  }
  if (!applyParams.email) {
    return {
      message: '请填写您的电子邮箱',
      status: false
    }
  }
  if (!applyParams.highestEdu) {
    return {
      message: '请填写您的最高学历',
      status: false
    }
  }
  if (!applyParams.schoolName) {
    return {
      message: '请填写您的学习名称',
      status: false
    }
  }
  if (!applyParams.major) {
    return {
      message: '请填写您的专业名称',
      status: false
    }
  }
  if (!applyParams.gradYear) {
    return {
      message: '请选择您的毕业时间',
      status: false
    }
  }
  if (!applyParams.joinReason) {
    return {
      message: '请填写为什么想加入我们',
      status: false
    }
  }
  if (!applyParams.hasReferrer) {
    return {
      message: '请选择您是否有推荐人',
      status: false
    }
  }
  if (applyParams.hasReferrer === 'Y') {

    if (!applyParams.referrerName) {
      return {
        message: '请填写您的推荐人姓名',
        status: false
      }
    }
    if (!applyParams.referrerContact) {
      return {
        message: '请填写您推荐人的联系方式',
        status: false
      }
    }

  }
  
  if (!applyParams.howToKnow) {
    return {
      message: '请填写您了解我们的途径/方式',
      status: false
    }
  }
  
  

  return {
    message: '',
    status: true
  }
}