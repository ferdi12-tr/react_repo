import React, {Component} from 'react';

class Headline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerBlogs: [],
            error: null,
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/bloglar')
            .then(response => response.json())
            .then(data => {
                console.log('Gelen veri:', data);
                if (data) {
                    const bannerBlogs = data.filter(blog => blog.banner === 1);
                    this.setState({bannerBlogs: bannerBlogs});
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
        const {bannerBlogs, error} = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div>
                <div className="container-fluid paddding mb-5">
                    <div className="row mx-0">

                        <div className="col-md-6 col-12 paddding animate-box" data-animate-effect="fadeIn">
                            {bannerBlogs.length > 0 && (
                                <div className="fh5co_suceefh5co_height"
                                     onClick={() => this.props.onBlogClick(bannerBlogs[0])}>
                                    <img src={bannerBlogs[0].resim} alt="img"/>
                                    <div className="fh5co_suceefh5co_height_position_absolute"></div>
                                    <div className="fh5co_suceefh5co_height_position_absolute_font">
                                        <div className=""><a href="test" className="color_fff"> <i
                                            className="fa fa-clock-o"></i>&nbsp;&nbsp;{bannerBlogs[0].date}
                                        </a></div>
                                        <div className="">
                                            <a href="single.html"
                                               className="fh5co_good_font"> {bannerBlogs[0].baslik} </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                {bannerBlogs.slice(1, 6).map((blog, index) => (
                                    <div key={index} className="col-md-6 col-6 paddding animate-box"
                                         data-animate-effect="fadeIn" onClick={() => this.props.onBlogClick(blog)}>
                                        <div className="fh5co_suceefh5co_height_2">
                                            <img src={blog.resim} alt="img"/>
                                            <div className="fh5co_suceefh5co_height_position_absolute"></div>
                                            <div className="fh5co_suceefh5co_height_position_absolute_font_2">
                                                <div className=""><a href="test" className="color_fff"> <i
                                                    className="fa fa-clock-o"></i>&nbsp;&nbsp;{blog.date}
                                                </a></div>
                                                <div className="">
                                                    <a href="single.html"
                                                       className="fh5co_good_font_2"> {blog.baslik} </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Headline;
