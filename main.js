const API_KEY= `39c0d0315a8b48c3842b1798a34a8c6a`;
let news=[]
const getLatestNews = async ()=>{
  const url = new URL (`https://main--capable-pixie-8d3cc6.netlify.app/=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json()
  news = data.articles;
  console.log("ddd", news)
};

getLatestNews ();
