import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Award } from "lucide-react";
import { Progress } from "~/components/ui/progress";

const ecoAchievementNames = [
    'Carbon Saver',
    'Green Warrior',
    'Sustainability Hero',
    'Eco Champion',
    'Planet Protector',
    'Renewable Advocate',
    'Climate Crusader',
    'Waste Reducer',
    'Nature Guardian',
    'Energy Conservator',
  ];

  const generateMilestones = (points : number) => {
    const milestones = [];
    // const baseMilestone = Math.ceil(points / 100) * 100;
    const baseMilestone = 0;
  
    for (let i = 0; i < 5; i++) {
      const milestonePoints = baseMilestone + ((i + 1) * 1000);
  
      const name = ecoAchievementNames[i % ecoAchievementNames.length];
  
      milestones.push({
        name,
        neededPoints: milestonePoints,
        completed: points >= milestonePoints,
        points: milestonePoints,
      });
    }
  
    return milestones;
  };
  
export default function MilestonesList({points} : {points:number}) {
    const milestones = generateMilestones(points)
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Award className="mr-2 h-5 w-5 text-yellow-500" />
          Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {milestones?.map((milestone, index) => (
            <li key={index} className="flex items-center">
              <div className="flex-1">
                <p className={`font-medium ${milestone.completed ? 'text-green-600' : ''}`}>
                  {milestone?.name}
                </p>
                <Progress value={Math.floor(points/milestone.neededPoints * 100)} className="h-2 mt-1" />
              </div>
              <span className={`ml-2 text-sm ${milestone.completed ? 'text-green-600' : 'text-muted-foreground'}`}>
                {milestone?.neededPoints || 0} pts
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}