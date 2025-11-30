import request from "@/utils/request.js";

export function getDirectorDetails(data) {
  return request.get("get_director_membe/details", data, {
    noAuth: true,
  });
}

export function getDirectorMember(data) {
  return request.get("get_director_membe/list", data, {
    noAuth: true,
  });
}

export function directorMemberAdd(data) {
  return request.post("director_member/add", data, {
    noAuth: true,
  });
}

export function investProjectsSave(data) {
  return request.post("invest_projects/save", data, {
    noAuth: false,
  });
}

export function investProjectsUpdateScore(data) {
  return request.post("invest_projects/update_score", data, {
    noAuth: false,
  });
}

export function investProjectsDetails(data = {}) {
  return request.get("invest_projects/details", data, {
    noAuth: false,
  });
}

export function investProjectsRevoke(data) {
  return request.post("invest_projects/revoke", data, {
    noAuth: false,
  });
}

export function investProjectsUpdateBP(data) {
  return request.post("invest_projects/update_bp", data, {
    noAuth: false,
  });
}

export function investProjectsUpdateSupply(data) {
  return request.post("invest_projects/update_supply", data, {
    noAuth: false,
  });
}

export function getIndustryCategories(data) {
  return request.get("get_industry_categories/list", data, {
    noAuth: false,
  });
}
export function getIndustrySubCategories(data) {
  return request.get("get_industry_sub_categories/list", data, {
    noAuth: false,
  });
}

export function userAuth(data) {
  return request.post("user/auth", data, {
    noAuth: false,
  });
}

// BP直播申请相关接口
export function applyLiveApply(data) {
  return request.post("apply_live/apply", data, {
    noAuth: false,
  });
}

export function getApplyLiveList(data) {
  return request.get("apply_live/list", data, {
    noAuth: false,
  });
}

export function getApplyLiveDetail(id, data = {}) {
  return request.get(`apply_live/detail/${id}`, data, {
    noAuth: false,
  });
}

export function getUserApplyLive() {
  return request.get(`apply_live/user_live`, {}, {
    noAuth: false,
  });
}

export function cancelApplyLive(id, data = {}) {
  return request.post(`apply_live/cancel/${id}`, data, {
    noAuth: false,
  });
}

// 获取已预订的时间槽
export function getBookedTimeSlots(data) {
  return request.get("apply_live/booked_slots", data, {
    noAuth: false,
  });
}
export function createOrder(data) {
  return request.post("createOrder", data, {
    noAuth: false,
  });
}

export function pay(data) {
  return request.post("pay", data, {
    noAuth: false,
  });
}

export function userEnergy() {
  return request.get(`userEnergy`, {}, {
    noAuth: false,
  });
}

export function energyList(data) {
  return request.get(`energyList`, data, {
    noAuth: false,
  });
}


export function runBp(data) {
  return request.post(`runBp`, data, {
    noAuth: false,
  });
}

export function getBpInfo(data) {
  return request.get(`getBpInfo`, data, {
    noAuth: false,
  });
}

export function getBpResultList(data) {
  return request.get(`getBpResultList`, data, {
    noAuth: false,
  });
}

export function getBpResultInfo(data) {
  return request.get(`getBpResultInfo`, data, {
    noAuth: false,
  });
}

export function getShare(data) {
  return request.get(`get_share`, data, {
    noAuth: true,
  });
}

