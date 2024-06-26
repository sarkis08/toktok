import {create} from "zustand"

interface ActiveListScore {
    members: string[];
    add: (id: string) => void;
    remove: (id: string) => void;
    set: (ids: string[]) => void;
}

const useActiveList = create<ActiveListScore>((set) => ({
    members: [],
    add: (id) => set((state) => ({ members: [...state.members, id] })),
    remove: (id) => set((state) => ({ members: state.members.filter((m) => m!== id) })),
    set: (ids) => set((state) => ({ members: ids })),
}))

export default useActiveList;