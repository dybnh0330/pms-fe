export interface CategoryModel {
  id: number;
  name: string;
  description: string;
  parentId: number;
  parentName: string;
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
}
