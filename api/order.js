// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import request from "@/utils/request.js";

/**
 * 开票记录
 */
export function orderInvoiceList(data) {
	return request.get('v2/order/invoice_list', data);
}

/**
 * 开票订单详情
 * @param {Object} id
 */
export function orderInvoiceDetail(id) {
	return request.get(`v2/order/invoice_detail/${id}`);
}

/**
 * 发票地址获取
 * @param object data
 */
export function getInvoiceLink(id) {
	return request.get(`v2/order/down_invoice/${id}`);
}