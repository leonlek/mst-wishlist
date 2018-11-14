import { types, flow, applySnapshot, getSnapshot} from 'mobx-state-tree';
import { WishList } from './WishList';

const User = types.model({
    id: types.identifier,
    name: types.string,
    gender: types.enumeration('gender', ['m', 'f']),
    wishList: types.optional(WishList, {}),
    recipient: types.maybe(types.reference(types.late(()=> User))),
}).actions(self => ({
    getSuggestions: flow(function * () {
        const response = yield fetch(`http://localhost:3001/suggestions_${self.gender}`);
        const suggestions = yield response.json();
        self.addSuggestions(suggestions);
    }),
    addSuggestions(suggestions) {
        self.wishList.items.push(...suggestions)
    } 
}));

export const Group = types.model({
    // users: types.optional(types.map(User), {})
    // users: types.map(User)
    users: types.optional(types.array(User), [])
}).actions(self => {
    let controller;
    
    return {
        load: flow(function* load() {

            controller = window.AbortController && new window.AbortController();
            try {
                const response = yield window.fetch(`http://localhost:3001/users`, {
                    signal: controller && controller.signal
                });
                applySnapshot(self.users, yield response.json());
                console.log('getSnapshot:', getSnapshot(self));
                console.log('success');
            } catch (error) {
                console.log('error flow:', error);
                console.log('aborted', error.name);
            }
        }),
        reload() {
            if (controller) controller.abort();
            self.load();
        },
        beforeDestroy() {
            if (controller) controller.abort();
        },
        afterCreate() {
            self.load();
        },
        drawLots() {
            const allUsers = Array.from(self.users.values())

                // not enough users, bail out
                if (allUsers.length <= 1) return

                // not assigned lots
                let remaining = allUsers.slice()

                allUsers.forEach(user => {
                    // edge case: the only person without recipient
                    // is the same as the only remaining lot
                    // swap lot's with some random other person
                    if (remaining.length === 1 && remaining[0] === user) {
                        const swapWith = allUsers[Math.floor(Math.random() * (allUsers.length - 1))]
                        user.recipients = swapWith.recipient
                        swapWith.recipient = self
                    } else
                        while (!user.recipient) {
                            // Pick random lot from remaing list
                            let recipientIdx = Math.floor(Math.random() * remaining.length)

                            // If it is not the current user, assign it as recipient
                            // and remove the lot
                            if (remaining[recipientIdx] !== user) {
                                user.recipient = remaining[recipientIdx]
                                remaining.splice(recipientIdx, 1)
                            }
                        }
                })
        },
    }
});