export const FormatDateTime = (value, format) => {
  let date;

  if (value) {
    if (typeof value === "object") {
      date = value;
    } else {
      date = ConvertDateTime(value);
    }
  } else {
    date = new Date();
  }

  const options = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (var k in options) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? options[k]
          : ("00" + options[k]).substr(("" + options[k]).length)
      );
    }
  }

  return format;
};

/**
 * @将字符串转换为日期对象
 * 注：ios不支持 yyyy-MM-dd 字符串转换为日期类型，需要转换为yyyy/MM/dd
 */
export const ConvertDateTime = (value) => {
  try {
    if (value) {
      let date;

      if (typeof value === "string") {
        const filterValue = value
          .replace(/-/g, "/")
          .replace(/年/g, "/")
          .replace(/月/g, "/")
          .replace(/日/g, "")
          .replace(/时/g, ":")
          .replace(/分/g, ":")
          .replace(/秒/g, "");

        date = new Date(filterValue);
      } else {
        date = new Date(value);
      }

      if (date) {
        return date;
      }
    }

    return new Date();
  } catch (e) {
    return new Date();
  }
};

export const getSEtimeByTag = (type) => {
  let date = new Date().getTime();
  switch (type) {
    case "TODAY":
      break;
    case "WEEK":
      date = date - 7 * 24 * 60 * 60 * 1000;
      break;
    case "MONTH":
      date = date - 30 * 24 * 60 * 60 * 1000;
      break;
    case "THREE_MONTH":
      date = date - 90 * 24 * 60 * 60 * 1000;
      break;
    case "HALF_YEAR":
      date = date - 180 * 24 * 60 * 60 * 1000;
      break;

    default:
      date = date - 180 * 24 * 60 * 60 * 1000;
      break;
  }
  const start = FormatDateTime(date, "yyyy-MM-dd");
  const end = FormatDateTime(new Date().getTime(), "yyyy-MM-dd");
  return { start, end };
};


export const getCurrentTimeString = ()=> {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');

  return `${year}${month}${day}${hour}${minute}`;
}

export const simplifyCompanyName = (name)=> {
  // 去除括号和后缀，并转换为小写
  return name.replace(/[\(\)\[\]\{\},.]/g, '').toLowerCase();
}