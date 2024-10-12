import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import Streak from "../components/Profile/Streak";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
// import { Leaf, Award, History } from "lucide-react"
import PointsDisplay from "../components/Profile/PointsDisplay";
import MilestonesList from "../components/Profile/MilestonesList";
import avatar from "../assets/avatar.svg";
// import EcoActionsHistory from "~/components/History/EcoActionsHistory";
import { useNavigate } from "@remix-run/react";
import { toast } from "sonner";
import { jwtDecode } from  "jwt-decode";
import { useBalanceStore } from "~/lib/store";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoRewards - Profile" },
    { name: "description", content: "Profile Page" },
  ];
};

export default function Profile(props: any) {
  const [profileData, setProfileData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const tk = localStorage.getItem("accessToken");
      if (!tk) {
        navigate("/login");
        return;
      }
      const decoded = jwtDecode(tk);
      setProfileData(decoded);
      console.log(decoded);
    };

    fetchData();
  }, []);

  const balance = useBalanceStore((state) => state.balance);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center pb-4">
        <Avatar className="h-20 w-20">
          <img src={avatar} alt="User's avatar" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div className="pl-4">
          <CardTitle className="text-2xl">{(profileData?.name) ? <>{profileData?.name}</> : 'Your Name'}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {balance < 1000
              ? "Eco Beginner"
              : balance > 1000 && balance < 5000
              ? "Eco Warrior"
              : "Eco Master"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Streak streakDays={2} />
        <PointsDisplay points={balance} />
        <MilestonesList points={balance} />
      </CardContent>
      <div className="flex w-full">
        <button className="m-8 mt-0 bg-red-100 p-2 rounded-md w-full hover:bg-red-200 transition-colors" onClick={() => {
          localStorage.removeItem('accessToken');
          navigate('/login');
          toast.success('Logged out successfully!');
        }}>
          Log Out
        </button>
      </div>
    </Card>
  );
}
