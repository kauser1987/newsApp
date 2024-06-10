import React,{ useEffect,useState } from "react";
import Newsitem from './Newsitem';
import Spinner from './Spinner'
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const Newsfunc=(props) => {
    const [articles,setarticles]=useState([])
    const [loading,setloading]=useState(true)
    const [page,setpage]=useState(1)
    const [totalResults,settotalResults]=useState(0)
    
    
    const updateNews = async () => {
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData)
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        props.setProgress(100);

    }
    let pageNo=0;
    useEffect(() => {
        updateNews()
    },[])
    
    const fetchMoreData=async () => {
        pageNo=page+1
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json()
        
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setpage(pageNo)
    }
    
    const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1)
  }
    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px',marginTop: '90px' }}>Daily -Top {capitalizeFirstLetter(props.category)} Headlines!</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={<Spinner />}
                >
                <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}
                                source={element.source.name} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}
Newsfunc.defaultProps={
    country: "in",
    pageSize: 6,
    category: 'general',
    totalResults: 0
}
Newsfunc.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default Newsfunc;
