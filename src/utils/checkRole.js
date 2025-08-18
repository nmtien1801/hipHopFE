export function checkRole(roleList, type) {
  if (roleList.length > 0 && type) {
    return roleList.includes(type)
  }

  return false
}

export function checkPermission(userModuleList, moduleId) {
  const userModule = userModuleList?.find((item) => item.ModuleID === moduleId)

  if (!userModule)
    return {
      isView: false,
      isInsert: false,
      isUpdate: false,
      isDelete: false,
    }
  return {
    isView: Boolean(userModule.IsView),
    isInsert: Boolean(userModule.IsInsert),
    isUpdate: Boolean(userModule.IsUpdate),
    isDelete: Boolean(userModule.IsDelete),
  }
}
