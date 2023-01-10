import { user } from './Auth'

export const Users = {
	async getUserDetails() {
		const userDoc = await firestore.collection('users').doc(user.uid).get()
		return userDoc.data()
	},
	async updateUserDetails(data) {
		await firestore.collection('users').doc(user.uid).update(data)
	},
}
