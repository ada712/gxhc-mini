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
