export default interface ReceiptData {
    receipt: boolean;
    storeName: string;
    items: Array<{
      name: string,
      price: number
    }>,
    totalCost: number;
    date: string;
    co2: number;
    generic: boolean;
    sponsoredProducts?: Array<{
      name: string,
      price: number
    }>,
    sponsoredCost?: number,
    points: number
}