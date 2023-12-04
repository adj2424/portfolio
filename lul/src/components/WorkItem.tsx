import '../css/work-item.css';

const ProjectItem = (props: { number: number; name: string; technologies: any[] }) => {
	const { number, name, technologies } = props;
	//https://www.svgrepo.com/svg/339796/arrow-up-right?edit=true
	return (
		<div className="flex justify-between relative items-center">
			<div className="project-item grid items-center h-[10rem] w-[94%]  hover:w-[86%] hover:ml-[3%]">
				<div className="project-number text-center">0{number}/</div>
				<div className="project-name">{name}</div>
				<div className="flex flex-col text-right">
					{technologies.map(d => {
						return <div>{d}</div>;
					})}
				</div>
			</div>
			<svg fill="#b31312" viewBox="0 0 32 32" className="arrow float-right ">
				<g>
					<polygon points="10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6"></polygon>
				</g>
			</svg>
		</div>
	);
};
export default ProjectItem;
