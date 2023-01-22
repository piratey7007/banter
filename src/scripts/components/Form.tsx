import { Children, cloneElement, KeyboardEvent } from 'react'

export default function Form({
	children,
	onSubmit,
	className,
	...props
}: {
	children: JSX.Element[]
	className: string
	onSubmit?: () => void
}) {
	function iterate(children: JSX.Element[]): JSX.Element[] {
		return Children.map(children, (child: JSX.Element) => {
			if (child.props.className?.split(' ').includes('container'))
				return cloneElement(child, { children: iterate(child.props.children) })
			if (child.type == 'select')
				return cloneElement(child, {
					children: iterate(child.props.children),
					className:
						'py-3 px-4 w-full bg-black rounded-2xl placeholder:text-white placeholder:opacity-60 focus-visible:outline-none hover:ring-2 focus-visible:ring-4 ring-white ring-opacity-20 transition-[box-shadow] duration-100 ' +
						(child.props.className || ''),
				})
			if (child.type == 'option') return cloneElement(child, { className: 'bg-black' })
			if (child.type === 'input')
				return cloneElement(child, {
					onKeyPress: (e: KeyboardEvent) => {
						if (e.key === 'Enter') {
							e.preventDefault()
							if (onSubmit) onSubmit()
						}
					},
					className:
						'py-3 px-4 w-full bg-black rounded-2xl placeholder:text-white placeholder:opacity-60 focus-visible:outline-none hover:ring-2 focus-visible:ring-4 ring-white ring-opacity-20 transition-[box-shadow] duration-100 ' +
						(child.props.className || ''),
				})
			if (child.type == 'button')
				return cloneElement(child, {
					className: 'bg-primary-light px-5 py-3 rounded-2xl ' + (child.props.className || ''),
				})
			if (child.type == 'textarea')
				return cloneElement(child, {
					className:
						'py-3 px-4 w-full bg-black rounded-2xl placeholder:text-white placeholder:opacity-60 focus-visible:outline-none hover:ring-2 focus-visible:ring-4 ring-white ring-opacity-20 transition-[box-shadow] duration-100 ' +
						(child.props.className || ''),
				})
			return child
		})
	}
	const newChildren = iterate(children)
	return (
		<form {...props} className={'flex flex-col justify-center items-center gap-4 ' + (className || '')}>
			{newChildren}
		</form>
	)
}
