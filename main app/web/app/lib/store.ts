import { create } from 'zustand'
import { createJSONStorage, devtools, persist, PersistStorage } from 'zustand/middleware';

interface BalanceState {
  balance: number
  setBal: (bal: number) => void
  memberId: number | null
  setMemberId: (id: number | null) => void
}

// const dummyStorage: PersistStorage<BalanceState> = {
//     getItem: () => null,
//     setItem: () => { },
//     removeItem: () => { }
// };

export const useBalanceStore = create<BalanceState>()(devtools(
  persist(
    (set) => ({
      balance: 0,
      setBal: (bal: number) => set(() => ({ balance: bal })),
      memberId: null,
      setMemberId: (id: number | null) => set(() => ({ memberId: id })),
    }),
    { name: 'balanceStore' }
  ))
);
