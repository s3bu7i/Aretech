import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Leaf } from "lucide-react"

export default function PointsDisplay({ points }: { points: number }) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Leaf className="mr-2 h-5 w-5 text-green-500" />
          Eco Points
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-green-600">{points}</p>
        <p className="text-sm text-muted-foreground">Keep up the good work!</p>
      </CardContent>
    </Card>
  )
}