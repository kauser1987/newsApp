import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Newsfunc from "./components/Newsfunc";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App11 = () => {
  const pageSize = 6;
  const [progress, setprogress] = useState(0)
  const apiKey = `873192210af64618a7fefbf0529ac2bb`;
  // const apiKey = `process.env.REACT_APP_NEWS_API`;
  const setProgress = (progress) => {
    setprogress(progress);
  };

  return (
    <div>
      <LoadingBar height={3} color="#f11946" progress={progress} />
        <Router>
        <Navbar />
        {/* <Newsfunc pageSize={pageSize} country="in" category="science"/> */}
        <Routes>

          <Route exact path="/" element={<Newsfunc setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />

          <Route exact path="/business" element={<Newsfunc setProgress= {setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} />
          
          <Route
            exact
            path="/entertainment"
            element={
              <Newsfunc
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/general"
            element={
              <Newsfunc
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <Newsfunc
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <Newsfunc
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                country="in"
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <Newsfunc
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <Newsfunc
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                country="in"
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App11;