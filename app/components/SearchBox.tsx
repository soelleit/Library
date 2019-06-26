import * as React from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  templateCount?: number;
}

export default class SearchBox extends React.Component<SearchBoxProps> {
  searchFilter: React.RefObject<HTMLInputElement>;

  constructor(props: SearchBoxProps){
    super(props);

    this.searchFilter = React.createRef();
  }

  componentDidMount() {
    if (this.searchFilter.current) {
      this.searchFilter.current.focus();
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    let placeholder = "Search " + this.props.templateCount + " community contributed templates...";
    return (
      <section className="template-search">
        <div className="container">
          <div className="row clearfix">
            <div className="column two-thirds">
              <div className="search-box">
                <div className="search-input">
                  <input autoFocus
                      onChange={this.handleChange}
                      placeholder={placeholder}
                      ref={this.searchFilter}
                      type="text"
                      value={this.props.value}
                  />
                </div>
              </div>
            </div>
            <div className="column third">
              <p className="tutorial">
                <strong>Be part of it!</strong><br /> Submit templates, report issues and send patches at the GitHub <a href="https://github.com/OctopusDeploy/Library">project site</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  static defaultProps = {
    filterText: "",
    templateCount: 0
  }

  static displayName = "octopus-library-search-box"
}
