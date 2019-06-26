import * as React from 'react';
import { RouteComponentProps, withRouter } from "react-router";
import SearchBox from './SearchBox';
import TemplateList from './TemplateList';
import LibraryStore from './../stores/LibraryStore';

interface ListingRouteProps{
  searchTerm: string;
}

interface ListingProps extends RouteComponentProps<ListingRouteProps> {
}

interface ListingState {
  filterText: string;
  templates: any[];
}

export class Listing extends React.Component<ListingProps, ListingState> {
  constructor(props: ListingProps) {
    super(props);

    this.state = {
      filterText: this.props.match && this.props.match.params && this.props.match.params.searchTerm || "",
      templates: LibraryStore.getItems()
    }
  }

  componentDidMount() {
    LibraryStore.addChangeListener(this._onChange);
  }

  componentWillDismount() {
    LibraryStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      templates: LibraryStore.getItems()
    });
  }

  handleSearchChange = (filterText: string) => {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <SearchBox value={this.state.filterText}
            onChange={this.handleSearchChange}
            templateCount={this.state.templates.length}
        />
        <TemplateList filterText={this.state.filterText}
            templateList={this.state.templates}
        />
      </div>
    );
  }

  static displayName = "octopus-library-listing"
}

const EnhancedListing = withRouter(Listing);
export default EnhancedListing;
