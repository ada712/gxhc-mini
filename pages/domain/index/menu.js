import { imgUrls2, imgUrls } from "@/config/app";
export default [
  {
    title: "投资专区",
    show: 'tzzq',
    list: [
      {
        icon: `${imgUrls2}/gn/1.png`,
        label: "项目投递",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/2.png`,
        label: "项目筛选标准",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/3.png`,
        label: "投后管理",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/4.png`,
        label: "我的合同",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/5.png`,
        label: "业务对接",
        iswebUrl: false,
        route: "",
      },
    ],
  },
  {
    title: "孵化专区",
    show: 'fhzq',
    list: [
      {
        icon: `${imgUrls2}/gn/6.png`,
        label: "发起项目",
        iswebUrl: false,
        route: "/pages/project/apply/index",
      },
      {
        icon: `${imgUrls2}/gn/7.png`,
        label: "项目进展",
        iswebUrl: false,
        route: "/pages/project/evolve/index",
      },
      {
        icon: `${imgUrls2}/gn/8.png`,
        label: "资料更新",
        iswebUrl: false,
        route: "/projectPages/updateIndex/index",
      },
      {
        icon: `${imgUrls2}/gn/9.png`,
        label: "流程和制度",
        iswebUrl: false,
        route: "/explainPages/project/apply/index",
      },
      {
        icon: `${imgUrls2}/gn/10.png`,
        label: "孵化项目",
        iswebUrl: false,
        route: "/projectPages/hatchList/index",
      },
    ],
  },
  {
    title: "社群专区",
    show: 'sqzq',
    list: [
      {
        icon: `${imgUrls2}/gn/11.png`,
        label: "加入会员",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/12.png`,
        label: "会员权益",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/13.png`,
        label: "我的会员",
        iswebUrl: false,
        route: "",
      },
    ],
  },
  {
    title: "理事专区",
    show: 'lszq',
    list: [
      {
        icon: `${imgUrls2}/gn/14.png`,
        label: "已参与项目",
        iswebUrl: false,
        route: "/projectPages/directorJoined/index",
      },
      {
        icon: `${imgUrls2}/gn/15.png`,
        label: "待确认项目",
        iswebUrl: false,
        route: "/projectPages/directorTBC/index",
      },
      {
        icon: `${imgUrls2}/gn/4.png`,
        label: "我的合同",
        iswebUrl: false,
        route: "/pages/director/contract/index",
      },
    ],
  },
  {
    title: "积分专区",
    show: 'jfzq',
    list: [
      {
        icon: `${imgUrls2}/gn/16.png`,
        label: "我的积分",
        iswebUrl: false,
        route: "/pages/points/detail/index",
      },
      {
        icon: `${imgUrls2}/gn/17.png`,
        label: "积分获取",
        iswebUrl: false,
        route: "/explainPages/points/obtain/index",
      },
      {
        icon: `${imgUrls2}/gn/18.png`,
        label: "管理制度",
        iswebUrl: false,
        route: "/explainPages/points/ruleState/index",
      },
    ],
  },
  {
    title: "伙伴专区",
    show: 'hbzq',
    list: [
      {
        icon: `${imgUrls2}/gn/19.png`,
        label: "项目申请",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/20.png`,
        label: "伙伴管理",
        iswebUrl: false,
        route: "",
      },
      {
        icon: `${imgUrls2}/gn/21.png`,
        label: "伙伴项目",
        iswebUrl: false,
        route: "",
      },
    ],
  },
  {
    title: "校园合伙人专区",
    show: 'xyhhrzq',
    list: [
      {
        icon: `${imgUrls}/gn/icon_xy_dssq.png`,
        label: "大使申请",
        iswebUrl: false,
        route: "/campusPages/parter/apply/index",
      },
      {
        icon: `${imgUrls}/gn/icon_xy_jyzphb.png`,
        label: "经验值排行榜",
        iswebUrl: false,
        route: "/campusPages/experience/rankingList/index",
      },
      {
        icon: `${imgUrls}/gn/icon_xy_hdbm.png`,
        label: "校园活动",
        iswebUrl: false,
        route: "/campusPages/activity/list/index",
      },
    ],
  },
];
