'use strict';

import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SlugMaker from '../services/SlugMaker';

interface TemplateListProps {
  filterText: string;
  templateList: any[];
}

export default class TemplateList extends React.Component<TemplateListProps> {
  render() {
    let templateList = this.props.templateList.map((item, index) => {
      let lc = this.props.filterText.toLowerCase();
      if(item.Name.toLowerCase().indexOf(lc) === -1 &&
         ((item.Description === null) || (item.Description.toLowerCase().indexOf(lc) === -1))) {
        return;
      }
      let formattedExportedAt = moment(item.ExportedAt).calendar();
      let friendlySlug =  SlugMaker.make(item.Name);
      return (
        <li className={'item-summary ' + item.ScriptClass}
            key={index + '.' + item.Name}
        >
          <img src={'data:image/gif;base64,' + item.Logo} />
          <h4 key={index + '.' + item.Name + '.0'}>
            <Link to={`/step-templates/${item.Id}/${friendlySlug}`}>{item.Name}</Link>
          </h4>
          <p className="faint">Exported {formattedExportedAt} by <strong>{item.Author}</strong></p>
        </li>
      );
    });

    return (
      <div className="template-list">
        <div className="container">
          <div className="row clearfix">
            <div className="column full">
              <ul className="search-results">
                {templateList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static displayName = "octopus-library-template-list"
  static defaultProps = {
    filterText: '',
    templateList: []
  }
}
