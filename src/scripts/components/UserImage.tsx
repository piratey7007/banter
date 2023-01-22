import DefaultImage from './DefaultImage'

export default function UserImage({
	url,
	colors,
	className,
	...props
}: {
	url?: string
	colors?: string[] | string
	className?: string
}) {
	const cl = 'w-20 h-20 rounded-xl object-cover ' + className
	if (url) return <img src={url} alt='Profile Picture' referrerPolicy='no-referrer' className={cl} {...props} />
	if (colors) return <DefaultImage colors={colors} className={cl} {...props} />
	return <DefaultImage colors={colors} className={cl} {...props} />
}
