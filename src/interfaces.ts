export interface Item {
  acquisitionLink: string;
  acquisitionName: string;
  Acquisitions: string;
  Classes: string;
  ClassRoles: string;
  dropChance: string;
  id: number;
  itemId: number;
  itemLink: string;
  itemQuality: string;
  itemSlot: string;
  itemType: string;
  name: string;
  PrimaryClasses: string;
  SecondaryClasses: string;
  TertiaryClasses: string;
  zone: string;
}

export interface Result {
  data: Item[];
}
