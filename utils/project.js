/**
 * 项目状态返回
 */
export const projectStatusName = (status) => {
  switch (status) {
    case "examining":
      return "审核中";
    case "investViewing":
      return "内部面试尽调中";
    case "investPass":
      return "内部审核通过";
    case "publicity":
      return "理事会公示中";
    case "councilLink":
      return "理事会路演中";
    case "launch":
      return "成功发起";
    case "fail":
      return "发起失败";
    default:
      return "审核中";
  }
};

/**
 * 项目状态类样式处理
 */
export const getStatusClass = (status) => {
  console.log("status=>", status);
  const statusMap = {
    examining: "auditing",
    investViewing: "auditing",
    fail: "refuse",
    investPass: "finishing",
    publicity: "finishing",
    launch: "finishing",
    fail: "auditing",
  };
  return statusMap[status] || "default-class"; // 可以根据需要调整默认值
};

/**
 * 查看PDF文件
 */
export const previewPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    //#ifdef H5
    uni.openDocument({
      filePath: filePath,
      fileType: "pdf",
      success: () => {
        resolve();
      },
      fail: (err) => {
        reject(err);
      },
    });
    //#endif
    //#ifndef H5
    // 如果是云存储中的文件，先下载到本地
    uni.downloadFile({
      url: filePath, // 文件ID
      success: (res) => {
        // 获取临时文件路径
        const tempFilePath = res.tempFilePath;
        // 使用wx.openDocument打开PDF文件
        uni.openDocument({
          filePath: tempFilePath,
          fileType: "pdf",
          success: () => {
            resolve();
          },
          fail: (err) => {
            reject(err);
          },
        });
      },
      fail: (err) => {
        reject(err);
      },
    });
    //#endif
  });
};

/**
 * 清除项目信息的相关缓存
 */
export const clearProjectStorage = () => {
  wx.removeStorageSync("teamList");
  wx.removeStorageSync("tempTeamParamData");
  wx.removeStorageSync("workExpList");
  wx.removeStorageSync("enterprises");
  wx.removeStorageSync("colleges");
};
