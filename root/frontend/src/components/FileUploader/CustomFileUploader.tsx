import { useState } from "react";

export const CustomFileUploader = ({handleSubmission}) => {

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [dataArray, setDataArray] = useState([]);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		console.log(selectedFile)
		console.log(event.target.files[0])
		const reader = new FileReader();
		reader.onload = async (e) => {
			
            let lines = reader.result.toString().split("\n");
            var headers = lines[0].replace("\r", "").split(";");
            console.log(headers)
            var result = [];

            //Looping inside file until it reaches the end of it
            for (var i = 1; i < lines.length - 1; i++) {

                var obj = {};
                var currentline = lines[i].split(";");

                //For each line, scan through it and save the data
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = parseFloat(currentline[j])
                }
                result.push(obj);
            }
			setDataArray([...result])
		}

		console.log(event.target.files[0].name)
		reader.readAsText(event.target.files[0])

	};

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			<div>
				<button onClick={handleSubmission(dataArray)}>Submit</button>
			</div>
		</div>
	)
}