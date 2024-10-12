import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { Leaf, ShoppingCart, Recycle, Car, Zap } from "lucide-react"
import { useAutoAnimate } from '@formkit/auto-animate/react'

// Mock data
const leaderboardData = [
  { type: "Recycling", count: 1500, points: 3000 },
  { type: "Green Shopping", count: 1200, points: 2400 },
  { type: "Energy Saving", count: 1000, points: 2000 },
  { type: "Eco-friendly Transport", count: 800, points: 1600 },
  { type: "Tree Planting", count: 500, points: 1000 },
]

const getIconForType = (type: string) => {
  switch (type) {
    case "Recycling":
      return <Recycle className="h-5 w-5 text-green-500" />
    case "Green Shopping":
      return <ShoppingCart className="h-5 w-5 text-blue-500" />
    case "Energy Saving":
      return <Zap className="h-5 w-5 text-yellow-500" />
    case "Eco-friendly Transport":
      return <Car className="h-5 w-5 text-purple-500" />
    default:
      return <Leaf className="h-5 w-5 text-green-500" />
  }
}

export default function EcoPointsLeaderboard() {

  const [animationParent] = useAutoAnimate()

  return (
    <Card className="w-full max-w-2xl mx-auto" ref={animationParent}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Eco Points Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Count</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((item, index) => (
              <TableRow key={item.type}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getIconForType(item.type)}
                    <span>{item.type}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="font-semibold">
                    {item.points.toLocaleString()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}