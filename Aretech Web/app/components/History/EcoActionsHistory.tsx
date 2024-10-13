import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { History } from "lucide-react"

const dummyActions = [
  { action: "Scanned 3 items from receipt", type:"receipt", points: 10, date: "2023-06-15" },
  { action: "Used public transport", type:"transit", points: 20, date: "2023-06-17" },
  { action: "Scanned 5 items from receipt", type:"receipt", points: 15, date: "2023-06-12" },
  { action: "Used a bus", type:"transit", points: 20, date: "2023-06-11" },
];

export default function EcoActionsHistory({history} : any) {
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <History className="mr-2 h-5 w-5 text-blue-500" />
          Recent Eco Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {dummyActions?.map((action : any, index : number) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span>{action.action}</span>
              <div className="flex items-center">
                <span className="text-green-600 font-medium">+{action.points}</span>
                <span className="ml-2 text-muted-foreground">{action.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}