import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

export default function News(props) {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({ articles: [], totalResults: 0, page: 1 });
  // let [page, setpage] = useState(1);
  const pagesize = 5;

  useEffect(() => {
    setloading(true);
    fetch(`
https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=27a5d4a1016942259fb886fb129ad9aa&page=${data.page}&pageSize=${pagesize}`).then(
      (result) => {
        result.json().then((resp) => {
          setdata({                     
            articles: resp.articles,
            page: data.page,
            totalResults: resp.totalResults
          });
          setloading(false);
          console.log(data.page);
        });
      }
    );
  }, []);
  const updatenews = async () => {
    setloading(true);
    fetch(`
https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8d953d3388854bfd8de5de25aade6b50&page=${data.page}&pageSize=${pagesize}`).then(
      (result) => {
        result.json().then((resp) => {
          setdata({
            articles: resp.articles,
            page: data.page,
            totalResults: resp.totalResults,
          });
          setloading(false);
          console.log(data.page);
        });
      }
    );
  };

  const fetchmoredata = async () => {
    data.page = data.page + 1;
    // updatenews()
    setloading(true);
    fetch(`
https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8d953d3388854bfd8de5de25aade6b50&page=${data.page}&pageSize=${pagesize}`).then(
      (result) => {
        result.json().then((resp) => {
          setdata({
            articles: data.articles.concat(resp.articles),
            page: data.page,
            totalResults: resp.totalResults,
          });
          setloading(false);
          console.log(data.page);
        });
      }
    );
  };
  let defaultimageurl =
    "https://assets1.cbsnewsstatic.com/hub/i/r/2023/07/15/ff19a689-ba68-43b3-9e30-ad87823a45f1/thumbnail/1200x630/372a214768550161f6b6116442cff0ad/cbsn-fusion-875-million-powerball-jackpot-has-many-feeling-lucky-thumbnail-2129600-640x360.jpg?v=b9ad248140817530b57bedd1355bcccb";
  let defaultcardtext = "go to the website for more news";
  return (
    <>
      <div className="container">
        <h3 className="text mx-3 my-4">---Top Headlines---</h3>
        <div className="load">{loading === true && <Loader />}</div>
        <div className="items">
          <InfiniteScroll
            dataLength={data.articles.length}
            next={fetchmoredata}
            hasMore={data.articles.length !== data.totalResults}
            loader={
              <div className="load">
                <Loader />
              </div>
            }
          >
            {data.articles.map((item) => {
              return (
                <>
                  <div className="newsitem" key={item.url}>
                    <Newsitem
                      source={item.source.name}
                      title={
                        item.title !== null
                          ? item.title.slice(0, 45) + "..."
                          : ""
                      }
                      description={
                        item.description !== null
                          ? item.description.slice(0, 55) + "..."
                          : defaultcardtext
                      }
                      url={item.url}
                      urlToImage={
                        item.urlToImage !== null
                          ? item.urlToImage
                          : defaultimageurl
                      }
                      publishedAt={
                        new Date(item.publishedAt).toGMTString() === null
                          ? "published recently"
                          : "Published on " +
                            new Date(item.publishedAt).toGMTString()
                      }
                      author={
                        item.author === null
                          ? ""
                          : `Published by ${item.author}`
                      }
                    />
                  </div>
                </>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}