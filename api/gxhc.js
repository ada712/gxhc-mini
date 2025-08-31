import request from "@/utils/request.js";

export function getDirectorDetails(data) {
  return request.get('get_director_membe/details', data, {
    noAuth: true
  });
}

export function getDirectorMember(data) {
  return request.get('get_director_membe/list', data, {
    noAuth: true
  });
}

export function investProjectsSave(data) {
  return request.post('invest_projects/save', data, {
    noAuth: false
  });
}

export function investProjectsUpdateScore(data) {
  return request.post('invest_projects/update_score', data, {
    noAuth: false
  });
}
