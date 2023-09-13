import {HistoryPrice} from "./history-price";

export interface Investment {
  id: string,
  name: string,
  steamUrl: string,
  buyPrice: number,
  quantity: number,
  currentPrice: number,
  investedAt: Date,
  history: HistoryPrice[]
}
