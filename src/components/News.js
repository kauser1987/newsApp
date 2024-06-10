import React, { Component } from "react";
import { Newsitem } from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 4,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };



  constructor(props) {
    super(props);
    console.log("hello i am a constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0

    }
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    document.title = `${capitalizeFirstLetter(this.props.category)} - Ibrahim LatestNews`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,

    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
    console.log("cdm");
    
  }



  handlePreviousclick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=${this.props.apiKey}&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextclick = async () => {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=${this.props.apiKey}&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async (props) => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: false });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,

    });
  };
  render() {
    const capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1)
}
    console.log("render");
    return (
      <>
        <h1 className="text-center" style={{ margin: "65px 0px" }}>
          Ibrahim LatestNews-Top {capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Spinner />}

        {/* {!this.state.loading && */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {
                this.state.articles.map((elem) => {
                  return (

                    <div className="col-md-4" key={elem.url}>
                      <Newsitem
                        title={elem.title ? elem.title.slice(0, 45) : ""}
                        description={
                          elem.description ? elem.description.slice(0, 88) : ""
                        }
                        imageUrl={elem.urlToImage}
                        newsUrl={elem.url}
                        author={elem.author ? elem.author : "Unknown"}
                        date={elem.publishedAt}
                        source={elem.source.name}
                      />
                    </div>
                  );
                })

              }
            </div></div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-sm btn-dark"
              onClick={this.handlePreviousclick}
            >
              &larr; previous
            </button>

            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-sm btn-dark"
              onClick={this.handleNextclick}
            >
              next &rarr;
            </button>
          </div>  */}



      </>
    );
  }
}

export default News;


















