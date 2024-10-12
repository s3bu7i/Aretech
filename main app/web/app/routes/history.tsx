import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { useNavigate } from "@remix-run/react"
import { useBalanceStore } from "~/lib/store";

interface Transaction {
  id: number;
  amount: number;
  category: string;
  createdAt: string;  // date
  description: string;
  memberId: number;
  note: string | null;
  partnerId: number;
  partnerRefId: string | null;
  points: number;
  reference: string;
  rewardId: number;
  status: "PENDING" | "COMPLETED" | "FAILED"; 
  transactedAt: string;  // date
  type: "PAYMENT" | "REWARD" | "ADJUSTMENT"; 
  updatedAt: string;  // date
}
export default function Component() {
  const navigate = useNavigate();
  const memberId = useBalanceStore(state => state.memberId);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tk = localStorage.getItem("accessToken");
      if (!tk) {
        navigate("/login");
        return;
      }

      const data = await fetch(window.ENV.API_URL + `/api/v1/loyalty/${memberId}/transactions`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${tk}`
        }
      });

      const tran = await data.json()

      console.log("fetched transactions", tran.transactions);

      setTransactions(tran.transactions);
    };

    fetchData();
  }, []);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // const transactions: Transaction[] = [
  //   { id: "1", date: new Date("2024-09-15"), description: "Receipt Scan", amount: 630, type: "credit" },
  //   { id: "2", date: new Date("2024-09-15"), description: "25% off Beyond Meat", amount: 5000, type: "debit" },
  //   { id: "3", date: new Date("2024-09-15"), description: "Plant a tree", amount: 1000, type: "debit" },
  //   { id: "4", date: new Date("2024-09-14"), description: "Public Transit", amount: 1000, type: "credit" },
  //   { id: "5", date: new Date("2024-09-14"), description: "Receipt Scan", amount: 1250, type: "credit" },
  // ]

  const sortedTransactions = [...transactions].sort((a, b) => {
    return sortOrder === "desc" ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Transactions History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button variant="ghost" onClick={toggleSortOrder} className="font-bold">
                  Date
                  {sortOrder === "desc" ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={`text-right ${transaction.rewardId === 10 || transaction.rewardId === 11 ? "text-green-600" : "text-red-600"}`}>
                  {transaction.rewardId === 10 || transaction.rewardId === 11 ? "+" : "-"}{Math.abs(transaction.amount).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}