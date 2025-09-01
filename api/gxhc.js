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
