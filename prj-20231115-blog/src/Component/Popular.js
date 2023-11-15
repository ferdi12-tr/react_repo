import React, {Component} from 'react';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popularBlogs: [],
            error: null,
        };
    }


    componentDidMount() {
        fetch('http://localhost:3000/bloglar')
            .then(response => response.json())
            .then(data => {
                console.log('Gelen veri:', data);
                if (data) {
                    const sortedBlogs = data.sort((a, b) => b.favoriSayisi - a.favoriSayisi);
                    const popularBlogs = sortedBlogs.slice(0, 6);
                    this.setState({popularBlogs: popularBlogs});
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
        const {popularBlogs, error} = this.state;


        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div>
                {popularBlogs.map((blog, index) => (
                    <div key={index} className="row pb-3" onClick={() => this.props.onBlogClick(blog)}>
                        <div className="col-5 align-self-center">
                            <img src={blog.resim} alt="img" className="fh5co_most_trading"/>
                        </div>
                        <div className="col-7 paddding">
                            <div className="most_fh5co_treding_font">{blog.baslik}</div>
                            <div className="fh5co_consectetur">
                                <i className="fa fa-heart-o"></i> {blog.favoriSayisi}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Popular;
