import React from 'react'

export default function LoadingScreen() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm3.293 2.293a1 1 0 011.414 0L12 14.414l2.293-2.293a1 1 0 011.414 1.414l-2.999 2.999a1 1 0 01-1.414 0l-2.999-2.999a1 1 0 010-1.414z"
				/>
			</svg>
			<span className="text-xl font-bold">Loading...</span>
		</div>
	)
}
