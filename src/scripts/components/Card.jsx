import { Children, cloneElement } from 'react'
import Form from './Form'
export default function Card({ children }) {
	function iterate(children) {
		return Children.map(children, (child) => {
			if (child) {
				if (child.type?.name == 'Form') return cloneElement(child, { className: 'w-full' })
				if (child.type === 'h1') return cloneElement(child, { className: 'text-4xl font-[Rye] mb-4' })
				if (child.type === 'button' || child.type?.name == 'GoogleButton') {
					return cloneElement(child, {
						className:
							'px-5 py-3 bg-primary-light rounded-2xl flex gap-2 justify-center items-center hover:brightness-[115%] transition-all duration-200',
					})
				}
				if (child.type?.displayName === 'Link')
					return cloneElement(child, {
						className:
							'self-start pl-2 -mt-2 font-light text-[#42A4FF] no-underline hover:underline hover:brightness-[120%] transition-all duration-200',
					})
				return child
			}
			return null
		})
	}
	const newChildren = iterate(children)
	return (
		<div className='absolute top-0 bottom-0 right-0 left-0 m-auto flex flex-col justify-center items-center'>
			<div className='relative w-[35em] max-w-[95%] py-16 px-12 rounded-3xl gap-6 flex flex-col justify-center items-center bg-primary'>
				{newChildren}
			</div>
		</div>
	)
}
