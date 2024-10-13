import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Trophy } from "lucide-react"
import { useNavigate } from "@remix-run/react";
import { useEffect, useMemo, useRef, useState } from "react";

type User = {
  name: string;
  points: number;
}

function getAnimalEmoji(animal: string): string {
  const emojiMap: Record<string, string> = {
    Turtle: "🐢",
    Squirrel: "🐿️",
    Bird: "🐦",
    Wolf: "🐺",
    Eagle: "🦅",
  };

  return emojiMap[animal] || "❓";
}

// Example usage:
const animalEmoji = getAnimalEmoji("Turtle");
console.log(animalEmoji); // Outputs: 🐢

export default function Component() {
  const navigate = useNavigate();
  const [lb, setLb] = useState<any[]>([]);

  const fetched = useRef<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const tk = localStorage.getItem("accessToken");
      if (!tk) {
        navigate("/login");
        return;
      }

      const res = await fetch(window.ENV.API_URL + "/api/v1/loyalty/leaderboard");
      // console.log(await res.json())
      setLb(await res.json());
    };

    if (fetched && !fetched.current) {
      fetched.current = true;
      fetchData();
    }
  }, []);

  // const users: User[] = [
  //   { name: "Charlie", points: 1200 },
  //   { name: "Eve", points: 1100 },
  //   { name: "Alice", points: 1000 },
  //   { name: "David", points: 950 },
  //   { name: "Bob", points: 850 },
  // ];

  // Sort users by points in descending order
  const sortedUsers = useMemo(() => [...lb].sort((a, b) => b.points - a.points), [lb]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Global Point Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow key={user.name}>
                <TableCell className="text-center font-medium">
                  {index < 3 ? (
                    <Trophy className={`inline-block w-5 h-5 ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-400' :
                      'text-yellow-700'
                    }`} />
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell>{user.name} {getAnimalEmoji(user.animal)}</TableCell>
                <TableCell className="text-right">{user.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}