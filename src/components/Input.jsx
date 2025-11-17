export default function Input({ karat, onValueChange }) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<label className="text-xl">عيار {karat}</label>
			<input
				type="number"
				step="0.01"
				min="0"
				placeholder="0"
				className="p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
				defaultValue={0}
				onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
				onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
			/>
		</div>
	);
}
