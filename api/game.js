import request from "@/utils/request.js";

export function gameList(data) {
	return request.get("game/list", data, {
		noAuth: true
	});
}

export function gameDetails(data) {
	return request.get("game/details", data, {
		noAuth: true
	});
}

export function gameApply(data) {
	return request.post("gameOrder/apply", data);
}

export function orderList(data) {
	return request.get("gameOrder/list", data);
}

export function orderDetails(data) {
	return request.get("gameOrder/details", data);
}

export function orderApplyList(data) {
	return request.get("gameOrder/apply_list", data);
}

export function applyAudit(data) {
	return request.post("gameOrder/apply_audit", data);
}