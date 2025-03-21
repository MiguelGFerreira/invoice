import React from "react";
import Image from "next/image";
import spinner from '@/../public/images/spinner.png'

const LoadingSpinner = () => {
	return (
		<div role="status" className="w-full flex justify-center">
			<Image
				src={spinner}
				alt={"loading_spinner"}
				width={60}
				height={60}
				className="animate-spin"
				priority={true}
			/>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default LoadingSpinner;