import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const city = storedUser?.city || "Richardson";
    const state = storedUser?.state || "TX";
  
    const location = `${city} ${state}`;
  
    fetch(`/api/news?city=${encodeURIComponent(location)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
        console.log(data);
      })
      .catch((err) => {
        console.error("News fetch error:", err);
        setArticle(null);
      });
  }, []);
  

  return (
    <div className="news-container">
      {article ? (
        <>
          <h3 className="news-title">{article.title}</h3>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
            Read more →
          </a>
        </>
      ) : (
        <p className="news-desc">No local news found.</p>
      )}
    </div>
  );
};

export default News;