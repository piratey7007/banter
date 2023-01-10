export default function StatusAlert({ status }) {
	const { error, success, pending } = status
	let divClass, h2Class
	if (error) {
		status = error
		divClass = 'bg-error-100 text-error-500 border-error-500'
		h2Class = 'font-bold'
	} else if (success) {
		status = success
		divClass = 'bg-success-100 text-success-500 border-success-500'
		h2Class = 'text-center'
	} else if (pending) {
		status = pending
		divClass = 'bg-primary-100 text-primary-500 border-primary-500'
		h2Class = 'text-center'
	} else throw new Error('Status is required. StatusAlert.jsx')
	return (
		<div className={divClass + ' w-full rounded-2 p-4 border-[.2rem]'}>
			<h2 className={h2Class + ' text-center'}>
				{error && <span className='font-bold'>Error: </span>}
				<span className='font-normal'>{status}</span>
			</h2>
		</div>
	)
}
