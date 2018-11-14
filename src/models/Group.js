import { types, flow, identifier, applySnapshot, getSnapshot} from 'mobx-state-tree';
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
}).actions(self => ({
    load: flow(function* load() {
        try {
            const response = yield window.fetch(`http://localhost:3001/users`);
            applySnapshot(self.users, yield response.json());
            console.log('getSnapshot:', getSnapshot(self))
            //const json = yield response.json();
            // json.map(user => {
            //     console.log('user: ', user.id, user.name)
            // })
            //console.log(yield response.json());
            // applySnapshot(self.users, {
            //     users: {
            //         name:'alex',
            //         gender:'m',
            //         id:'users',
            //         recipient: '',
            //         wishList: {},
            //     }
            // })
            // const user = {
            //     users: [
            //         {
            //             name:'alex',
            //             gender:'m',
            //             id:'users',
            //             recipient: '',
            //             wishList: {},
            //         },
            //         {
            //             id:'alex',
            //             name:'leonlek',
            //             gender: 'm',
            //             recipient: '',
            //             wishList: {},
            //         }
            //     ]
            // }
            // console.log(getSnapshot(self))
            // console.log("​load:flow -> user", user)
            // const json = yield response.json(); 
			// console.log("​load:flow -> json", json)
            // applySnapshot(self.users, json);
            // console.log(getSnapshot(self))
        } catch (error) {
            console.log('error flow:', error);
        }
    }),
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
    afterCreate() {
        self.load();
    }
}));