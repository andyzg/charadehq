export interface Condition {
  condition: string;
}

export interface ConditionList {
  name: string;
  prefix: string;
  postfix: string;
  list: Condition[];
}

export interface ConditionPack {
  conditions: ConditionList[];
}
