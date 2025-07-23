import { FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function Contact() {
	return (
		<div className="p-6 text-center text-gray-800">
			<h2 className="text-4xl font-semibold mb-4">Contact Me</h2>
			<div className="text-2xl mb-6">
				Connect with me on LinkedIn or email me
			</div>

			{/* Icon row */}
			<div className="flex justify-center items-center gap-6 text-3xl">
				<a
					href="mailto:srikar0811@gmail.com"
					className="text-gray-700 hover:text-gray-900 transition-colors"
					aria-label="Email"
				>
					<CiMail />
				</a>
				<a
					href="https://www.linkedin.com/in/srikar-rao-57a60732a"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 hover:text-blue-800 transition-colors"
					aria-label="LinkedIn"
				>
					<FaLinkedin />
				</a>
			</div>
		</div>
	);
}
