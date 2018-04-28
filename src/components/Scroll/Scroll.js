import * as React from "react";

export class Scroll extends React.Component {
  state = {
    loading: false
  };

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener("scroll", this.onScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.onScroll);
  }

  componentDidUpdate() {
    this.onScroll();
  }

  onScroll() {
    if (!this.props.Cols || this.state.loading) {
      return;
    }

    //для обычной сетки
    if (this.props.Cols > 0) {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop + window.innerHeight >= this.props.Coordinate) {
        this.nextPage();
      }
    }
    //для landscape
    if (this.props.Cols < 0) {
      let scrollLeft =
        document.body.scrollLeft || document.documentElement.scrollLeft;
      if (scrollLeft + window.innerWidth >= this.props.Coordinate) {
        this.nextPage();
      }
    }
  }

  async nextPage() {
    this.setState({ loading: true });
    try {
      await this.props.FetchMore();
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="scroll">
        {this.props.children}

        {this.state.loading && (
          <div className="spinner spinner-bottom">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        )}
      </div>
    );
  }
}
