import * as React from "react";

import { Scroll } from "../Scroll/Scroll";
import { Card } from "../Card/Card";
import { Dashboard } from "../Dashboard/Dashboard";

export class Grid extends React.Component {
  state = {
    justNumbersAndSrc: [],
    open: false,
    current: 0,
    loading: false
  };

  constructor(props) {
    super(props);
    this.imageClick = this.imageClick.bind(this);
    this.closeIt = this.closeIt.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  async nextPage(cur) {
    this.setState({ loading: true });

    try {
      await this.props.FetchMore();
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        loading: false,
        current: ++cur
      });
    }
  }

  imageClick(param, e) {
    console.log(param);
    console.log(e.target);
    this.setState({
      open: true,
      current: param
    });
  }

  closeIt() {
    //сделай, чтоб скукоживалось в карточкуили скролл анимируй
    let numberId = this.props.Items[this.state.current].count.toString();
    let elem = document.getElementById(numberId);
    elem.scrollIntoView();
    this.setState({ open: false });
  }

  nextImage() {
    let now = this.state.current;
    if (now === this.props.Items.length - 1) {
      this.nextPage(now); // тут подтормаживает, пока не загрузилось
    } else {
      this.setState({ current: ++now });
    }
  }

  previousImage() {
    let now = this.state.current;
    if (now === 0) {
      now = this.props.Items.length;
    }
    this.setState({ current: --now });
  }

  render() {
    if (!this.props.Items) {
      return null;
    }

    return (
      <Scroll
        Cols={this.props.Cols}
        Coordinate={this.props.Coordinate}
        FetchMore={this.props.FetchMore}
      >
        {this.props.Items.map(card => (
          <Card
            key={card._id}
            Item={card}
            OnClick={this.imageClick.bind(this, card.num)}
          />
        ))}

        <Dashboard
          Items={this.props.Items}
          Opened={this.state.open}
          Current={this.state.current}
          CloseIt={this.closeIt}
          Next={this.nextImage.bind(this)}
          Previous={this.previousImage}
        />

        {this.state.loading && <div className="spinner">загрузка...</div>}
      </Scroll>
    );
  }
}
