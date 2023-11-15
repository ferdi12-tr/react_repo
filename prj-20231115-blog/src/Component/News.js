
import React, {Component} from 'react';
import Tags from "./Tags";
import Popular from "./Popular";
import NewsModal from "./NewsModal";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            error: null,

        };
    }

    componentDidMount() {
        this.fetchBlogs();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCategory !== this.props.selectedCategory) {
            this.fetchBlogs();
        }
    }

    fetchBlogs() {

        const apiUrl = this.props.selectedCategory
            ? `http://localhost:3000/bloglar?kategoriId=${this.props.selectedCategory}`
            : 'http://localhost:3000/bloglar';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log('Gelen veri:', data);
                if (data) {
                    this.setState({blogs: data});
                } else {
                    this.setState({error: 'API verisi beklenen formatta değil'});
                }
            })
            .catch((error) => {
                console.error('Veri çekme hatası:', error);
                this.setState({error: 'Veri çekme hatası'});
            });
    }


    render() {
        const {blogs, error} = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div className="row mx-0">
                <div className="col-md-9 animate-box" data-animate-effect="fadeIn">


                    <div className="container-fluid pb-4 pt-4 paddding">

                        {blogs.map((blog, index) => (
                            <div key={index} className="row pb-4" onClick={() => this.props.onBlogClick(blog)}>
                                <div className="col-md-5">
                                    <div className="fh5co_hover_news_img">
                                        <div className="fh5co_news_img">
                                            <img src={blog.resim} alt=""/>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className="col-md-7 animate-box">
                                    <h3 className="fh5co_magna py-2" onClick={(e) => e.preventDefault()}>
                                        {blog.baslik}
                                    </h3>
                                    <a href="test" className="fh5co_mini_time py-3">
                                        {blog.author} - {blog.tarih}
                                    </a>
                                    <div className="fh5co_consectetur">{blog.aciklama}</div>

                                    <div className="fh5co_consectetur">
                                        <i className="fa fa-heart-o"></i> {blog.favoriSayisi}
                                    </div>

                                    <div className="fh5co_consectetur">
                                        <i className="fa fa-clock-o"></i> {blog.date}
                                    </div>

                                    <div className="fh5co_consectetur">
                                        {blog.tag.map((tag, index) => (
                                            <a key={index} href="test" className="fh5co_tagg">
                                                {tag}
                                            </a>
                                        ))}
                                        <div className="clearfix"></div>
                                    </div>


                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-3 animate-box" data-animate-effect="fadeInRight">
                    <div className="col-md-12 animate-box" data-animate-effect="fadeInRight">
                        <div>
                            <div className="fh5co_heading fh5co_heading_border_bottom py-2 mb-4">Etiketler</div>
                        </div>
                        <div className="clearfix"></div>
                        <Tags/>
                        <div>
                            <div className="fh5co_heading fh5co_heading_border_bottom pt-3 py-2 mb-4">Popüler
                            </div>
                        </div>
                        <Popular onBlogClick={this.props.onBlogClick}/>
                    </div>
                </div>
                {this.props.selectedBlog && (
                    <NewsModal blog={this.props.selectedBlog} onClose={this.props.onClose}
                               showModal={this.props.showModal}/>
                )}
            </div>


        )
            ;
    }
}

export default News;
