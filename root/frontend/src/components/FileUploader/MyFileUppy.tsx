import { useState } from "react";

export const MyFileUppy = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		console.log(selectedFile)
		console.log(event.target.files[0])
		const reader = new FileReader();
		reader.onload = async (e) => {
			console.log(e.target.result);
		}

		reader.readAsText(event.target.files[0])

	};

	const handleSubmission = () => {
	};

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}