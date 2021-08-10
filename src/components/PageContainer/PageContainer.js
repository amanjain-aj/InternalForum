import React, { Fragment } from "react";
import SideBar from "../SideBar/SideBar";
import Header from "../../components/headerFooter/header";
import Footer from "../../components/headerFooter/footer";

const PageContainer = ({ component: Component }) => {
  return class DefaultPageContainer extends React.Component {
    render() {
      return (
        <Fragment>
          <Header />
          <div className="container-fluid ">
            <div className="row">
              <div className="col-sm-2  ">
                <SideBar />
              </div>
              <div className="col-sm-9 border-left border-right">
                <Component {...this.props} />
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      );
    }
  };
};

export default PageContainer;
