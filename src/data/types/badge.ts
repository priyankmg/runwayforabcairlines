export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  earnCondition: string;
  /** v2 spec: recognition / monetary reward where applicable */
  reward?: string;
}
