import React, { useState } from 'react'

export default function Tooltip({ children, content, position }) {
	const [opacity, setOpacity] = useState('opacity-0')
	if (!children) throw new Error('Wrap the element you want to add a tooltip to with the Tooltip component.')
	let pos
	if (position === 'top') pos = 'left-0 right-0 bottom'
	else if (position === 'left') pos = 'top-0 bottom-0 right'
	else if (position === 'right') pos = 'top-0 bottom-0 left'
	else pos = 'left-0 right-0 top'
	pos = pos + '-[120%]'

	return (
		<div
			// if position vertical, justify center, else align center
			className={`relative w-fit h-fit`}
		>
			{React.cloneElement(children, {
				onMouseEnter: () => setOpacity('opacity-100'),
				onMouseLeave: () => setOpacity('opacity-0'),
				onFocus: () => setOpacity('opacity-100'),
				onBlur: () => setOpacity('opacity-0'),
			})}
			<div
				className={`tooltip absolute m-auto ${pos} pointer-events-none w-fit h-fit p-2 text-center text-sm text-white bg-primary-200 rounded-md border-primary-700 border-[1px] ${opacity} transition-opacity duration-300`}
			>
				{content}
			</div>
		</div>
	)
}
