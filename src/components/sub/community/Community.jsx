import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { RxReset } from 'react-icons/rx';
import { useRef, useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';

function Comunity() {
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		if (data) return JSON.parse(data);
		else return [];
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);
	const len = useRef(0); //전체 포스트 갯수가 담길 참조객체
	const pageNum = useRef(0); //페이지 갯수가 담길 참조객체
	const perNum = useRef(6); //페이지당 보일 포스트 갯수가 담긴 참조객체

	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);
	const [PageNum, setPageNum] = useState(0);
	const [CurNum, setCurNum] = useState(0);

	const resetPost = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				date: new Date(korTime),
			},
			...Posts,
		]);
		resetPost();
	};

	const deletePost = (delIndex) => {
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	const enableUpdate = (editIndex) => {
		if (!Allowed) return;
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (cancelIndex) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (cancelIndex === idx) post.enableUpdate = false;
				return post;
			})
		);
	};

	const updatePost = (updateIndex) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim())
			return alert('수정할 글의 제목과 본문을 모두 입력하세요.');
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (updateIndex === idx) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		Posts.map((el) => (el.enableUpdate = false));
		len.current = Posts.length;

		pageNum.current =
			len.current % perNum.current === 0
				? len.current / perNum.current
				: parseInt(len.current / perNum.current) + 1;

		setPageNum(pageNum.current);
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<nav className='pagination'>
				{Array(PageNum)
					.fill()
					.map((_, idx) => {
						return (
							<button
								key={idx}
								onClick={() => setCurNum(idx)}
								className={idx === CurNum ? 'on' : ''}
							>
								{idx + 1}
							</button>
						);
					})}
			</nav>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='Write Title' ref={refInput} />
					<textarea
						cols='30'
						rows='5'
						placeholder='Write Content Message'
						ref={refTextarea}
					></textarea>

					<nav>
						<button onClick={resetPost}>
							<RxReset fontSize={20} color={'#555'} />
						</button>
						<button onClick={createPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{Posts.map((post, idx) => {
						const stringDate = JSON.stringify(post.date);
						const textedDate = changeText(stringDate.split('T')[0], '.').slice(1);

						if (idx >= perNum.current * CurNum && idx < perNum.current * (CurNum + 1)) {
							return (
								<article key={idx}>
									{post.enableUpdate ? (
										//수정모드
										<>
											<div className='txt'>
												<input type='text' defaultValue={post.title} ref={editInput} />
												<textarea defaultValue={post.content} ref={editTextarea}></textarea>
											</div>
											<nav>
												<button onClick={() => disableUpdate(idx)}>Cancel</button>
												<button onClick={() => updatePost(idx)}>Update</button>
											</nav>
										</>
									) : (
										//출력모드
										<>
											<div className='txt'>
												<h2>{post.title}</h2>
												<p>{post.content}</p>
												<span>{textedDate} </span>
											</div>
											<nav>
												<button onClick={() => enableUpdate(idx)}>Edit</button>
												<button onClick={() => deletePost(idx)}>Delete</button>
											</nav>
										</>
									)}
								</article>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Comunity;
