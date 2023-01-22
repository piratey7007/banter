import { useContext } from 'react'
import { AuthContext } from '../utils/Auth'
import UserImage from './UserImage'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import Settings from './Settings'

export default function Header({ className, ...props }: { className?: string }) {
	const { user, signOut } = useContext(AuthContext)

	return (
		<div className={'top-bar p-4 ' + className}>
			<ul className='flex justify-between'>
				<li>
					<Settings className='w-20' />
				</li>
				<li>
					<Link to='/'>
						<Logo />
					</Link>
				</li>
				<li>
					<Link to='/profile'>
						<UserImage url={user?.photoURL || undefined} colors={user?.defaultColors} />
					</Link>
				</li>
				<li>
					<button onClick={signOut}>Sign Out</button>
				</li>
			</ul>
		</div>
	)
}
