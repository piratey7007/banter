import React from 'react'

export default function StatusAlert({ status }) {
	if (status.success)
		return (
			<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
				<span className="block sm:inline">{status.success}</span>
			</div>
		)
	if (status.error)
		return (
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
				<span className="block sm:inline">{status.error}</span>
			</div>
		)
	if (status.pending)
		return (
			<div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
				<span className="block sm:inline">{status.pending}</span>
			</div>
		)
	throw new Error('Invalid status provided in StatusAlert.jsx')
}
