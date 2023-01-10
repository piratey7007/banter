import { useContext, useRef } from 'react'
import { AuthContext } from '../utils/Auth'
import Card from './Card'
import UserImage from './UserImage'
import Form from './Form'

export default function Info() {
	const { user, updateUserDetails } = useContext(AuthContext)
	const ageRef = useRef()
	const colorsRef = useRef()
	const birthdayRef = useRef()
	const bioRef = useRef()
	const imageRef = useRef()
	async function handleSubmit(e) {
		if (e) e.preventDefault()
		const age = ageRef.current.value,
			colors = colorsRef.current.value,
			birthday = birthdayRef.current.value,
			bio = bioRef.current.value,
			image = imageRef.current.value
		await updateUserDetails({
			age,
			colors,
			birthday,
			bio,
			image,
		})
	}
	return (
		<Card>
			<h1>Info</h1>
			<Form onSubmit={handleSubmit}>
				<div className='container flex flex-col justify-center items-center gap-2'>
					<UserImage colors={user?.defaultPhotoColors} url={user?.photoURL} />
					<div className='container flex flex-col items-center gap-2'>
						<button ref={imageRef} className='px-2 py-1 rounded-lg'>
							Image
						</button>
						<label htmlFor='default-colors'>Default Colors</label>
						<select ref={colorsRef} className='w-40' name='colors' id='default-colors'>
							<option value='red'>Red</option>
							<option value='blue'>Blue</option>
							<option value='green'>Green</option>
							<option value='yellow'>Yellow</option>
							<option value='purple'>Purple</option>
							<option value='orange'>Orange</option>
						</select>
					</div>
				</div>
				<div className='container flex'>
					<div className='container'>
						<label htmlFor='age'>Age</label>
						<input ref={ageRef} id='age' type='number' min='1' max='130' placeholder='Age' />
					</div>
					<div className='container'>
						<label htmlFor='birthday'>Birthday</label>
						<input ref={birthdayRef} type='date' id='birthday' />
					</div>
				</div>
				<div className='container'>
					<label htmlFor='bio'>Bio</label>
					<textarea ref={bioRef} id='bio' placeholder='Tell us about yourself!'></textarea>
				</div>
			</Form>
			<button onClick={handleSubmit}>Submit</button>
		</Card>
	)
}
