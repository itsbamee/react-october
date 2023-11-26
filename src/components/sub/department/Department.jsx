import './Department.scss';
import Layout from '../../common/layout/Layout';
import React, { useEffect, useState, useRef } from 'react';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);

	const [Department, setDepartment] = useState([]);
	const [History, setHistory] = useState([]);

	const fetchDepartment = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		setDepartment(json.members);
	};

	const fetchHistory = async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		setHistory(json.history);
	};

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				<h2>History</h2>
				<div className='con'>
					{History.map((data, idx) => {
						return (
							<React.Fragment key={idx}>
								<h3>{Object.keys(data)[0]}</h3>
								<ul>
									{Object.values(data)[0].map((val, idx) => (
										<li key={idx}>{val}</li>
									))}
								</ul>
							</React.Fragment>
						);
					})}
				</div>
			</section>

			<section id='memberBox'>
				<h2>Department</h2>

				<div className='con'>
					{Department.map((member, idx) => {
						return (
							<article key={idx}>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
