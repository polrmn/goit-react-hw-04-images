import { Component } from "react";
import { Grid } from "react-loader-spinner";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import { api } from "./services/api";


export class App extends Component {

  state = {
    query: '',
    page: 1,
    showLoader: false,
    showModal: false,
    modalImg: '',
    images: []
  }


  async componentDidUpdate(_, prevState) {
    const {query, page} = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ showLoader: true });
    const response = await api(query, page)
    const filtredResponse = response.map(({ id, webformatURL, largeImageURL }) => {
        return { id, webformatURL, largeImageURL };
      })
    this.setState({
        images: [...this.state.images, ...filtredResponse],
        showLoader: false
      })
    }
  }


  handleFormSubmit = (value) => {
    
    this.setState((prevState)=>{
      if (prevState.query !== value && value !== '') {
        return { query: value, page: 1, images: [] };
      }
    })
    
  }

  handleLMBtnClick = () => {
    this.setState((prevState)=>({page: prevState.page + 1 }))
  }

  openModal = (event) => {
    const { alt } = event.target;
    if (alt) {
      this.setState({ showModal: true, modalImg: alt });
    }
  }

  onCloseModal = () => {
      this.setState({ showModal: false, modalImg: '' });
  }

  render () {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.images.length > 0 && (
          <ImageGallery items={this.state.images} onClick={this.openModal} />
        )}
        {this.state.showLoader ? (
          <Grid
            height="120"
            width="80"
            color="#3f51b5"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{ justifyContent: 'center' }}
            wrapperClass=""
            visible={true}
          />
        ) : (
          this.state.images.length > 0 && (
            <Button onClick={this.handleLMBtnClick} />
          )
        )}
        {this.state.showModal && (
          <Modal img={this.state.modalImg} onCloseModal={this.onCloseModal} />
        )}
      </>
    );
  }
};



 
