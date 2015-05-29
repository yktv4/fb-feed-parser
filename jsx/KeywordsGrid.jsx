var KeywordsGrid = React.createClass({
    getInitialState: function () {
        return {keywords: KeywordsStore.get()}
    },
    componentDidMount: function () {
        KeywordsStore.listen(this.onKeywordsUpdated);
    },
    onKeywordsUpdated: function () {
        var keywords = KeywordsStore.get();
        this.setState({keywords: keywords});

        if (keywords.length !== 0) {
            $(React.findDOMNode(this)).find('table').DataTable({
                paging: false
            });
        }
    },
    renderTable: function () {
        return (
            <table id="js-keywords-grid" className="table table-condensed table-striped">
                <thead>
                    <tr>
                        <th>Keyword</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.keywords.map(function (el, idx) {
                        return <KeywordGridItem key={ idx } keyword={ el[0] } count={ el[1] } />
                    }) }
                </tbody>
            </table>
        );
    },
    renderNoKeywords: function () {
        return (<div>No keywords fetched yet</div>);
    },
    render: function () {
        return (
            <div className={ this.props.visible ? '' : 'hidden'}>
                { this.state.keywords.length === 0 ? this.renderNoKeywords() : this.renderTable() }
            </div>
        );
    }
});