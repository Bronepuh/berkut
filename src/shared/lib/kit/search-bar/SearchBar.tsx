import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./search-bar.module.scss";

const { Search } = Input;

export const SearchBar: React.FC = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		if (query.trim()) {
			navigate(`/berkut/search?q=${encodeURIComponent(query.trim())}`);
		}
	};

	// Кастомная кнопка с фоном как у инпута и серой иконкой
	const customButton = (
		<Button
			style={{
				background: "#fff", // Белый фон как у инпута
				border: "1px solid #d9d9d9",
				borderLeft: "none",
				borderRadius: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
			icon={<SearchOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />} // Серый цвет иконки
		/>
	);

	return (
		<div className={styles.headerSlider}>
			<div className={styles.rectangle}></div>
			<Search
				placeholder="Search images..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onSearch={handleSearch}
				enterButton={customButton}
				size="large"
				className={styles.search}
			/>
		</div>
	);
};
