import React, { Children, cloneElement, ComponentProps, isValidElement, ReactElement } from 'react'
import Form from './Form'
export default function Card({ children }: { children: JSX.Element[] }) {
	function iterate(children: JSX.Element[]) {
		return Children.map(children, (child) => {
			const { type, props } = child
			if (isValidElement(child)) {
				if (typeof type === 'string') {
					if (type === 'h1') return cloneElement(child, { className: 'text-4xl font-[Rye] mb-4' } as React.Attributes)
					if (type === 'form') return cloneElement(child, { className: 'w-full' } as React.Attributes)
					if (type === 'button') {
						return cloneElement(child, {
							className:
								'px-5 py-3 bg-primary-light rounded-2xl flex gap-2 justify-center items-center hover:brightness-[115%] transition-all duration-200',
						} as React.Attributes)
					}
				} else if (type) {
					if (type.name === 'Form') return cloneElement(child, { className: 'w-full' } as React.Attributes)
					if (type.name === 'GoogleButton') {
						return cloneElement(child, {
							className:
								'px-5 py-3 bg-primary-light rounded-2xl flex gap-2 justify-center items-center hover:brightness-[115%] transition-all duration-200',
						} as React.Attributes)
					}
					if (type.displayName === 'Link')
						return cloneElement(child, {
							className:
								'self-start pl-2 -mt-2 font-light text-[#42A4FF] no-underline hover:underline hover:brightness-[120%] transition-all duration-200',
						} as React.Attributes)
				}
				// if (child.type === 'h1')
				// 	return cloneElement(child, { className: 'text-4xl font-[Rye] mb-4' } as React.Attributes)
				// if (typeof child.type !== 'string') {
				// 	console.log(child.type)
				// 	if (child.type?.name == 'Form') return cloneElement(child, { className: 'w-full' } as React.Attributes)
				// 	if (child.type === 'button' || child.type?.name == 'GoogleButton') {
				// 		return cloneElement(child, {
				// 			className:
				// 				'px-5 py-3 bg-primary-light rounded-2xl flex gap-2 justify-center items-center hover:brightness-[115%] transition-all duration-200',
				// 		} as React.Attributes)
				// 	}
				// 	if (child.type?.displayName === 'Link')
				// 		return cloneElement(child, {
				// 			className:
				// 				'self-start pl-2 -mt-2 font-light text-[#42A4FF] no-underline hover:underline hover:brightness-[120%] transition-all duration-200',
				// 		} as React.Attributes)
				// }
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
