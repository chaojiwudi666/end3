import React, { Component } from './node_modules/react';
import HeadNav from '../../components/HeadNav';
import LeftSubMenu from '../../components/LeftSubMenu';
import './index.scss';
class Home extends Component {

  render () {
    return (
      <div className="homePage">
          <div className="main-left">
            <LeftSubMenu/>
           
          </div>
          <div className="main-right">
            <div className="head-nav">
              <HeadNav/>
            </div>
           
          </div>
      </div>
    );
  }

}

export default connect(
  mapState, mapDispatch
)(withRouter(Home));