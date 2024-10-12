import { NotFoundError } from '@/utils/index.ts'
import { findRewards } from '@/db/providers/index.ts'

const getRewardsController = async () => {
  const rewards = await findRewards();

  if (!rewards) {
    throw new NotFoundError(`Rewards were not found!`)
  }

  return rewards
}

export { getRewardsController }
