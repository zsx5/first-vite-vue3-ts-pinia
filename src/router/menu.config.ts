
export type MenuItem = {
  title: string;
  key: string;
  selectedIcon?: string;
  unSelectedIcon?: string;
  children?: MenuItem[];
};

export const menus: MenuItem[] = [
  {
    title: "项目管理",
    selectedIcon: "/src/assets/images/menu/project-manage-lighter.png",
    unSelectedIcon: "/src/assets/images/menu/project-manage.png",
    key: "/project"
  },
  {
    title: "回收站",
    selectedIcon: "/src/assets/images/menu/recycler-lighter.png",
    unSelectedIcon: "/src/assets/images/menu/recycler.png",
    key: "/recycler"
  },
  {
    title: "额度管理",
    selectedIcon: "/src/assets/images/menu/quota-manage-lighter.png",
    unSelectedIcon: "/src/assets/images/menu/quota-manage.png",
    key: "/quotaManagement"
  },
  {
    title: "平台素材中心",
    selectedIcon: "/src/assets/images/menu/material-center-lighter.png",
    unSelectedIcon: "/src/assets/images/menu/material-center.png",
    key: "/materialCenter"
  },
  {
    title: "模型管理",
    selectedIcon: "/src/assets/images/menu/model-manage-lighter.png",
    unSelectedIcon: "/src/assets/images/menu/model-manage.png",
    key: "/model"
  },
  {
    title: "企业入驻",
    selectedIcon: "/src/assets/images/menu/enterprise-lighter.png",
    unSelectedIcon: "/src/assets/images/menu/enterprise.png",
    key: "/enterprise"
  },
  {
    title: "工单审核",
    selectedIcon: "/src/assets/images/menu/work-order-lighter.png",
    unSelectedIcon: "/src/assets/images/menu/work-order.png",
    key: "/workOrder"
  }
];
