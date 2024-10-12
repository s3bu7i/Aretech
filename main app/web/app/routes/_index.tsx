import type { MetaFunction } from "@remix-run/node";
import { json, useNavigate, useSearchParams } from "@remix-run/react";
import { Search } from "lucide-react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Input } from "~/components/ui/input";

import TreesImage from "~/assets/trees.webp";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useLoaderData } from "@remix-run/react";
import { useBalanceStore } from "~/lib/store";
import { toast } from "sonner";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoRewards" },
    { name: "description", content: "Earn rewards by eco-friendly actions" },
  ];
};

// export async function loader() {
//   console.log("fetching", process.env.API_URL + "/api/v1/rewards/getAll");
//   const res = await fetch(process.env.API_URL + "/api/v1/rewards/getAll");

//   return json(await res.json());
// }

export default function Index() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [rewards, setRewards] = useState<any[]>([]);
  const balance = useBalanceStore((state) => state.balance);
  const setBal = useBalanceStore(state => state.setBal);
  const memberId = useBalanceStore(state => state.memberId);
  const [spendActive, setSpendActive] = useState<boolean>(false);

  useEffect(() => {
    fetch(window.ENV.API_URL + "/api/v1/rewards/getAll")
      .then((res) => res.json())
      .then((res) => {
        setRewards(res.rewards);
        console.log(res);
      });
  }, []);

  const [animationParent] = useAutoAnimate();

  // const rewards = useLoaderData<typeof loader>();
  // const rewards = [];
  console.log(rewards);

  const filteredRewards = rewards.filter(
    (reward: any) =>
      (reward.name.toLowerCase().includes(query) ||
      reward.category.toLowerCase().includes(query)) &&
      !(reward.id === 10 || reward.id === 11)
  );

  const categorizedRewards = filteredRewards.reduce((acc, reward: any) => {
    if (!acc[reward.category]) {
      acc[reward.category] = [];
    }
    acc[reward.category].push(reward);
    return acc;
  }, {} as Record<string, typeof rewards>);

  const spendPoints = async (reward: any) => {
    if (spendActive) {
      toast.error("Still processing last transaction!");
      return;
    }
    setSpendActive(true);
    if (balance < reward.points) {
      toast.error("You don't have enough ecopoints!");
      setSpendActive(false);
      return;
    }
    const tk = localStorage.getItem("accessToken");
    if (!tk) {
      toast.error("Cannot find access token, please sign in again");
      setSpendActive(false);
      return;
    }
    if (!memberId) {
      toast.error("Unknown member id error");
      setSpendActive(false);
      return;
    }
    console.log("member id", memberId);
    const res = await fetch(window.ENV.API_URL + `/api/v1/loyalty/${memberId}/transactions`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tk}`
      },
      body: JSON.stringify({
        category: reward.category,
        description: `Purchase ${reward.name}`,
        points: 5000,
        // amount: 5000,
        rewardId: reward.id,
        amount: reward.points,
      })
    });
    console.log("transaction", res);
    toast.success(`Bought ${reward.name} successfully`);
    setBal(balance - reward.points);
    setSpendActive(false);
    /*
    router.post('/loyalty/:memberId/transactions', memberAuthMiddleware, async (req: Request, res: Response) => {
  try {
    // const { memberId } = memberIdSchema.parse(req.params)
    const memberId = req.memberId!;
    const transactionPayload = postTransaction.parse(req.body)

    const transaction = await postMemberTransactionController(
      req.partnerId as number,
      memberId,
      transactionPayload as TransactionCreationAttributes
    )

    logger.info(`[/loyalty/${memberId}/transactions]: successfully created transaction`)

    return res.status(200).json({ transaction })
  } catch (error) {
    logger.error(`[/loyalty/${req.params.memberId}/transactions] error occurred:  ${error}`)

    handleError(error as Error, res)
  }
})
    */
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SearchBar className="relative w-full" />
      <div className="flex flex-col w-full mt-4 h-screen">
        <div
          className="rounded-lg w-full p-8"
          style={{
            backgroundImage: `url(${TreesImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-4xl font-bold text-white">Carbon Offsets</h1>
          <p className="text-gray-300 text-sm mt-3">
            Offset your carbon footprint by redeeming your points to support
            projects that reduce greenhouse gas emissions like tree planting.
          </p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4 hover:opacity-90 transition-opacity"
            onClick={() => {
              document.getElementById("rewards")?.scrollIntoView();
            }}
          >
            Learn More &rarr;
          </button>
        </div>
        <div
          className="flex flex-col w-full mt-4"
          id="rewards"
          ref={animationParent}
        >
          {Object.entries(categorizedRewards).map(
            ([category, rewards]: any) => (
              <div key={category} className="flex flex-col w-full mt-4">
                <h2 className="text-2xl font-bold">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {rewards.map(
                    (reward: {
                      id: Key | null | undefined;
                      image: string | undefined;
                      name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | null
                        | undefined;
                      description:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                      points: {
                        toLocaleString: () =>
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      };
                    }): any => (
                      <div
                        key={reward.id}
                        className="rounded-lg bg-white shadow-md p-4"
                      >
                        <img
                          src={reward.image}
                          alt={String(reward.name)}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-bold mt-2">
                          {reward.name}
                        </h3>
                        <p className="text-gray-500 mt-1">
                          {reward.description}
                        </p>
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
                          onClick={() => spendPoints(reward)}
                        >
                          {reward.points.toLocaleString()} Points
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
          {JSON.stringify(categorizedRewards) === "{}" && (
            <p className="text-center text-xl mt-4">No rewards found</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchBar(props: React.HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(query === "");
    if (
      query.trim() === "" ||
      query === null ||
      query === undefined ||
      query === " " ||
      query === ""
    ) {
      navigate("/");
      return;
    }
    navigate(`/?query=${query}`);
  };

  return (
    <form
      className="relative top-0 w-full"
      onSubmit={handleFormSubmit}
      {...props}
    >
      <Input
        className="w-full [outline:none!important]"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="search"
        autoComplete="off"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <Search className="text-gray-600 h-4 w-4 fill-current" />
      </button>
    </form>
  );
}
