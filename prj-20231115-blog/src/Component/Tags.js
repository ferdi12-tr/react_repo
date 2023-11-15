import React, {Component} from 'react';

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagCounts: {},
            error: null,
        };
    }

    componentDidMount() {

        fetch('http://localhost:3000/bloglar')
            .then(response => response.json())
            .then(data => {
                console.log('Gelen veri:', data);

                if (data) {

                    const tagCounts = data.reduce((counts, blog) => {
                        blog.tag.forEach(tag => {
                            counts[tag] = (counts[tag] || 0) + 1;
                        });
                        return counts;
                    }, {});
                    this.setState({tagCounts: tagCounts});
                } else {

                    this.setState({error: 'API verisi beklenen formatta değil'});
                }
            })
            .catch(error => {
                console.error('Veri çekme hatası:', error);

                this.setState({error: 'Veri çekme hatası'});
            });
    }

    render() {
        const {tagCounts, error} = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div className="fh5co_tags_all">

                {Object.entries(tagCounts).map(([tag, count], index) => (
                    <a key={index} href="test" className="fh5co_tagg">
                        {tag} ({count})
                    </a>
                ))}
            </div>
        );
    }
}

export default Tags;
